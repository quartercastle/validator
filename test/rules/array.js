/* eslint-env mocha */

const { expect } = require('chai')
const { array } = require('../../rules')
const { Schema } = require('../../lib/exceptions')
const types = require('../utils/types')
const acceptedTypes = ['undefined', 'null', 'array']

describe('Rule: array', () => {
  it('Should validate a type', () => {
    const validator = array()
    for (const key in types) {
      if (acceptedTypes.includes(key)) {
        expect(validator(types[key])).to.be.true // eslint-disable-line
        continue
      }

      expect(() => validator(types[key])).to.throw(`isn't an array`)
    }
  })

  it('Should be required', () => {
    const validator = array({ required: true })

    expect(validator([])).to.be.true // eslint-disable-line
    expect(() => validator(undefined)).to.throw('is required')
    expect(() => validator(null)).to.throw('is required')
  })

  it('Should above minimum length', () => {
    const validator = array({ min: 2 })

    expect(validator([1, 2])).to.be.true // eslint-disable-line
    expect(validator([1, 2, 3])).to.be.true // eslint-disable-line
    expect(() => validator([1])).to.throw('is below the minimum')
  })

  it('Should below maximum length', () => {
    const validator = array({ max: 3 })

    expect(validator([1, 2])).to.be.true // eslint-disable-line
    expect(validator([1, 2, 3])).to.be.true // eslint-disable-line
    expect(() => validator([1, 2, 3, 4])).to.throw('is above the maximum')
  })

  it('Should accept a schema', () => {
    const validator = array({}, [String])
    expect(() => validator(['test'])).to.throw(Schema)
  })
})
