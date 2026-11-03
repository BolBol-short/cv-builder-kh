---
type: backlog
verified: 2026-11-03 (by reading source; app was not run)
---

# Gotchas and Backlog

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


## Found while reading

1. **Missing favicon.** `index.html` links `/favicon.svg`, but there is no `public/` folder, so the request 404s. Fix: add `public/favicon.svg` or remove the link.
2. **Autosave message can lie.** "Auto-saved in this browser" always shows, even when `saveDraft` swallowed a quota error. A large photo plus long text could hit it. Fix idea: have `saveDraft` return a boolean and show a warning.
3. **Reset keeps settings and the photo is lost with it.** Reset replaces `cv` only, which is probably intended, but there is no undo. Both reset and import overwrite without a backup.
4. **Duplicate print constants.** Margins live in both `index.css` and `Preview.jsx`, and `1085px` is in `shared.jsx`. See [[Print and PDF]].
5. **New template needs a `Thumb` body** in `DesignPanel.jsx`, easy to miss. See [[Templates]].
6. **`context/cvData.js` is misnamed.** It holds the data shape, not a React context. Harmless, but confusing.
7. **No tests.** Pure helpers (`normalizeCV`, `moveItem`, `formatRange`, `toBullets`, `pageBreaks`) are easy to cover with Vitest.
8. **Sidebar templates and page 2 are untested.** Unknown whether the colored column continues on later pages. See [[Print and PDF]].
9. **README is mixed.** It combines the original project brief with the feature list. The repo has no separate v2 plan file even though the last commit mentions one.
10. **Not checked:** `npm run lint` and `npm run build` were not run for this vault. Accessibility, bundle size, and real print output were not measured. All source files were read; translation keys used by templates exist in both dictionaries, and every icon name used is defined in `Icon.jsx`.
11. **`Icon` has no guard.** An unknown `name` renders an empty SVG silently.

## Ideas for v2 (candidates, not decided)

- More templates; verify or fix sidebar behavior across pages.
- Per-section show/hide and reorder of whole sections.
- Multiple CVs saved in one browser (named drafts).
- Drag and drop for list reordering instead of up/down buttons.
- A Vitest suite for the utils, plus a print regression check.
- Deploy as a static site (Vite output in `dist/`).
- Cover letter or other document types.

Related: [[Overview]], [[Decisions]].
