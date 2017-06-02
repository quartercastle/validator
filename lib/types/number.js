const compose = require('../compose')
const { mutator, defaultValue, optional } = require('../rules')

/**
 * Number validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  ({ min, max } = {}, value) => {
    if (
      (typeof value !== 'number' || isNaN(value)) &&
      value !== null &&
      value !== undefined
    ) {
      throw new Error(`isn't a number`)
    }

    if (min && min > value) {
      throw new Error(`is below the minimum`)
    }

    if (max && max < value) {
      throw new Error(`is above the maximum`)
    }

    return true
  }
)
