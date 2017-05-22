const { string, number, boolean, symbol, array, object } = require('./rules')

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

  if (type === 'string') {
    return string()
  }

  if (type === 'number') {
    return number()
  }

  if (type === 'boolean') {
    return boolean()
  }

  if (type === 'symbol') {
    return symbol()
  }

  if (type === 'array') {
    return array()
  }

  if (type === 'object') {
    return object()
  }

  return value => {
    if (!(value instanceof rule)) {
      throw new Error(`is not instance of ${rule.prototype.constructor.name}`)
    }

    return true
  }
}
