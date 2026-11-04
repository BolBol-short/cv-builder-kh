---
type: roadmap
status: draft
tags: [rebuild, roadmap]
---

# Roadmap

Part of [[Plan]]. Sizes: S = a few days, M = 1 to 2 weeks, L = 2 to 4 weeks, at a part-time solo pace. Each phase ends with something you can run and check. Do not start a phase before the previous exit criteria are met.

## Phase 0 — Discovery and spikes (M)

| Task | Output |
|---|---|
| Collect 15 to 20 real Cambodian CVs and forms; fill the table in [[CV Spec]] | Final field and section list |
| Interview 5 job seekers; watch 3 people try to write a CV on a phone with any tool | Pain list, confirmed order of steps |
| **S1:** Khmer vector PDF test (react-pdf, pdf-lib+fontkit, WASM option) | Decision D3 in [[Plan]] |
| **S2:** IndexedDB + photo Blob prototype | Storage approach confirmed |
| **S3:** Clickable phone prototype of the step flow, tested on a low-end Android | Flow validated |
| Create the Vercel project; confirm `cv-builder.vercel.app` is free | D7, D9 done. D8 (no analytics) and D10 are already closed |
| **S4:** on a real iPhone: generated PDF downloads to Files, IndexedDB survives a week, Add to Home Screen works | iPhone behavior confirmed |

**Exit:** D3 (PDF engine) closed; baseline recorded; S1 result written in [[Technical Design]].

## Phase 1 — Foundation (M)

- Set up the app in the main folder (`src/`): JavaScript, Vite, Tailwind 4, ESLint, Prettier, Vitest, Playwright, CI.
- Vercel project connected, preview deploy per branch, `vercel.json` headers, no analytics enabled.
- Design tokens (color, type scale, spacing, focus ring), self-hosted subset fonts.
- i18n with `en` and `km` plus a test that both have the same keys; port the 105 strings from `v1/src/i18n/translations.js`.
- `normalizeDocument()`, `schemaVersion`; storage layer on IndexedDB with `saved/saving/failed` status.
- UI kit: Button, Field, Select, Dialog, Toast, Stepper, BottomBar.

**Exit:** a JSON backup file exports and imports, a document survives reload, passes unit tests and axe on the kit.

## Phase 2 — Guided editor (L)

- Step flow from [[Product]]: Start, Language and style, Photo and name, Contact and personal, Summary, Education, Experience, Skills and languages, References, Review.
- Tip and example for every field in Khmer and English.
- Photo circle crop (1:1), EXIF strip, resize.
- Month and year selects with Khmer names. Suggestion chips. Up/Down reorder. Undo toast.
- Review step with gap checklist and page count.
- Desktop two-pane layout and section side nav.
- Replace all `alert`/`confirm`.

**Exit:** a tester on a phone completes all steps without help; keyboard-only run works; no horizontal scroll at 320 px.

## Phase 3 — Templates and pagination (L)

- Shared primitives with `data-block`, `pageGeometry.js`, `pagination/`.
- Port Traditional (formal Cambodian) first, then Classic, Modern, Professional, Minimal.
- Khmer typography pass: line height, font pairing, Khmer digits and dates, long-name wrapping.
- Decide sidebar behavior on page 2 (see [[Print and PDF]], [[Gotchas and Backlog]]).
- Prune or merge templates against the Phase 0 samples (D6).
- Visual regression screenshots, Khmer and English fixtures, 1/2/3 page lengths.

**Exit:** each template renders correctly at one, two, and three pages in both languages; no split entries; thumbnails generated from real templates (replaces the hand-drawn `Thumb`).

## Phase 4 — Export and sharing (L)

- Implement the export path chosen by S1 (see [[Technical Design]]).
- Desktop: print path with a pre-print tip. Phone: direct PDF download.
- Web Share with file, image export, in-app-browser banner.
- Run the full device matrix, record results in this note.

**Exit:** success rate ≥ 98% over the matrix; Khmer text correct in all PDFs; file size under 2 MB for a two-page CV with photo.

## Phase 5 — PWA, landing page, hardening (M)

- Service worker, offline test, update toast, install prompt.
- Landing page (static, Khmer and English, real example screenshots), favicon, social preview, meta tags, sitemap.
- Privacy page (states there is no analytics), clear-all button, shared-device notice.
- iPhone Add-to-Home-Screen steps, last-saved display, backup nudge, "Report a problem" link.
- Accessibility pass with TalkBack and VoiceOver; fix findings.
- Performance pass to the budget; `size-limit` and Lighthouse CI on.

**Exit:** Lighthouse mobile perf ≥ 90 and a11y ≥ 95; works fully offline after first load; axe clean.

## Phase 6 — Beta and launch (M)

- Private beta with 10 real users; collect issues in a log.
- Fix top issues; native Khmer proofreading of all strings.
- Feature checklist below all checked.
- Remove `spikes/`, update `README.md` and this vault ([[File Map]], [[Overview]], [[Timeline]]); ask the owner whether to delete `v1/`.
- Deploy to Vercel production. There is no analytics, so collect feedback through the Report-a-problem link and follow-ups with beta users.

**Exit:** app live on Vercel, README and vault updated.

## Feature checklist (done when all true)

- [ ] English and Khmer UI; CV language separate from UI language
- [ ] All sections: personal, summary, experience, education, certifications, skills, languages, hobbies, links, references
- [ ] Gender, marital status, date and place of birth, nationality
- [ ] "Currently work/study here"
- [ ] Suggestion chips (skills, hobbies, languages)
- [ ] Reorder entries
- [ ] Photo upload
- [ ] Five templates (or a documented, approved reduction)
- [ ] Accent presets and custom color
- [ ] Live A4 preview with page-break markers
- [ ] Autosave; JSON export; import of a backup file; example CV; clear all
- [ ] Progress indicator
- [ ] Mobile edit/preview access
- [ ] Khmer digits, month names, line height, fonts
- [ ] PDF saved as a file on iPhone, Android, and desktop

## After launch (backlog, not scheduled)

More templates (users should have many designs to choose from). Nothing outside making CVs: no cover letters, forms or other documents (owner decision 2026-11-04).

## Learning path (one new idea per phase)

| Phase | New things to learn |
|---|---|
| 0 | Reading Cambodian CVs; trying small PDF experiments |
| 1 | Vite project setup, ESLint, Vitest basics, Vercel deploy |
| 2 | `useReducer`, IndexedDB with `idb-keyval`, accessible forms |
| 3 | CSS print rules, measuring elements with `getBoundingClientRect` |
| 4 | Blob downloads, the Web Share API, the chosen PDF library |
| 5 | Service workers through `vite-plugin-pwa`, Lighthouse |
| 6 | Playwright basics for the final checks |

Everything stays JavaScript and React. TypeScript can be added later, file by file, if you want it.

## Working rules

- Work in the main folder (`src/`). `v1/` was deleted on 2026-11-04 (git history keeps it).
- Update the matching vault note in the same change as the code ([[00 Home]]).
- Log decisions in [[Decisions]] with the reason.
- Keep each phase shippable; cut scope before adding time.
