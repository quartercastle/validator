/* eslint-env mocha */

const { expect } = require('chai')
const transformSchema = require('../lib/transformSchema')
const assertValidator = require('./utils/assertValidator')

describe('Transform schema', () => {
  it('Should transform schema rules to validator functions', () => {
    const instances = {
      string: String,
      number: Number,
      boolean: Boolean,
      object: Object,
      array: Array,
      function: Function,
      symbol: Symbol
    }

    for (let instance in instances) {
      const schema = {}
      schema[instance] = instances[instance]
      const transformedschema = transformSchema(schema)
      assertValidator(instance, transformedschema[instance])
    }
  })

  it('Should fallback to instanceof if no rules apply', () => {
    const { date } = transformSchema({
      date: Date
    })

    expect(date(new Date())).to.be.true

    for (let type of ['string', 10, true, null, undefined, NaN, [], {}]) {
      expect(() => date(type)).to.throw(Error)
    }
  })

  it('Should be able to parse nested arrays and objects', () => {
    const schema = {
      nestedArray: [{
        number: String,
        function: Function,
        nestedArray: [String]
      }],
      nestedObject: {
        string: String,
        nestedObject: {
          boolean: Boolean
        }
      }
    }

    const transformedSchema = transformSchema(schema)

    expect(JSON.stringify(transformedSchema))
      .to.be.equal(JSON.stringify(schema))
  })
})
