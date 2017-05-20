/**
 * Validate a value against a new schema
 * @param {Object} schema
 * @constructor
 */
function Schema (schema = {}) {
  this.schema = schema
  return this
}

module.exports = Schema
