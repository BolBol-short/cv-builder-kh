// Saves the CV half a second after the last change, and reports the status
// honestly: "saved", "saving" or "failed".
import { useEffect, useState } from 'react'
import { saveDocument } from './db.js'

const SAVE_DELAY_MS = 500

export function useAutosave(document, save = saveDocument) {
  // The last version that reached storage. If it is the current one, we are "saved".
  const [savedDocument, setSavedDocument] = useState(document)
  const [failed, setFailed] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState(null)

  useEffect(() => {
    if (!document || document === savedDocument) return
    const timer = setTimeout(async () => {
      try {
        await save(document)
        setSavedDocument(document)
        setFailed(false)
        setLastSavedAt(new Date())
      } catch {
        setFailed(true)
      }
    }, SAVE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [document, savedDocument, save])

  let status = 'saving'
  if (failed) status = 'failed'
  else if (document === savedDocument) status = 'saved'

  return { status, lastSavedAt }
}
