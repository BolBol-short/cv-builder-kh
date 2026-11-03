// The whole CV as one long A4-wide sheet, in the chosen template, language,
// color and text size. Page splitting happens around this (see PagedDocument).
import { useMemo } from 'react'
import { makeT } from '../../shared/i18n.js'
import { FIRST_PAGE_CONTENT, PAGE_WIDTH } from './pagination/pageGeometry.js'
import { TEMPLATES } from './templates.js'

const BASE_FONT_PX = 13
const FONT_SCALE = { small: 0.92, normal: 1, large: 1.08 }

export function CvDocument({ doc }) {
  const { cv, settings } = doc
  const t = useMemo(() => makeT(settings.cvLang), [settings.cvLang])
  const Template = TEMPLATES[settings.template] ?? TEMPLATES.classic

  return (
    <div
      lang={settings.cvLang}
      className="bg-paper font-sans text-ink"
      style={{
        width: PAGE_WIDTH,
        minHeight: FIRST_PAGE_CONTENT,
        fontSize: BASE_FONT_PX * (FONT_SCALE[settings.fontSize] ?? 1),
        lineHeight: settings.cvLang === 'km' ? 1.7 : 1.45,
        '--cv-accent': settings.accentColor, // the CV's own color, used as text-(--cv-accent)
      }}
    >
      <Template cv={cv} settings={settings} t={t} lang={settings.cvLang} />
    </div>
  )
}
