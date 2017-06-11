/* eslint-env mocha */
const { expect } = require('chai')
const { date } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: date', () => {
  it('Should accept a date object', () => {
    const validator = date({ optional: true })

    for (const key in types) {
      if (['date', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw('should be a date object')
      }
    }
  })

  it('Should be able to specify a min date', () => {
    const validator = date({ min: new Date(2017, 5, 1) })
    expect(() => validator(new Date(2017, 4, 1))).to.throw(
      'should be above the minimum date'
    )
  })

  it(`Should tell if the min property isn't a date object`, () => {
    const validator = date({ min: 'test' })
    expect(() => validator(new Date(2017, 4, 1))).to.throw(
      'min property should be a date object'
    )
  })

  it('Should be able to specify a max date', () => {
    const validator = date({ max: new Date(2017, 5, 1) })
    expect(() => validator(new Date(2017, 6, 1))).to.throw(
      'should be below the maximum date'
    )
  })

  it(`Should tell if the max property isn't a date object`, () => {
    const validator = date({ max: 'test' })
    expect(() => validator(new Date(2017, 4, 1))).to.throw(
      'max property should be a date object'
    )
  })
})
