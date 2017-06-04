/* eslint-env mocha */
const { expect } = require('chai')
const { number } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: number', () => {
  it('Should accept numbers', () => {
    const validator = number({ optional: true })

    for (const key in types) {
      if (['number', 'integer', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw(`isn't a number`)
      }
    }
  })

  it('Should be able to specify min', () => {
    const validator = number({ min: 2 })
    expect(validator(2)).to.be.equal(true)
    expect(validator(3)).to.be.equal(true)
    expect(() => validator(1)).to.be.throw('is below the minimum')
  })

  it('Should be able to specify max', () => {
    const validator = number({ max: 2 })
    expect(validator(1)).to.be.equal(true)
    expect(validator(2)).to.be.equal(true)
    expect(() => validator(3)).to.be.throw('is above the maximum')
  })

  it('Should require number to a a specific precision', () => {
    const validator = number({ precision: 2 })
    expect(validator(2.11)).to.be.equal(true)
    expect(() => validator(12.111)).to.throw(
      `number isn't the correct precision`
    )
  })
})
