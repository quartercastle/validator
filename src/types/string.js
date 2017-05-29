import compose from '../compose'
import { mutator, defaultValue, optional } from '../rules'

/**
 * String validator function
 * @param {Object} properties
 * @param {Mixed} value
 * @return {Function}
 */
export default compose(
  defaultValue,
  mutator,
  optional,
  ({ min, max } = {}, value) => {
    if (typeof value !== 'string' && value !== null && value !== undefined) {
      throw new Error(`isn't a string`)
    }

    if (min && value.length < min) {
      throw new Error(`is below the minimum length`)
    }

    if (max && value.length > max) {
      throw new Error(`is above the maximum length`)
    }

    return true
  }
)
