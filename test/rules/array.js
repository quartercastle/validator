/* eslint-env mocha */

const { expect } = require('chai')
const { array } = require('../../lib/rules')
const Schema = require('../../lib/exceptions/Schema')
const types = require('../utils/types')

describe('Rule: array', () => {
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

  it('Should accept a schema as second argument', () => {
    const schema = [{ field: 'rule' }]
    const validator = array([], schema)
    expect(() => validator([])).to.throw(Schema)

    try {
      validator([])
    } catch (err) {
      expect(err.schema).to.be.deep.equal(schema)
    }
  })
})
