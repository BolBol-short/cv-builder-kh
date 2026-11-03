// Suggests adding CV-Builder to the Home Screen.
// - Android/Chrome: an "Install the app" button.
// - iPhone: written steps (iPhone has no install button). Opening from the Home
//   Screen also stops Safari from deleting saved CVs after a week without visits.
import { useEffect, useState } from 'react'
import { isIPhoneOrIPad } from '../features/export/share.js'
import { useI18n } from '../shared/i18n.js'
import { Button } from '../shared/ui/Button.jsx'
import { Icon } from '../shared/ui/Icon.jsx'
import { getInstallPrompt, isInstalled, onInstallPromptChange, showInstallPrompt } from './installPrompt.js'

const DISMISSED_KEY = 'cv-builder:install-dismissed'

function wasDismissed() {
  try {
    return localStorage.getItem(DISMISSED_KEY) === 'yes'
  } catch {
    return false
  }
}

export function InstallHelp() {
  const { t } = useI18n()
  const [prompt, setPrompt] = useState(getInstallPrompt)
  const [dismissed, setDismissed] = useState(wasDismissed)

  useEffect(() => onInstallPromptChange(() => setPrompt(getInstallPrompt())), [])

  function dismiss() {
    setDismissed(true)
    try {
      localStorage.setItem(DISMISSED_KEY, 'yes')
    } catch {
      // It will simply show again next time.
    }
  }

  if (dismissed || isInstalled()) return null

  if (prompt) {
    return (
      <Button icon="download" onClick={showInstallPrompt}>
        {t('install.androidButton')}
      </Button>
    )
  }

  if (!isIPhoneOrIPad(navigator.userAgent)) return null

  return (
    <section className="rounded-xl border border-ink/15 p-4">
      <h2 className="flex items-center gap-2 font-bold">
        <Icon name="share" />
        {t('install.iosTitle')}
      </h2>
      <p className="mt-2 text-ink/80">{t('install.iosSteps')}</p>
      <Button variant="ghost" className="mt-2" onClick={dismiss}>
        {t('action.notNow')}
      </Button>
    </section>
  )
}
