const compose = require('../compose')
const { optional, mutator, defaultValue } = require('../rules')
const transformType = require('../transformType')

/**
 * Mixed validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @param  {Object|Array} schema
 * @return {Function}
 */
module.exports = compose(
  defaultValue,
  mutator,
  optional,
  ({ allows = value => true } = {}, value) => {
    if (optional && (value === undefined || value === null)) {
      return true
    }

    if (!Array.isArray(allows)) {
      allows = [allows]
    }

    let valid = false
    for (const type of allows) {
      try {
        valid = transformType(type)(value)
      } catch (err) {}
    }

    return valid
  }
)
