const compose = require('../compose')
const Schema = require('../exceptions/Schema')
const { mutator, defaultValue, optional } = require('../rules')
const locale = require('../locale')

/**
 * Array validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @param  {Object|Array} schema
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  ({ min, max } = {}, value, schema) => {
    if (!Array.isArray(value) && value !== null && value !== undefined) {
      throw new Error(locale().array.type)
    }

    if (min && min > value.length) {
      throw new Error(locale().array.min.replace(':p', min))
    }

    if (max && max < value.length) {
      throw new Error(locale().array.max.replace(':p', max))
    }

    if (schema && value !== null && value !== undefined) {
      throw new Schema(schema)
    }

    return true
  }
)
