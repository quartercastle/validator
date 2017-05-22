const Value = require('../exceptions/Value')

/**
 * Throw default value if it's specified in the properties
 * @param  {Object} properties
 * @param  {Mixed} value
 */
module.exports = ({ defaultValue } = {}, value) => {
  if (defaultValue && (value === null || value === undefined)) {
    throw new Value(defaultValue)
  }
}
