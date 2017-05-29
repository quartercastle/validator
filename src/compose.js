/**
 * compose type function together of rule functions
 * @param {Function} functions
 * @return {Function}
 */
export default (...functions) => {
  return (properties, type) => value => {
    let result

    for (let i = 0; i < functions.length; i++) {
      result = functions[i](properties, value, type)
    }

    return result
  }
}
