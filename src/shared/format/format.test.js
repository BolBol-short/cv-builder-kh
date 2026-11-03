import { describe, expect, it } from 'vitest'
import { makeT } from '../i18n.js'
import { formatDate, formatMonth, formatRange, toKhmerDigits } from './dates.js'
import { addText, insertItem, moveItem, removeItem, removeText, updateItem } from './lists.js'
import { fileNameFrom, toBullets } from './text.js'

describe('dates', () => {
  it('formats months in English and Khmer', () => {
    expect(formatMonth('2024-03', 'en')).toBe('Mar 2024')
    expect(formatMonth('2024-03', 'km')).toBe('មីនា ២០២៤')
    expect(formatMonth('2024', 'en')).toBe('2024') // only a year: shown as typed
    expect(formatMonth('', 'en')).toBe('')
  })

  it('formats a full date', () => {
    expect(formatDate('1998-04-14', 'en')).toBe('14 Apr 1998')
    expect(formatDate('1998-04-14', 'km')).toBe('១៤ មេសា ១៩៩៨')
  })

  it('formats a period', () => {
    const t = makeT('en')
    expect(formatRange({ startDate: '2021-06', endDate: '2022-12' }, t, 'en')).toBe('Jun 2021 – Dec 2022')
    expect(formatRange({ startDate: '2023-01', current: true }, t, 'en')).toBe('Jan 2023 – Present')
    expect(formatRange({ startDate: '', endDate: '' }, t, 'en')).toBe('')
  })

  it('turns digits into Khmer digits', () => {
    expect(toKhmerDigits('012 345')).toBe('០១២ ៣៤៥')
  })
})

describe('text', () => {
  it('splits a description into bullets', () => {
    expect(toBullets('- Made reports\n\n• Filed taxes \n* Checked cash')).toEqual([
      'Made reports',
      'Filed taxes',
      'Checked cash',
    ])
  })

  it('makes safe file names', () => {
    expect(fileNameFrom('Sok  Dara', 'cv')).toBe('Sok-Dara')
    expect(fileNameFrom('សុខ ដារា', 'cv')).toBe('សុខ-ដារា')
    expect(fileNameFrom('a/b:c', 'cv')).toBe('abc')
    expect(fileNameFrom('', 'cv')).toBe('cv')
  })
})

describe('lists', () => {
  const list = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]

  it('adds text once, trimmed', () => {
    expect(addText(['Excel'], ' Word ')).toEqual(['Excel', 'Word'])
    expect(addText(['Excel'], 'Excel')).toEqual(['Excel'])
    expect(addText(['Excel'], '  ')).toEqual(['Excel'])
    expect(removeText(['Excel', 'Word'], 'Excel')).toEqual(['Word'])
  })

  it('moves, updates, removes and re-inserts items', () => {
    expect(moveItem(list, 'b', -1).map((item) => item.id)).toEqual(['b', 'a', 'c'])
    expect(moveItem(list, 'a', -1)).toBe(list) // already first
    expect(updateItem(list, 'b', 'name', 'x')[1]).toEqual({ id: 'b', name: 'x' })
    const removed = removeItem(list, 'b')
    expect(removed.map((item) => item.id)).toEqual(['a', 'c'])
    expect(insertItem(removed, { id: 'b' }, 1).map((item) => item.id)).toEqual(['a', 'b', 'c'])
  })
})
