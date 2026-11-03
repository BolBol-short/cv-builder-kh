// Accessibility check (axe) of every screen, on a phone and on a desktop.
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { openExample } from './helpers.js'

const STEPS = ['style', 'photo', 'personal', 'summary', 'education', 'experience', 'skills', 'references', 'review']

async function expectNoViolations(page) {
  const results = await new AxeBuilder({ page }).analyze()
  const problems = results.violations.map((violation) => `${violation.id}: ${violation.nodes[0]?.target}`)
  expect(problems).toEqual([])
}

test('start screen', async ({ page }) => {
  await page.goto('/app.html')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expectNoViolations(page)
})

test('landing and privacy pages', async ({ page }) => {
  await page.goto('/')
  await expectNoViolations(page)
  await page.goto('/privacy.html')
  await expectNoViolations(page)
})

for (const lang of ['en', 'km']) {
  test(`every editor step in ${lang}`, async ({ page }) => {
    await openExample(page, lang)
    const reviewUrl = page.url()
    for (const step of STEPS) {
      await page.goto(reviewUrl.replace(/\/review$/, `/${step}`))
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expectNoViolations(page)
    }
  })
}
