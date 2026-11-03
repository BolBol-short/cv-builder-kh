// Registers the offline helper (service worker). When a new version of the app
// is ready, asks the user before reloading, so nobody loses typing.
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useI18n } from '../shared/i18n.js'
import { Button } from '../shared/ui/Button.jsx'

export function UpdatePrompt() {
  const { t } = useI18n()
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div role="status" className="fixed inset-x-0 top-16 z-40 flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-paper shadow-lg">
        <span>{t('update.ready')}</span>
        <Button variant="ghost" className="text-paper hover:bg-paper/10" onClick={() => updateServiceWorker(true)}>
          {t('action.reload')}
        </Button>
        <Button variant="ghost" className="text-paper hover:bg-paper/10" onClick={() => setNeedRefresh(false)}>
          {t('action.notNow')}
        </Button>
      </div>
    </div>
  )
}
