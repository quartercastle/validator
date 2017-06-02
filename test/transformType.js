/* eslint-env mocha */
const { expect } = require('chai')
const transformType = require('../lib/transformType')
const types = require('../lib/types')

describe('Transform type', () => {
  it('Should transform type to validator functions', () => {
    const type = {
      string: String,
      number: Number,
      boolean: Boolean,
      array: Array,
      object: Object,
      symbol: Symbol
    }

    const transformedtype = transformType(type)

    for (const key in transformedtype) {
      expect(transformedtype[key].toString())
        .to.be.equal(types[key]().toString())
    }
  })

  it('Should fallback to instanceof if no types apply', () => {
    const { date } = transformType({
      date: Date
    })

    expect(date(new Date())).to.be.true // eslint-disable-line

    for (let type of ['string', 10, true, null, undefined, NaN, [], {}]) {
      expect(() => date(type)).to.throw(Error)
    }
  })

  it('Should be able to parse nested arrays and objects', () => {
    const type = {
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

    const transformedtype = transformType(type)

    expect(JSON.stringify(transformedtype))
      .to.be.equal(JSON.stringify(type))
  })
})
