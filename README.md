# CV-Builder (Cambodia based)

A free, frontend-only web app for making a CV (Curriculum Vitae) the way Cambodian employers expect it, in Khmer or English, on a phone or a computer. The user fills in short guided steps and downloads the CV as a PDF. No account, no server, no analytics: the CV stays on the user's device.

- **Objective:** a fully frontend website where anyone can create their own work CV.
- **Motivation:** some people don't have time to write a CV, some don't know where to make one, and some (like me) need instructions on what to fill in.
- **Start date:** 23 July 2026. Rebuilt in November 2026 (version 2).
- **Terms of use:** use it to make CVs. Any inappropriate use is not the author's responsibility.

## Features

- Guided editor in nine steps, with a tip and a realistic example for every field.
- English and Khmer app, and a separate CV language (a Khmer app can make an English CV).
- Ten designs, including the formal Cambodian "ប្រវត្តិរូបសង្ខេប" layout. The profile photo is always a circle.
- Live A4 preview with clean page breaks (no entry is cut in half).
- PDF download that works on phones (on iPhone it goes to the Files app), plus page pictures for chat apps.
- Saved automatically on the device, several CVs at once, backup files you can keep, an example CV.
- Works offline after the first visit, and can be added to the Home Screen.
- Built for accessibility (WCAG 2.2 AA checks in the tests) and for slow phones (small download).

## Tech

React 19 and plain JavaScript (no TypeScript), Vite, Tailwind CSS 4 with three colors only (ink, paper, accent), IndexedDB through `idb-keyval`, `html2canvas-pro` for drawing PDF pages, `vite-plugin-pwa` for offline use. Hosted on Vercel as a static site.

## Getting started

```
npm install
npm run dev
```

Then open http://localhost:5173/app.html for the editor (http://localhost:5173/ is the landing page).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Unit and component tests (Vitest) |
| `npm run e2e` | Browser tests (Playwright). First time: `npx playwright install chromium` |
| `npm run check` | Lint, tests, build and the download-size check, all at once |
| `npm run format` | Prettier |

## Project layout

```
index.html, privacy.html   static landing and privacy pages
app.html                   the editor page
src/
  App.jsx                  picks the language and the screen
  app/                     app shell: header, routing, CV state, save status, install and update prompts
  features/editor/         the guided steps, list fields, tips, example CV
  features/templates/      the ten CV designs and page splitting
  features/export/         PDF and picture download, share, in-app browser warning
  features/storage/        data shape, saving on the device, backup files
  features/photo/          photo choose and circle crop
  shared/                  translation helper, formatting, small UI components
  locales/                 all English and Khmer text
e2e/                       browser tests
spikes/                    Phase 0 device test page (removed before launch)
v1/                        the first version, kept as a read-only reference
vault/                     project notes and the rebuild plan (open in Obsidian)
```

## Deploying

Push to GitHub and import the repository in Vercel (framework preset: Vite). `vercel.json` sets the security headers and clean URLs (`/app`, `/privacy`).

## Documentation

The plan, decisions and test results live in `vault/` (start at `vault/00 Home.md`; the task list is `vault/plan/Build Plan.md`).
