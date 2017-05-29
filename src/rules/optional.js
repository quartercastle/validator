/**
 * Check if value is required with the optional property
 * @param  {Object} properties
 * @param  {Mixed} value
 */
export default ({ optional } = {}, value) => {
  if (!optional && (value === undefined || value === null)) {
    throw new Error('is required')
  }
}
