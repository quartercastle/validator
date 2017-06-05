const Validator = require('./Validator')
const transformType = require('./transformType')
const types = require('./types')

Validator['transform'] = transformType

for (const key in types) {
  Validator[key] = types[key]
}

module.exports = Validator
