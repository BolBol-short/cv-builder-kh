---
type: reference
source: src/features/storage/
updated: 2026-11-04
---

# Persistence

Nothing leaves the device.

- CVs are saved in IndexedDB (`idb-keyval`) under keys `cv:<id>`. Several CVs can be saved; the start screen lists them, newest first.
- Autosave: 500 ms after the last change (`useAutosave`). The header shows "Saved on this device · Last saved <time>", "Saving…", or a clear failure with a "Download backup file" button.
- On the first new CV the app asks the browser to keep its data (`navigator.storage.persist()`).
- Small settings in `localStorage`: app language, last opened CV, backup reminder date, install-help dismissed.
- Backup file: "Download backup file" (review step, and on save failure) saves `CV-<name>.json`; "Open a backup file" on the start screen opens it as a new CV. Files over 5 MB or not made by CV-Builder are refused.
- The backup reminder shows at most once every 30 days.
- "Clear everything on this device" (start screen) deletes all CVs and settings after a confirmation.
- iPhone: Safari may delete a site's data after about a week without a visit. The app shows Add-to-Home-Screen steps and the backup reminder because of this.
- Photos: picked, cropped to a square in `react-easy-crop`, redrawn to 400 x 400 JPEG (this removes hidden photo data such as location) and stored inside the CV.
