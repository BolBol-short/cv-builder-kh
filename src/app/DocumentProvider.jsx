import { useMemo, useReducer } from 'react'
import { useAutosave } from '../features/storage/useAutosave.js'
import { DocumentContext } from './documentContext.js'
import { documentReducer } from './documentReducer.js'

// Holds the open CV and saves it automatically after every change.
export function DocumentProvider({ initialDocument, children }) {
  const [document, dispatch] = useReducer(documentReducer, initialDocument)
  const { status, lastSavedAt } = useAutosave(document)

  const value = useMemo(
    () => ({ document, dispatch, saveStatus: status, lastSavedAt }),
    [document, status, lastSavedAt],
  )
  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>
}
