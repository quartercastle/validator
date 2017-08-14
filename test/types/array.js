/* eslint-env mocha */
const { expect } = require('chai')
const { array } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: array', () => {
  it('Should accept arrays', () => {
    const validator = array({ optional: true })

    for (const key in types) {
      if (['array', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw('should be an array')
      }
    }
  })

  it('Should be able to specify min length', () => {
    const validator = array({ min: 2 })
    expect(validator([1, 2])).to.be.equal(true)
    expect(validator([1, 2, 3])).to.be.equal(true)
    expect(() => validator([1])).to.be.throw(
      'array should have a length of minimum 2 items'
    )
  })

  it('Should be able to specify max length', () => {
    const validator = array({ max: 2 })
    expect(validator([1])).to.be.equal(true)
    expect(validator([1, 2])).to.be.equal(true)
    expect(() => validator([1, 2, 3])).to.be.throw(
      'array should have a length of maximum 2 items'
    )
  })

  it('Should accept a schema as second argument', () => {
    const schema = [{ field: 'rule' }]
    const validator = array([], schema)

    try {
      validator([])
    } catch (err) {
      expect(err.schema).to.be.deep.equal(schema)
    }
  })
})
