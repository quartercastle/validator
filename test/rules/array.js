/* eslint-env mocha */

const array = require('../../lib/rules/array')
const { expect } = require('chai')

const types = [
  'str',
  20,
  true,
  null,
  {},
  [],
  undefined
]

describe('Rules: array', () => {
  it('Should validate a array', () => {
    const rule = array()

    for (let type of types) {
      if (Array.isArray(type)) {
        expect(rule.validate(type)).to.be.true
      } else {
        expect(rule.validate(type)).to.be.false
      }
    }
  })

  it('Should validate a array with min property', () => {
    const rule = array({ min: 3 })
    expect(rule.validate([1, 2, 3])).to.be.true
    expect(rule.validate([1, 2, 3, 4])).to.be.true
    expect(rule.validate([1])).to.be.false
  })

  it('Should validate a array with max property', () => {
    const rule = array({ max: 3 })
    expect(rule.validate([1, '2', 3])).to.be.true
    expect(rule.validate([1, 2])).to.be.true
    expect(rule.validate([1, 2, 3, 4])).to.be.false
  })

  it('Should validate a array with required property', () => {
    const rule = array({ required: true })
    expect(rule.validate(['test'])).to.be.true
    expect(rule.validate([])).to.be.true
    expect(rule.validate('')).to.be.false
    expect(rule.validate()).to.be.false
    expect(rule.validate(true)).to.be.false
    expect(rule.validate(null)).to.be.false
    expect(rule.validate(undefined)).to.be.false
  })
})
