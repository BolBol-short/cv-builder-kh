// The CV pages, shrunk to fit the space they are given.
// CSS `zoom` shrinks the pages and the space they take up at the same time.
// Screen readers skip the preview: it repeats what the user typed in the form.
import { useRef } from 'react'
import { PagedDocument } from './pagination/PagedDocument.jsx'
import { PAGE_WIDTH } from './pagination/pageGeometry.js'
import { useFitScale } from './useFitScale.js'

export function Preview({ doc, onPageCount, className = '' }) {
  const frameRef = useRef(null)
  const scale = useFitScale(frameRef, PAGE_WIDTH)

  return (
    <div ref={frameRef} className={`w-full min-w-0 overflow-hidden ${className}`} aria-hidden="true">
      <div style={{ zoom: scale }}>
        <PagedDocument doc={doc} onPageCount={onPageCount} />
      </div>
    </div>
  )
}
