import Value from '../exceptions/Value'

/**
 * Throw default value if it's composed in the validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 */
export default ({ defaultValue } = {}, value) => {
  if (defaultValue && (value === null || value === undefined)) {
    throw new Value(defaultValue)
  }
}
