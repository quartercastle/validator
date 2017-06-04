const compose = require('../compose')
const { Value } = require('../exceptions')
const { mutator, defaultValue, optional } = require('../rules')

/**
 * String validator function
 * @param {Object} properties
 * @param {Mixed} value
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  ({ cast, min, max, lowercase, uppercase, truncate, match } = {}, value) => {
    if (cast) {
      value = String(value)
    }

    if (typeof value !== 'string' && value !== null && value !== undefined) {
      throw new Error(`isn't a string`)
    }

    if (lowercase && value !== value.toLowerCase()) {
      throw new Error(`string isn't lowercased`)
    }

    if (uppercase && value !== value.toUpperCase()) {
      throw new Error(`string isn't uppercased`)
    }

    if (min && value.length < min) {
      throw new Error(`is below the minimum length`)
    }

    if (max && value.length > max) {
      if (truncate) {
        throw new Value(value.substr(0, max))
      } else {
        throw new Error(`is above the maximum length`)
      }
    }

    if (match && !match.test(value)) {
      throw new Error(`didn't match the regex pattern`)
    }

    if (cast) {
      throw new Value(value)
    }

    return true
  }
)
