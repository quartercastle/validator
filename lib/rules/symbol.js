/**
 * Symbol validation rule
 * @param {Object} properties
 * @return {Function}
 */
module.exports = ({ required } = {}) => value => {
  if (required && (value === undefined || value === null)) {
    throw new Error('is required')
  }

  if (typeof value !== 'symbol' && value !== undefined && value !== null) {
    throw new Error(`isn't a symbol`)
  }

  return true
}
