/**
 * Validate a string
 * @param  {Mixed} value
 * @return {Boolean}
 */
function validateString (value) {
  return typeof value === 'string'
}

/**
 * Validate a number
 * @param  {Mixed} value
 * @return {Boolean}
 */
function validateNumber (value) {
  if (isNaN(value)) {
    return false
  }

  return typeof value === 'number'
}

/**
 * Validate a boolean
 * @param  {Mixed} value
 * @return {Boolean}
 */
function validateBoolean (value) {
  return typeof value === 'boolean'
}

/**
 * Validate a symbol
 * @param  {Mixed} value
 * @return {Boolean}
 */
function validateSymbol (value) {
  return typeof value === 'symbol'
}

/**
 * validate an array
 * @param  {Mixed} value
 * @return {Boolean}
 */
function validateArray (value) {
  if (!Array.isArray(value)) {
    return false
  }

  return true
}

/**
 * Validate an Object
 * @param  {Mixed} value
 * @return {Boolean}
 */
function validateObject (value) {
  if (Array.isArray(value) || value === undefined || value === null) {
    return false
  }

  return typeof value === 'object'
}

/**
 * Creates the default validator fucntion
 * @param  {Mixed} rule
 * @return {Function} validator function
 */
module.exports = rule => value => {
  const type = rule.prototype.constructor.name.toLowerCase()

  if (type === 'string') {
    return validateString(value)
  }

  if (type === 'number') {
    return validateNumber(value)
  }

  if (type === 'boolean') {
    return validateBoolean(value)
  }

  if (type === 'symbol') {
    return validateSymbol(value)
  }

  if (type === 'array') {
    return validateArray(value)
  }

  if (type === 'object') {
    return validateObject(value)
  }

  return value instanceof rule
}
