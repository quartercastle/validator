const defaultValidator = require('./defaultValidator')

/**
 * Transform schema rules into validator functions
 * @param  {Object|Array}  schema
 * @return {Object|Array}  The transformed schema
 * @public
 */
function transformSchema (schema) {
  if (Array.isArray(schema)) {
    return parseArray(schema)
  }

  return parseObject(schema)
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
    transformed[rule] = transformRule(schema[rule])
  }

  return transformed
}

/**
 * Parse a schema array
 * @param  {Array}   schema
 * @return {Array}   Transformed array schema
 */
function parseArray (schema) {
  return [transformRule(schema[0])]
}

/**
 * Transform the rule to a validator function
 * @param  {Mixed}     rule
 * @return {Function}  validator function
 * @private
 */
function transformRule (rule) {
  if (typeof rule === 'function' && !rule.prototype) {
    return rule
  }

  if (Array.isArray(rule)) {
    return parseArray(rule)
  }

  if (typeof rule === 'object') {
    return parseObject(rule)
  }

  return defaultValidator(rule)
}

module.exports = transformSchema
