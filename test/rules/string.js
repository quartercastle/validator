/* eslint-env mocha */

const string = require('../../lib/rules/string')
const { expect } = require('chai')

const types = [
  'str',
  0,
  true,
  null,
  {},
  [],
  undefined,
  NaN
]

describe('Rules: string', () => {
  it('Should validate a string', () => {
    const rule = string()

    for (let type of types) {
      if (type === 'str') {
        expect(rule.validate(type)).to.be.true
      } else {
        expect(rule.validate(type)).to.be.false
      }
    }
  })

  it('Should validate a string with min property', () => {
    const rule = string({ min: 5 })
    expect(rule.validate('12345')).to.be.true
    expect(rule.validate('12345325')).to.be.true
    expect(rule.validate('123')).to.be.false
  })

  it('Should validate a string with max property', () => {
    const rule = string({ max: 5 })
    expect(rule.validate('123')).to.be.true
    expect(rule.validate('12345')).to.be.true
    expect(rule.validate('123457')).to.be.false
  })

  it('Should validate a string with required property', () => {
    const rule = string({ required: true })
    expect(rule.validate('true')).to.be.true
    expect(rule.validate('')).to.be.false
    expect(rule.validate()).to.be.false
    expect(rule.validate(true)).to.be.false
    expect(rule.validate(23570)).to.be.false
  })
})
