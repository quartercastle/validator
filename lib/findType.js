const types = require('./types')
const defaultTypes = [
  'string',
  'number',
  'boolean',
  'symbol',
  'array',
  'object'
]

/**
 * Find the correct validator function as the default type
 * @param  {Mixed} type
 * @return {Function} validator function
 */
module.exports = type => {
  let name

  try {
    name = type.prototype.constructor.name.toLowerCase()
  } catch (err) {
    name = ''
  }

  if (defaultTypes.includes(name)) {
    return types[name]()
  }

  return value => {
    if (!(value instanceof type)) {
      throw new Error(`is not instance of ${type.prototype.constructor.name}`)
    }

    return true
  }
}
