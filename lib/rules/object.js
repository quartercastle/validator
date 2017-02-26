const Rule = require('../Rule')

function validate ({ required }, value) {
  if (Array.isArray(value) || value === null || typeof value !== 'object') {
    return false
  }

  if (required && value === undefined) {
    return false
  }

  return true
}

function object (properties = {}) {
  const rule = new Rule({
    name: 'object',
    type: Object,
    validate: validate.bind(this, properties)
  })

  return rule
}

module.exports = object
