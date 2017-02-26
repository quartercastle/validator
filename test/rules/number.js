/* eslint-env mocha */

const number = require('../../lib/rules/number')
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

describe('Rules: number', () => {
  it('Should validate a number', () => {
    const rule = number()

    for (let type of types) {
      if (typeof type === 'number') {
        expect(rule.validate(type)).to.be.true
      } else {
        expect(rule.validate(type)).to.be.false
      }
    }
  })

  it('Should validate a number with min property', () => {
    const rule = number({ min: 5 })
    expect(rule.validate(5)).to.be.true
    expect(rule.validate(6)).to.be.true
    expect(rule.validate(3)).to.be.false
  })

  it('Should validate a number with max property', () => {
    const rule = number({ max: 5 })
    expect(rule.validate(5)).to.be.true
    expect(rule.validate(3)).to.be.true
    expect(rule.validate(7)).to.be.false
  })

  it('Should validate a number with required property', () => {
    const rule = number({ required: true })
    expect(rule.validate(325)).to.be.true
    expect(rule.validate(0)).to.be.true
    expect(rule.validate('')).to.be.false
    expect(rule.validate()).to.be.false
    expect(rule.validate(true)).to.be.false
    expect(rule.validate(null)).to.be.false
    expect(rule.validate(undefined)).to.be.false
  })
})
