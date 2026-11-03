// Shows the CV as separate A4 pages.
//
// How it works:
// 1. A hidden copy of the CV is drawn as one long sheet, and we measure where
//    every `data-block` is (see parts.jsx).
// 2. findPageStarts() decides where each page begins.
// 3. Each page is a white A4 box that shows only its slice of the sheet:
//    the sheet is moved up by the page's start, and the box hides the rest.
// The same pages are used for the preview and for the PDF, so they always match.
import { useLayoutEffect, useRef, useState } from 'react'
import { CvDocument } from '../CvDocument.jsx'
import { findPageStarts } from './paginate.js'
import { FIRST_PAGE_CONTENT, PAGE_HEIGHT, PAGE_WIDTH, TOP_MARGIN_LATER_PAGES } from './pageGeometry.js'

function measureSheet(sheet) {
  const box = sheet.getBoundingClientRect()
  const scale = box.width / PAGE_WIDTH || 1 // the preview may be shrunk to fit the screen
  const blocks = [...sheet.querySelectorAll('[data-block]')].map((element) => {
    const rect = element.getBoundingClientRect()
    return {
      top: (rect.top - box.top) / scale,
      bottom: (rect.bottom - box.top) / scale,
      isHeading: element.dataset.block === 'heading',
    }
  })
  const height = box.height / scale
  return { starts: findPageStarts(blocks, height), height }
}

function sameLayout(a, b) {
  return a.height === b.height && a.starts.join() === b.starts.join()
}

export function PagedDocument({ doc, pageRefs, onPageCount, gap = 24 }) {
  const sheetRef = useRef(null)
  const [layout, setLayout] = useState({ starts: [0], height: FIRST_PAGE_CONTENT })

  // Measure after every change of the CV, and again when fonts or the photo
  // finish loading (they change the sheet's size).
  useLayoutEffect(() => {
    const sheet = sheetRef.current
    function update() {
      const next = measureSheet(sheet)
      setLayout((previous) => (sameLayout(previous, next) ? previous : next))
    }
    update()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(update)
    observer.observe(sheet)
    return () => observer.disconnect()
  }, [doc])

  const pageCount = layout.starts.length
  useLayoutEffect(() => {
    onPageCount?.(pageCount)
  }, [pageCount, onPageCount])

  return (
    <div className="relative">
      {/* The hidden long sheet used only for measuring. */}
      <div ref={sheetRef} aria-hidden="true" className="pointer-events-none invisible absolute top-0 left-0">
        <CvDocument doc={doc} />
      </div>

      <div className="flex flex-col items-center" style={{ gap }}>
        {layout.starts.map((start, index) => {
          const end = layout.starts[index + 1] ?? layout.height
          const topMargin = index === 0 ? 0 : TOP_MARGIN_LATER_PAGES
          return (
            <div
              key={index}
              data-page={index + 1}
              ref={(element) => {
                if (pageRefs) pageRefs.current[index] = element
              }}
              className="relative shrink-0 overflow-hidden bg-paper shadow-[0_1px_4px_rgb(28_25_23/0.2)]"
              style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
            >
              <div className="absolute inset-x-0 overflow-hidden" style={{ top: topMargin, height: end - start }}>
                <div style={{ marginTop: -start }}>
                  <CvDocument doc={doc} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
