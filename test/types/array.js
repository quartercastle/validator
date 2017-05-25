/* eslint-env mocha */

const { expect } = require('chai')
const { array } = require('../../lib/types')
const Type = require('../../lib/exceptions/Type')
const types = require('../utils/types')

describe('Type: array', () => {
  it('Should accept arrays', () => {
    const validator = array({ optional: true })

    for (const key in types) {
      if (['array', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw(`isn't an array`)
      }
    }
  })

  it('Should be able to specify min length', () => {
    const validator = array({ min: 2 })
    expect(validator([1, 2])).to.be.equal(true)
    expect(validator([1, 2, 3])).to.be.equal(true)
    expect(() => validator([1])).to.be.throw('is below the minimum length')
  })

  it('Should be able to specify max length', () => {
    const validator = array({ max: 2 })
    expect(validator([1])).to.be.equal(true)
    expect(validator([1, 2])).to.be.equal(true)
    expect(() => validator([1, 2, 3])).to.be.throw('is above the maximum length')
  })

  it('Should accept a type as second argument', () => {
    const type = [{ field: 'rule' }]
    const validator = array([], type)
    expect(() => validator([])).to.throw(Type)

    try {
      validator([])
    } catch (err) {
      expect(err.type).to.be.deep.equal(type)
    }
  })
})
