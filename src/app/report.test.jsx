import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { I18nContext, makeT } from '../shared/i18n.js'
import { ReportProblemLink } from './ReportProblemLink.jsx'

describe('Report a problem link', () => {
  it('fills in the app version, browser and template, and nothing else', () => {
    render(
      <I18nContext.Provider value={{ lang: 'en', t: makeT('en') }}>
        <ReportProblemLink templateId="modern" />
      </I18nContext.Provider>,
    )
    const href = decodeURIComponent(screen.getByRole('link', { name: 'Report a problem' }).getAttribute('href'))
    expect(href).toContain('App version: 2.0.0')
    expect(href).toContain('Template: modern')
    // The link component never receives CV data, so names, phones or emails cannot leak into it.
    expect(href).not.toMatch(/@|Sample Name|\+855/)
  })
})
