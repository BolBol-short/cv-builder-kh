// Step 9: the finished CV, what is still missing, and a backup reminder.
import { useState } from 'react'
import { useDocument } from '../../../app/documentContext.js'
import { useI18n } from '../../../shared/i18n.js'
import { Button } from '../../../shared/ui/Button.jsx'
import { Icon } from '../../../shared/ui/Icon.jsx'
import { downloadBlob } from '../../export/download.js'
import { ExportPanel } from '../../export/ExportPanel.jsx'
import { InAppBanner } from '../../export/InAppBanner.jsx'
import { backupFileName, makeBackupBlob } from '../../storage/backup.js'
import { Preview } from '../../templates/Preview.jsx'
import { findGaps } from '../review.js'

const NUDGE_KEY = 'cv-builder:backup-nudge'
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

// Show the backup reminder at most once every 30 days.
function shouldShowNudge() {
  try {
    const lastShown = Number(localStorage.getItem(NUDGE_KEY) || 0)
    return Date.now() - lastShown > THIRTY_DAYS_MS
  } catch {
    return true
  }
}

function rememberNudge() {
  try {
    localStorage.setItem(NUDGE_KEY, String(Date.now()))
  } catch {
    // Without storage the reminder simply shows again next time.
  }
}

export function ReviewStep({ goToStep }) {
  const { t } = useI18n()
  const { document } = useDocument()
  const [showNudge, setShowNudge] = useState(shouldShowNudge)
  const [pageCount, setPageCount] = useState(1)
  const gaps = findGaps(document)

  function downloadBackup() {
    downloadBlob(makeBackupBlob(document), backupFileName(document))
    rememberNudge()
    setShowNudge(false)
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="space-y-8">
        <InAppBanner />
        <ExportPanel />

        <section>
          <p className="font-semibold">{t('review.pages', { count: pageCount })}</p>
          {pageCount > 2 && <p className="mt-1 text-ink/70">{t('review.tooLong')}</p>}
        </section>

        <section>
          {gaps.length === 0 ? (
            <p className="flex items-center gap-2 font-semibold">
              <Icon name="check" className="text-accent" />
              {t('review.complete')}
            </p>
          ) : (
            <>
              <h2 className="mb-2 text-lg font-bold">{t('review.gaps')}</h2>
              <ul className="divide-y divide-ink/10 rounded-xl border border-ink/15">
                {gaps.map((gap) => (
                  <li key={gap.key}>
                    <button
                      type="button"
                      className="flex min-h-12 w-full items-center justify-between px-4 text-left hover:bg-ink/5"
                      onClick={() => goToStep(gap.step)}
                    >
                      {t(gap.key)}
                      <Icon name="right" className="h-4 w-4 text-ink/50" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {showNudge ? (
          <section className="rounded-xl bg-accent/10 p-4">
            <p className="mb-3">{t('backup.nudge')}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" icon="download" onClick={downloadBackup}>
                {t('action.downloadBackup')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  rememberNudge()
                  setShowNudge(false)
                }}
              >
                {t('action.notNow')}
              </Button>
            </div>
          </section>
        ) : (
          <Button icon="download" onClick={downloadBackup}>
            {t('action.downloadBackup')}
          </Button>
        )}
      </div>

      <div className="min-w-0 rounded-xl bg-ink/5 p-3">
        <Preview doc={document} onPageCount={setPageCount} />
      </div>
    </div>
  )
}
