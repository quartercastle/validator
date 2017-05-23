/* eslint-env mocha */
const { expect } = require('chai')
const { optional } = require('../../lib/rules')

describe('Property: optional', () => {
  it('Should accept values as null or undefined', () => {
    expect(optional({ optional: true }, undefined)).to.be.equal(undefined)
    expect(optional({ optional: true }, null)).to.be.equal(undefined)
  })

  it(`Shouldn't accept values as null or undefined`, () => {
    expect(() => optional({ optional: false }, undefined)).to.throw('is required')
    expect(() => optional({ optional: false }, null)).to.throw('is required')
  })
})
