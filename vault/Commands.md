---
type: reference
updated: 2026-11-04
---

# Commands

Run from the project folder.

```
npm install
npm run dev        # development server, editor at http://localhost:5173/app.html
npm run build      # production build into dist/
npm run preview    # serve the build
npm run lint       # ESLint
npm test           # unit and component tests (Vitest)
npm run e2e        # browser tests (Playwright); first time: npx playwright install chromium
npm run check      # lint + tests + build + download-size check
npm run format     # Prettier
```

After changing a template's look: `npm run e2e -- --update-snapshots`.

## Git

The builder commits each phase with `git add` and `git commit` only. The owner pushes.
