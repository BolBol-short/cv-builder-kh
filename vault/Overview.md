---
type: overview
---

# Overview

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


**CV Builder (Cambodia based)** is a single-page React app where someone builds a personal work CV and exports it as a PDF. Everything runs in the browser.

## Why it exists

From the README: some people have no time to write a CV, some do not know where to make one, and some need guidance on what to fill in. The app gives a guided form, one-click suggestions, and ready layouts, including the formal Cambodian "ប្រវត្តិរូបសង្ខេប" format.

- Started: 2026-07-23
- Owner: BolBol (GitHub `BolBol-short/cv-builder`)
- Status: v1 is done and kept as the reference. A rebuild is planned in the main folder; see [[Plan]] and [[Build Plan]].

## Features (v1)

- English and Khmer interface. The CV language is a separate setting, so a Khmer-speaking user can write an English CV. See [[i18n and Khmer]].
- Five templates: Classic, Modern, Professional, Minimal, Traditional. See [[Templates]].
- Accent color: 9 presets plus a custom color picker.
- Sections: personal details (photo, date and place of birth, nationality, marital status), summary, experience, education, certifications, skills, languages, hobbies, links, references.
- One-click suggestion chips for skills, hobbies, languages. Reorder entries. "Currently work/study here" checkbox.
- Live A4 preview that matches the printed PDF, with dashed page-break markers. See [[Print and PDF]].
- Progress bar (completeness score).
- Autosave to the browser, JSON save/open, "load example CV". See [[Persistence]].
- Mobile layout: toggle between Edit and Preview below the `lg` breakpoint.

## Stack

| Layer | Choice |
|---|---|
| UI | React 19 (function components, hooks, plain `useState`) |
| Build | Vite 8 with `@vitejs/plugin-react` |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` (no config file; theme in `index.css`) |
| Language | Plain JavaScript (JSX). `@types/react` is installed but there are no `.ts` files |
| Lint | ESLint 10 flat config, react-hooks and react-refresh plugins |
| Fonts | Inter (Latin), Kantumruy Pro (Khmer), Moul (Khmer title), loaded from Google Fonts |
| Tests | None |
| Backend | None |

No state library, router, UI kit, or PDF library. PDF comes from the browser print dialog.

## Size

About 2,600 lines across 30 source files under `v1/src/`.

See also: [[Architecture]], [[File Map]].
