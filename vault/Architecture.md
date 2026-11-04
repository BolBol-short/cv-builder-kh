---
type: architecture
updated: 2026-11-04
---

# Architecture

## Pages

```
index.html    landing page (static HTML, fast, for search engines)
app.html      the editor (React)  -> src/main.jsx -> src/App.jsx
privacy.html  privacy page (static)
```

Vercel serves them at `/`, `/app` and `/privacy` (`cleanUrls` in `vercel.json`).

## App shape

```
App.jsx            app language (I18nContext), toasts, update prompt, picks the screen
├─ StartScreen     new / saved / backup / example / clear all
└─ Editor          (loaded lazily) loads the CV from storage
   └─ DocumentProvider   holds the open CV (useReducer) and autosaves it
      └─ EditorScreen    header + save status, step progress, current step, Back / Preview / Next
         ├─ steps/*      the nine steps
         └─ Preview      live A4 pages (side column on wide screens, full-screen dialog on phones)
```

Routing is the part of the address after `#`: `#/` is the start screen, `#/edit/<cv id>/<step id>` is the editor (`src/app/route.js`).

## State

- The open CV lives in `DocumentProvider` (`useReducer(documentReducer)`). Every change is a plain action object (`setPersonal`, `addItem`, `moveItem`, `insertItem` for Undo...), all handled in `src/app/documentReducer.js`.
- `useAutosave` saves 500 ms after the last change and reports `saved | saving | failed`.
- App language is App state, saved in `localStorage`. CV language is a CV setting.

## Two translation functions

- The app UI uses `useI18n()` (app language).
- Templates receive `t` built from the CV language (`CvDocument.jsx`). Field examples also use the CV language (`useGuide.js`).

## Rendering a CV

`CvDocument` draws the chosen template as one long A4-wide sheet. `PagedDocument` measures it and slices it into pages (see [[Print and PDF]]). The same pages are used for the preview, the thumbnails and the PDF.

## Lazy loading

Loaded only when needed: the editor itself, the photo crop dialog, and `html2canvas-pro` (only when the user presses "Create PDF").

Related: [[File Map]], [[Data Model]], [[Decisions]].
