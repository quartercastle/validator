/**
 * String validation rule
 * @param {Object} properties
 * @return {Function}
 */
module.exports = ({ required, min, max } = {}) => value => {
  if (required && (value === undefined || value === null || value === '')) {
    throw new Error('is required')
  }

  if (typeof value !== 'string' && value !== null && value !== undefined) {
    throw new Error(`isn't a string`)
  }

  if (min && value.length < min) {
    throw new Error(`is below the minimum length`)
  }

  if (max && value.length > max) {
    throw new Error(`is above the maximum length`)
  }

  return true
}
