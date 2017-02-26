/* eslint-env mocha */

const Validator = require('../lib/Validator')
const { expect } = require('chai')

describe('Validator.constructor', () => {
  it('Should create a new validator instance', () => {
    const validator = new Validator({}, {})
    expect(validator).to.be.instanceOf(Validator)

    expect(validator).to.have.property('schema')
    expect(validator).to.have.property('data')
  })

  it('Should compare the data against the schema', () => {
    const data = {
      name: 'Frederik',
      age: 23,
      properties: {
        somekey: new Date()
      }
    }

    const schema = {
      name: String,
      age: Number,
      properties: {
        somekey: Date
      }
    }

    const validator = new Validator(data, schema)
    expect(validator.errors).to.be.deep.equal({})
  })
})
