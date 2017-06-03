/* eslint-env mocha */
const { expect } = require('chai')
const { integer } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: integer', () => {
  it('Should accept integer', () => {
    const validator = integer({ optional: true })

    for (const key in types) {
      if (['integer', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw(`isn't an integer`)
      }
    }
  })
})
