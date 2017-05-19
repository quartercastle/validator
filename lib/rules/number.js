/**
 * Number validation rule
 * @param  {Object} properties
 * @return {Function}
 */
module.exports = ({ required, min, max } = {}) => value => {
  if (required && (value === undefined || value === null)) {
    throw new Error(`is required`)
  }

  if (isNaN(value) || typeof value !== 'number') {
    throw new Error(`wasn't a number`)
  }

  if (min && min > value) {
    throw new Error(`was below the minimum`)
  }

  if (max && max < value) {
    throw new Error(`was above the maximum`)
  }

  return true
}
