// The editor.
// Phones: one step per screen, with Back / Preview / Next at the bottom.
// Wide screens: the step next to a live preview (and a step list on very wide screens).
import { useEffect, useRef, useState } from 'react'
import { AppHeader } from '../../app/AppHeader.jsx'
import { useDocument } from '../../app/documentContext.js'
import { editPath, goTo } from '../../app/route.js'
import { SaveStatus } from '../../app/SaveStatus.jsx'
import { useI18n } from '../../shared/i18n.js'
import { BottomBar } from '../../shared/ui/BottomBar.jsx'
import { Button, IconButton } from '../../shared/ui/Button.jsx'
import { Dialog } from '../../shared/ui/Dialog.jsx'
import { Icon } from '../../shared/ui/Icon.jsx'
import { StepProgress } from '../../shared/ui/StepProgress.jsx'
import { Preview } from '../templates/Preview.jsx'
import { STEPS, stepIndex } from './steps/steps.js'

export function EditorScreen({ stepId, onUiLang }) {
  const { t } = useI18n()
  const { document } = useDocument()
  const headingRef = useRef(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const index = stepIndex(stepId)
  const step = STEPS[index]
  const previous = STEPS[index - 1]
  const next = STEPS[index + 1]
  const isReview = step.id === 'review' // the review step shows its own preview
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

      <div className="mx-auto max-w-7xl gap-8 px-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8 xl:grid-cols-[13rem_minmax(0,1fr)_minmax(0,1fr)]">
        <nav aria-label={t('nav.steps')} className="hidden py-8 xl:block">
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

        <main className={`py-6 lg:py-8 ${isReview ? 'lg:col-span-2' : 'max-w-xl'}`}>
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
            {!isReview && (
              <IconButton
                icon="eye"
                label={t('action.preview')}
                className="lg:hidden"
                onClick={() => setPreviewOpen(true)}
              />
            )}
            {next && (
              <Button variant="primary" onClick={() => goToStep(next.id)}>
                {t('action.next')}
                <Icon name="right" />
              </Button>
            )}
          </BottomBar>
        </main>

        {!isReview && (
          <aside className="hidden lg:block">
            <div
              // Focusable, so keyboard users can scroll the preview too.
              tabIndex={0}
              role="region"
              aria-label={t('preview.title')}
              className="sticky top-16 max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-xl bg-ink/5 p-4 lg:mt-8"
            >
              <Preview doc={document} />
            </div>
          </aside>
        )}
      </div>

      {previewOpen && (
        <Dialog open fullScreen title={t('preview.title')} onClose={() => setPreviewOpen(false)}>
          <div className="rounded-xl bg-ink/5 p-2">
            <Preview doc={document} />
          </div>
        </Dialog>
      )}
    </div>
  )
}
