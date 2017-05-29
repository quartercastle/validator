import compose from '../compose'
import { mutator, defaultValue, optional } from '../rules'

/**
 * Boolean validator function
 * @param  {Object} properties
 * @param  {Mixed} value
 * @return {Function}
 */
export default compose(
  defaultValue,
  mutator,
  optional,
  (properties = {}, value) => {
    if (typeof value !== 'boolean' && value !== null && value !== undefined) {
      throw new Error(`isn't a boolean`)
    }

    return true
  }
)
