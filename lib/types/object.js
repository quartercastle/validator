const compose = require('../compose')
const Type = require('../exceptions/Type')
const { mutator, defaultValue, optional } = require('../rules')

/**
 * Object validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @param  {Object|Array} type
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  (properties = {}, value, type) => {
    if (
      (typeof value !== 'object' || Array.isArray(value)) &&
      value !== null &&
      value !== undefined
    ) {
      throw new Error(`isn't an object`)
    }

    if (type && value !== null && value !== undefined) {
      throw new Type(type)
    }

    return true
  }
)
