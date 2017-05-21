/* eslint-env mocha */

const { expect } = require('chai')
const { number } = require('../../rules')
const types = require('../utils/types')
const acceptedTypes = ['undefined', 'null', 'number']

describe('Rule: number', () => {
  it('Should validate type', () => {
    const validator = number()
    for (const key in types) {
      if (acceptedTypes.includes(key)) {
        expect(validator(types[key])).to.be.true // eslint-disable-line
        continue
      }

      expect(() => validator(types[key])).to.throw(`isn't a number`)
    }
  })

  it('Should be required', () => {
    const validator = number({ required: true })

    expect(validator(436)).to.be.true // eslint-disable-line
    expect(() => validator(undefined)).to.throw('is required')
    expect(() => validator(null)).to.throw('is required')
  })

  it('Should above minimum length', () => {
    const validator = number({ min: 2 })

    expect(validator(2)).to.be.true // eslint-disable-line
    expect(validator(3)).to.be.true // eslint-disable-line
    expect(() => validator(1)).to.throw('is below the minimum')
  })

  it('Should below maximum length', () => {
    const validator = number({ max: 3 })

    expect(validator(2)).to.be.true // eslint-disable-line
    expect(validator(3)).to.be.true // eslint-disable-line
    expect(() => validator(4)).to.throw('is above the maximum')
  })
})
