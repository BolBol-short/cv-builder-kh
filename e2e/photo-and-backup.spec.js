// Photo crop and backup files, in a real browser.
import { expect, test } from '@playwright/test'
import { openExample } from './helpers.js'

test('choose a photo, crop it, and see it as a circle', async ({ page }) => {
  await openExample(page, 'en')
  await page.goto(page.url().replace(/\/review$/, '/photo'))
  await page.getByLabel('Choose photo').setInputFiles('public/icon-512.png')
  await page.getByRole('button', { name: 'Use this photo' }).click()
  const photo = page.getByRole('img', { name: 'Photo' })
  await expect(photo).toBeVisible()
  expect(await photo.getAttribute('src')).toMatch(/^data:image\/jpeg/)
})

test('download a backup file and open it again', async ({ page }, testInfo) => {
  await openExample(page, 'en')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download backup file' }).first().click(),
  ])
  expect(download.suggestedFilename()).toBe('CV-Sok-Dara.json')
  const backupPath = testInfo.outputPath('backup.json')
  await download.saveAs(backupPath)

  await page.goto('/app.html')
  await page.getByLabel('Open a backup file').setInputFiles(backupPath)
  await page.waitForURL(/#\/edit\/.+\/review$/)
  await page.goto('/app.html')
  // The example and the opened backup are now two saved CVs with the same name.
  await expect(page.getByRole('link', { name: /Sok Dara/ })).toHaveCount(2)
})
