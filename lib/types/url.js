const compose = require('../compose')
const { defaultValue, mutator, optional } = require('../rules')

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
      throw new Error(`isn't a valid url`)
    }

    if (protocol && value.indexOf('://') === -1) {
      throw new Error('url protocol is required')
    }

    if (secure && value.indexOf('https://') === -1) {
      throw new Error('only secure urls are accepted')
    }

    return true
  }
)
