const Value = require('../exceptions/Value')

/**
 * Mutate value of a field, it could be a date string which should be
 * transformed into a Date object
 * @param  {Object} properties
 * @param  {Mixed} value
 */
module.exports = ({ mutator } = {}, value) => {
  if (mutator && typeof mutator === 'function') {
    throw new Value(mutator(value))
  }
}
