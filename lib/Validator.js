const transformSchema = require('./transformSchema')

class Validator {
  constructor (data, schema) {
    this.data = data
    this.schema = transformSchema(schema)

    this.compare(this.data, this.schema)
  }

  compare (data, schema, namespace = '') {
    // for (let item in schema) {
    //   if (!data[item]) {
    //     this.errors[item] = (`doesn't exist in the data`)
    //   }
    // }

    for (let item in data) {
      if (!schema[item]) {
        console.log(`${item} doesn't exist in schema`)
        continue
      }

      if (typeof schema[item] === 'object' && !schema[item].validate) {
        namespace += item
        this.compare(data[item], schema[item], namespace + '.')
        continue
      }

      try {
        this.validate(schema[item], data[item])
        console.log(`${item} was valid`)
      } catch (err) {
        console.log(`${item} was invalid.....`)
      }
    }
  }

  validate (validator, data) {
    if (!validator(data)) {
      throw new Error('invalid...')
    }
  }
}

module.exports = Validator
