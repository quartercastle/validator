const compose = require('../compose')
const { defaultValue, mutator, optional } = require('../rules')
const locale = require('../locale')

/**
 * Url validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @param  {Object|Array} schema
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  ({ protocol, secure } = {}, value) => {
    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/

    if (
      (typeof value !== 'string' || !pattern.test(value)) &&
      value !== null &&
      value !== undefined
    ) {
      throw new Error(locale().url.type)
    }

    if (protocol && value.indexOf('://') === -1) {
      throw new Error(locale().url.protocol)
    }

    if (secure && value.indexOf('https://') === -1) {
      throw new Error(locale().url.secure)
    }

    return true
  }
)
