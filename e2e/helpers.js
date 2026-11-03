// Shared steps for the browser tests.

const EXAMPLE_BUTTON = { en: 'Try an example CV', km: 'សាកល្បង CV គំរូ' }

// Opens the app in a clean state, switches the app language, and loads the example CV.
// Ends on the Review step.
export async function openExample(page, lang = 'en') {
  await page.goto('/app.html')
  if (lang === 'km') await page.getByRole('button', { name: 'ខ្មែរ', exact: true }).click()
  await page.getByRole('button', { name: EXAMPLE_BUTTON[lang] }).click()
  await page.waitForURL(/#\/edit\/.+\/review$/)
  await page.evaluate(() => document.fonts.ready)
}

// Changes the CV design through the Style step, then returns to Review.
export async function chooseTemplate(page, templateName) {
  const url = page.url()
  await page.goto(url.replace(/\/review$/, '/style'))
  // force: the real radio is hidden under its card, which receives the tap
  await page.getByRole('radio', { name: templateName }).check({ force: true })
  await page.goto(url)
  await page.evaluate(() => document.fonts.ready)
}
