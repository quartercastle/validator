const Rule = require('../Rule')

function validate ({ required, min, max }, value) {
  if (typeof value !== 'string') {
    return false
  }

  if (required && (!value || value === '')) {
    return false
  }

  if (min && min > value.length) {
    return false
  }

  if (max && max < value.length) {
    return false
  }

  return true
}

function string (properties = {}) {
  const rule = new Rule({
    name: 'string',
    type: String,
    validate: validate.bind(this, properties)
  })

  return rule
}

module.exports = string
