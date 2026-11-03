// The bar at the top of every screen: app name, language switch, and extra
// buttons passed in as `children` (for example the save status).
import { LANGS, useI18n } from '../shared/i18n.js'
import { Icon } from '../shared/ui/Icon.jsx'

export function AppHeader({ onUiLang, children }) {
  const { t, lang } = useI18n()
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 lg:px-8">
        <a href="#/" className="flex min-h-11 items-center gap-2 font-bold" title={t('action.home')}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-paper">
            <Icon name="file" className="h-5 w-5" />
          </span>
          <span className="sr-only sm:not-sr-only">{t('app.name')}</span>
        </a>
        <div className="flex-1">{children}</div>
        <div className="inline-flex rounded-lg border border-ink/15 p-0.5" role="group" aria-label={t('design.uiLang')}>
          {LANGS.map((option) => (
            <button
              key={option.code}
              type="button"
              lang={option.code}
              aria-pressed={lang === option.code}
              onClick={() => onUiLang(option.code)}
              className={`min-h-10 rounded-md px-3 text-sm font-semibold ${
                lang === option.code ? 'bg-ink text-paper' : 'text-ink/70 hover:bg-ink/5'
              }`}
            >
              {option.short}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
