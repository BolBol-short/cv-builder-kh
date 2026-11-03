// Screenshots of every template in both languages, so a change that breaks
// a layout shows up as a picture difference.
import { expect, test } from '@playwright/test'
import { chooseTemplate, openExample } from './helpers.js'

const TEMPLATE_NAMES = {
  en: ['Traditional', 'Classic', 'Modern', 'Professional', 'Minimal'],
  km: ['ប្រពៃណី', 'បុរាណ', 'ទំនើប', 'វិជ្ជាជីវៈ', 'សាមញ្ញ'],
}

for (const lang of ['en', 'km']) {
  TEMPLATE_NAMES[lang].forEach((templateName, index) => {
    test(`template ${index + 1} (${templateName}) in ${lang}`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'screenshots are taken on desktop only')
      await openExample(page, lang)
      await chooseTemplate(page, templateName)
      const pages = page.locator('main [data-page]')
      await expect(pages.first()).toBeVisible()
      await expect(pages.first()).toHaveScreenshot(`template-${index + 1}-${lang}.png`)
    })
  })
}
