/* eslint-env mocha */
const { expect } = require('chai')
const { string } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: string', () => {
  it('Should accept strings', () => {
    const validator = string({ optional: true })

    for (const key in types) {
      if (['string', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw(`isn't a string`)
      }
    }
  })

  it('Should be able to specify min length', () => {
    const validator = string({ min: 2 })
    expect(validator('12')).to.be.equal(true)
    expect(validator('123')).to.be.equal(true)
    expect(() => validator('1')).to.be.throw('is below the minimum length')
  })

  it('Should be able to specify max length', () => {
    const validator = string({ max: 2 })
    expect(validator('1')).to.be.equal(true)
    expect(validator('12')).to.be.equal(true)
    expect(() => validator('123')).to.be.throw('is above the maximum length')
  })
})
