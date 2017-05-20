const { Schema } = require('../errors')

/**
 * Array validation rule
 * @param  {Object} properties
 * @return {Function}
 */
module.exports = ({ required, min, max } = {}, schema) => value => {
  if (required && (value === undefined || value === null)) {
    throw new Error('is required')
  }

  if (!Array.isArray(value) && value !== null && value !== undefined) {
    throw new Error(`isn't an array`)
  }

  if (min && min > value.length) {
    throw new Error('is below the minimum length')
  }

  if (max && max < value.length) {
    throw new Error('is above the maximum length')
  }

  if (schema && value !== null && value !== undefined) {
    throw new Schema(schema)
  }

  return true
}
