// The first screen: make a new CV, open a saved one, open a backup file,
// or try an example. Also the place to delete everything on this device.
import { useEffect, useRef, useState } from 'react'
import { AppHeader } from '../../app/AppHeader.jsx'
import { ReportProblemLink } from '../../app/ReportProblemLink.jsx'
import { editPath, goTo } from '../../app/route.js'
import { formatDate } from '../../shared/format/dates.js'
import { useI18n } from '../../shared/i18n.js'
import { Button } from '../../shared/ui/Button.jsx'
import { ConfirmDialog } from '../../shared/ui/Dialog.jsx'
import { Icon } from '../../shared/ui/Icon.jsx'
import { sampleDocument } from '../editor/sampleCV.js'
import { parseBackup } from '../storage/backup.js'
import {
  clearEverything,
  deleteDocument,
  listDocuments,
  requestPersistentStorage,
  saveDocument,
} from '../storage/db.js'
import { documentTitle, emptyDocument } from '../storage/schema.js'

export function StartScreen({ onUiLang }) {
  const { t, lang } = useI18n()
  const [documents, setDocuments] = useState([])
  const [error, setError] = useState('')
  const [confirm, setConfirm] = useState(null) // { message, onConfirm }
  const fileInputRef = useRef(null)

  function refreshList() {
    listDocuments()
      .then(setDocuments)
      .catch(() => setDocuments([]))
  }

  // Load the list of saved CVs once, when the screen opens.
  useEffect(() => {
    listDocuments()
      .then(setDocuments)
      .catch(() => setDocuments([]))
  }, [])

  async function openNew(doc, firstStep) {
    try {
      await saveDocument(doc)
      requestPersistentStorage() // ask the browser to keep our data (no need to wait)
      goTo(editPath(doc.id, firstStep))
    } catch {
      setError(t('save.failed'))
    }
  }

  async function onBackupChosen(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      openNew(parseBackup(await file.text()), 'review')
    } catch (backupError) {
      setError(t(backupError.message))
    }
  }

  function askToDelete(doc) {
    setConfirm({
      message: t('confirm.deleteCv'),
      onConfirm: async () => {
        await deleteDocument(doc.id)
        refreshList()
      },
    })
  }

  function askToClearAll() {
    setConfirm({
      message: t('confirm.clearAll'),
      onConfirm: async () => {
        await clearEverything()
        refreshList()
      },
    })
  }

  return (
    <div className="min-h-dvh">
      <AppHeader onUiLang={onUiLang} />

      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-3xl font-bold">{t('start.title')}</h1>
        <p className="mt-2 text-lg text-ink/70">{t('start.intro')}</p>
        <p className="mt-4 flex items-start gap-2 text-sm text-ink/70">
          <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
          {t('start.privacy')}
        </p>

        <div className="mt-8 grid gap-3">
          <Button
            variant="primary"
            icon="plus"
            className="w-full"
            onClick={() => openNew(emptyDocument(lang), 'style')}
          >
            {t('action.newCv')}
          </Button>
          <Button icon="eye" className="w-full" onClick={() => openNew(sampleDocument(lang), 'review')}>
            {t('action.tryExample')}
          </Button>
          <Button icon="upload" className="w-full" onClick={() => fileInputRef.current?.click()}>
            {t('action.openBackup')}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            aria-label={t('action.openBackup')}
            onChange={onBackupChosen}
          />
        </div>

        {error && (
          <p role="alert" className="mt-4 flex items-center gap-2 font-semibold">
            <Icon name="alert" />
            {error}
          </p>
        )}

        {documents.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-lg font-bold">{t('start.saved')}</h2>
            <ul className="space-y-2">
              {documents.map((doc) => (
                <li key={doc.id} className="flex items-center gap-2 rounded-xl border border-ink/15 p-3">
                  <a href={`#${editPath(doc.id, 'review')}`} className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{documentTitle(doc) || t('start.untitled')}</span>
                    <span className="text-sm text-ink/70">
                      {t('start.lastEdited', { date: formatDate(doc.updatedAt.slice(0, 10), lang) })}
                    </span>
                  </a>
                  <Button variant="ghost" icon="trash" onClick={() => askToDelete(doc)}>
                    <span className="sr-only">
                      {t('action.delete')}: {documentTitle(doc) || t('start.untitled')}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 border-t border-ink/10 pt-6">
          <Button variant="ghost" icon="trash" onClick={askToClearAll}>
            {t('action.clearAll')}
          </Button>
          <div className="mt-4 space-y-2">
            <ReportProblemLink />
            <a href="/privacy" className="text-sm font-semibold text-accent underline-offset-4 hover:underline">
              {t('action.privacy')}
            </a>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={Boolean(confirm)}
        message={confirm?.message}
        confirmLabel={t('action.delete')}
        onCancel={() => setConfirm(null)}
        onConfirm={async () => {
          await confirm.onConfirm()
          setConfirm(null)
        }}
      />
    </div>
  )
}
