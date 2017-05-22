const compose = require('../compose')
const { mutator, defaultValue, optional } = require('../properties')

/**
 * String validation rule
 * @param {Object} properties
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  ({ min, max } = {}, value) => {
    if (typeof value !== 'string' && value !== null && value !== undefined) {
      throw new Error(`isn't a string`)
    }

    if (min && value.length < min) {
      throw new Error(`is below the minimum length`)
    }

    if (max && value.length > max) {
      throw new Error(`is above the maximum length`)
    }

    return true
  }
)
