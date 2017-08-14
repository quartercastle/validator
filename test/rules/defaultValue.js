/* eslint-env mocha */
const { expect } = require('chai')
// const Value = require('../../lib/exceptions/Value')
const { defaultValue } = require('../../lib/rules')

describe('Rule: defaultValue', () => {
  it('Should set the default value', () => {
    const properties = { defaultValue: 'hello' }

    try {
      defaultValue(properties, undefined)
    } catch ({ value }) {
      expect(value).to.be.equal(properties.defaultValue)
    }

    try {
      defaultValue(properties, null)
    } catch ({ value }) {
      expect(value).to.be.equal(properties.defaultValue)
    }
  })

  it(`Shouldn't set a default value if not specified`, () => {
    expect(defaultValue({}, undefined)).to.be.equal(undefined)
    expect(defaultValue({}, 'hello')).to.be.equal(undefined)
  })
})
