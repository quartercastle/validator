const compose = require('../compose')
const { defaultValue, mutator, optional } = require('../rules')
const locale = require('../locale')

/**
 * Email validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @param  {Object|Array} schema
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  (properties, value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (
      (typeof value !== 'string' || !pattern.test(value)) &&
      value !== null &&
      value !== undefined
    ) {
      throw new Error(locale().email.type)
    }

    return true
  }
)
