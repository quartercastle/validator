const transformType = require('./transformType')
const { Schema, Value } = require('./exceptions')

module.exports = class Validator {
  /**
   * Create a new instance of the Validator
   * @param  {Mixed} value
   * @param  {Object|Array|Function} type
   * @param  {Object} options
   * @return {Validator}
   */
  constructor (value, type, options = {}) {
    this._onError = options.onError
    this._errors = {}
    this._mutated = {}
    this._promises = []
    this._compare(value, transformType(type))
    this._mutateData(value)
    this._promise = this._createPromise(value)
  }

  /**
   * Compare an array against schema
   * @param  {Mixed} value
   * @param  {Array} type
   * @param  {Array} context
   * @private
   */
  _compareArray (value, type, context) {
    if (!value || !Array.isArray(value)) {
      return this._setError(context, `should be an array`, value)
    }

    for (let index = 0; index < value.length; index++) {
      this._compare(value[index], type[0], context.concat(index))
    }
  }

  /**
   * Compare an object against schema
   * @param  {Mixed} value
   * @param  {Object} type
   * @param  {Array}  context
   * @private
   */
  _compareObject (value, type, context) {
    if (!value || Array.isArray(value) || typeof value !== 'object') {
      return this._setError(context, `should be an object`, value)
    }

    for (let key in value) {
      if (!type[key]) {
        this._setError(
          context.concat(key),
          `key is not defined in the schema`,
          value
        )
      }
    }

    for (let key in type) {
      this._compare(value[key], type[key], context.concat(key))
    }
  }

  /**
   * Compare array against a schema
   * @param  {Mixed} value
   * @param  {Object|Array|Function} type is an object/array schema or a validator function
   * @param  {Array}  context
   * @private
   */
  _compare (value, type, context = []) {
    if (type.constructor.name === 'AsyncFunction') {
      return this._promises.push([context, type, value])
    }

    if (Array.isArray(type)) {
      return this._compareArray(value, type, context)
    }

    if (typeof type === 'object') {
      return this._compareObject(value, type, context)
    }

    try {
      if (!type(value)) throw new Error('value is invalid')
    } catch (err) {
      this._handleException(context, err, value)
    }
  }

  /**
   * Handle exceptions
   * @param  {Array} context
   * @param  {Object} err
   * @param  {Mixed} value
   * @param  {Error}
   * @private
   */
  _handleException (context, err, value) {
    if (err instanceof Schema) {
      return this._compare(value, transformType(err.schema), context)
    }

    if (err instanceof Value) {
      return (this._mutated[context.join('.')] = err.value)
    }

    this._setError(context, err.message, value)

    return err
  }

  /**
   * Set error
   * @param {Array} context
   * @param {String} message
   * @param {Mixed} value
   * @private
   */
  _setError (context, message, value) {
    this._errors[context.join('.')] = message

    if (typeof this._onError === 'function') {
      this._onError({ context, message, value })
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
  _mutateData (value) {
    if (Object.keys(this._mutated).length === 0) {
      return
    }

    for (const key in this._mutated) {
      key.split('.').reduce((value, context, index, path) => {
        if (index < path.length - 1) {
          return (value[context])
        }

        return (value[context] = this._mutated[key])
      }, value)
    }
  }

  /**
   * Create promise to handle async validation types
   * @param  {Mixed} value
   * @return {Promise}
   * @private
   */
  _createPromise (value) {
    if (this._promises.length === 0) {
      if (this.fails()) {
        return Promise.reject(this._errors)
      }

      return Promise.resolve(value)
    }

    return this._waitForPromises()
        .then(() => Promise.resolve(value))
        .catch(() => Promise.reject(this._errors))
  }

  /**
   * Wait for all promises to resolve or reject
   * @return {Promise}
   * @private
   */
  _waitForPromises () {
    const promises = this._promises.reduce(
      (promises, [context, promise, value]) => {
        return promises.concat(
          promises,
          promise(value).catch(err => {
            if (err instanceof Error) {
              return Promise.reject(this._handleException(context, err, value))
            }

            return Promise.resolve()
          })
        )
      },
      []
    )

    return Promise.all(promises)
  }

  /**
   * Check if the validator has failed, only works with synchronous schemas.
   * @return {Boolean}
   * @public
   */
  fails () {
    if (this._promises.length > 0) {
      throw new Error('The validator is asynchronous, use .then() and .catch()')
    }

    return Object.keys(this._errors).length > 0
  }

  /**
   * Get errors if the validator is synchronous
   * @return {Object}
   * @public
   */
  get errors () {
    if (this._promises.length > 0) {
      throw new Error(
        'The validator is asynchronous, use validator.catch() to retrieve errors'
      )
    }

    return this._errors
  }

  /**
   * Proxy the then method to the promise
   * @param  {Function} onResolve
   * @param  {Function} onReject
   * @return {Promise}
   */
  then (onResolve, onReject) {
    return this._promise.then(onResolve, onReject)
  }

  /**
   * Proxy the catch method to the promise
   * @param  {Function} onReject
   * @return {Promise}
   */
  catch (onReject) {
    return this._promise.catch(onReject)
  }
}
