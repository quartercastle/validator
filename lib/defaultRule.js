const rules = require('./rules')
const types = ['string', 'number', 'boolean', 'symbol', 'array', 'object']

/**
 * Find the correct validator function as the default rule
 * @param  {Mixed} rule
 * @return {Function} validator function
 */
module.exports = rule => {
  let type
  try {
    type = rule.prototype.constructor.name.toLowerCase()
  } catch (err) {
    type = ''
  }

  if (types.includes(type)) {
    return rules[type]()
  }

  return value => {
    if (!(value instanceof rule)) {
      throw new Error(`is not instance of ${rule.prototype.constructor.name}`)
    }

    return true
  }
}
