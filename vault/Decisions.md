---
type: decision-log
---

# Decisions

Short ADR-style log. Add new entries at the top.

### Rebuild decisions (2026-11-03)
- The profile photo is a circle on every template, including Traditional (owner decision). The crop is 1:1 with a round mask. Cambodian samples ask for a 4x6 rectangle, so the formal layout differs from that sample on purpose.
- Host on Vercel as a static site. See [[Technical Design]].
- No analytics of any kind. Learning comes from lab tests, a Report-a-problem link, and beta users.
- Decision Court ruled on 7 dockets (see [[Solutions]]): canvas-to-image PDF download, download-first iPhone save with storage guidance, in-app browser banner, `data-block` pagination, full self-hosted fonts, real-device testing plus CI emulation, a Report-a-problem link plus beta follow-ups. Pending Phase 0 device tests.
- Plain JavaScript and React, frontend only. No TypeScript (not learned yet), no Zod, no backend. Data shapes use JSDoc comments.
- v1 had no users, so the rebuild has no backward compatibility and no importer or migration.
- No v1/v2 split: one app in the main folder (`src/`). `v1/` stays as a read-only reference until the owner says to delete it.
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
