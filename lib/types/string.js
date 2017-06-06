const compose = require('../compose')
const { Value } = require('../exceptions')
const { mutator, defaultValue, optional } = require('../rules')
const locale = require('../locale')

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
      throw new Error(locale().string.type)
    }

    if (lowercase && value !== value.toLowerCase()) {
      throw new Error(locale().string.lowercase)
    }

    if (uppercase && value !== value.toUpperCase()) {
      throw new Error(locale().string.uppercase)
    }

    if (min && value.length < min) {
      throw new Error(locale().string.min.replace(':p', min))
    }

    if (max && value.length > max) {
      if (truncate) {
        throw new Value(value.substr(0, max))
      } else {
        throw new Error(locale().string.max.replace(':p', max))
      }
    }

    if (match && !match.test(value)) {
      throw new Error(locale().string.match)
    }

    if (cast) {
      throw new Value(value)
    }

    return true
  }
)
