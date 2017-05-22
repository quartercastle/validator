/* eslint-env mocha */
const { expect } = require('chai')
const Value = require('../../lib/exceptions/Value')
const { mutator } = require('../../lib/properties')

describe('Property: mutator', () => {
  it('Should mutate the value', () => {
    const properties = { mutator: value => 'mutated' }
    expect(() => mutator(properties, 'value')).to.throw(Value)

    try {
      mutator(properties, 'value')
    } catch ({ value }) {
      expect(value).to.be.equal('mutated')
    }
  })

  it(`Shouldn't mutate the value`, () => {
    expect(mutator({}, 'test')).to.be.equal(undefined)
    expect(mutator({}, undefined)).to.be.equal(undefined)
  })
})
