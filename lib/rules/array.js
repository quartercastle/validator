const Rule = require('../Rule')

function validate ({ required, min, max }, value) {
  if (!Array.isArray(value)) {
    return false
  }

  if (required && value === undefined) {
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

function array (properties = {}) {
  const rule = new Rule({
    name: 'array',
    type: Array,
    validate: validate.bind(this, properties)
  })

  return rule
}

module.exports = array
