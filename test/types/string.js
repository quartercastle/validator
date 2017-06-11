/* eslint-env mocha */
const { expect } = require('chai')
const { string } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: string', () => {
  it('Should accept strings', () => {
    const validator = string({ optional: true })

    for (const key in types) {
      if (['string', 'email', 'url', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw('should be a string')
      }
    }
  })

  it('Should try to cast the value to a string', () => {
    const validator = string({ cast: true })
    try {
      validator(5.1)
    } catch ({ value }) {
      expect(value).to.be.equal('5.1')
    }
  })

  it('Should require string to be lowercased', () => {
    const validator = string({ lowercase: true })
    expect(validator('works')).to.be.equal(true)
    expect(() => validator('Fails')).to.throw('string should be lowercased')
  })

  it('Should require string to be uppercased', () => {
    const validator = string({ uppercase: true })
    expect(validator('WORKS')).to.be.equal(true)
    expect(() => validator('Fails')).to.throw('string should be uppercased')
  })

  it('Should be able to specify min length', () => {
    const validator = string({ min: 2 })
    expect(validator('12')).to.be.equal(true)
    expect(validator('123')).to.be.equal(true)
    expect(() => validator('1')).to.be.throw(
      'string should have a length of minimum 2 characters'
    )
  })

  it('Should be able to specify max length', () => {
    const validator = string({ max: 2 })
    expect(validator('1')).to.be.equal(true)
    expect(validator('12')).to.be.equal(true)
    expect(() => validator('123')).to.be.throw(
      'string should have a length of maximum 2 characters'
    )
  })

  it('Should truncate string if max length is exceeded and the truncate is true', () => {
    const validator = string({ max: 4, truncate: true })
    expect(validator('1234')).to.be.equal(true)
    try {
      validator('12345')
    } catch ({ value }) {
      expect(value).to.be.equal('1234')
    }
  })

  it('Should be able to match a regex pattern', () => {
    const validator = string({ match: /test/ })
    expect(validator('test')).to.be.equal(true)
    expect(() => validator('tes')).to.throw(
      'string did not match the regex pattern'
    )
  })
})
