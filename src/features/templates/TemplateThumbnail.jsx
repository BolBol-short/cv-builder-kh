// A small picture of a template for the design picker: the example CV drawn
// in that template, shrunk down, showing only the first page.
import { useMemo, useRef } from 'react'
import { useDocument } from '../../app/documentContext.js'
import { sampleDocument } from '../editor/sampleCV.js'
import { CvDocument } from './CvDocument.jsx'
import { PAGE_HEIGHT, PAGE_WIDTH } from './pagination/pageGeometry.js'
import { useFitScale } from './useFitScale.js'

export function TemplateThumbnail({ templateId }) {
  const { document } = useDocument()
  const { cvLang, accentColor } = document.settings
  const frameRef = useRef(null)
  const scale = useFitScale(frameRef, PAGE_WIDTH)

  const example = useMemo(() => {
    const doc = sampleDocument(cvLang)
    doc.settings = { ...doc.settings, template: templateId, accentColor }
    return doc
  }, [cvLang, templateId, accentColor])

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className="pointer-events-none w-full overflow-hidden rounded border border-ink/15 bg-paper"
      style={{ height: PAGE_HEIGHT * scale }}
    >
      <div style={{ zoom: scale }}>
        <CvDocument doc={example} />
      </div>
    </div>
  )
}
