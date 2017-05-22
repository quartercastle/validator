/* eslint-env mocha */

const { expect } = require('chai')
const { boolean } = require('../../lib/rules')
const types = require('../utils/types')

describe('Rule: boolean', () => {
  it('Should accept booleans', () => {
    const validator = boolean({ optional: true })

    for (const key in types) {
      if (['boolean', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw(`isn't a boolean`)
      }
    }
  })
})
