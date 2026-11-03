// The editor: one step at a time on phones, with a step list on wide screens.
import { useEffect, useRef } from 'react'
import { AppHeader } from '../../app/AppHeader.jsx'
import { useDocument } from '../../app/documentContext.js'
import { editPath, goTo } from '../../app/route.js'
import { SaveStatus } from '../../app/SaveStatus.jsx'
import { useI18n } from '../../shared/i18n.js'
import { BottomBar } from '../../shared/ui/BottomBar.jsx'
import { Button } from '../../shared/ui/Button.jsx'
import { Icon } from '../../shared/ui/Icon.jsx'
import { StepProgress } from '../../shared/ui/StepProgress.jsx'
import { STEPS, stepIndex } from './steps/steps.js'

export function EditorScreen({ stepId, onUiLang }) {
  const { t } = useI18n()
  const { document } = useDocument()
  const headingRef = useRef(null)
  const index = stepIndex(stepId)
  const step = STEPS[index]
  const previous = STEPS[index - 1]
  const next = STEPS[index + 1]
  const StepComponent = step.Component

  const goToStep = (id) => goTo(editPath(document.id, id))

  // When the step changes, start at the top and move keyboard focus to the title.
  useEffect(() => {
    window.scrollTo(0, 0)
    headingRef.current?.focus()
  }, [step.id])

  return (
    <div className="min-h-dvh pb-28 lg:pb-12">
      <AppHeader onUiLang={onUiLang}>
        <SaveStatus />
      </AppHeader>

      <div className="mx-auto max-w-6xl gap-10 px-4 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:px-8">
        <nav aria-label={t('nav.steps')} className="hidden py-8 lg:block">
          <ol className="sticky top-20 space-y-1">
            {STEPS.map((item, itemIndex) => (
              <li key={item.id}>
                <a
                  href={`#${editPath(document.id, item.id)}`}
                  aria-current={item.id === step.id ? 'step' : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-lg px-3 ${
                    item.id === step.id ? 'bg-accent text-paper' : 'hover:bg-ink/5'
                  }`}
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  <span className="text-sm">
                    {itemIndex + 1}. {t(`step.${item.id}`)}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <main className="max-w-xl py-6 lg:py-8">
          <StepProgress current={index + 1} total={STEPS.length} />
          <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">
            {t(`step.${step.id}`)}
          </h1>
          <p className="mt-1 text-ink/70">{t(`step.${step.id}.intro`)}</p>

          <div className="mt-6">
            <StepComponent goToStep={goToStep} />
          </div>

          <BottomBar>
            {previous ? (
              <Button icon="left" onClick={() => goToStep(previous.id)}>
                {t('action.back')}
              </Button>
            ) : (
              <Button icon="home" onClick={() => goTo('/')}>
                {t('action.home')}
              </Button>
            )}
            {next && (
              <Button variant="primary" onClick={() => goToStep(next.id)}>
                {t('action.next')}
                <Icon name="right" />
              </Button>
            )}
          </BottomBar>
        </main>
      </div>
    </div>
  )
}
