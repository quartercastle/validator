const transformType = require('./transformType')
const { Schema, Value } = require('./exceptions')

module.exports = class Validator {
  /**
   * Create a new instance of the Validator and return an enhanced promise
   * @param  {Mixed} value
   * @param  {Object|Array|Function} type
   * @param  {Object} options
   * @return {Promise}
   */
  constructor (value, type, options = {}) {
    this.onError = options.onError
    this.errors = {}
    this.mutated = {}
    this.promises = []
    this.compare(value, transformType(type))
    this.mutateData(value)
    return this.createPromise(value)
  }

  /**
   * Compare an array against type schema
   * @param  {Mixed} value
   * @param  {Array} type
   * @param  {Array} context
   * @private
   */
  compareArray (value, type, context) {
    if (!value || !Array.isArray(value)) {
      return this.setError(context, `should be an array`, value)
    }

    for (let index = 0; index < value.length; index++) {
      this.compare(value[index], type[0], context.concat(index))
    }
  }

  /**
   * Compare an object against type schema
   * @param  {Mixed} value
   * @param  {Object} type
   * @param  {Array}  context
   * @private
   */
  compareObject (value, type, context) {
    if (!value || Array.isArray(value) || typeof value !== 'object') {
      return this.setError(context, `should be an object`, value)
    }

    for (let key in value) {
      if (!type[key]) {
        this.setError(
          context.concat(key),
          `key is not defined in the schema`,
          value
        )
      }
    }

    for (let key in type) {
      this.compare(value[key], type[key], context.concat(key))
    }
  }

  /**
   * Compare array against a type schema
   * @param  {Mixed} value
   * @param  {Object|Array|Function} type is an object/array schema or a validator function
   * @param  {Array}  context
   * @private
   */
  compare (value, type, context = []) {
    if (type.constructor.name === 'AsyncFunction') {
      return this.promises.push([context, type(value), value])
    }

    if (Array.isArray(type)) {
      return this.compareArray(value, type, context)
    }

    if (typeof type === 'object') {
      return this.compareObject(value, type, context)
    }

    try {
      if (!type(value)) throw new Error('value is invalid')
    } catch (err) {
      this.handleException(context, err, value)
    }
  }

  /**
   * Handle exceptions
   * @param  {Array} context
   * @param  {Object} err
   * @param  {Mixed} value
   * @private
   */
  handleException (context, err, value) {
    if (err instanceof Schema) {
      return this.compare(value, transformType(err.schema), context)
    }

    if (err instanceof Value) {
      return (this.mutated[context.join('.')] = err.value)
    }

    this.setError(context, err.message, value)
  }

  /**
   * Set error
   * @param {Array} context
   * @param {String} message
   * @param {Mixed} value
   * @private
   */
  setError (context, message, value) {
    this.errors[context.join('.')] = message

    if (typeof this.onError === 'function') {
      this.onError({ context, message, value })
    }
  }

  /**
   * Check if any value is marked as mutated and transform the value argument with
   * the mutated value
   * I know its bad practice to mutate function arguments but i have to be
   * able to set default values or e.g mutate date strings to Date objects on
   * the fly.
   * @param {Mixed} value
   * @private
   */
  mutateData (value) {
    if (Object.keys(this.mutated).length === 0) {
      return
    }

    for (const key in this.mutated) {
      key.split('.').reduce((value, context, index, path) => {
        if (index < path.length - 1) {
          return (value[context])
        }

        return (value[context] = this.mutated[key])
      }, value)
    }
  }

  /**
   * Check if the validator has failed, only works with synchronous schemas.
   * @return {Boolean}
   * @public
   */
  fails () {
    if (this.promises.length > 0) {
      throw new Error('The validator is asynchronous use .then() and .catch()')
    }

    return Object.keys(this.errors).length > 0
  }

  /**
   * Get errors if the validator is synchronous
   * @return {Object}
   * @public
   */
  getErrors () {
    if (this.promises.length > 0) {
      throw new Error(
        'The validator is asynchronous use validator.catch() to retrieve errors'
      )
    }

    return this.errors
  }

  /**
   * Create the return promise with some enhancements
   * @param  {Mixed} value
   * @return {Promise} The enhanced validator promise
   * @private
   */
  createPromise (value) {
    const promise = new Promise((resolve, reject) => {
      if (this.promises.length === 0) {
        if (this.fails()) {
          return reject(this.errors)
        } else {
          return resolve(value)
        }
      }

      this.waitForPromises()
        .then(() =>
          resolve(value)
        ).catch(() =>
          reject(this.errors)
        )
    })

    promise._validator = this
    promise.fails = this.fails.bind(this)
    promise.__defineGetter__('errors', this.getErrors.bind(this))
    promise.catch(() => {})

    return promise
  }

  /**
   * Wait for all promises to resolve or reject
   * @return {Promise}
   * @private
   */
  waitForPromises () {
    const promises = this.promises.reduce(
      (promises, [context, promise, value]) => {
        promise.catch(err => this.handleException(context, err, value))
        return promises.concat(promises, promise)
      },
      []
    )

    return Promise.all(promises)
  }
}
