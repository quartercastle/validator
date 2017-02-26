class Rule {

  /**
   * Create new rule
   * @param {Object} properties
   */
  constructor (properties = {}) {
    this.name = properties.name
    this.type = properties.type
    this.validate = properties.validate
  }

}

module.exports = Rule
