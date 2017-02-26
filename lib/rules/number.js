const Rule = require('../Rule')

function validate ({ required, min, max }, value) {
  if (typeof value !== 'number') {
    return false
  }

  if (required && value === undefined) {
    return false
  }

  if (min && min > value) {
    return false
  }

  if (max && max < value) {
    return false
  }

  return true
}

function number (properties = {}) {
  const rule = new Rule({
    name: 'number',
    type: Number,
    validate: validate.bind(null, properties)
  })

  return rule
}

module.exports = number
