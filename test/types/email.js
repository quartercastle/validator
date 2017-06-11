/* eslint-env mocha */
const { expect } = require('chai')
const { email } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: email', () => {
  it('Should accept strings matching email regex pattern', () => {
    const validator = email({ optional: true })

    for (const key in types) {
      if (['email', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw('should be a valid email')
      }
    }
  })
})
