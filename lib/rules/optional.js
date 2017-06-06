const locale = require('../locale')

/**
 * Check if value is required with the optional property
 * @param  {Object} properties
 * @param  {Mixed} value
 */
module.exports = ({ optional } = {}, value) => {
  if (!optional && (value === undefined || value === null)) {
    throw new Error(locale().required)
  }
}
