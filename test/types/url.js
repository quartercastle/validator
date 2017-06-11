/* eslint-env mocha */
const { expect } = require('chai')
const { url } = require('../../lib/types')
const types = require('../utils/types')

describe('Type: url', () => {
  it('Should accept strings matching a url regex pattern', () => {
    const validator = url({ optional: true })

    for (const key in types) {
      if (['url', 'undefined', 'null'].includes(key)) {
        expect(validator(types[key])).to.be.equal(true)
      } else {
        expect(() => validator(types[key])).to.throw('should be a valid url')
      }
    }
  })

  it('Should require protocol', () => {
    const validator = url({ protocol: true })
    expect(validator('http://works.com')).to.be.equal(true)
    expect(() => validator('works.com')).to.throw(
      'http(s):// protocol is required'
    )
  })

  it('Should only accept secure urls', () => {
    const validator = url({ secure: true })
    expect(validator('https://secure.com')).to.be.equal(true)
    expect(() => validator('http://notsecure.com'))
      .to.throw('only https urls are accepted')
    expect(() => validator('notsecure.com'))
      .to.throw('only https urls are accepted')
  })
})
