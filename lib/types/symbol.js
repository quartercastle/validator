const compose = require('../compose')
const { mutator, defaultValue, optional } = require('../rules')
const locale = require('../locale')

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
      throw new Error(locale().symbol.type)
    }

    return true
  }
)
