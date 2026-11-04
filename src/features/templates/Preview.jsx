// The CV pages, shrunk to fit the space they are given.
// We shrink with `transform: scale()`, not CSS `zoom`: iPhone Safari keeps zoomed
// text at a minimum size, which breaks the layout of a small preview.
// Screen readers skip the preview: it repeats what the user typed in the form.
import { useCallback, useRef, useState } from 'react'
import { PagedDocument } from './pagination/PagedDocument.jsx'
import { PAGE_HEIGHT, PAGE_WIDTH } from './pagination/pageGeometry.js'
import { useFitScale } from './useFitScale.js'

const PAGE_GAP = 24 // px between pages, before shrinking

export function Preview({ doc, onPageCount, className = '' }) {
  const frameRef = useRef(null)
  const scale = useFitScale(frameRef, PAGE_WIDTH)
  const [pageCount, setPageCount] = useState(1)

  // A transform does not change the space an element takes up,
  // so we reserve the shrunk size ourselves.
  const fullHeight = pageCount * PAGE_HEIGHT + (pageCount - 1) * PAGE_GAP

  const handlePageCount = useCallback(
    (count) => {
      setPageCount(count)
      onPageCount?.(count)
    },
    [onPageCount],
  )

  return (
    <div ref={frameRef} className={`w-full min-w-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="mx-auto" style={{ width: PAGE_WIDTH * scale, height: fullHeight * scale }}>
        <div style={{ width: PAGE_WIDTH, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <PagedDocument doc={doc} onPageCount={handlePageCount} gap={PAGE_GAP} />
        </div>
      </div>
    </div>
  )
}
