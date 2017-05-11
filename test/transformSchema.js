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

    const { date } = transformSchema({
      date: Date
    })

    expect(date(new Date())).to.be.true

    for (let type of ['string', 10, true, null, undefined, NaN, [], {}]) {
      expect(date(type)).to.be.false
    }
  })
})
