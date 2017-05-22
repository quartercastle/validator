/* eslint-env mocha */

const { expect } = require('chai')
const { object } = require('../../rules')
const { Schema } = require('../../lib/exceptions')
const types = require('../utils/types')
const acceptedTypes = ['undefined', 'null', 'object']

describe('Rule: object', () => {
  it('Should validate type', () => {
    const validator = object()
    for (const key in types) {
      if (acceptedTypes.includes(key)) {
        expect(validator(types[key])).to.be.true // eslint-disable-line
        continue
      }

      expect(() => validator(types[key])).to.throw(`isn't an object`)
    }
  })

  it('Should be required', () => {
    const validator = object({ required: true })

    expect(validator({})).to.be.true // eslint-disable-line
    expect(() => validator(undefined)).to.throw('is required')
    expect(() => validator(null)).to.throw('is required')
  })

  it('Should accept a schema', () => {
    const validator = object({}, { name: String })
    expect(() => validator({ name: 'test' })).to.throw(Schema)
  })
})
