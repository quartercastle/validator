/**
 * Validate a value against a new schema
 * @param {Object|Array} schema
 * @constructor
 */
export default function Schema (schema = {}) {
  this.schema = schema
  return this
}
