/* eslint-env mocha */
const { expect } = require('chai')
const { object } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: object', () => {
  it('Should accept objects', () => {
    const validator = object({ optional: true })

    for (const key in types) {
      if (['object', 'date', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw('should be an object')
      }
    }
  })

  it('Should accept a schema as second argument', () => {
    const schema = { field: 'rule' }
    const validator = object({}, schema)

    try {
      validator({})
    } catch (err) {
      expect(err.schema).to.be.deep.equal(schema)
    }
  })
})
