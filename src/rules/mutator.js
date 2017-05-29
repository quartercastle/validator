import Value from '../exceptions/Value'

/**
 * Mutate value of a field, it could be a date string which should be
 * transformed into a Date object
 * @param  {Object} properties
 * @param  {Mixed} value
 */
export default ({ mutator } = {}, value) => {
  if (mutator && typeof mutator === 'function') {
    throw new Value(mutator(value))
  }
}
