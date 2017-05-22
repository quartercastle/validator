const compose = require('../compose')
const { mutator, defaultValue, optional } = require('../properties')

/**
 * Symbol validation rule
 * @param {Object} properties
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  (properties = {}, value) => {
    if (typeof value !== 'symbol' && value !== undefined && value !== null) {
      throw new Error(`isn't a symbol`)
    }

    return true
  }
)
