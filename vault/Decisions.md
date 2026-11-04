---
type: decision-log
---

# Decisions

Short ADR-style log. Add new entries at the top.

### Browser tests removed (2026-11-04)
- The owner asked to delete `e2e/` (Playwright). Unit tests (`npm test`, including axe accessibility checks) stay. PDF, photo, offline and template looks are now checked by hand.

### Example data is made up (2026-11-04)
- The example CV, field examples and tests use invented data only: "Sample Name" / "ឈ្មោះ គំរូ", "Sample Trading Co., Ltd.", "Sample University", `example.com` emails, phone numbers of zeros. No real people, companies or schools.
- Landing page shows two example CVs and a gallery of all 10 designs (pictures in `public/designs/`, not saved for offline use).

### v1 deleted (2026-11-04)
- The owner asked to delete `v1/` after version 2 was built. It stays in git history (last in commit `62f39be`). Vault notes were rewritten for version 2.

### Scope (2026-11-04)
- CV-Builder only makes CVs. No cover letters, application forms, print-shop mode or other documents.
- Users should be able to choose from many templates: 5 added (Compact one-page, Timeline, Elegant, Centered, Bold), 10 in total. All use the shared parts, so page splitting and both languages work the same way.

### Build notes, Phases 2 to 5 (2026-11-03)
- PDF pictures are drawn with `html2canvas-pro`, not the original `html2canvas`: Tailwind 4 writes faded colors with `color-mix()`/`oklab()`, which the original cannot read. Checked in desktop Chromium: Khmer comes out correct. iPhone still to be tested (spike page T1).
- Export is two taps on purpose ("Create PDF", then "Download PDF" / "Share"), so iPhone treats the save as a direct user action.
- Khmer text never gets letter spacing (`:lang(km) { letter-spacing: 0 }`): spacing breaks Khmer letter clusters, on screen and in the PDF.
- The CV preview is hidden from screen readers (it repeats the form); the review step states the page count in text.
- "Report a problem" opens a GitHub issue form (no personal email is published). Change `REPORT_URL` in `src/app/config.js` to use email instead.
- Muted text was raised to at least 70% ink (65% for small headings) after axe found contrast failures in a real browser.
- Offline: only Latin and Khmer font files are precached (about 0.9 MB in total); landing pictures are not.
- Lighthouse (simulated slow phone): landing 100 performance, editor 94 performance with LCP 2.6 s (target 2.5 s). Not fixed yet.

### Build notes, Phases 0 and 1 (2026-11-03)
- PDF is written by our own small `jpegPdf.js` (picture pages) instead of jsPDF or pdf-lib: about 100 KB less to download.
- Fonts come from Fontsource npm packages (self-hosted, split by script). That is the court's E1a option; the browser only downloads the files a page uses.
- Pop-ups use the browser's own `<dialog>` element instead of Radix: built-in focus trap and Escape key, no extra library.
- `eslint-plugin-jsx-a11y` does not support ESLint 10 yet, so accessibility is checked with `axe-core` inside the tests instead.
- Field tips and examples live in `src/locales/en.js` and `km.js` (keys `guide.*`) instead of separate guidance files.
- The circle photo is stored as a small JPEG data URL inside the CV document in IndexedDB (simpler than a separate photo table).
- App colors are limited to three tokens (`ink`, `paper`, `accent`); the default Tailwind palette is switched off. No gradients.
- The app lives at `app.html`; `index.html` becomes the landing page in Phase 5.

### Rebuild decisions (2026-11-03)
- The profile photo is a circle on every template, including Traditional (owner decision). The crop is 1:1 with a round mask. Cambodian samples ask for a 4x6 rectangle, so the formal layout differs from that sample on purpose.
- Host on Vercel as a static site. See [[Technical Design]].
- No analytics of any kind. Learning comes from lab tests, a Report-a-problem link, and beta users.
- Decision Court ruled on 7 dockets (see [[Solutions]]): canvas-to-image PDF download, download-first iPhone save with storage guidance, in-app browser banner, `data-block` pagination, full self-hosted fonts, real-device testing plus CI emulation, a Report-a-problem link plus beta follow-ups. Pending Phase 0 device tests.
- Plain JavaScript and React, frontend only. No TypeScript (not learned yet), no Zod, no backend. Data shapes use JSDoc comments.
- v1 had no users, so the rebuild has no backward compatibility and no importer or migration.
- No v1/v2 split: one app in the main folder (`src/`). `v1/` stayed as a read-only reference until it was deleted on 2026-11-04.
- Export is a real PDF download with no server. Print-only (A1) stays dismissed.
- Test devices: the owner has an iPhone only. Android is unverified until a borrowed phone or beta testers run the spike page.
- Name stays CV-Builder; domain is the Vercel default for now.
- Khmer copy accepted as written (D10 closed).
- Export must produce a real file download, because iPhone users save PDFs to Files. Engine still open (spike S1). See [[Plan]].

### Print CSS for PDF, no PDF library
Browser print gives selectable text, correct Khmer shaping, and zero dependencies. A canvas or JS PDF generator would struggle with Khmer glyph shaping. Cost: the user must set paper size and turn off headers and footers. See [[Print and PDF]].

### Store option codes, not labels
`gender: "female"`, `level: "fluent"`. One saved CV renders in either language. Free text is still allowed and passes through `optionLabel`. See [[i18n and Khmer]].

### Separate UI language and CV language
A Khmer speaker may need an English CV. Templates receive their own `t` prop. See [[Architecture]].

### Wrapper around the CV, and `emptyCV` only grows
Save files are `{ version, settings, cv }`. Normalizing over `emptyCV` makes old and partial files safe. A `version` field exists for a future migration. See [[Data Model]].

### `templateIds.js` split from `templates/index.js`
`cvFile.js` needs the id list for validation but should not import React components.

### Resize photos to 600 px before storing
Keeps base64 small enough for localStorage. See [[Persistence]].

### Plain `useState` in `App`, no state library
One screen, one document. Handlers use functional updates so rapid typing never reads stale state.

### Tailwind 4 with no config file
Theme tokens (`--font-sans`, `--font-moul`) are declared in `index.css`. Accent colors use arbitrary-value syntax on a CSS variable (`text-(--accent)`), so a template never needs the color in JS.

### Source moved to `v1/src/` (2026-09-29)
Prepares for a v2 overhaul side by side. `index.html` points at `/v1/src/main.jsx`.

### Frontend only
Matches the project goal: free, private, no account, no hosting cost.
