/* eslint-env mocha */

const { expect } = require('chai')
const { object } = require('../../lib/rules')
const Schema = require('../../lib/exceptions/Schema')
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

  it('Should accept a schema as second argument', () => {
    const schema = { field: 'rule' }
    const validator = object({}, schema)
    expect(() => validator({})).to.throw(Schema)

    try {
      validator({})
    } catch (err) {
      expect(err.schema).to.be.deep.equal(schema)
    }
  })
})
