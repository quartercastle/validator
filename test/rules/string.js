/* eslint-env mocha */

const { expect } = require('chai')
const { string } = require('../../rules')
const { Value } = require('../../lib/exceptions')
const types = require('../utils/types')
const acceptedTypes = ['undefined', 'null', 'string']

describe('Rule: string', () => {
  it('Should validate type', () => {
    const validator = string()
    for (const key in types) {
      if (acceptedTypes.includes(key)) {
        expect(validator(types[key])).to.be.true // eslint-disable-line
        continue
      }

      expect(() => validator(types[key])).to.throw(`isn't a string`)
    }
  })

  it('Should be required', () => {
    const validator = string({ required: true })

    expect(validator('string')).to.be.true // eslint-disable-line
    expect(() => validator('')).to.throw('is required')
    expect(() => validator(undefined)).to.throw('is required')
    expect(() => validator(null)).to.throw('is required')
  })

  it('Should set a default value', () => {
    const validator = string({ defaultValue: 'testing' })

    try {
      validator()
    } catch (err) {
      expect(err.value).to.be.equal('testing')
    }

    expect(validator('should work')).to.be.true // eslint-disable-line
    expect(() => validator('')).to.throw(Value)
    expect(() => validator(undefined)).to.throw(Value)
    expect(() => validator(null)).to.throw(Value)
  })

  it('Should above minimum length', () => {
    const validator = string({ min: 2 })

    expect(validator('st')).to.be.true // eslint-disable-line
    expect(validator('str')).to.be.true // eslint-disable-line
    expect(() => validator('')).to.throw('is below the minimum length')
  })

  it('Should below maximum length', () => {
    const validator = string({ max: 3 })

    expect(validator('str')).to.be.true // eslint-disable-line
    expect(validator('st')).to.be.true // eslint-disable-line
    expect(() => validator('string')).to.throw('is above the maximum length')
  })
})
