/* eslint-env mocha */

const { expect } = require('chai')
const { string } = require('../../rules')
const types = require('../utils/types')
const acceptedTypes = ['undefined', 'null', 'string']

describe('Rule: string', () => {
  it('Should validate type', () => {
    const validator = string()
    for (const key in types) {
      if (acceptedTypes.includes(key)) {
        expect(validator(types[key])).to.be.true
        continue
      }

      expect(() => validator(types[key])).to.throw(`isn't a string`)
    }
  })

  it('Should be required', () => {
    const validator = string({ required: true })

    expect(validator('string')).to.be.true
    expect(() => validator('')).to.throw('is required')
    expect(() => validator(undefined)).to.throw('is required')
    expect(() => validator(null)).to.throw('is required')
  })

  it('Should above minimum length', () => {
    const validator = string({ min: 2 })

    expect(validator('st')).to.be.true
    expect(validator('str')).to.be.true
    expect(() => validator('')).to.throw('is below the minimum length')
  })

  it('Should below maximum length', () => {
    const validator = string({ max: 3 })

    expect(validator('str')).to.be.true
    expect(validator('st')).to.be.true
    expect(() => validator('string')).to.throw('is above the maximum length')
  })
})
