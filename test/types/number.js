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
        expect(() => validator(types[key])).to.throw('should be a number')
      }
    }
  })

  it('Should try to cast a value to a number', () => {
    const validator = number({ cast: true })
    expect(() => validator('test')).to.throw('should be a number')
    try {
      validator('1.1')
    } catch ({ value }) {
      expect(value).to.be.equal(1.1)
    }
  })

  it('Should be able to specify min', () => {
    const validator = number({ min: 2 })
    expect(validator(2)).to.be.equal(true)
    expect(validator(3)).to.be.equal(true)
    expect(() => validator(1)).to.be.throw(
      'number should be more than or equal to 2'
    )
  })

  it('Should be able to specify max', () => {
    const validator = number({ max: 2 })
    expect(validator(1)).to.be.equal(true)
    expect(validator(2)).to.be.equal(true)
    expect(() => validator(3)).to.be.throw(
      'number should be less than or equal to 2'
    )
  })

  it('Should require number to a a specific precision', () => {
    const validator = number({ precision: 2 })
    expect(validator(2.11)).to.be.equal(true)
    expect(() => validator(12.111)).to.throw(
      'number should have a precision of 2 decimals'
    )
  })
})
