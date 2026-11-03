// "Report a problem": opens a GitHub issue form with the app version, browser
// and template filled in. The user sees everything before sending, and the
// CV itself is never included. (There is no analytics, so this is how problems reach us.)
import { useI18n } from '../shared/i18n.js'
import { APP_VERSION, REPORT_URL } from './config.js'

function reportUrl(t, templateId) {
  const details = [
    t('report.describe'),
    '',
    '',
    '---',
    `App version: ${APP_VERSION}`,
    `Browser: ${navigator.userAgent}`,
    `Template: ${templateId ?? '-'}`,
  ].join('\n')
  const subject = encodeURIComponent(t('report.subject'))
  const body = encodeURIComponent(details)
  return REPORT_URL.startsWith('mailto:')
    ? `${REPORT_URL}?subject=${subject}&body=${body}`
    : `${REPORT_URL}?title=${subject}&body=${body}`
}

export function ReportProblemLink({ templateId }) {
  const { t } = useI18n()
  return (
    <p className="text-sm text-ink/70">
      <a
        href={reportUrl(t, templateId)}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-accent underline-offset-4 hover:underline"
      >
        {t('action.reportProblem')}
      </a>{' '}
      {t('report.intro')}
    </p>
  )
}
