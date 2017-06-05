/* eslint-env mocha */
const { expect } = require('chai')
const Validator = require('../lib')
const { string, object } = require('../lib')

describe('Validator', () => {
  it('Should validate a value against a type', () => {
    const validator = new Validator('string', String)
    expect(validator.errors).to.be.deep.equal({})
  })

  it('Should evaluate an empty object as the type object', () => {
    let validator = new Validator({ object: {} }, { object: {} })
    expect(validator.errors).to.be.deep.equal({})
    validator = new Validator({ object: 'notObject' }, { object: {} })
    expect(validator.errors).to.be.deep.equal({
      object: `isn't an object`
    })
  })

  it('Should evaluate an empty array as the type array', () => {
    let validator = new Validator({ array: [] }, { array: [] })
    expect(validator.errors).to.be.deep.equal({})
    validator = new Validator({ array: 'notArray' }, { array: [] })
    expect(validator.errors).to.be.deep.equal({
      array: `isn't an array`
    })
  })

  it('Should validate a value against a schema object', () => {
    const value = { string: 'string', number: 20 }
    const schema = { string: String, number: Number }
    const validator = new Validator(value, schema)
    expect(validator.errors).to.be.deep.equal({})
  })

  it('Should validate a value against a schema array', () => {
    const value = [{ string: 'string', number: 20 }]
    const schema = [{ string: String, number: Number }]
    const validator = new Validator(value, schema)
    expect(validator.errors).to.be.deep.equal({})
  })

  it(`Should tell object is required when undefined or null is given as the value`, () => {
    const schema = { string: String }
    const error = { '': `isn't an object` }
    let validator = new Validator(undefined, schema)
    expect(validator.errors).to.be.deep.equal(error)
    validator = new Validator(null, schema)
    expect(validator.errors).to.be.deep.equal(error)
  })

  it(`Should tell array is required when undefined or null is given as the value`, () => {
    const schema = [{ string: String }]
    const error = { '': `isn't an array` }
    let validator = new Validator(undefined, schema)
    expect(validator.errors).to.be.deep.equal(error)
    validator = new Validator(null, schema)
    expect(validator.errors).to.be.deep.equal(error)
  })

  it(`Should tell if a value isn't defined in the schema`, () => {
    let validator = new Validator({ string: 'string' }, {})
    expect(validator.errors).to.be.deep.equal({
      string: `isn't defined in the schema`
    })

    validator = new Validator([{ string: 'string' }], [{}])
    expect(validator.errors).to.be.deep.equal({
      '0.string': `isn't defined in the schema`
    })
  })

  it('Should set a default value if the input is undefined or null', () => {
    const value = { string: undefined }
    const validator = new Validator( // eslint-disable-line
      value,
      { string: string({ defaultValue: 'string' }) }
    )

    expect(value.string).to.be.equal('string')
  })

  it('Should mutate data through a mutator function', () => {
    const value = { nested: { string: 'string' } }
    const validator = new Validator( // eslint-disable-line
      value,
      {
        nested: {
          string: string({ mutator: value => 'new string' })
        }
      }
    )

    expect(value.nested.string).to.be.equal('new string')
  })

  it('Should set error if validator function returns false', () => {
    const validator = new Validator('string', value => value !== 'string')
    expect(validator.errors).to.be.deep.equal({
      '': 'value is invalid'
    })
  })

  it('Should validate a value against a new schema if a new Schema is thrown', () => {
    const value = { string: 'string' }
    const schema = object({}, { string: String })
    const validator = new Validator(value, schema)
    expect(validator.errors).to.be.deep.equal({})
  })

  it('.fails() should return true if any errors where encountered', () => {
    let validator = new Validator(1, String)
    expect(validator.fails()).to.be.equal(true)
    validator = new Validator('string', String)
    expect(validator.fails()).to.be.equal(false)
  })

  it('Should be able to listen for errors as an option on the validator', () => {
    const value = { number: '10' }
    const schema = { number: Number }
    const validator = new Validator(value, schema, {
      onError: err => {
        expect(err).to.be.deep.equal({
          context: ['number'],
          message: `isn't a number`,
          value: '10'
        })
      }
    })

    expect(validator.errors).to.be.deep.equal({
      number: `isn't a number`
    })
  })
})
