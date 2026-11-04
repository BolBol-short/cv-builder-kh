---
type: plan
status: draft
created: 2026-11-03
tags: [rebuild, plan]
---

# Rebuild Plan (hub)

Rebuild CV Builder as an easy, accessible, mobile-first web app that produces Cambodian-style CVs. The first version (`v1/`) was used as the reference and deleted on 2026-11-04 (git history keeps it, commit `62f39be`). The app lives in the main folder (`src/`).

Sub-notes: [[Product]] · [[CV Spec]] · [[Technical Design]] · [[Roadmap]]. Current state: [[Overview]], [[Gotchas and Backlog]].

## Vision

Anyone in Cambodia can make a proper CV on a phone in about ten minutes, in Khmer or English, get a PDF they can send or print, and never need an account.

## Goals

1. **Easy:** guided, step by step, with plain examples at each field (the original motivation: "some people need instructions on where to complete").
2. **Accessible:** WCAG 2.2 AA, large touch targets, works with a keyboard and a screen reader, readable Khmer.
3. **Mobile and desktop:** designed phone first; desktop gets a side-by-side editor and preview.
4. **Cambodian CV type:** layouts and fields follow real Cambodian CVs and application forms. See [[CV Spec]].
5. **Reliable export:** a PDF download that works on Android and iOS, with correct Khmer. This is the biggest gap in the old app. See [[Technical Design]].
6. **Private and free:** data stays on the device. No account and no backend of any kind.

## Non-goals (for the first release)

A backend or database, accounts and cloud sync, payments, job board, AI writing, a recruiter side, languages beyond Khmer and English, native apps.

## What was wrong with the old app (audit)

| Area | Problem | Evidence |
|---|---|---|
| PDF on phones | Export is `window.print()`. iOS Safari has no direct "Save as PDF" from the print call; users reach a PDF through the print preview and share sheet. Android works but the dialog asks for paper size and "Headers and footers" settings | [[Print and PDF]]; sources in [[Technical Design]] |
| Guidance | Long accordion form with a few hints; no examples, no order, no "what do I write here" | `ContentEditor.jsx` |
| Mobile editor | Edit/Preview toggle only. Touch targets, input font size, keyboard behavior, native month pickers not designed for | `App.jsx`, `ObjectListField.jsx` |
| Storage | One CV, `localStorage` (about 5 MB), photo stored as base64. "Auto-saved" label is shown even if saving failed | [[Persistence]] |
| Photo | Resized but not cropped. No crop control, and `object-cover` crops from the center. The rebuild shows the photo as a circle with a round crop | `PhotoPicker.jsx`, `Photo` in `shared.jsx` |
| Accessibility | Never audited. `alert()` and `confirm()` for errors and destructive actions. No live region for save status | App-wide |
| Offline and install | No PWA. Fonts load from Google Fonts CDN | `index.html` |
| Discoverability | No landing page or SEO content. `/favicon.svg` 404s | `index.html` |
| Quality | Plain JS, no tests, print constants duplicated in three files | [[Gotchas and Backlog]] |
| Templates | Only Traditional follows the formal Cambodian layout. Sidebar templates across page 2 untested | [[Templates]] |

## Assumptions (to confirm with real data)

These come from the senior-frontend checklist. Each must be confirmed or replaced in Phase 0.

1. **Primary device:** mid-range Android phone on 4G, plus desktop/laptop at schools and shops. Internet use in Cambodia was 12.0 million people (67.3%) at the end of 2025 and 21.7 million cellular connections, so mobile is the main path. I found no source for the Android versus iOS split. With no analytics (D8), learn it from beta users and by asking.
2. **LCP target:** 2.5 s at p75 on that device.
3. **SEO:** the landing page needs it (Khmer and English search); the editor does not.
4. **WCAG target:** 2.2 AA. Accessibility owner: you (BolBol) until someone else is named.

## Key decisions

| # | Decision | Recommendation | Status |
|---|---|---|---|
| D1 | Language | Plain JavaScript (ES modules) with React. No TypeScript. Data shapes documented with JSDoc comments | **Decided 2026-11-03** |
| D2 | Framework | Frontend only: Vite + React + Tailwind 4. No Next.js, no backend, no database | **Decided 2026-11-03** |
| D3 | PDF engine | Generate a real PDF file and download it. iPhone users save it to the Files app like any download. Engine picked after spike S1; fallback is an image PDF | **Open (engine only)** |
| D4 | Storage | IndexedDB (multi-CV, photo as Blob), `localStorage` only for small prefs | Proposed |
| D5 | Offline | PWA, self-hosted subset fonts | Proposed |
| D6 | Templates | Port all 5, then validate and prune against real Cambodian CV samples | Proposed |
| D7 | Hosting | Vercel, static build, no serverless functions | **Decided 2026-11-03** |
| D8 | Analytics | None. No Vercel Analytics, no Speed Insights, no third-party scripts | **Decided 2026-11-03** |
| D9 | Name and domain | Name stays CV-Builder. Domain: Vercel default `cv-builder.vercel.app` if free; custom domain is optional later | **Decided 2026-11-03** (domain assumed) |
| D10 | Khmer copy review | Owner accepted the Khmer copy as written. Beta users can still flag wording | **Closed 2026-11-03** |
| D11 | Folder and versions | One app in the main folder (`src/`). `v1/` deleted 2026-11-04 after the rebuild | **Done 2026-11-04** |
| D12 | Export | A real PDF file download, no server (print-only and server rendering are out) | **Decided 2026-11-03** |
| D13 | Test devices | Owner has an iPhone only. Android through a borrowed phone or beta testers | **Decided 2026-11-03** |

## Top risks

| Risk | Impact | Mitigation |
|---|---|---|
| Khmer text breaks in a vector PDF library (shaping, stacked vowels) | High | Spike S1 first. Fallback is an image PDF. A server renderer is out of scope (frontend only). See [[Technical Design]] |
| In-app browsers (Facebook, Telegram) block downloads or printing | High | Detect and show "Open in browser". Test in Phase 4 |
| Image PDFs are not selectable or searchable | Medium | Keep the print path for text PDF; revisit if S1 finds a vector option |
| Real Cambodian CV norms differ from my sources | Medium | Phase 0 sample collection and user interviews |
| Large Khmer fonts slow the first load on 4G | Medium | Subset, `unicode-range`, `font-display: swap`, lazy-load Moul |
| Scope creep (cover letter, accounts, AI) | Medium | Non-goals above. Post-launch list in [[Roadmap]] |
| iPhone Safari may delete saved data (IndexedDB, `localStorage`) for a site not visited for about a week; a Home Screen web app is exempt (verify in spike S4) | High | Add-to-Home-Screen instructions, `navigator.storage.persist()`, backup-file nudge, "last saved" display. See [[Technical Design]] |
| Owner has no Android phone, so Android bugs may ship unseen | High | Borrow a phone for one sitting; at least 2 Android beta testers; Chromium emulation in tests; Report-a-problem link. Mark Android unverified until run |
| Solo project, part-time pace | Medium | Phases have exit criteria and are shippable on their own |

## How we know it works (proposed targets)

- A new user on a phone reaches a downloaded PDF in under 10 minutes.
- PDF export succeeds on 98% or more of test runs across the device matrix, with zero Khmer rendering defects.
- Lighthouse mobile: performance 90 or more, accessibility 95 or more.
- Core Web Vitals in lab tests (Lighthouse on a throttled mid-range phone profile, since there is no field data): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- JS budget: 200 KB gzip initial, 80 KB per lazy route/chunk.
- 5 of 5 interviewed users complete a CV without help.

## Where the code lives

One app, in the main folder (`src/`). `v1/` was deleted on 2026-11-04; read it from git history if needed (`git show 62f39be:v1/src/<path>`).
