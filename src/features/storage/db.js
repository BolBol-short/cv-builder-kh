// Saving CVs on this device with IndexedDB (through the small `idb-keyval` library).
// IndexedDB has much more room than localStorage, so photos fit easily.
import { get, set, del, keys, clear } from 'idb-keyval'
import { normalizeDocument } from './schema.js'

const DOCUMENT_PREFIX = 'cv:'
const LAST_OPENED_KEY = 'cv-builder:last-opened'
const UI_LANG_KEY = 'cv-builder:ui-lang'

/** All saved CVs, newest first. */
export async function listDocuments() {
  const allKeys = await keys()
  const documentKeys = allKeys.filter((key) => typeof key === 'string' && key.startsWith(DOCUMENT_PREFIX))
  const documents = []
  for (const key of documentKeys) {
    try {
      documents.push(normalizeDocument(await get(key)))
    } catch {
      // A broken entry is skipped instead of breaking the whole list.
    }
  }
  return documents.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export async function loadDocument(id) {
  const raw = await get(DOCUMENT_PREFIX + id)
  return raw ? normalizeDocument(raw) : null
}

/** Saves the document and returns the saved copy (with a new updatedAt). */
export async function saveDocument(doc) {
  const saved = { ...doc, updatedAt: new Date().toISOString() }
  await set(DOCUMENT_PREFIX + doc.id, saved)
  return saved
}

export async function deleteDocument(id) {
  await del(DOCUMENT_PREFIX + id)
}

/** Deletes every saved CV and setting on this device. */
export async function clearEverything() {
  await clear()
  try {
    localStorage.removeItem(LAST_OPENED_KEY)
    localStorage.removeItem(UI_LANG_KEY)
  } catch {
    // Storage may be blocked; nothing else to clear then.
  }
}

/**
 * Asks the browser not to delete our data when space runs low.
 * Returns true if the browser agreed.
 */
export async function requestPersistentStorage() {
  try {
    return (await navigator.storage?.persist?.()) === true
  } catch {
    return false
  }
}

// ---- Small settings kept in localStorage ----

function readSetting(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeSetting(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Not important enough to show an error.
  }
}

export const getLastOpenedId = () => readSetting(LAST_OPENED_KEY)
export const setLastOpenedId = (id) => writeSetting(LAST_OPENED_KEY, id)
export const getSavedUiLang = () => readSetting(UI_LANG_KEY)
export const saveUiLang = (lang) => writeSetting(UI_LANG_KEY, lang)
