// The real PDF download: create the PDF, download it, check the file.
import { expect, test } from '@playwright/test'
import { openExample } from './helpers.js'

test('downloads a PDF of the example CV', async ({ page }) => {
  await openExample(page, 'km')
  await page.getByRole('button', { name: 'បង្កើត PDF' }).click()
  const downloadButton = page.getByRole('button', { name: 'ទាញយក PDF' })
  await expect(downloadButton).toBeVisible({ timeout: 30_000 })

  const [download] = await Promise.all([page.waitForEvent('download'), downloadButton.click()])
  expect(download.suggestedFilename()).toBe('CV-Sok-Dara.pdf')

  const stream = await download.createReadStream()
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  const pdf = Buffer.concat(chunks)
  expect(pdf.subarray(0, 8).toString()).toBe('%PDF-1.4')
  expect(pdf.length).toBeLessThan(2 * 1024 * 1024) // under 2 MB
})
