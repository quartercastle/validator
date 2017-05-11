/**
 * Array validation rule
 * @param  {Object} properties
 * @return {Function}
 */
module.exports = ({ required }) => value => {
  if (required && (value === undefined || value === null)) {
    throw new Error('is required')
  }

  if (!Array.isArray(value)) {
    throw new Error(`isn't an array`)
  }

  return true
}
