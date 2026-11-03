// After one visit, the editor must open without internet (checked on the real built site).
import { expect, test } from '@playwright/test'

test('the editor works offline after the first visit', async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one browser is enough for this check')
  await page.goto('http://localhost:4179/app')
  await page.evaluate(() => navigator.serviceWorker.ready) // wait until the app is saved for offline use
  await page.reload() // the offline helper now controls the page

  await context.setOffline(true)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.getByRole('button', { name: 'Try an example CV' }).click()
  await expect(page).toHaveURL(/#\/edit\/.+\/review$/)
  await context.setOffline(false)
})
