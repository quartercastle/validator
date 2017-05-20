/* eslint-env mocha */

const { expect } = require('chai')
const { boolean } = require('../../rules')
const types = require('../utils/types')
const acceptedTypes = ['undefined', 'null', 'boolean']

describe('Rule: boolean', () => {
  it('Should validate type', () => {
    const validator = boolean()
    for (const key in types) {
      if (acceptedTypes.includes(key)) {
        expect(validator(types[key])).to.be.true
        continue
      }

      expect(() => validator(types[key])).to.throw(`isn't a boolean`)
    }
  })

  it('Should be required', () => {
    const validator = boolean({ required: true })

    expect(validator(false)).to.be.true
    expect(() => validator(undefined)).to.throw('is required')
    expect(() => validator(null)).to.throw('is required')
  })
})
