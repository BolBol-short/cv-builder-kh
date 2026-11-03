import { describe, expect, it } from 'vitest'
import { emptyDocument } from '../features/storage/schema.js'
import { findGaps } from '../features/editor/review.js'
import { sampleDocument } from '../features/editor/sampleCV.js'
import { normalizeDocument } from '../features/storage/schema.js'
import { documentReducer } from './documentReducer.js'

describe('documentReducer', () => {
  it('changes settings, personal fields and plain fields', () => {
    let doc = emptyDocument()
    doc = documentReducer(doc, { type: 'setSetting', field: 'template', value: 'modern' })
    doc = documentReducer(doc, { type: 'setPersonal', field: 'nameLatin', value: 'Sok Dara' })
    doc = documentReducer(doc, { type: 'setCvField', field: 'summary', value: 'Hello' })
    expect(doc.settings.template).toBe('modern')
    expect(doc.cv.personal.nameLatin).toBe('Sok Dara')
    expect(doc.cv.summary).toBe('Hello')
  })

  it('never changes the old document', () => {
    const before = emptyDocument()
    const after = documentReducer(before, { type: 'addItem', list: 'experience' })
    expect(before.cv.experience).toHaveLength(0)
    expect(after.cv.experience).toHaveLength(1)
  })

  it('adds, updates, moves, removes and restores list items', () => {
    let doc = emptyDocument()
    doc = documentReducer(doc, { type: 'addItem', list: 'education' })
    doc = documentReducer(doc, { type: 'addItem', list: 'education' })
    const [first, second] = doc.cv.education
    doc = documentReducer(doc, { type: 'updateItem', list: 'education', id: first.id, field: 'degree', value: 'BA' })
    doc = documentReducer(doc, { type: 'moveItem', list: 'education', id: second.id, direction: -1 })
    expect(doc.cv.education.map((item) => item.id)).toEqual([second.id, first.id])

    const removed = doc.cv.education[1]
    doc = documentReducer(doc, { type: 'removeItem', list: 'education', id: removed.id })
    expect(doc.cv.education).toHaveLength(1)
    doc = documentReducer(doc, { type: 'insertItem', list: 'education', item: removed, index: 1 })
    expect(doc.cv.education[1].degree).toBe('BA')
  })

  it('adds and removes text in skills', () => {
    let doc = emptyDocument()
    doc = documentReducer(doc, { type: 'addText', list: 'skills', text: 'Excel' })
    doc = documentReducer(doc, { type: 'addText', list: 'skills', text: 'Excel' })
    expect(doc.cv.skills).toEqual(['Excel'])
    doc = documentReducer(doc, { type: 'removeText', list: 'skills', text: 'Excel' })
    expect(doc.cv.skills).toEqual([])
  })
})

describe('review gaps and sample CVs', () => {
  it('lists every gap for an empty CV and none (except photo) for the example', () => {
    expect(findGaps(emptyDocument()).length).toBe(10)
    expect(findGaps(sampleDocument('en')).map((gap) => gap.key)).toEqual(['gap.photo'])
  })

  it('example CVs are valid documents in both languages', () => {
    for (const lang of ['en', 'km']) {
      const sample = sampleDocument(lang)
      expect(normalizeDocument(sample)).toEqual(sample)
    }
  })
})
