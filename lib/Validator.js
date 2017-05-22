const transformSchema = require('./transformSchema.js')
const { Schema, Value } = require('./exceptions')

class Validator {
  /**
   * Create a new instance of the Validator
   * @param  {Mixed} data
   * @param  {Object|Array} schema
   * @return {Validator}
   */
  constructor (data, schema) {
    this.errors = {}
    this.mutated = {}
    this.compare(data, transformSchema(schema))
    this.mutateData(data)
  }

  /**
   * Compare data agains a schema
   * @param  {Mixed} data
   * @param  {Object|Array|Function} schema can be a validator function or a schema
   * @param  {Array}  context
   * @private
   */
  compare (data, schema, context = []) {
    if (Array.isArray(schema)) {
      return this.compareArray(data, schema, context)
    }

    if (typeof schema === 'object') {
      return this.compareObject(data, schema, context)
    }

    return this.validate(data, schema, context)
  }

  /**
   * Compare a schema against an array
   * @param  {Mixed} data
   * @param  {Array} schema
   * @param  {Array}  context
   * @private
   */
  compareArray (data, [ schema ], context = []) {
    for (let index = 0; index < data.length; index++) {
      this.compare(data[index], schema, context.concat(index))
    }
  }

  /**
   * Compare a schema against an object
   * @param  {Mixed} data
   * @param  {Object} schema
   * @param  {Array}  context
   * @private
   */
  compareObject (data, schema, context = []) {
    for (let key in schema) {
      this.compare(data[key], schema[key], context.concat(key))
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
      if (err instanceof Schema) {
        return this.compare(value, transformSchema(err.schema), context)
      }

      if (err instanceof Value) {
        return (this.mutated[context.join('.')] = err.value)
      }

      this.errors[context.join('.')] = err.message
    }
  }

  /**
   * Check if any data is marked as mutated and mutate the data with
   * the new values.
   * I now its bad practice to mutate function arguments but i have to be
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
      const path = key.split('.')

      path.reduce((data, context, index) => {
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
    if (Object.keys(this.errors).length > 0) {
      return true
    }

    return false
  }
}

module.exports = Validator
