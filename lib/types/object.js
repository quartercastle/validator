const compose = require('../compose')
const Schema = require('../exceptions/Schema')
const { mutator, defaultValue, optional } = require('../rules')

/**
 * Object validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @param  {Object|Array} schema
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  (properties = {}, value, schema) => {
    if (
      (typeof value !== 'object' || Array.isArray(value)) &&
      value !== null &&
      value !== undefined
    ) {
      throw new Error(`isn't an object`)
    }

    if (schema && value !== null && value !== undefined) {
      throw new Schema(schema)
    }

    return true
  }
)
