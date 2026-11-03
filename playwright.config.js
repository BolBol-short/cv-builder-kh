// Browser tests (e2e/ folder). Run with: npm run e2e
// The first run creates the screenshot baselines: npm run e2e -- --update-snapshots
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  timeout: 60_000,
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  use: { baseURL: 'http://localhost:5179' },
  webServer: [
    // Development server, used by most tests.
    { command: 'npx vite --port 5179 --strictPort', url: 'http://localhost:5179/app.html', reuseExistingServer: true },
    // The real built site (with the offline helper), used by offline.spec.js.
    {
      command: 'npx vite build && npx vite preview --port 4179 --strictPort',
      url: 'http://localhost:4179/app.html',
      reuseExistingServer: true,
      timeout: 180_000,
    },
  ],
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
})
