/**
 * Array validation rule
 * @param  {Object} properties
 * @return {Function}
 */
module.exports = ({ required, min, max } = {}) => value => {
  if (required && (value === undefined || value === null)) {
    throw new Error('is required')
  }

  if (!Array.isArray(value)) {
    throw new Error(`isn't an array`)
  }

  if (min && min > value.length) {
    throw new Error('was below the minimum requirement')
  }

  if (max && max < value.length) {
    throw new Error('was above the maximum requirement')
  }

  return true
}
