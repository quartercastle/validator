const Validator = require('./Validator')
const types = require('./types')

for (const key in types) {
  Validator[key] = types[key]
}

module.exports = Validator
