/**
 * Validate a value against a new schema
 * @param {Object|Array} schema
 * @constructor
 */
module.exports = function Schema (schema = {}) {
  this.schema = schema
  return this
}
