const compose = require('../compose')
const { optional } = require('../rules')

module.exports = compose(
  optional,
  (properties, value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (
      (typeof value !== 'string' || !pattern.test(value)) &&
      value !== null &&
      value !== undefined
    ) {
      throw new Error(`isn't an email`)
    }

    return true
  }
)
