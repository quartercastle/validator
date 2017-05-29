import compose from '../compose'
import { mutator, defaultValue, optional } from '../rules'

/**
 * Symbol validator function
 * @param {Object} properties
 * @param {Mixed} value
 * @return {Function}
 */
export default compose(
  defaultValue,
  mutator,
  optional,
  (properties = {}, value) => {
    if (typeof value !== 'symbol' && value !== undefined && value !== null) {
      throw new Error(`isn't a symbol`)
    }

    return true
  }
)
