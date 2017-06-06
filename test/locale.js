/* eslint-env mocha */
const { expect } = require('chai')
const locale = require('../lib/locale')
const messages = require('../lib/messages')

describe('Locale', () => {
  it('should be set to en as the default locale', () => {
    expect(locale()).to.be.deep.equal(messages.en)
  })

  it('should be able to set a new locale with messages', () => {
    locale.register('da', { required: 'feltet er påkrævet' })
    expect(locale('da').required).to.be.equal('feltet er påkrævet')
    locale('en')
  })
})
