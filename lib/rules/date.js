/**
 * Date validation rule
 * @param  {Object} properties
 * @return {Function}
 */
module.exports = () => value => {
  return value instanceof Date
}
