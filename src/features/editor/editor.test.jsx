import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axe from 'axe-core'
import { describe, expect, it, vi } from 'vitest'
import { DocumentProvider } from '../../app/DocumentProvider.jsx'
import { I18nContext, makeT } from '../../shared/i18n.js'
import { ToastProvider } from '../../shared/ui/Toast.jsx'
import { emptyDocument } from '../storage/schema.js'
import { EditorScreen } from './EditorScreen.jsx'
import { sampleDocument } from './sampleCV.js'
import { STEPS } from './steps/steps.js'

// Keep saves in memory instead of IndexedDB.
vi.mock('idb-keyval', () => ({
  get: async () => undefined,
  set: async () => {},
  del: async () => {},
  keys: async () => [],
  clear: async () => {},
}))

function renderStep(doc, stepId, lang = 'en') {
  return render(
    <I18nContext.Provider value={{ lang, t: makeT(lang) }}>
      <ToastProvider>
        <DocumentProvider initialDocument={doc}>
          <EditorScreen stepId={stepId} onUiLang={() => {}} />
        </DocumentProvider>
      </ToastProvider>
    </I18nContext.Provider>,
  )
}

describe('editor steps', () => {
  for (const step of STEPS) {
    it(`"${step.id}" step renders with no accessibility problems`, async () => {
      const { container, unmount } = renderStep(sampleDocument('en'), step.id)
      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
      const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })
      expect(results.violations.map((violation) => `${violation.id}: ${violation.nodes[0]?.html}`)).toEqual([])
      unmount()
    })
  }

  it('shows the Khmer interface', () => {
    renderStep(emptyDocument('km'), 'photo', 'km')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('រូបថត និងឈ្មោះ')
  })

  it('adds a job, then removes it and brings it back with Undo', async () => {
    const user = userEvent.setup()
    renderStep(emptyDocument('en'), 'experience')
    await user.click(screen.getByRole('button', { name: 'Add entry' }))
    await user.type(screen.getByLabelText('Job title'), 'Cashier')
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Cashier')

    await user.click(screen.getByRole('button', { name: 'Remove: Cashier' }))
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull()

    await act(async () => user.click(screen.getByRole('button', { name: 'Undo' })))
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Cashier')
  })

  it('adds a skill from the suggestions', async () => {
    const user = userEvent.setup()
    renderStep(emptyDocument('en'), 'skills')
    await user.click(screen.getByRole('button', { name: 'Teamwork' }))
    expect(screen.getByRole('button', { name: 'Remove: Teamwork' })).toBeTruthy()
  })
})
