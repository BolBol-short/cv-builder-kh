// Loads the CV from storage, then shows the editor for it.
import { useEffect, useState } from 'react'
import { DocumentProvider } from '../../app/DocumentProvider.jsx'
import { goTo } from '../../app/route.js'
import { loadDocument, setLastOpenedId } from '../storage/db.js'
import { EditorScreen } from './EditorScreen.jsx'

export function Editor({ documentId, stepId, onUiLang }) {
  const [document, setDocument] = useState(null)

  useEffect(() => {
    let cancelled = false
    loadDocument(documentId)
      .then((loaded) => {
        if (cancelled) return
        if (!loaded) return goTo('/') // unknown CV: back to the start screen
        setLastOpenedId(loaded.id)
        setDocument(loaded)
      })
      .catch(() => goTo('/'))
    return () => {
      cancelled = true
    }
  }, [documentId])

  // Wait until the right CV is loaded (also when switching from one CV to another).
  if (!document || document.id !== documentId) return null

  return (
    <DocumentProvider key={document.id} initialDocument={document}>
      <EditorScreen stepId={stepId} onUiLang={onUiLang} />
    </DocumentProvider>
  )
}
