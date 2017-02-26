const Schema = require('./Schema')
const Rule = require('./Rule')
const rules = require('./rules')

class Validator {

  /**
   * Setup Validator
   * @param {Object|Array} data
   * @param {Object} schema
   */
  constructor (data, schema) {
    this.data = data
    this.schema = new Schema(schema)
    this.errors = {}

    this.compare(this.data, this.schema)
  }

  /**
   * Compare the data against the schema
   * @param {Object} data
   * @param {Object} schema
   * @private
   */
  compare (data, schema, namespace = '') {
    for (let item in data) {
      if (!schema[item]) {
        this.errors[item] = (`doesn't exist in the schema`)
        continue
      }

      if (typeof schema[item] === 'object' && !schema[item].validate) {
        namespace += item
        this.compare(data[item], schema[item], namespace + '.')
        continue
      }

      if (!schema[item].validate(data[item])) {
        this.errors[namespace + item] = `${data[item]} is not a valid input`
      }
    }
  }
}

/**
 * Static exports
 */
Validator.Rule = Rule
for (let rule of rules) {
  Validator[rule().name] = rule
}

module.exports = Validator
