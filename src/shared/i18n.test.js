import { describe, expect, it } from 'vitest'
import en from '../locales/en.js'
import km from '../locales/km.js'
import { makeT, optionLabel } from './i18n.js'

describe('translations', () => {
  it('English and Khmer have exactly the same keys', () => {
    const missingInKhmer = Object.keys(en).filter((key) => !(key in km))
    const extraInKhmer = Object.keys(km).filter((key) => !(key in en))
    expect(missingInKhmer).toEqual([])
    expect(extraInKhmer).toEqual([])
  })

  it('no translation is empty', () => {
    const empty = [...Object.entries(en), ...Object.entries(km)].filter(([, text]) => !text.trim())
    expect(empty).toEqual([])
  })

  it('fills in {values}', () => {
    expect(makeT('en')('step.progress', { current: 2, total: 9 })).toBe('Step 2 of 9')
    expect(makeT('km')('step.progress', { current: 2, total: 9 })).toBe('ជំហានទី 2 នៃ 9')
  })

  it('shows the key itself when it does not exist', () => {
    expect(makeT('km')('no.such.key')).toBe('no.such.key')
  })

  it('translates option codes but keeps typed text', () => {
    const t = makeT('km')
    expect(optionLabel(t, 'gender', 'female')).toBe('ស្រី')
    expect(optionLabel(t, 'level', 'Very good')).toBe('Very good')
    expect(optionLabel(t, 'level', '')).toBe('')
  })
})
