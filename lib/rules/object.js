const { Schema } = require('../errors')

/**
 * Object validation rule
 * @param  {Object} properties
 * @param  {Object|Array} schema
 * @return {Function}
 */
module.exports = ({ required } = {}, schema) => value => {
  if (required && (value === undefined || value === null)) {
    throw new Error('is required')
  }

  if (
    (typeof value !== 'object' || Array.isArray(value)) &&
    value !== null &&
    value !== undefined
  ) {
    throw new Error(`isn't an object`)
  }

  if (schema && value !== null && value !== undefined) {
    throw new Schema(schema)
  }

  return true
}
