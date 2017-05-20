const transformSchema = require('./transformSchema')

class Validator {
  /**
   * Create a new instance of the Validator
   * @param  {Object|Array} data
   * @param  {Object|Array} schema
   * @return {Validator}
   */
  constructor (data, schema) {
    this.setup(data, transformSchema(schema))
  }

  /**
   * Setup the validator loop
   * @param  {Mixed} data
   * @param  {Object|Array} schema
   * @private
   */
  setup (data, schema) {
    if (Array.isArray(schema)) {
      return this.compareArray(data, schema)
    }

    return this.compareObject(data, schema)
  }

  /**
   * Compare a schema against an array
   * @param  {Mixed} data
   * @param  {Object|Array} schema
   * @param  {Array}  context
   * @private
   */
  compareArray (data, schema, context = []) {
    data.forEach((item, index) =>
      this.compare(item, schema[0], context.concat(index))
    )
  }

  /**
   * Compare a schema against an object
   * @param  {Mixed} data
   * @param  {Object|Array} schema
   * @param  {Array}  context
   * @private
   */
  compareObject (data, schema, context = []) {
    for (let key in schema) {
      this.compare(data[key], schema[key], context.concat(key))
    }
  }

  /**
   * Compare data agains a rule
   * @param  {Mixed} data
   * @param  {Object|Array|Function} rule
   * @param  {Array}  context
   * @private
   */
  compare (data, rule, context = []) {
    if (Array.isArray(rule)) {
      return this.compareArray(data, rule, context)
    }

    if (typeof rule === 'object') {
      return this.compareObject(data, rule, context)
    }

    return this.validate(data, rule, context)
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
      if (!validator(value)) throw new Error('value was invalid')
    } catch (err) {
      console.log(context.join('.') + ':', err.message)
    }
  }
}

module.exports = Validator
