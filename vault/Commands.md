---
type: reference
---

# Commands

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


Run from the repo root.

```
npm install
npm run dev       # Vite dev server
npm run build     # production build into dist/
npm run preview   # serve the build
npm run lint      # ESLint (flat config, ignores dist)
```

There is no test script.

## Make a PDF

Click **Download PDF**, then in the print dialog: destination "Save as PDF", paper A4, headers and footers off. See [[Print and PDF]].

## Common changes

| Goal | Touch |
|---|---|
| Add a field to an existing list section | `context/cvData.js`, factory in `utils/cv.js`, descriptor in `ContentEditor.jsx`, labels in both dictionaries, templates that show it |
| Add a template | See [[Templates]] |
| Add a UI string | Both `en` and `km` in `translations.js` |
| Add an accent preset | `ACCENT_PRESETS` in `constants/options.js` (lowercase hex) |
| Change save format | Bump `version` in `cvFile.js` and migrate in `normalizeCV`. See [[Data Model]] |
