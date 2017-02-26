/* eslint-env mocha */

const Rule = require('../lib/Rule')
const { expect } = require('chai')

describe('Rule.constructor', () => {
  it('Should create a new Rule instance', () => {
    const properties = {
      name: 'my-rule',
      validate: value => true

    }

    const rule = new Rule(properties)

    expect(rule).to.have.property('validate')
      .and.to.be.function

    expect(rule).to.have.property('name')
      .and.to.be.equal('my-rule')
  })
})
