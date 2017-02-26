const Rule = require('../Rule')

function validate ({ required, min, max }, value) {
  if (typeof value !== 'boolean') {
    return false
  }

  if (required && value !== true) {
    return false
  }

  return true
}

function boolean (properties = {}) {
  const rule = new Rule({
    name: 'boolean',
    type: Boolean,
    validate: validate.bind(this, properties)
  })

  return rule
}

module.exports = boolean
