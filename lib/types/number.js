const compose = require('../compose')
const { Value } = require('../exceptions')
const { mutator, defaultValue, optional } = require('../rules')
const locale = require('../locale')

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
  ({ cast, min, max, precision } = {}, value) => {
    if (cast) {
      value = Number(value)
    }

    if (
      (typeof value !== 'number' || isNaN(value)) &&
      value !== null &&
      value !== undefined
    ) {
      throw new Error(locale().number.type)
    }

    if (min && min > value) {
      throw new Error(locale().number.min.replace(':p', min))
    }

    if (max && max < value) {
      throw new Error(locale().number.max.replace(':p', max))
    }

    if (precision && String(value) !== value.toFixed(precision)) {
      throw new Error(locale().number.precision.replace(':p', precision))
    }

    if (cast) {
      throw new Value(value)
    }

    return true
  }
)
