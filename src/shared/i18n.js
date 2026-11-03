// Translation helpers. The app has two languages that can differ:
//   - the UI language (menus and buttons), from useI18n()
//   - the CV language (text printed on the CV), passed to templates as `t`
import { createContext, useContext } from 'react'
import en from '../locales/en.js'
import km from '../locales/km.js'

export const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'km', label: 'ខ្មែរ', short: 'ខ្មែរ' },
]

const DICTIONARIES = { en, km }

export function isLang(code) {
  return code === 'en' || code === 'km'
}

/**
 * Makes a translate function for one language.
 * t('step.progress', { current: 2, total: 9 }) -> "Step 2 of 9"
 * A key missing in Khmer falls back to English, then to the key itself.
 */
export function makeT(lang) {
  const dictionary = DICTIONARIES[lang] ?? en
  return function t(key, values = {}) {
    let text = dictionary[key] ?? en[key] ?? key
    for (const [name, value] of Object.entries(values)) {
      text = text.replaceAll(`{${name}}`, String(value))
    }
    return text
  }
}

/**
 * Turns a stored code like "female" into its label ("Female" / "ស្រី").
 * Text the user typed by hand is shown as it is.
 */
export function optionLabel(t, group, value) {
  if (!value) return ''
  const key = `${group}.${value}`
  const label = t(key)
  return label === key ? value : label
}

export const I18nContext = createContext({ lang: 'en', t: makeT('en') })

export function useI18n() {
  return useContext(I18nContext)
}
