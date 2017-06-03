/* eslint-env mocha */
const { expect } = require('chai')
const { mixed } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: mixed', () => {
  it('Should accept all types', () => {
    const validator = mixed({ optional: true })
    for (const type in types) {
      expect(validator(types[type])).to.be.equal(true)
    }
  })

  it('Should be able to set one allowed type', () => {
    const validator = mixed({ optional: true, allows: String })
    const accepts = ['string', 'email', 'url', 'undefined', 'null']
    for (const type in types) {
      if (accepts.includes(type)) {
        expect(validator(types[type])).to.be.equal(true)
      } else {
        expect(validator(types[type])).to.be.equal(false)
      }
    }
  })

  it('Should be able to set multiple allowed types', () => {
    const validator = mixed({ optional: true, allows: [String, Number] })
    const accepts = ['string', 'email', 'url', 'number', 'undefined', 'null']
    for (const type in types) {
      if (accepts.includes(type)) {
        expect(validator(types[type])).to.be.equal(true)
      } else {
        expect(validator(types[type])).to.be.equal(false)
      }
    }
  })
})
