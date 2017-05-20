const defaultRule = require('./defaultRule')

/**
 * Transform schema rules into validator functions
 * @param  {Object|Array|Function} schema object ot validator function
 * @return {Object|Array}  The transformed schema
 * @public
 */
function transformSchema (schema) {
  if (Array.isArray(schema)) {
    return parseArray(schema)
  }

  if (typeof schema === 'object') {
    return parseObject(schema)
  }

  if (typeof schema === 'function' && !schema.prototype) {
    return schema
  }

  return defaultRule(schema)
}

/**
 * Parse a schema object
 * @param  {Object}    schema
 * @return {Object}    transformed object schema
 * @private
 */
function parseObject (schema) {
  const transformed = {}

  for (let rule in schema) {
    transformed[rule] = transformSchema(schema[rule])
  }

  return transformed
}

/**
 * Parse a schema array
 * @param  {Array}   schema
 * @return {Array}   Transformed array schema
 */
function parseArray (schema) {
  return [transformSchema(schema[0])]
}

module.exports = transformSchema
