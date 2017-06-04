const compose = require('../compose')
const { Value } = require('../exceptions')
const { mutator, defaultValue, optional } = require('../rules')

/**
 * Boolean validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  ({ cast } = {}, value) => {
    if (cast) {
      value = value === 'true'
    }

    if (typeof value !== 'boolean' && value !== null && value !== undefined) {
      throw new Error(`isn't a boolean`)
    }

    if (cast) {
      throw new Value(value)
    }

    return true
  }
)
