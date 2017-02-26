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
      boolean: 'false',
      properties: {
        somekey: new Date()
      }
    }

    const schema = {
      name: String,
      age: Number,
      boolean: Boolean,
      missing: String,
      properties: {
        somekey: Date
      }
    }

    const validator = new Validator(data, schema)
    expect(validator.errors).to.be.deep.equal({
      boolean: 'false is not a valid input',
      missing: `doesn't exist in the data`
    })
  })
})
