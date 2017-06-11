const messages = require('./messages')

/**
 * Current selected locale
 * @type {String}
 */
let currentLocale = 'en'

/**
 * Fet messages from current or specific locale
 * @param  {Object} locale
 * @return {Object}
 * @public
 */
const locale = locale => {
  if (locale) {
    currentLocale = locale
  }

  return Object.assign({}, messages[currentLocale])
}

/**
 * Register locale with messages
 * @param  {String} locale
 * @param  {Object} messages
 * @public
 */
locale.register = (locale, newMessages) => {
  messages[locale] = newMessages
}

/**
 * Export locale function
 * @type {Object}
 */
module.exports = locale
