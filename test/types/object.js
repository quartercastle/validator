/* eslint-env mocha */

const { expect } = require('chai')
const { object } = require('../../lib/types')
const Type = require('../../lib/exceptions/Type')
const types = require('../utils/types')

describe('Rule: object', () => {
  it('Should accept objects', () => {
    const validator = object({ optional: true })

    for (const key in types) {
      if (['object', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw(`isn't an object`)
      }
    }
  })

  it('Should accept a type as second argument', () => {
    const type = { field: 'rule' }
    const validator = object({}, type)
    expect(() => validator({})).to.throw(Type)

    try {
      validator({})
    } catch (err) {
      expect(err.type).to.be.deep.equal(type)
    }
  })
})
