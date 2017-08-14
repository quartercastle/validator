/* eslint-env mocha */
const { expect } = require('chai')
const { mutator } = require('../../lib/rules')

describe('Rule: mutator', () => {
  it('Should mutate the value', () => {
    const properties = { mutator: value => 'mutated' }

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
