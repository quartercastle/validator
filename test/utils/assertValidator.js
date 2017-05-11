const { expect } = require('chai')
const types = require('./types')

/**
 * Assert that the validator handles types correctly
 * @param {String}   type the correct type
 * @param {Function} validator
 * @public
 */
module.exports = (type, validator) => {
  for (let key in types) {
    for (let value of types[key]) {
      let result = false

      try {
        result = validator(value)
      } catch (err) {
        result = false
      }

      if (key === type) {
        expect(result).to.be.true
      } else {
        expect(result).to.be.false
      }
    }
  }
}
