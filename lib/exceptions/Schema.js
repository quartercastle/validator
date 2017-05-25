/**
 * Validate a value against a new schema
 * @param {Object|Array} schema
 * @constructor
 */
function Schema (schema = {}) {
  this.schema = schema
  return this
}

module.exports = Schema
