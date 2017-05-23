const compose = require('../compose')
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
  (properties = {}, value) => {
    if (typeof value !== 'boolean' && value !== null && value !== undefined) {
      throw new Error(`isn't a boolean`)
    }

    return true
  }
)
