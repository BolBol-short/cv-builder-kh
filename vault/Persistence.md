---
type: reference
source: v1/src/utils/cvFile.js, v1/src/components/PhotoPicker.jsx
---

# Persistence

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


Nothing leaves the browser.

## Autosave

- Key: `cv-builder-draft-v1` in `localStorage`.
- `App.jsx` saves 500 ms after the last change to `cv` or `settings`.
- `saveDraft` wraps `setItem` in try/catch. On quota error or blocked storage the app keeps working and simply does not persist.
- `loadDraft` runs once at startup through `parseCVFile`, so it gets the same normalization as an imported file. A corrupt draft falls back to a blank CV.
- The UI says "Auto-saved in this browser" unconditionally, even if saving silently failed.

## Export / import

- Export: `Blob` plus a temporary `<a download>`; filename `cv-<name-slug>.json` (or `cv-builder.json`).
- Import: file input → `file.text()` → `parseCVFile` → replaces both `cv` and `settings`. Errors are translation keys (`error.invalidJson`, `error.unexpected`). See [[Data Model]] for the wrapper and normalization.

## Photo

`PhotoPicker` loads the file into an `Image`, draws it on a canvas with the longest edge capped at 600 px, and stores `toDataURL("image/jpeg", 0.85)` in `cv.personal.photo`. A phone photo of several MB becomes tens of KB, so the base64 string does not blow the roughly 5 MB localStorage quota. `accept="image/*"` also offers the camera on phones.

## Reset and sample

- Reset sets `cv` back to `emptyCV` after `confirm()`. Settings are kept.
- Load example asks for confirmation, then `sampleCV(settings.cvLang)`.

Related: [[Architecture]], [[Gotchas and Backlog]].
