// Date helpers. Dates are stored as text: "2024-03" (month) or "1998-04-14" (day).

export const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  km: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'],
}

const KHMER_DIGITS = '០១២៣៤៥៦៧៨៩'

// "2024" -> "២០២៤"
export function toKhmerDigits(text) {
  return String(text).replace(/\d/g, (digit) => KHMER_DIGITS[digit])
}

function localDigits(text, lang) {
  return lang === 'km' ? toKhmerDigits(text) : text
}

// "2024-03" -> "Mar 2024" or "មីនា ២០២៤". Anything else is shown as typed.
export function formatMonth(value, lang) {
  const match = /^(\d{4})-(\d{2})/.exec(value ?? '')
  if (!match) return value ?? ''
  const monthName = (MONTHS[lang] ?? MONTHS.en)[Number(match[2]) - 1]
  return localDigits(`${monthName} ${match[1]}`, lang)
}

// "1998-04-14" -> "14 Apr 1998" or "១៤ មេសា ១៩៩៨"
export function formatDate(value, lang) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '')
  if (!match) return value ?? ''
  const monthName = (MONTHS[lang] ?? MONTHS.en)[Number(match[2]) - 1]
  return localDigits(`${Number(match[3])} ${monthName} ${match[1]}`, lang)
}

// A job or school period: "Mar 2021 – Present"
export function formatRange(item, t, lang) {
  const start = formatMonth(item.startDate, lang)
  const end = item.current ? t('cv.present') : formatMonth(item.endDate, lang)
  if (!start && !end) return ''
  if (!start) return end
  return `${start} – ${end || t('cv.present')}`
}
