// Step 1: CV language, design, color, text size and photo on/off.
import { useDocument } from '../../../app/documentContext.js'
import { LANGS, useI18n } from '../../../shared/i18n.js'
import { CheckboxField } from '../../../shared/ui/Field.jsx'
import { Icon } from '../../../shared/ui/Icon.jsx'
import { FONT_SIZES, TEMPLATE_IDS } from '../../storage/schema.js'
import { ACCENT_PRESETS } from '../options.js'
import { TemplateThumbnail } from '../../templates/TemplateThumbnail.jsx'
import { hasReadableContrast } from '../../../shared/format/contrast.js'

// A radio button that looks like a card. The real input is hidden but still
// receives keyboard focus, so the card shows a focus ring.
function ChoiceCard({ name, value, checked, onChange, children, className = '' }) {
  return (
    <label
      className={`relative flex cursor-pointer rounded-xl border-2 p-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
        checked ? 'border-accent bg-accent/5' : 'border-ink/15 hover:border-ink/30'
      } ${className}`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
      {checked && <Icon name="check" className="absolute top-2 right-2 h-5 w-5 text-accent" />}
    </label>
  )
}

function Group({ title, hint, children }) {
  return (
    <fieldset>
      <legend className="mb-1 text-base font-bold">{title}</legend>
      {hint && <p className="mb-3 text-sm text-ink/60">{hint}</p>}
      {children}
    </fieldset>
  )
}

export function StyleStep() {
  const { t } = useI18n()
  const { document, dispatch } = useDocument()
  const { settings } = document
  const setSetting = (field, value) => dispatch({ type: 'setSetting', field, value })
  const isPreset = ACCENT_PRESETS.includes(settings.accentColor.toLowerCase())

  return (
    <div className="space-y-8">
      <Group title={t('design.cvLang')} hint={t('design.cvLangHint')}>
        <div className="grid grid-cols-2 gap-3">
          {LANGS.map((lang) => (
            <ChoiceCard
              key={lang.code}
              name="cvLang"
              value={lang.code}
              checked={settings.cvLang === lang.code}
              onChange={() => setSetting('cvLang', lang.code)}
              className="justify-center py-4 text-lg font-semibold"
            >
              {lang.label}
            </ChoiceCard>
          ))}
        </div>
      </Group>

      <Group title={t('design.template')}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TEMPLATE_IDS.map((id) => (
            <ChoiceCard
              key={id}
              name="template"
              value={id}
              checked={settings.template === id}
              onChange={() => setSetting('template', id)}
              className="flex-col gap-2"
            >
              <TemplateThumbnail templateId={id} />
              <span className="font-medium">{t(`template.${id}`)}</span>
            </ChoiceCard>
          ))}
        </div>
      </Group>

      <Group title={t('design.color')}>
        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_PRESETS.map((color) => {
            const checked = settings.accentColor.toLowerCase() === color
            return (
              <label
                key={color}
                className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                  checked ? 'ring-2 ring-ink ring-offset-2' : ''
                }`}
                style={{ backgroundColor: color }}
              >
                <input
                  type="radio"
                  name="accent"
                  className="sr-only"
                  checked={checked}
                  onChange={() => setSetting('accentColor', color)}
                  aria-label={color}
                />
                {checked && <Icon name="check" className="h-5 w-5 text-paper" />}
              </label>
            )
          })}
          <label
            className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 ${
              isPreset ? 'border-ink/20' : 'border-ink ring-1 ring-ink'
            }`}
          >
            <span className="h-6 w-6 rounded-full" style={{ backgroundColor: settings.accentColor }} />
            {t('design.custom')}
            <input
              type="color"
              className="sr-only"
              value={settings.accentColor}
              onChange={(event) => setSetting('accentColor', event.target.value)}
            />
          </label>
        </div>
        {!hasReadableContrast(settings.accentColor) && (
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
            <Icon name="alert" className="h-4 w-4" />
            {t('design.lowContrast')}
          </p>
        )}
      </Group>

      <Group title={t('design.fontSize')}>
        <div className="grid grid-cols-3 gap-3">
          {FONT_SIZES.map((size) => (
            <ChoiceCard
              key={size}
              name="fontSize"
              value={size}
              checked={settings.fontSize === size}
              onChange={() => setSetting('fontSize', size)}
              className="justify-center"
            >
              {t(`design.fontSize.${size}`)}
            </ChoiceCard>
          ))}
        </div>
      </Group>

      <CheckboxField
        label={t('design.showPhoto')}
        checked={settings.showPhoto}
        onChange={(value) => setSetting('showPhoto', value)}
      />
    </div>
  )
}
