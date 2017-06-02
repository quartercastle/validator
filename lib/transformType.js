const types = require('./types')

/**
 * Transform types into validator function or an Object/Array of
 * validator functions
 * @param  {Object|Array|Function} type is an object/array schema or a validator function
 * @return {Object|Array}  The transformed type
 * @public
 */
function transformType (type) {
  if (Array.isArray(type)) {
    return transformArray(type)
  }

  if (typeof type === 'object') {
    return transformObject(type)
  }

  if (
    typeof type === 'function' &&
    (!type.prototype || type.name === '')
  ) {
    return type
  }

  return findType(type)
}

/**
 * Transform an object
 * @param  {Object}    type
 * @return {Object}    transformed object type
 * @private
 */
function transformObject (type) {
  const transformed = {}

  for (let key in type) {
    transformed[key] = transformType(type[key])
  }

  return transformed
}

/**
 * Transform an array
 * @param  {Array}   type
 * @return {Array}   Transformed array type
 */
function transformArray (type) {
  return [transformType(type[0])]
}

/**
 * Find validator fucntion for a type
 * @param  {Function} type
 * @return {Function}
 */
function findType (type) {
  let name = ''
  const defaultTypes = [
    'string',
    'number',
    'boolean',
    'symbol',
    'array',
    'object'
  ]

  try {
    name = type.prototype.constructor.name.toLowerCase()
  } catch (err) {}

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

module.exports = transformType
