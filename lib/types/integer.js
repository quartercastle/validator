const compose = require('../compose')
const number = require('./number')

/**
 * Url validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @param  {Object|Array} schema
 * @return {Function}
 */
module.exports = compose(
  (properties, value) => {
    if (
      (
        typeof value !== 'number' ||
        isNaN(value) ||
        value !== parseInt(value, 10)
      ) &&
      value !== null &&
      value !== undefined
    ) {
      throw new Error(`isn't an integer`)
    }

    number(properties)(value)

    return true
  }
)
