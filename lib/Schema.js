const Rule = require('./Rule')
const rules = require('./rules')

class Schema {

  /**
   * Transform schema to schema with rules
   * @param {Object} schema
   * @return {Object} transformed schema
   */
  constructor (schema) {
    return this.transform(schema)
  }

  /**
   * Transform schema
   * @param {Object} schema
   * @private
   */
  transform (schema) {
    const transformedSchema = {}

    for (let item in schema) {
      for (let rule of rules) {
        rule = rule()
        if (schema[item] === rule.type) {
          transformedSchema[item] = rule
          break
        }
      }

      if (transformedSchema[item]) {
        continue
      }

      if (schema[item] instanceof Rule) {
        transformedSchema[item] = schema[item]
        continue
      }

      if (typeof schema[item] === 'function') {
        transformedSchema[item] = new Rule({
          name: schema[item].prototype.constructor.name,
          type: schema[item],
          validate: value => value instanceof schema[item]
        })
        continue
      }

      if (typeof schema[item] === 'object') {
        transformedSchema[item] = this.transform(schema[item])
      }
    }

    return transformedSchema
  }

}

module.exports = Schema
