/**
 * Export all messages in english
 * @type {Object}
 */
module.exports = {
  required: 'is required',
  array: {
    type: 'should be an array',
    min: 'array should have a length of minimum :p items',
    max: 'array should have a length of maximum :p items'
  },
  boolean: {
    type: 'should be a boolean'
  },
  date: {
    type: 'should be a date object',
    min: 'should be above the minimum date',
    max: 'should be below the maximum date'
  },
  email: {
    type: 'should be a valid email'
  },
  integer: {
    type: 'should be an integer'
  },
  mixed: {},
  number: {
    type: 'should be a number',
    min: 'number should be more than or equal to :p',
    max: 'number should be less than or equal to :p',
    precision: 'number should have a precision of :p decimals'
  },
  object: {
    type: 'should be an object'
  },
  string: {
    type: 'should be a string',
    lowercase: 'string should be lowercased',
    uppercase: 'string should be uppercased',
    min: 'string should have a length of minimum :p characters',
    max: 'string should have a length of maximum :p characters',
    match: 'string did not match the regex pattern'
  },
  symbol: {
    type: 'should be a symbol'
  },
  url: {
    type: 'should be a valid url',
    protocol: 'http(s):// protocol is required',
    secure: 'only https urls are accepted'
  }
}
