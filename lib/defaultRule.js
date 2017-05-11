const { string, number, boolean, symbol, array, object } = require('./rules')

/**
 * Find the correct validator function from the default rule
 * @param  {Mixed} rule
 * @return {Function} validator function
 */
module.exports = rule => {
  const type = rule.prototype.constructor.name.toLowerCase()

  if (type === 'string') {
    return string({ required: true })
  }

  if (type === 'number') {
    return number({ required: true })
  }

  if (type === 'boolean') {
    return boolean({ required: true })
  }

  if (type === 'symbol') {
    return symbol({ required: true })
  }

  if (type === 'array') {
    return array({ required: true })
  }

  if (type === 'object') {
    return object({ required: true })
  }

  return value => {
    if (!(value instanceof rule)) {
      throw new Error(`is not instanceof ${rule.prototype.constructor.name}`)
    }

    return true
  }
}
