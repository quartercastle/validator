const compose = require('../compose')
const { mutator, defaultValue, optional } = require('../properties')

/**
 * Boolean validation rule
 * @param  {Object} properties
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
