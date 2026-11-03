// Shown inside Facebook, Messenger, Telegram and similar apps, where downloads
// often fail: explains how to open the page in the normal browser.
import { useI18n } from '../../shared/i18n.js'
import { Button } from '../../shared/ui/Button.jsx'
import { Icon } from '../../shared/ui/Icon.jsx'
import { useToast } from '../../shared/ui/toastContext.js'
import { detectInAppBrowser } from './inAppBrowser.js'

export function InAppBanner() {
  const { t } = useI18n()
  const showToast = useToast()
  const appName = detectInAppBrowser(navigator.userAgent)
  if (!appName) return null

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/app`)
      showToast({ message: t('inapp.copied') })
    } catch {
      // Copying is blocked in some in-app browsers; the written steps still help.
    }
  }

  return (
    <section role="alert" className="rounded-xl border-2 border-ink p-4">
      <h2 className="flex items-center gap-2 font-bold">
        <Icon name="alert" />
        {t('inapp.title')}
      </h2>
      <p className="mt-2">{t('inapp.body', { app: appName })}</p>
      <Button className="mt-3" icon="copy" onClick={copyLink}>
        {t('action.copyLink')}
      </Button>
    </section>
  )
}
