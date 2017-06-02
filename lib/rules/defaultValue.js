const Value = require('../exceptions/Value')

/**
 * Throw default value if it's composed in the validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 */
module.exports = ({ defaultValue } = {}, value) => {
  if (defaultValue && (value === null || value === undefined)) {
    throw new Value(defaultValue)
  }
}
