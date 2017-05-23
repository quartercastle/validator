/**
 * Validate a value against a new type
 * @param {Object|Array} schema
 * @constructor
 */
function Type (type = {}) {
  this.type = type
  return this
}

module.exports = Type
