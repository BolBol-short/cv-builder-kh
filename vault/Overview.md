---
type: overview
updated: 2026-11-04
---

# Overview

**CV-Builder (Cambodia based)** is a free web app that only does one thing: help someone make their CV, the way Cambodian employers expect it, in Khmer or English, on a phone or a computer. Everything runs in the browser. No account, no server, no analytics.

- Started: 2026-07-23. Rebuilt as version 2 in November 2026 (see [[Timeline]]).
- Owner: BolBol (GitHub `BolBol-short/cv-builder`). Hosting: Vercel (static).
- Status: built (Phases 0 to 5 of [[Build Plan]]). Waiting for real-phone tests and a beta (Phase 6).
- The first version (v1) was deleted on 2026-11-04; it stays in git history (commit `62f39be`).

## Features

- Start screen: new CV, saved CVs, open a backup file, try an example CV, clear everything.
- Guided editor in nine steps (language and style, photo and name, contact and personal, summary, education, experience, skills and languages, references, review). Every field has a tip and an example.
- App language (English / Khmer) separate from the CV language.
- Ten templates, all with a circle profile photo. See [[Templates]].
- Live A4 preview with clean page breaks. See [[Print and PDF]].
- PDF download (two taps), share sheet, page pictures for chat apps. See [[Print and PDF]].
- Autosave on the device, several CVs, backup files, example CV. See [[Persistence]].
- Offline after the first visit, install help, update prompt, landing and privacy pages, "Report a problem" link.

## Stack

| Layer | Choice |
|---|---|
| UI | React 19, plain JavaScript (JSX), no TypeScript |
| Build | Vite 8, multi-page (landing, app, privacy, device test page) |
| Styling | Tailwind CSS 4, three colors only: `ink` #1c1917, `paper` #ffffff, `accent` #1d4ed8; no gradients |
| Storage | IndexedDB through `idb-keyval`; `localStorage` for small settings |
| Fonts | Inter, Kantumruy Pro, Moul, self-hosted through Fontsource |
| PDF | `html2canvas-pro` draws each page; our own `jpegPdf.js` writes the PDF |
| Photo crop | `react-easy-crop` (loaded only when used) |
| Offline | `vite-plugin-pwa` (Workbox) |
| Tests | Vitest + Testing Library + axe-core |

## Size

About 5,700 lines in 80 source files under `src/`, plus 11 unit test files. First download for the editor: 75 KB gzip.

See also: [[Architecture]], [[File Map]], [[Data Model]].
