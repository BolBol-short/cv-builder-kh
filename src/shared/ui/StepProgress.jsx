import { useI18n } from '../i18n.js'

// "Step 3 of 9" with a solid progress bar under it.
export function StepProgress({ current, total }) {
  const { t } = useI18n()
  const percent = Math.round((current / total) * 100)
  return (
    <div>
      <p className="text-sm text-ink/70">{t('step.progress', { current, total })}</p>
      <div
        className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={t('step.progress', { current, total })}
      >
        <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
