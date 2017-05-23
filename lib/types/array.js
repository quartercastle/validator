const compose = require('../compose')
const Type = require('../exceptions/Type')
const { mutator, defaultValue, optional } = require('../rules')

/**
 * Array validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @param  {Object|Array} type
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  ({ min, max } = {}, value, type) => {
    if (!Array.isArray(value) && value !== null && value !== undefined) {
      throw new Error(`isn't an array`)
    }

    if (min && min > value.length) {
      throw new Error('is below the minimum length')
    }

    if (max && max < value.length) {
      throw new Error('is above the maximum length')
    }

    if (type && value !== null && value !== undefined) {
      throw new Type(type)
    }

    return true
  }
)
