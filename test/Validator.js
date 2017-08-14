/* eslint-env mocha */
const { expect } = require('chai')
const Validator = require('../lib')
const { string, object, number } = require('../lib')
const sleep = time => new Promise(resolve => setTimeout(resolve, time))

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
      object: 'should be an object'
    })
  })

  it('Should evaluate an empty array as the type array', () => {
    let validator = new Validator({ array: [] }, { array: [] })
    expect(validator.errors).to.be.deep.equal({})
    validator = new Validator({ array: 'notArray' }, { array: [] })
    expect(validator.errors).to.be.deep.equal({
      array: `should be an array`
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
    const error = { '': `should be an object` }
    let validator = new Validator(undefined, schema)
    expect(validator.errors).to.be.deep.equal(error)
    validator = new Validator(null, schema)
    expect(validator.errors).to.be.deep.equal(error)
  })

  it(`Should tell array is required when undefined or null is given as the value`, () => {
    const schema = [{ string: String }]
    const error = { '': `should be an array` }
    let validator = new Validator(undefined, schema)
    expect(validator.errors).to.be.deep.equal(error)
    validator = new Validator(null, schema)
    expect(validator.errors).to.be.deep.equal(error)
  })

  it(`Should tell if a key isn't defined in the schema`, () => {
    let validator = new Validator({ string: 'string' }, {})
    expect(validator.errors).to.be.deep.equal({
      string: `key is not defined in the schema`
    })

    validator = new Validator([{ string: 'string' }], [{}])
    expect(validator.errors).to.be.deep.equal({
      '0.string': `key is not defined in the schema`
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
          message: `should be a number`,
          value: '10'
        })
      }
    })

    expect(validator.errors).to.be.deep.equal({
      number: `should be a number`
    })
  })

  it('.fails() should throw an exception if the schema is async', () => {
    const validator = new Validator('test', async value => {})
    expect(() => validator.fails()).throw(
      'The validator is asynchronous, use .then() and .catch()'
    )
  })

  it('.errors should throw an exception if the schema is async', () => {
    const validator = new Validator('test', async value => {})
    expect(() => validator.errors).throw(
      'The validator is asynchronous, use validator.catch() to retrieve errors'
    )
  })

  it('Should wait for async validation types', function (done) {
    this.slow(1000)
    const data = { key: 'testing' }
    const schema = {
      key: async value => {
        await sleep(100)

        if (typeof value !== 'string') {
          throw new Error('should be a string')
        }

        return true
      }
    }

    const validator = new Validator(data, schema)
    validator.then(value => {
      expect(value).to.be.deep.equal(data)
      done()
    })
  })

  it('Should catch errors and reject the validation promise', function (done) {
    this.slow(1000)
    const data = { key: 235 }
    const schema = {
      key: async value => {
        await sleep(100)

        if (typeof value !== 'string') {
          throw new Error('should be a string')
        }

        return true
      }
    }

    const validator = new Validator(data, schema)
    validator.catch(error => {
      expect(error).to.be.deep.equal({ key: 'should be a string' })
      done()
    })
  })

  it('Should not catch the Value exception as a validation rejection', done => {
    const data = { number: '5235' }
    const schema = { number: number({ cast: true }) }
    const validator = new Validator(data, schema)
    expect(data).to.be.deep.equal({ number: 5235 })

    validator
      .then(data => {
        expect(data).to.be.deep.equal({ number: 5235 })
        done()
      })
  })

  it('Should not catch the Schema exception as a validation rejection', done => {
    const data = { number: 5235 }
    const schema = object({}, { number: Number })
    const validator = new Validator(data, schema)
    expect(data).to.be.deep.equal({ number: 5235 })

    validator
      .then(data => {
        expect(data).to.be.deep.equal({ number: 5235 })
        done()
      })
  })
})
