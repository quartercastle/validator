/**
 * String rule
 * @param {Object} properties
 * @return {Boolean}
 */
module.exports = ({ required, min, max }) => value => {
  if (typeof value !== 'string') {
    throw new Error(`wasn't a string`)
  }

  if (required && value === '') {
    throw new Error(`is required`)
  }

  if (min && value.length < min) {
    throw new Error(`is below the minimum length`)
  }

  if (max && value.length > max) {
    throw new Error(`is above the maximum length`)
  }

  return true
}
