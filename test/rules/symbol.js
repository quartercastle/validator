/* eslint-env mocha */

const { expect } = require('chai')
const { symbol } = require('../../rules')
const types = require('../utils/types')
const acceptedTypes = ['undefined', 'null', 'symbol']

describe('Rule: symbol', () => {
  it('Should validate type', () => {
    const validator = symbol()
    for (const key in types) {
      if (acceptedTypes.includes(key)) {
        expect(validator(types[key])).to.be.true
        continue
      }

      expect(() => validator(types[key])).to.throw(`isn't a symbol`)
    }
  })

  it('Should be required', () => {
    const validator = symbol({ required: true })

    expect(validator(Symbol('test'))).to.be.true
    expect(() => validator(undefined)).to.throw('is required')
    expect(() => validator(null)).to.throw('is required')
  })
})
