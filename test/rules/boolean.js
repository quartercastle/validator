/* eslint-env mocha */

const boolean = require('../../lib/rules/boolean')
const { expect } = require('chai')

const types = [
  'str',
  20,
  true,
  1,
  0,
  null,
  {},
  [],
  undefined,
  NaN
]

describe('Rules: boolean', () => {
  it('Should validate a boolean', () => {
    const rule = boolean()

    for (let type of types) {
      if (typeof type === 'boolean') {
        expect(rule.validate(type)).to.be.true
      } else {
        expect(rule.validate(type)).to.be.false
      }
    }
  })

  it('Should validate a boolean with required property', () => {
    const rule = boolean({ required: true })
    expect(rule.validate(true)).to.be.true
    expect(rule.validate(false)).to.be.false
    expect(rule.validate('')).to.be.false
    expect(rule.validate([])).to.be.false
    expect(rule.validate()).to.be.false
    expect(rule.validate(null)).to.be.false
    expect(rule.validate(undefined)).to.be.false
  })
})
