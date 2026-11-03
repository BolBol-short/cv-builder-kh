// Apps like Facebook and Telegram open links inside their own small browser.
// Downloads often do not work there, so we tell the user to open the page in
// their normal browser. We recognise these browsers by their "user agent" text.

// Messenger is checked before Facebook because its user agent also contains "FBAN".
const IN_APP_BROWSERS = [
  { name: 'Messenger', pattern: /Messenger|FBAN\/MessengerForiOS/i },
  { name: 'Facebook', pattern: /FBAN|FBAV|FB_IAB|FBIOS/i },
  { name: 'Instagram', pattern: /Instagram/i },
  { name: 'Telegram', pattern: /Telegram/i },
  { name: 'LINE', pattern: /\bLine\//i },
  { name: 'WeChat', pattern: /MicroMessenger/i },
]

/**
 * @param {string} userAgent  usually navigator.userAgent
 * @returns {string | null} the app name, or null for a normal browser
 */
export function detectInAppBrowser(userAgent) {
  const match = IN_APP_BROWSERS.find((browser) => browser.pattern.test(userAgent ?? ''))
  return match ? match.name : null
}
