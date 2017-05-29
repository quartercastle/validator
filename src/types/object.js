import compose from '../compose'
import Schema from '../exceptions/Schema'
import { mutator, defaultValue, optional } from '../rules'

/**
 * Object validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @param  {Object|Array} schema
 * @return {Function}
 */
export default compose(
  defaultValue,
  mutator,
  optional,
  (properties = {}, value, schema) => {
    if (
      (typeof value !== 'object' || Array.isArray(value)) &&
      value !== null &&
      value !== undefined
    ) {
      throw new Error(`isn't an object`)
    }

    if (schema && value !== null && value !== undefined) {
      throw new Schema(schema)
    }

    return true
  }
)
