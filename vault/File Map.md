---
type: reference
root: src
updated: 2026-11-04
---

# File Map

Root: `index.html` (landing), `app.html` (editor), `privacy.html`, `vite.config.js` (pages, offline app, tests), `vercel.json` (headers, clean URLs), `eslint.config.js`, `scripts/check-size.js` (download budget), `public/` (icons, example pictures, robots, sitemap), `spikes/` (device test page).

## `src/`

| Path | Role |
|---|---|
| `main.jsx`, `App.jsx` | Start React; app language, toasts, update prompt, start screen or editor |
| `styles/index.css`, `styles/fonts.js` | Three color tokens, fonts, Khmer line height and no letter spacing, focus ring |
| `locales/en.js`, `locales/km.js` | All text (246 keys each), including field tips and examples (`guide.*`) |
| `app/` | `AppHeader`, `route.js`, `DocumentProvider` + `documentReducer`, `SaveStatus`, `InstallHelp` + `installPrompt.js`, `UpdatePrompt`, `ReportProblemLink`, `config.js` (version, report URL) |
| `features/start/StartScreen.jsx` | First screen |
| `features/editor/` | `Editor` (loader), `EditorScreen` (layout), `steps/` (nine steps), `fields/ObjectList` and `fields/TextList`, `options.js` (suggestions, colors), `sampleCV.js`, `review.js` (gaps), `useGuide.js` |
| `features/photo/` | `PhotoPicker`, `PhotoCropDialog` (lazy), `cropPhoto.js` |
| `features/templates/` | Ten templates, `parts.jsx` (shared blocks), `cvData.js`, `CvDocument`, `Preview`, `TemplateThumbnail`, `useFitScale`, `pagination/` (`pageGeometry`, `paginate`, `PagedDocument`) |
| `features/export/` | `ExportPanel`, `capturePages.js`, `jpegPdf.js`, `download.js`, `share.js`, `inAppBrowser.js`, `InAppBanner` |
| `features/storage/` | `schema.js`, `db.js`, `backup.js`, `useAutosave.js` |
| `shared/` | `i18n.js`, `ids.js`, `format/` (dates, text, lists, contrast), `ui/` (Button, Field, Dialog, Toast, StepProgress, BottomBar, Icon) |

Tests sit next to the code as `*.test.js(x)`.

Related: [[Architecture]].
