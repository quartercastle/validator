/* eslint-env mocha */

const object = require('../../lib/rules/object')
const { expect } = require('chai')

const types = [
  'str',
  20,
  true,
  null,
  {},
  [],
  undefined,
  NaN
]

describe('Rules: object', () => {
  it('Should validate a object', () => {
    const rule = object()

    for (let type of types) {
      if (typeof type === 'object' && type !== null && !Array.isArray(type)) {
        expect(rule.validate(type)).to.be.true
      } else {
        expect(rule.validate(type)).to.be.false
      }
    }
  })

  it('Should validate a object with required property', () => {
    const rule = object({ required: true })
    expect(rule.validate({ key: 'value' })).to.be.true
    expect(rule.validate({})).to.be.true
    expect(rule.validate('')).to.be.false
    expect(rule.validate([])).to.be.false
    expect(rule.validate()).to.be.false
    expect(rule.validate(true)).to.be.false
    expect(rule.validate(null)).to.be.false
    expect(rule.validate(undefined)).to.be.false
  })
})
