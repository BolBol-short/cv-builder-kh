// Form fields. Each one shows a visible label, an optional tip and example,
// and an optional error. Screen readers hear the tip and error too.
import { useId } from 'react'
import { useI18n } from '../i18n.js'
import { MONTHS } from '../format/dates.js'

// 16 px text stops iPhone from zooming in when the field is tapped.
const CONTROL =
  'w-full min-h-11 rounded-lg border border-ink/25 bg-paper px-3 py-2 text-base text-ink ' +
  'placeholder:text-ink/40 disabled:bg-ink/5 disabled:text-ink/40'

export function Field({ id, label, tip, example, error, className = '', children }) {
  const { t } = useI18n()
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {(tip || example) && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-ink/70">
          {tip}
          {tip && example && ' '}
          {example && t('guide.example', { text: example })}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold">
          {error}
        </p>
      )}
    </div>
  )
}

// Links the control to its tip and error so screen readers read them.
function describedBy(id, { tip, example, error }) {
  const ids = []
  if (tip || example) ids.push(`${id}-hint`)
  if (error) ids.push(`${id}-error`)
  return ids.join(' ') || undefined
}

export function TextField({ label, tip, example, error, className, value, onChange, ...inputProps }) {
  const id = useId()
  return (
    <Field id={id} label={label} tip={tip} example={example} error={error} className={className}>
      <input
        id={id}
        className={CONTROL}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={describedBy(id, { tip, example, error })}
        aria-invalid={error ? true : undefined}
        {...inputProps}
      />
    </Field>
  )
}

export function TextAreaField({ label, tip, example, error, className, value, onChange, rows = 4, ...props }) {
  const id = useId()
  return (
    <Field id={id} label={label} tip={tip} example={example} error={error} className={className}>
      <textarea
        id={id}
        rows={rows}
        className={`${CONTROL} resize-y`}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={describedBy(id, { tip, example, error })}
        {...props}
      />
    </Field>
  )
}

// options: [{ value, label }]. The empty choice shows "Select…".
export function SelectField({ label, tip, className, value, onChange, options, ...props }) {
  const { t } = useI18n()
  const id = useId()
  return (
    <Field id={id} label={label} tip={tip} className={className}>
      <select
        id={id}
        className={CONTROL}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={describedBy(id, { tip })}
        {...props}
      >
        <option value="">{t('field.select')}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

export function CheckboxField({ label, checked, onChange, className = '' }) {
  return (
    <label className={`inline-flex min-h-11 cursor-pointer items-center gap-3 text-base ${className}`}>
      <input
        type="checkbox"
        className="h-5 w-5 accent-accent"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  )
}

/**
 * Month and year as two dropdowns. Value is "YYYY-MM" or "".
 * (The phone's own month picker looks different on every phone, so we use selects.)
 */
export function MonthYearField({ label, value, onChange, disabled, className = '' }) {
  const { t, lang } = useI18n()
  const id = useId()
  const [year = '', month = ''] = (value ?? '').split('-')
  const thisYear = new Date().getFullYear()
  const years = []
  for (let y = thisYear + 6; y >= thisYear - 60; y--) years.push(String(y))

  // "2024-03" when both are chosen, "2024" when only the year is, "" when neither.
  function change(nextYear, nextMonth) {
    if (nextYear && nextMonth) onChange(`${nextYear}-${nextMonth}`)
    else onChange(nextYear)
  }

  return (
    <fieldset className={className} disabled={disabled}>
      <legend className="mb-1 block text-sm font-semibold">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        <select
          id={`${id}-month`}
          aria-label={`${label}: ${t('field.month')}`}
          className={CONTROL}
          value={month}
          onChange={(event) => change(year || String(thisYear), event.target.value)}
        >
          <option value="">{t('field.month')}</option>
          {MONTHS[lang].map((name, index) => (
            <option key={name} value={String(index + 1).padStart(2, '0')}>
              {name}
            </option>
          ))}
        </select>
        <select
          id={`${id}-year`}
          aria-label={`${label}: ${t('field.year')}`}
          className={CONTROL}
          value={year}
          onChange={(event) => change(event.target.value, month)}
        >
          <option value="">{t('field.year')}</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  )
}
