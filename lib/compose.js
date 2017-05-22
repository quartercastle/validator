/**
 * compose functions together
 * @param {Function} functions
 * @return {Function}
 */
module.exports = (...functions) => {
  return (properties, schema) => value => {
    let result

    for (let i = 0; i < functions.length; i++) {
      result = functions[i](properties, value, schema)
    }

    return result
  }
}
