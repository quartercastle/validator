const compose = require('../compose')
const Schema = require('../exceptions/Schema')
const { mutator, defaultValue, optional } = require('../rules')

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
      throw new Error(`isn't an array`)
    }

    if (min && min > value.length) {
      throw new Error('is below the minimum length')
    }

    if (max && max < value.length) {
      throw new Error('is above the maximum length')
    }

    if (schema && value !== null && value !== undefined) {
      throw new Schema(schema)
    }

    return true
  }
)
