const compose = require('../compose')
const { mutator, defaultValue, optional } = require('../rules')

/**
 * Symbol validator function
 * @param {Object} properties
 * @param {Mixed} value
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
