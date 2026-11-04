// "Download your CV": two taps on purpose.
//   1. "Create PDF" draws the pages (this takes a few seconds).
//   2. "Download PDF" (or "Share") saves it. Because this is a fresh tap,
//      iPhone allows the download and the share sheet.
import { useEffect, useRef, useState } from 'react'
import { useDocument } from '../../app/documentContext.js'
import { fileNameFrom } from '../../shared/format/text.js'
import { useI18n } from '../../shared/i18n.js'
import { Button } from '../../shared/ui/Button.jsx'
import { Icon } from '../../shared/ui/Icon.jsx'
import { documentTitle } from '../storage/schema.js'
import { PagedDocument } from '../templates/pagination/PagedDocument.jsx'
import { capturePages } from './capturePages.js'
import { downloadBlob } from './download.js'
import { canShareFile, isIPhoneOrIPad, shareFile } from './share.js'

// Waits for the browser to draw the next frame.
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()))

export function ExportPanel() {
  const { t } = useI18n()
  const { document: doc } = useDocument() // "doc", so it does not hide the browser's `document`
  const pageRefs = useRef([])
  const [status, setStatus] = useState('idle') // idle | working | ready | failed
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [result, setResult] = useState(null) // { pdf, pictures, forDocument }

  // "CV-Sample-Name", or just "CV" when no name is filled in yet.
  const personName = fileNameFrom(documentTitle(doc), '')
  const baseName = personName ? `CV-${personName}` : 'CV'
  const pdfFile = result ? new File([result.pdf], `${baseName}.pdf`, { type: 'application/pdf' }) : null
  // A PDF made before the last edit is out of date.
  const isOutdated = result && result.forDocument !== doc

  // While "working", hidden full-size pages are on the page. Draw them once they are laid out.
  useEffect(() => {
    if (status !== 'working') return
    let cancelled = false
    async function run() {
      try {
        await window.document.fonts.ready
        await nextFrame()
        await nextFrame()
        const pages = pageRefs.current.filter(Boolean)
        const captured = await capturePages(pages, (done, total) => {
          if (!cancelled) setProgress({ done, total })
        })
        if (cancelled) return
        setResult({ ...captured, forDocument: doc })
        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('failed')
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [status, doc])

  function startCreating() {
    pageRefs.current = []
    setProgress({ done: 0, total: 0 })
    setStatus('working')
  }

  return (
    <section className="rounded-xl border border-ink/15 p-4">
      <h2 className="text-lg font-bold">{t('export.title')}</h2>

      {(status === 'idle' || status === 'failed' || isOutdated) && (
        <Button variant="primary" icon="file" className="mt-3 w-full" onClick={startCreating}>
          {t('action.createPdf')}
        </Button>
      )}

      <div role="status" aria-live="polite" className="mt-3">
        {status === 'working' && (
          <p>
            {t('export.working')} {progress.total > 0 && `(${progress.done}/${progress.total})`}
          </p>
        )}
        {status === 'failed' && (
          <p className="flex items-center gap-2 font-semibold">
            <Icon name="alert" />
            {t('export.failed')}
          </p>
        )}
        {status === 'ready' && !isOutdated && <p className="font-semibold">{t('export.ready')}</p>}
      </div>

      {status === 'ready' && !isOutdated && (
        <div className="mt-3 space-y-3">
          <Button
            variant="primary"
            icon="download"
            className="w-full"
            onClick={() => downloadBlob(pdfFile, pdfFile.name)}
          >
            {t('action.downloadPdf')}
          </Button>
          {canShareFile(pdfFile) && (
            <Button icon="share" className="w-full" onClick={() => shareFile(pdfFile).catch(() => setStatus('failed'))}>
              {t('action.share')}
            </Button>
          )}
          {isIPhoneOrIPad(navigator.userAgent) && <p className="text-sm text-ink/70">{t('export.iphoneHint')}</p>}

          <div>
            <p className="mb-2 text-sm font-semibold">{t('export.pictures')}</p>
            <div className="flex flex-wrap gap-2">
              {result.pictures.map((picture, index) => (
                <Button key={index} icon="image" onClick={() => downloadBlob(picture, `${baseName}-${index + 1}.jpg`)}>
                  {t('preview.page', { number: index + 1 })}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full-size pages, off screen, used only to draw the PDF. */}
      {status === 'working' && (
        <div aria-hidden="true" className="pointer-events-none fixed top-0 left-[-10000px]">
          <PagedDocument doc={doc} pageRefs={pageRefs} gap={0} />
        </div>
      )}
    </section>
  )
}
