const findType = require('./findType')

/**
 * Transform types into validator functions
 * @param  {Object|Array|Function} type object ot validator function
 * @return {Object|Array}  The transformed type
 * @public
 */
function transformType (type) {
  if (Array.isArray(type)) {
    return parseArray(type)
  }

  if (typeof type === 'object') {
    return parseObject(type)
  }

  if (typeof type === 'function' && !type.prototype) {
    return type
  }

  return findType(type)
}

/**
 * Parse a type object
 * @param  {Object}    type
 * @return {Object}    transformed object type
 * @private
 */
function parseObject (type) {
  const transformed = {}

  for (let key in type) {
    transformed[key] = transformType(type[key])
  }

  return transformed
}

/**
 * Parse a type array
 * @param  {Array}   type
 * @return {Array}   Transformed array type
 */
function parseArray (type) {
  return [transformType(type[0])]
}

module.exports = transformType
