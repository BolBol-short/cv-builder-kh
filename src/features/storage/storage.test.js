import { beforeEach, describe, expect, it, vi } from 'vitest'
import { emptyDocument, normalizeDocument, documentTitle } from './schema.js'
import { makeBackupBlob, parseBackup, backupFileName } from './backup.js'

// Replace IndexedDB with a simple in-memory Map for these tests.
const fakeStore = new Map()
vi.mock('idb-keyval', () => ({
  get: async (key) => fakeStore.get(key),
  set: async (key, value) => void fakeStore.set(key, value),
  del: async (key) => void fakeStore.delete(key),
  keys: async () => [...fakeStore.keys()],
  clear: async () => fakeStore.clear(),
}))
const db = await import('./db.js')

describe('normalizeDocument', () => {
  it('keeps a valid document as it is', () => {
    const doc = emptyDocument('km')
    expect(normalizeDocument(doc)).toEqual(doc)
  })

  it('fills in missing parts', () => {
    const doc = normalizeDocument({ cv: { personal: { nameLatin: 'Sok Dara' } } })
    expect(doc.cv.personal.nameLatin).toBe('Sok Dara')
    expect(doc.cv.personal.phone).toBe('')
    expect(doc.cv.experience).toEqual([])
    expect(doc.settings.template).toBe('classic')
  })

  it('repairs wrong types and drops unknown fields', () => {
    const doc = normalizeDocument({
      settings: { cvLang: 'fr', template: 'fancy', accentColor: 'red', showPhoto: false },
      cv: {
        summary: 42,
        skills: ['Excel', 7, '  ', 'Word'],
        experience: [{ jobTitle: 'Clerk', current: 'yes', hacked: '<script>' }],
        photo: 'javascript:alert(1)',
      },
    })
    expect(doc.settings).toMatchObject({ cvLang: 'en', template: 'classic', accentColor: '#1d4ed8', showPhoto: false })
    expect(doc.cv.summary).toBe('')
    expect(doc.cv.skills).toEqual(['Excel', 'Word'])
    expect(doc.cv.experience[0].jobTitle).toBe('Clerk')
    expect(doc.cv.experience[0].current).toBe(false)
    expect(doc.cv.experience[0]).not.toHaveProperty('hacked')
    expect(typeof doc.cv.experience[0].id).toBe('string')
    expect(doc.cv.photo).toBe('')
  })

  it('cuts very long text', () => {
    const doc = normalizeDocument({ cv: { summary: 'x'.repeat(10_000) } })
    expect(doc.cv.summary.length).toBe(5000)
  })

  it('rejects things that are not objects', () => {
    expect(() => normalizeDocument(null)).toThrow('error.invalidFile')
    expect(() => normalizeDocument([1, 2])).toThrow('error.invalidFile')
  })

  it('uses the Latin name, then the Khmer name, as the title', () => {
    const doc = emptyDocument()
    doc.cv.personal.nameKm = 'សុខ ដារា'
    expect(documentTitle(doc)).toBe('សុខ ដារា')
    doc.cv.personal.nameLatin = 'Sok Dara'
    expect(documentTitle(doc)).toBe('Sok Dara')
  })
})

describe('backup files', () => {
  it('round-trips a document with a new id', async () => {
    const doc = emptyDocument()
    doc.cv.personal.nameLatin = 'Sok Dara'
    const text = await makeBackupBlob(doc).text()
    const restored = parseBackup(text)
    expect(restored.cv.personal.nameLatin).toBe('Sok Dara')
    expect(restored.id).not.toBe(doc.id)
    expect(backupFileName(doc)).toBe('CV-Sok-Dara.json')
  })

  it('rejects files that are not ours', () => {
    expect(() => parseBackup('not json')).toThrow('error.invalidFile')
    expect(() => parseBackup('{"hello": 1}')).toThrow('error.invalidFile')
    expect(() => parseBackup('x'.repeat(6 * 1024 * 1024))).toThrow('error.fileTooBig')
  })
})

describe('db', () => {
  beforeEach(() => fakeStore.clear())

  it('saves, lists newest first, loads and deletes', async () => {
    const first = emptyDocument()
    const second = emptyDocument()
    await db.saveDocument(first)
    await new Promise((resolve) => setTimeout(resolve, 5))
    await db.saveDocument(second)

    const list = await db.listDocuments()
    expect(list.map((doc) => doc.id)).toEqual([second.id, first.id])
    expect((await db.loadDocument(first.id)).id).toBe(first.id)

    await db.deleteDocument(first.id)
    expect(await db.loadDocument(first.id)).toBeNull()
  })

  it('skips broken entries instead of failing', async () => {
    fakeStore.set('cv:broken', 'not an object')
    await db.saveDocument(emptyDocument())
    expect(await db.listDocuments()).toHaveLength(1)
  })

  it('clears everything', async () => {
    await db.saveDocument(emptyDocument())
    await db.clearEverything()
    expect(await db.listDocuments()).toEqual([])
  })
})
