// Tells the user whether the CV is saved. Screen readers hear changes too.
// If saving fails, it offers a backup file so no work is lost.
import { downloadBlob } from '../features/export/download.js'
import { backupFileName, makeBackupBlob } from '../features/storage/backup.js'
import { useI18n } from '../shared/i18n.js'
import { Button } from '../shared/ui/Button.jsx'
import { Icon } from '../shared/ui/Icon.jsx'
import { useDocument } from './documentContext.js'

export function SaveStatus() {
  const { t, lang } = useI18n()
  const { document, saveStatus, lastSavedAt } = useDocument()
  // Only shown after a save in this session, so it never claims more than we know.
  const savedTime = lastSavedAt?.toLocaleTimeString(lang === 'km' ? 'km-KH' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-ink/70">
      {saveStatus === 'saved' && (
        <>
          <Icon name="check" className="h-4 w-4" />
          <span className="hidden sm:inline">
            {t('save.saved')}
            {savedTime && ` · ${t('save.lastSaved', { time: savedTime })}`}
          </span>
        </>
      )}
      {saveStatus === 'saving' && <span>{t('save.saving')}</span>}
      {saveStatus === 'failed' && (
        <>
          <Icon name="alert" className="h-4 w-4 text-ink" />
          <span className="font-semibold text-ink">{t('save.failed')}</span>
          <Button variant="link" onClick={() => downloadBlob(makeBackupBlob(document), backupFileName(document))}>
            {t('action.downloadBackup')}
          </Button>
        </>
      )}
    </div>
  )
}
