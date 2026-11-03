---
type: build-plan
status: plan written; waiting for the owner's go-ahead (nothing built yet)
created: 2026-11-03
audience: the builder (Claude Opus 5.5, high effort) and the project owner
tags: [rebuild, build, plan]
---

# Build Plan

Executable plan for rebuilding CV-Builder. It turns [[Plan]], [[Product]], [[CV Spec]], [[Technical Design]], [[Roadmap]], and the court rulings in [[Solutions]] into ordered tasks with files and "done when" checks.

## 0. How the builder uses this plan

1. Read, in order: this note, [[Solutions]], [[Technical Design]], [[CV Spec]], [[Product]]. Read v1 in place (`v1/src/`, read-only) when porting (section 3: keep/change table and port map).
2. Work one phase at a time, in order. Do not start a phase before the previous phase's exit check passes.
3. Tasks marked **[OWNER]** need a real phone or a human decision. The builder prepares everything, tells the owner exactly what to do, and records the result in `vault/plan/Spike Results.md` before the dependent task.
4. At every gate (section 6), follow the default unless a recorded test result says otherwise.
5. After each phase: run `npm run lint`, the unit tests, and the build; update the matching vault notes ([[File Map]], [[Timeline]], [[Decisions]]); then report using the format in section 8.

## 1. Ground rules (binding, from the owner)

| Rule | Detail |
|---|---|
| Language | Plain JavaScript and React (JSX). **No TypeScript.** Use JSDoc `@typedef` for data shapes |
| Frontend only | No backend, serverless function, or database. Static build for Vercel |
| No analytics | No Vercel Analytics or Speed Insights, no tracking scripts, no third-party scripts at all |
| Data | CV data stays on the device. No account |
| Users | Cambodia, Khmer and English, mobile first (iPhone and Android), desktop too |
| iPhone | The user must be able to save the PDF into the Files app like a normal download |
| Owner | Solo, part-time, still learning JS and React. Prefer the smallest change that works. Explain new concepts in the report |
| Git and v1 | **Never commit, push, branch, or tag.** The owner commits. `v1/` is a read-only reference: never edit, build, import from, or delete it unless the owner says so |
| Quality | WCAG 2.2 AA, 44 px touch targets, 16 px minimum input text, `lang` attributes, no `alert`/`confirm` |
| Budget | Initial JS <= 200 KB gzip, lazy chunks <= 80 KB gzip, LCP <= 2.5 s on throttled mid-range Android (lab) |
| Honesty | Report what was run and what was not. Never claim a device result you did not get |
| Test devices | The owner has an iPhone only. Android is covered by a borrowed phone or beta testers and stays **unverified** until someone runs it |

## 2. Target layout

Build in the main folder (`src/`). There is no `v2/` folder. `v1/` stays beside it as a read-only reference until the owner says to delete it; the new app never imports from it. Root `index.html` points at `/v1/src/main.jsx` today and is repointed to `/src/main.jsx` in P0-02.

```
index.html                  app entry (repointed from v1 in P0-02)
vite.config.js              react + tailwind + pwa plugin, vitest block, second entry for spikes
public/                     favicon.svg, icons, fonts/, robots.txt
spikes/                     Phase 0 test page (separate entry; removed before launch)
e2e/                        Playwright tests
landing/                    static SEO page
src/
  main.jsx
  app/                      App shell, providers, step routing (URL hash)
  features/
    editor/                 steps/, fields/, guidance/, review/
    templates/              primitives/, pagination/, one file per template
    export/                 engine adapter, pdf, image, share, download, inAppBrowser
    storage/                db, schema (normalizeDocument), backup, documents list
    photo/                  PhotoCrop, process
  shared/                   ui/ (Button, Field, Select, Dialog, Toast, Stepper, BottomBar), format/, hooks/
  locales/                  en.js, km.js, guidance.en.js, guidance.km.js
  styles/                   tokens.css, print.css
```

Scripts in the root `package.json`: keep `dev`, `build`, `preview`, `lint`; add `test` (`vitest run`), `e2e` (`playwright test`), and `check` (lint, test, build).

Packages (JavaScript only). Add only when the task needs it:

| Need | Package | Phase |
|---|---|---|
| Unit and component tests | `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event` | 1 |
| Accessible dialog and toast | `@radix-ui/react-dialog`, `@radix-ui/react-toast` | 1 |
| Lint a11y | `eslint-plugin-jsx-a11y` | 1 |
| IndexedDB (skip if test T5 says localStorage is enough) | `idb-keyval` | 1 |
| Photo crop | `react-easy-crop` (lazy loaded) | 2 |
| Page to canvas | `html2canvas` (swap to `dom-to-image-more` if test T1 favors it) | 4 |
| PDF writer | `jspdf` or `pdf-lib`, whichever gives the smaller lazy chunk in test T6 | 4 |
| PWA | `vite-plugin-pwa` | 5 |
| E2E and a11y | `@playwright/test`, `@axe-core/playwright` | 5 |
| Bundle check | `rollup-plugin-visualizer`, `size-limit` | 4 |

Keep React 19, Vite, Tailwind 4 as in the root `package.json`. Check that each added package supports the installed React and Vite versions before installing.

## 3. Keep from v1, change from research

v1 is the reference. Keep what worked; change what the research and the court found weak.

| Area | Keep from v1 (file to read) | New in the rebuild (source) |
|---|---|---|
| Data and sections | `emptyCV` sections, option codes for gender / marital status / language level, defensive merge in `normalizeCV`, completeness score (`context/cvData.js`, `utils/cvFile.js`, `utils/cv.js`) | Khmer name and Latin name, current address, optional salary expectation ([[CV Spec]], Cambodian samples); `schemaVersion`; several saved CVs |
| Editor | Section content, the `fields` descriptor idea in `ObjectListField`, suggestion chips, Up/Down reorder, "currently here" (`components/ContentEditor.jsx`, `ObjectListField.jsx`, `StringListField.jsx`) | Guided step flow with a tip and example per field ([[Product]]), 44 px targets and 16 px inputs, month and year selects, Undo toast, accessible dialogs instead of `alert`/`confirm` |
| Photo | Resize to 600 px JPEG q0.85 (`components/PhotoPicker.jsx`) | Circle photo with a 1:1 round crop on every template ([[CV Spec]]), EXIF-safe re-encode, Blob storage |
| Languages | `makeT` with English fallback, UI language separate from CV language, 105 strings, Khmer months and digits, Khmer line height (`i18n/translations.js`, `utils/format.js`, `index.css`) | Key-parity test, guidance strings in Khmer and English |
| Templates | Five designs, shared building blocks, the Traditional Cambodian layout, `--accent` variable (`templates/*`) | `data-block` primitives, shared page geometry, thumbnails from the real templates, contrast warning, check against real Cambodian CVs |
| Preview | True-size A4 scaled to fit, page-break markers (`components/Preview.jsx`) | One source of truth for break offsets, full-screen preview sheet on phones |
| Export | (print dialog only) | A generated PDF file saved to Files ([[Solutions]]), image export, in-app browser banner |
| Storage | 500 ms debounced autosave, try/catch on quota, JSON export and import (`utils/cvFile.js`) | IndexedDB with `persist()`, honest save status, backup reminder, iPhone storage-wipe mitigation, clear-all |
| Build and quality | Vite, React, Tailwind 4, ESLint | Vitest, Playwright, axe, size budgets, Vercel headers, offline PWA, landing and privacy pages ([[Technical Design]]) |

### Port map (reuse v1's code, do not rewrite from scratch)

| v1 file (in `v1/src/`) | New destination | Change |
|---|---|---|
| `utils/cv.js` list ops, factories, `makeId` | `shared/format/lists.js`, `features/editor/factories.js` | Keep logic and tests; add new fields |
| `utils/format.js` (months, Khmer digits, `toBullets`, `personalFacts`, `sectionsWithContent`, `contactItems`) | `shared/format/index.js` | Keep; add unit tests |
| `i18n/translations.js` (105 keys, `makeT`, `optionLabel`) | `locales/en.js`, `locales/km.js`, `shared/i18n.js` | Split per language; add a key-parity test |
| `constants/options.js`, `constants/sampleCV.js` | `features/editor/options.js`, `features/editor/sampleCV.js` | Keep; update sample to new fields |
| `context/cvData.js` (`emptyCV`) | `features/storage/schema.js` | Add `nameKm`, `nameLatin`, `addressCurrent`, optional `salaryExpectation`; JSDoc typedef |
| `utils/cvFile.js` (normalize, export, import) | `features/storage/schema.js`, `backup.js` | `normalizeDocument()`; no compatibility with old files needed |
| `templates/*` and `shared.jsx` | `features/templates/*` | Rebuild on primitives with `data-block`; keep the five designs |
| `components/Icon.jsx` | `shared/ui/Icon.jsx` | Keep; add a dev warning for unknown names |
| `components/ObjectListField.jsx`, `StringListField.jsx`, `CustomizedInput.jsx` | `shared/ui` and `features/editor/fields` | Restyle for 44 px targets, 16 px text |
| `index.css` print rules | `styles/print.css` | Values come from `pageGeometry.js` |

## 4. Phases

Each task: **ID**, task, files, **Done when**. Tests are part of "done".

### Phase 0: Decide with evidence (iPhone needed)

Goal: settle the open gates in [[Solutions]] with real tests. The builder writes the test page; the owner runs it on the iPhone; Android testers run the same page and send a screenshot.

| ID | Task | Files | Done when |
|---|---|---|---|
| P0-01 | **[OWNER] Done 2026-11-03.** Answers: a real PDF download, no server (A1 stays dismissed); devices: iPhone only. Record the iOS version when known | `plan/Spike Results.md` | Recorded |
| P0-02 | Read v1 in place for reference (read-only). Set up the new app in the main folder: create `src/main.jsx`, repoint root `index.html` to `/src/main.jsx`, add the `spikes/` entry in `vite.config.js` | `src/main.jsx`, `index.html`, `vite.config.js` | `npm run dev` shows a page; `v1/` untouched |
| P0-03 | Spike page with a shared Khmer/Latin stress string (stacked subscripts and vowels, one long unbroken Khmer line, a Latin line, digits). Each test prints PASS/FAIL text so a tester can screenshot it | `spikes/index.html`, `spikes/spikes.js` | Opens on desktop and phone |
| P0-04 | T1: html2canvas and dom-to-image of the stress block at scale 2 with Khmer `letter-spacing: 0`, into a PDF; show DOM and PDF side by side | `spikes/t1.js` | Both shown with on-screen instructions |
| P0-05 | T3: four buttons: blob + `a[download]` (application/pdf), octet-stream re-typed blob, JSON backup download, Web Share with file (immediate, 3-second delay, two-tap) | `spikes/t3.js` | Each button reports success/failure on screen |
| P0-06 | T5: idb-keyval write/read, `navigator.storage.persist()`, a typical phone photo as base64 in localStorage and in IndexedDB | `spikes/t5.js` | Page prints each result and any `QuotaExceededError` |
| P0-07 | T6: lazy chunk size (bundle visualizer) and a 3-page export at scale 2 | build output, `spikes/t6.js` | Sizes and result recorded |
| P0-08 | T8: gzip sizes of full Kantumruy Pro, Moul, Inter; throttled-4G LCP lab run | `plan/Spike Results.md` | Numbers recorded |
| P0-09 | T2 (only if T1 fails on a phone): the same string through react-pdf, pdfmake, and pdf-lib + fontkit with an `Intl.Segmenter('km')` line-break pre-pass | `spikes/t2.js` | Result recorded |
| P0-10 | T4 and T7: a "Print" button on the spike page (`window.print()`) so the owner can count taps to Files on iPhone; written steps to open the deployed link inside Facebook, Messenger, Telegram | `spikes/index.html`, `Spike Results.md` | Observations recorded |
| P0-11 | **[OWNER]** Deploy to a Vercel preview URL; run T1, T3, T4, T5, T7, T8 on the iPhone and on desktop | `Spike Results.md` | Each test marked pass/fail with the iOS version |
| P0-12 | **[OWNER]** Ask two or more people with Android phones (friends, family, beta users) to open the link and send a screenshot of the results (T1, T6, T7). Until then Android stays unverified; Playwright Chromium mobile emulation is a stopgap, not proof | `Spike Results.md` | Android results recorded, or listed as unverified |
| P0-13 | Apply the gates in section 6 and write the outcome in [[Decisions]] | `Decisions.md` | Each gate has a recorded choice |

**Exit check:** `Spike Results.md` filled; every gate in section 6 decided; if T3 failed on every route, stop and tell the owner before Phase 1.

### Phase 1: Foundation

| ID | Task | Files | Done when |
|---|---|---|---|
| P1-01 | Tooling: ESLint (flat) for the project with react-hooks, react-refresh, jsx-a11y; Prettier; Vitest + jsdom + Testing Library | config files, `package.json` | `npm run lint` and `npm run test` pass on a sample test |
| P1-02 | Design tokens: color, type scale, spacing, focus ring, radius. Accent stays a CSS variable `--accent` | `styles/tokens.css` | Used by one sample component |
| P1-03 | Fonts per gate E4: self-host WOFF2 for Inter, Kantumruy Pro, Moul from OFL sources; `font-display: swap`; Moul loaded only for the formal Khmer template; remove Google Fonts | `public/fonts/`, `styles/tokens.css` | No request to Google; Khmer shows with the system font before load |
| P1-04 | i18n: `makeT`, `useI18n`, UI language vs CV language, `en.js`/`km.js` ported from the old app | `locales/`, `shared/i18n.js` | Test: `en` and `km` have identical key sets |
| P1-05 | Page geometry: one module with A4 size, margins, `mm` to px, first-page vs later-page heights | `features/templates/pagination/pageGeometry.js` | Unit tests for conversions; old-app numbers (794 px, 1085 px, 12 mm, 10 mm) reproduced |
| P1-06 | Data model: JSDoc typedefs, `emptyDocument()`, `normalizeDocument()` (defensive merge like the old `normalizeCV`), `schemaVersion: 1` | `features/storage/schema.js` | Tests: missing fields, wrong types, extra fields, huge strings |
| P1-07 | Storage layer: documents list, open/save/delete, autosave debounce 500 ms, status `saved \| saving \| failed`; IndexedDB (or localStorage per gate); `navigator.storage.persist()` request | `features/storage/db.js` | Tests with a fake store; failure sets `failed` |
| P1-08 | Backup export/import of a JSON file with validation and a size limit | `features/storage/backup.js` | Round-trip test; bad file shows an error key, not a crash |
| P1-09 | UI kit: Button, Field (label, hint, error with `aria-describedby`), Select (native), MonthYearSelect (Khmer month names), Dialog and Toast (Radix), Stepper, BottomBar, ConfirmDialog with Undo toast | `shared/ui/` | Component tests; axe clean on a kit demo page |
| P1-10 | Vercel config: static build, headers (CSP, `nosniff`, referrer policy, cache rules), no analytics | `vercel.json` | Preview deploy builds; headers present |
| P1-11 | CI-style script: lint, test, build in one command | `package.json` `check` | Passes locally |

**Exit check:** `check` passes; kit demo has zero axe violations; fonts self-hosted; data model and storage tested.

### Phase 2: Guided editor

| ID | Task | Files | Done when |
|---|---|---|---|
| P2-01 | Document state: `useReducer` plus context; actions are plain objects with a `type` string, listed in one file | `app/documentContext.js` | Reducer tests for every action |
| P2-02 | Step flow with URL hash routing: Start, Language and style, Photo and name, Contact and personal, Summary, Education, Experience, Skills and languages, References, Review | `features/editor/steps/*` | Back/Next works; reload returns to the same step |
| P2-03 | Start screen: new CV, open saved CV, open backup file, example CV; choose CV language and template; privacy line "stays on your device" | `steps/Start.jsx` | Works with keyboard only |
| P2-04 | Guidance content: for every field a label, one-line tip, one example, in `en` and `km` (start from [[CV Spec]]) | `locales/guidance.*.js` | A test fails if any field lacks guidance in either language |
| P2-05 | Personal fields: Khmer name, Latin name, gender, date of birth (date select), place of birth, nationality (datalist), marital status, phone (`inputmode="tel"`, +855 hint), email, address, links | `steps/Personal.jsx`, `fields/` | `autocomplete` and `inputmode` set; 16 px text |
| P2-06 | List sections (experience, education, certifications, languages, references) with Up/Down reorder, delete with Undo toast, "currently here" | `fields/ObjectList.jsx` | Delete then Undo restores; focus handled |
| P2-07 | String lists (skills, hobbies, links) with suggestion chips per CV language | `fields/StringList.jsx` | Enter adds; chip tap adds; duplicates blocked |
| P2-08 | Photo: file picker, EXIF-safe re-encode via canvas, square 1:1 crop with a round mask (`react-easy-crop`, `cropShape="round"`, lazy), stores Blob and crop; remove photo | `features/photo/*` | Rotated phone photo shows upright; circle crop saved |
| P2-09 | Review step: gap checklist ("No phone number yet"), page count, link to jump to a step | `steps/Review.jsx` | Gaps update live |
| P2-10 | Layout: phone = one step per screen with sticky bottom bar and full-screen preview sheet; desktop (>= 1024 px) = two panes with live preview and section side nav | `app/Shell.jsx` | No horizontal scroll at 320 px; targets >= 44 px |
| P2-11 | Save-status live region, last-saved time, backup nudge (max once per 30 days, dismissible), "Clear everything on this device" | `app/SaveStatus.jsx` | `aria-live` announces `saved`/`failed`; failed shows a "Download backup" action |

**Exit check:** a tester completes every step on a phone without help (owner or friend, no real personal data); keyboard-only run works; axe clean on each step; autosave survives reload.

### Phase 3: Templates and pagination

| ID | Task | Files | Done when |
|---|---|---|---|
| P3-01 | Primitives with `data-block` on every unit that must not split: `Page`, `Section`, `Entry`, `TableRow`, `Photo` (always a circle), `Bullets`, `Tags`, `ContactList` | `features/templates/primitives/` | Component tests |
| P3-02 | Pagination: measure `[data-block]` elements, compute break offsets for first and later pages using `pageGeometry.js`, render each page as a fixed A4 container | `pagination/paginate.js`, `PagedDocument.jsx` | Unit tests with fake heights: never splits a block, never leaves a heading alone |
| P3-03 | Preview: scales true-size pages to fit; page-break markers come from the same offsets | `Preview.jsx` | Preview and paginated output agree |
| P3-04 | Traditional (formal Cambodian) template first: title, circle photo top-right, colon-aligned table, numbered sections | `templates/Traditional.jsx` | Khmer and English fixtures render; 1, 2, 3 page lengths |
| P3-05 | Port Classic, Modern, Professional, Minimal onto the primitives | `templates/*.jsx` | Same checks. For sidebars, decide per template whether the colored column repeats on page 2 |
| P3-06 | Khmer typography pass: line height 1.7+, `lang` on Khmer spans, long-name wrapping, mixed Khmer/Latin balance | `styles/`, templates | Visual check on the fixtures |
| P3-07 | Design panel: template thumbnails generated from the real templates at small scale (replace hand-drawn `Thumb`), accent presets plus custom, font size, density | `features/editor/DesignPanel.jsx` | Adding a template needs no thumbnail code |
| P3-08 | Accent contrast check: warn when text on the accent color fails 4.5:1 | `shared/format/contrast.js` | Unit test with known pairs |
| P3-09 | Visual regression screenshots of every template x language x page length | `e2e/templates.spec.js` | Baselines stored |

**Exit check:** each template correct at 1, 2, and 3 pages in both languages; no split entries; the pagination overlay on the Phase 0 print comparison matches for one 2-page Khmer CV (this decides whether the Print button is kept, per gate A7a).

### Phase 4: Export and sharing

Build behind an engine adapter so the PDF engine can change without touching the UI: `exportPdf(pageNodes, options) -> Promise<Blob>`.

| ID | Task | Files | Done when |
|---|---|---|---|
| P4-01 | Engine adapter plus the A2 implementation: lazy `import()` on tap, render one page at a time at scale 2, JPEG about 0.85, Khmer `letter-spacing: 0`, release canvases after each page | `features/export/engine.js`, `canvasPdf.js` | Unit test with a stub; 3-page export does not crash on the oldest test phone |
| P4-02 | Download path per gate B1: Blob `application/pdf` with `a[download]`; if T3 says so, the octet-stream re-typed blob | `export/download.js` | iPhone: file lands in Files (owner confirms) |
| P4-03 | Share path per gate B2 if chosen: two-tap design ("Create PDF", then visible "Save to Files" calling `share({files})`), ignore `AbortError` | `export/share.js` | Falls back to download when `canShare` is false |
| P4-04 | Image export (PNG/JPEG per page) for chat apps | `export/image.js` | Works on phone |
| P4-05 | File name from the person's name, e.g. `CV-Sok-Dara.pdf`; progress state announced with `aria-live`; clear error text | `export/ExportPanel.jsx` | Name sanitized; error path tested |
| P4-06 | In-app browser detection (Facebook, Messenger, Telegram, others) and "Open in your browser" banner with steps and a copy-link button | `export/inAppBrowser.js` | Unit tests with sample user-agent strings; banner dismissible |
| P4-07 | Desktop Print button only if the Phase 3 overlay matched and test T1 asked for it; otherwise skip | `export/print.js` | Decision noted in [[Decisions]] |
| P4-08 | Bundle check: lazy chunk <= 80 KB gz, initial JS <= 200 KB gz | `size-limit` config | Fails the build over budget |
| P4-09 | **[OWNER]** Device matrix run: iOS Safari on the owner's iPhone, Android Chrome and Samsung Internet through a borrowed phone or beta testers (mark unverified if nobody runs them), desktop Chrome/Edge/Firefox, Facebook and Telegram viewers | `Spike Results.md` or `Device Matrix.md` | Success on >= 98% of runs; Khmer correct everywhere; file under 2 MB for a 2-page CV with photo |

**Exit check:** device matrix recorded; any failure has a decision (fix, fallback, or documented limit).

### Phase 5: PWA, landing page, hardening

| ID | Task | Files | Done when |
|---|---|---|---|
| P5-01 | PWA: `vite-plugin-pwa`, precache shell, fonts, locales; manifest and icons; update toast (never reload mid-edit) | `vite.config.js`, `public/` | Works offline after first load |
| P5-02 | Install help: Android prompt on the Review step; iPhone steps (Share, Add to Home Screen) | `app/InstallHelp.jsx` | Shows only on the right platform |
| P5-03 | Landing page, Khmer and English: what it is, example screenshots, "stays on your device", start button; `lang`, meta tags, social preview, sitemap, robots, real favicon | `landing/`, `public/` | Lighthouse SEO >= 90 |
| P5-04 | Privacy page: no analytics, what is stored, how to clear it | `landing/privacy` | Linked from Start and footer |
| P5-05 | "Report a problem" link (mailto or GitHub issue) prefilled with browser, app version, template; never CV content; shown to the user before sending | `app/ReportProblem.jsx` | Test confirms no CV fields in the prefill |
| P5-06 | Accessibility pass: axe in Playwright on every step and template, keyboard run, 200% text and 320 px, reduced motion, TalkBack/VoiceOver notes | `e2e/a11y.spec.js` | Zero violations; manual notes in vault |
| P5-07 | Performance pass: Lighthouse mobile on a throttled profile; lazy-load check; fix to budget | build reports | Performance >= 90, accessibility >= 95; LCP <= 2.5 s lab |
| P5-08 | Security pass: CSP verified, imported file limits, no `dangerouslySetInnerHTML`, links `rel="noopener noreferrer"`, EXIF location stripped | review notes | Checklist ticked |

**Exit check:** offline works; budgets met; privacy page live; report link tested inside the Facebook viewer (test T7).

### Phase 6: Beta and launch

| ID | Task | Files | Done when |
|---|---|---|---|
| P6-01 | **[OWNER]** Private beta with about 10 real users (include at least 2 with Android) and a 5-step script with a sample CV (no real data); collect issues | `plan/Beta Log.md` | Issues triaged |
| P6-02 | Fix top issues; message five beta users and count replies after a week | Beta Log | Top issues closed |
| P6-03 | Feature checklist (section 7) all ticked | [[Roadmap]] | Every box checked with a note |
| P6-04 | Remove `spikes/` and test-only code; `npm run check` passes from a clean install; ask the owner whether to delete `v1/` (delete only on a yes) | repo | Passes |
| P6-05 | Update `README.md` and the vault: [[Overview]], [[File Map]], [[Architecture]], [[Data Model]], [[Timeline]]; remove the "v1 note" banners where a note now describes the new code | vault | Notes match the code |
| P6-06 | **[OWNER]** Deploy to Vercel production; project name `cv-builder` (address `cv-builder.vercel.app` if free) | Vercel | Live; Lighthouse re-run |

## 5. Test plan

| Level | What | Tool |
|---|---|---|
| Lint | Style, hooks, a11y rules | ESLint + jsx-a11y |
| Unit | `normalizeDocument`, list ops, `formatRange`, `toBullets`, Khmer digits, pagination math, `pageGeometry`, in-app UA detection, contrast, key parity | Vitest |
| Component | Stepper, fields, dialogs, undo, export panel states | Testing Library |
| E2E | Create a CV, reload, export; mobile viewport; WebKit and Chromium | Playwright |
| A11y | axe on every step and template | `@axe-core/playwright` |
| Visual | Template x language x page length screenshots | Playwright |
| Budget | Bundle sizes, Lighthouse | `size-limit`, Lighthouse |
| Real devices | iPhone (owner); Android through borrowed phone or beta testers; in-app viewers | Owner, Phase 0 and 4 |

Playwright WebKit is a complement, not proof of iPhone behavior (court ruling F3).

## 6. Gates (from [[Solutions]])

| Gate | Default | Change when |
|---|---|---|
| Export engine | A2 canvas to image PDF | T1 fails on a phone: run T2 and switch to the passing vector library; T1 fails on desktop only: add the Print button |
| iPhone save path | B1 download | T3: download fails and share works: B2 |
| Storage | IndexedDB | T5: photo fits localStorage: drop `idb-keyval` |
| Viewer banner | C1 | T7: export works in all three viewers: skip the banner |
| Fonts | E4 full files, Moul lazy | T8: LCP over 2.5 s: use subsets |
| Print-only (A1) | Dismissed (closed: owner wants a real download, no server) | Not reopened |
| If T3 fails on every route | Stop | Tell the owner; the iPhone export is unsolved |

## 7. Feature checklist (done when all true)

From [[Roadmap]], plus the court's conditions:

- [ ] English and Khmer UI; CV language separate
- [ ] All sections and fields, plus Khmer/Latin name and address
- [ ] Gender, marital status, date and place of birth, nationality
- [ ] "Currently here" on jobs and study
- [ ] Suggestion chips; reorder; delete with undo
- [ ] Photo upload with a circle crop, shown as a circle on every template
- [ ] Five templates (or an approved reduction recorded in [[Decisions]])
- [ ] Accent presets and custom color; page-break markers in preview
- [ ] Autosave with honest status; backup export/import; example CV; clear all
- [ ] Progress or gap indicator
- [ ] Phone editing and preview; two-pane desktop
- [ ] Khmer digits, month names, line height, fonts
- [ ] PDF saved as a file on iPhone, Android, and desktop; Khmer correct
- [ ] Offline after first load; install help; landing and privacy pages
- [ ] Budgets met; axe clean; no analytics; no third-party requests
- [ ] Device matrix recorded (Phase 4)

## 8. Report format after each phase

1. What was built (task IDs).
2. Checks run, with results: lint, tests, build, bundle sizes. Say what was not run.
3. Gates affected and the choice taken.
4. What the owner must do next (devices, decisions).
5. New concepts used, one line each, for the owner's learning.
6. Vault notes updated.

## 9. When to stop and ask the owner

- A gate has no recorded test result and the default looks wrong.
- T3 fails everywhere.
- A change would break a binding rule in section 1.
- A package would add a backend, analytics, or TypeScript.
- Deleting or moving files other than those a task names. Never delete `v1/` without a yes.
- A Khmer wording question that the English text cannot settle.
