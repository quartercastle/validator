/* eslint-env mocha */
const { expect } = require('chai')
const { symbol } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: symbol', () => {
  it('Should accept symbols', () => {
    const validator = symbol({ optional: true })

    for (const key in types) {
      if (['symbol', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw(`isn't a symbol`)
      }
    }
  })
})
