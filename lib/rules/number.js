/**
 * Number validation rule
 * @param  {Object} properties
 * @return {Function}
 */
module.exports = ({ required, min, max } = {}) => value => {
  if (required && (value === undefined || value === null)) {
    throw new Error(`is required`)
  }

  if (
    (typeof value !== 'number' || isNaN(value)) &&
    value !== null &&
    value !== undefined
  ) {
    throw new Error(`isn't a number`)
  }

  if (min && min > value) {
    throw new Error(`is below the minimum`)
  }

  if (max && max < value) {
    throw new Error(`is above the maximum`)
  }

  return true
}
