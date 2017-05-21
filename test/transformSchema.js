/* eslint-env mocha */

const { expect } = require('chai')
const transformSchema = require('../lib/transformSchema')
const rules = require('../rules')

describe('Transform schema', () => {
  it('Should transform schema rules to validator functions', () => {
    const schema = {
      string: String,
      number: Number,
      boolean: Boolean,
      array: Array,
      object: Object,
      symbol: Symbol
    }

    const transformedSchema = transformSchema(schema)

    for (const key in transformedSchema) {
      expect(transformedSchema[key].toString())
        .to.be.equal(rules[key]().toString())
    }
  })

  it('Should fallback to instanceof if no rules apply', () => {
    const { date } = transformSchema({
      date: Date
    })

    expect(date(new Date())).to.be.true // eslint-disable-line

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
