const transformType = require('./transformType.js')
const { Type, Value } = require('./exceptions')

class Validator {
  /**
   * Create a new instance of the Validator
   * @param  {Mixed} data
   * @param  {Object|Array} type
   * @return {Validator}
   */
  constructor (data, type) {
    this.errors = {}
    this.mutated = {}
    this.compare(data, transformType(type))
    this.mutateData(data)
  }

  /**
   * Compare data agains a type
   * @param  {Mixed} data
   * @param  {Object|Array|Function} type can be a validator function or a type
   * @param  {Array}  context
   * @private
   */
  compare (data, type, context = []) {
    if (Array.isArray(type)) {
      return this.compareArray(data, type, context)
    }

    if (typeof type === 'object') {
      return this.compareObject(data, type, context)
    }

    return this.validate(data, type, context)
  }

  /**
   * Compare a type against an array
   * @param  {Mixed} data
   * @param  {Array} type
   * @param  {Array} context
   * @private
   */
  compareArray (data, type, context = []) {
    for (let index = 0; index < data.length; index++) {
      this.compare(data[index], type[0], context.concat(index))
    }
  }

  /**
   * Compare a type against an object
   * @param  {Mixed} data
   * @param  {Object} type
   * @param  {Array}  context
   * @private
   */
  compareObject (data, type, context = []) {
    for (let key in type) {
      this.compare(data[key], type[key], context.concat(key))
    }
  }

  /**
   * Validate the value with the validator function
   * @param  {Mixed} value
   * @param  {Function} validator
   * @param  {Array}  context
   * @private
   */
  validate (value, validator, context) {
    try {
      if (!validator(value)) throw new Error('value is invalid')
    } catch (err) {
      if (err instanceof Type) {
        return this.compare(value, transformType(err.type), context)
      }

      if (err instanceof Value) {
        return (this.mutated[context.join('.')] = err.value)
      }

      this.errors[context.join('.')] = err.message
    }
  }

  /**
   * Check if any data is marked as mutated and transform the data object with
   * the mutated data
   * I know its bad practice to mutate function arguments but i have to be
   * able to set default values or e.g mutate date strings to Date objects on
   * the fly.
   * @param {Mixed} data
   * @private
   */
  mutateData (data) {
    if (Object.keys(this.mutated).length === 0) {
      return
    }

    for (const key in this.mutated) {
      key.split('.').reduce((data, context, index, path) => {
        if (index < path.length - 1) {
          return (data[context])
        }

        return (data[context] = this.mutated[key])
      }, data)
    }
  }

  /**
   * Check if the validator has failed.
   * @return {Boolean}
   * @public
   */
  fails () {
    return Object.keys(this.errors).length > 0
  }
}

module.exports = Validator
