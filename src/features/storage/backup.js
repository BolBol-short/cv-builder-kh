// Backup files: the whole CV saved as a .json file the user can keep on the phone.
import { makeId } from '../../shared/ids.js'
import { fileNameFrom } from '../../shared/format/text.js'
import { normalizeDocument, documentTitle } from './schema.js'

export const MAX_BACKUP_SIZE = 5 * 1024 * 1024 // 5 MB

export function backupFileName(doc) {
  return `CV-${fileNameFrom(documentTitle(doc), 'backup')}.json`
}

export function makeBackupBlob(doc) {
  const content = { app: 'cv-builder', ...doc }
  return new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
}

/**
 * Reads a backup file's text and returns it as a new document.
 * It gets a new id, so opening a backup never overwrites a saved CV.
 * Throws Error('error.fileTooBig') or Error('error.invalidFile').
 */
export function parseBackup(text) {
  if (text.length > MAX_BACKUP_SIZE) throw new Error('error.fileTooBig')
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('error.invalidFile')
  }
  if (data?.app !== 'cv-builder') throw new Error('error.invalidFile')
  return { ...normalizeDocument(data), id: makeId() }
}
