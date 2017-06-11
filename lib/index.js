const Validator = require('./Validator')
const transformType = require('./transformType')
const locale = require('./locale')
const types = require('./types')

Validator['transform'] = transformType
Validator['locale'] = locale

for (const key in types) {
  Validator[key] = types[key]
}

module.exports = Validator
