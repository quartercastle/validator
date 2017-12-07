/* eslint-env mocha */
const { expect } = require('chai')
const Validator = require('../lib')
const { string, object, number } = require('../lib')
const sleep = time => new Promise(resolve => setTimeout(resolve, time))

describe('Validator', () => {
  it('Should validate a value against a type', done => {
    const validator = new Validator('string', String)
    validator.then(() => {
      expect(validator._errors).to.be.deep.equal({})
      done()
    })
  })

  it('Should evaluate an empty object as the type object', done => {
    const validator1 = new Validator({ object: {} }, { object: {} })
    const validator2 = new Validator({ object: 'notObject' }, { object: {} })
    const error = { object: 'should be an object' }

    Promise
      .all([validator1, validator2])
      .catch(e => {
        expect(validator1._errors).to.be.deep.equal({})
        expect(validator2._errors).to.be.deep.equal(error)
        expect(e).to.be.deep.equal(error)
        done()
      })
  })

  it('Should evaluate an empty array as the type array', done => {
    const validator1 = new Validator({ array: [] }, { array: [] })
    const validator2 = new Validator({ array: 'notArray' }, { array: [] })
    const error = { array: `should be an array` }

    Promise
      .all([validator1, validator2])
      .catch(e => {
        expect(validator1._errors).to.be.deep.equal({})
        expect(validator2._errors).to.be.deep.equal(error)
        expect(e).to.be.deep.equal(error)
        done()
      })
  })

  it('Should validate a value against a schema object', done => {
    const value = { string: 'string', number: 20 }
    const schema = { string: String, number: Number }
    const validator = new Validator(value, schema)
    validator.then(() => {
      expect(validator._errors).to.be.deep.equal({})
      done()
    })
  })

  it('Should validate a value against a schema array', done => {
    const value = [{ string: 'string', number: 20 }]
    const schema = [{ string: String, number: Number }]
    const validator = new Validator(value, schema)
    validator.then(() => {
      expect(validator._errors).to.be.deep.equal({})
      done()
    })
  })

  it(`Should tell object is required when undefined or null is given as the value`, done => {
    const schema = { string: String }
    const error = { '': `should be an object` }
    const validator1 = new Validator(undefined, schema)
    const validator2 = new Validator(null, schema)

    Promise
      .all([validator1, validator2])
      .catch(e => {
        expect(validator1._errors).to.be.deep.equal(error)
        expect(validator2._errors).to.be.deep.equal(error)
        expect(e).to.be.deep.equal(error)
        done()
      })
  })

  it(`Should tell array is required when undefined or null is given as the value`, done => {
    const schema = [{ string: String }]
    const error = { '': `should be an array` }
    const validator1 = new Validator(undefined, schema)
    const validator2 = new Validator(null, schema)

    Promise
      .all([validator1, validator2])
      .catch(e => {
        expect(validator1._errors).to.be.deep.equal(error)
        expect(validator2._errors).to.be.deep.equal(error)
        expect(e).to.be.deep.equal(error)
        done()
      })
  })

  it(`Should tell if a key isn't defined in the schema`, done => {
    const validator1 = new Validator({ string: 'string' }, {})
    const validator2 = new Validator([{ string: 'string' }], [{}])

    Promise
      .all([validator1, validator2])
      .catch(() => {
        expect(validator1._errors).to.be.deep.equal({
          string: `key is not defined in the schema`
        })
        expect(validator2._errors).to.be.deep.equal({
          '0.string': `key is not defined in the schema`
        })
        done()
      })
  })

  it('Should set a default value if the input is undefined or null', done => {
    const value = { string: undefined }
    const schema = { string: string({ defaultValue: 'string' }) }
    const validator = new Validator(value, schema)

    validator.then(v => {
      expect(value.string).to.be.equal('string')
      expect(v.string).to.be.equal('string')
      done()
    })
  })

  it('Should mutate data through a mutator function', done => {
    const value = { nested: { string: 'string' } }
    const schema = {
      nested: {
        string: string({ mutator: value => 'new string' })
      }
    }
    const validator = new Validator(value, schema)

    validator.then(v => {
      expect(value.nested.string).to.be.equal('new string')
      expect(v.nested.string).to.be.equal('new string')
      done()
    })
  })

  it('Should set error if validator function returns false', done => {
    const validator = new Validator('string', value => value !== 'string')
    const error = { '': 'value is invalid' }

    validator.catch(e => {
      expect(validator._errors).to.be.deep.equal(error)
      expect(e).to.be.deep.equal(error)
      done()
    })
  })

  it('Should validate a value against a new schema if a new Schema is thrown', done => {
    const value = { string: 'string' }
    const schema = object({}, { string: String })
    const validator = new Validator(value, schema)

    validator.then(v => {
      expect(validator._errors).to.be.deep.equal({})
      expect(v).to.be.deep.equal(value)
      done()
    })
  })

  it('Should be able to listen for errors as an option on the validator', done => {
    const value = { number: '10' }
    const schema = { number: Number }
    const error = { number: `should be a number` }
    const validator = new Validator(value, schema, {
      onError: err => {
        expect(err).to.be.deep.equal({
          context: ['number'],
          message: `should be a number`,
          value: '10'
        })
      }
    })

    validator.catch(e => {
      expect(validator._errors).to.be.deep.equal(error)
      expect(e).to.be.deep.equal(error)
      done()
    })
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

  it('Should handle promise rejections together with sync errors', done => {
    const data = {
      number: 'invalid number',
      asyncType: 'invalid async type'
    }
    const schema = {
      number: Number,
      asyncType: async value => Promise.resolve('test')
    }

    const validator = new Validator(data, schema)

    validator
      .catch(err => {
        expect(err).to.be.deep.equal({
          number: 'should be a number'
        })
        done()
      })
  })
})
