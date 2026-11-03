---
type: design
status: draft
tags: [rebuild, architecture, pdf, performance]
---

# Technical Design

Part of [[Plan]]. Product behavior is in [[Product]], fields in [[CV Spec]]. Old-app reference: [[Architecture]], [[Data Model]].

## Stack

| Concern | Choice | Why |
|---|---|---|
| Build | Vite | Already used, static output, fast |
| UI | React 19 + JavaScript (JSX) | Same as the old app. No new language to learn. Document shapes get JSDoc `@typedef` comments, no compiler |
| Styling | Tailwind 4 with design tokens in CSS variables | Already used. Tokens give consistent spacing, color, and dark/high-contrast later |
| Accessible primitives | Radix UI (Dialog, Toast, Tabs) | Focus trap, ARIA, Escape handling are easy to get wrong by hand. Use native `<select>` on mobile |
| Validation | Hand-written `normalizeDocument()`, the same pattern as the old app's `normalizeCV`, covered by unit tests | No new library to learn. Validates imported files and saved drafts |
| Storage | IndexedDB via `idb-keyval` (or `idb`) | Many CVs, photos as Blobs, far more space than `localStorage` |
| Photo crop | `react-easy-crop` (lazy loaded) | Small, touch friendly. 1:1 aspect with a round mask |
| Offline | `vite-plugin-pwa` (Workbox) | Install to home screen, work without data |
| i18n | Keep the tiny own `t()` from the old app, add a unit test that `en` and `km` have the same keys | 105 keys do not need i18next |
| Router | None for the editor (step state in URL hash). Static landing page | Fewer parts |
| Tests | Vitest + Testing Library, Playwright, axe-core | See Quality gates below |
| Lint/format | ESLint (flat), Prettier | Existing ESLint setup carries over |
| Hosting | Vercel, static build (decision D7) | No server needed. See Hosting on Vercel below |

Rejected: TypeScript (not learned yet), Zod (extra concept; hand-written checks are enough), any backend (frontend only), Next.js (no server need), a state library (reducer plus context is enough), i18next (size), a UI kit like MUI (bundle, look), accounts or a database (non-goal).

## Folder layout

```
src/
  app/            shell, providers, step routing, PWA registration
  features/
    editor/       steps/, fields/, guidance/ (tips + examples), review/
    templates/    primitives/ (Page, Entry, Table...), pagination/, one folder per template
    export/       pdf/, image/, print/, share/, inAppBrowser.js
    storage/      db.js, schema.js (normalize + defaults)
    photo/        PhotoCrop.jsx, process.js
  shared/         ui/ (Button, Field, Dialog, Toast, Stepper), a11y/, hooks/, format/
  locales/        en.js, km.js
  styles/         tokens.css, print.css
landing/          static SEO page
```

Rule: a feature imports from `shared/` and its own folder, not from another feature, except through its public `index.js`.

## Data model

Builds on [[Data Model]]. Rule kept: **fields are only ever added.** The wrapper carries a `schemaVersion` (starts at 1) so a later change can add a migration. No migration code exists yet because the old app had no users.

```
Document {
  schemaVersion: 2
  id, createdAt, updatedAt, title
  settings: { cvLang, template, accent, fontScale, density, photo: { shown }, sectionOrder[], hidden[] }
  cv: {
    personal: { nameKm, nameLatin, gender, dob, pob, nationality, maritalStatus,
                tel, email, addressCurrent, links[], salaryExpectation?, photoId? }
    summary, experience[], education[], certifications[], skills[], languages[], hobbies[], references[]
  }
}
photos table: { id, blob, cropRect (square), width, height }
```

- No compatibility with the old app: it had no users, so the format starts clean and may rename or restructure fields freely.
- All incoming data passes through `normalizeDocument()` with safe defaults, as `normalizeCV` did in the old app.
- Stored codes (`female`, `fluent`) stay codes, labels come from the dictionary. See [[i18n and Khmer]].
- UI language and CV language stay separate settings.

## State and storage

- One `useReducer` store for the open document, in a context. Actions are plain objects with a `type` string, all listed in one file.
- Autosave: debounce 500 ms to IndexedDB. A status value (`saved | saving | failed`) drives a live region. On failure, show the message and offer "Download a backup file".
- `localStorage` keeps only tiny prefs (UI language, last opened document id).
- Undo: deleted list items go to a short-lived undo buffer, shown in a toast.
- Persistent storage: call `navigator.storage.persist()` where available so the browser does not clear the data under pressure.

## Rendering and pagination

The old app relied on the browser flow and CSS break rules, and kept A4 constants in three files (see [[Print and PDF]]). The rebuild fixes that:

- One module `pageGeometry.js` exports A4 size, margins, and px conversions. CSS and code read the same values.
- Templates are built from `primitives/` that carry `data-block` on every unit that must not split (entry, table row, heading plus first line).
- `pagination/` measures `[data-block]` elements and computes break offsets. The preview, the image export, and the print path all use the same offsets.
- Page 1 may be full bleed; later pages keep margins. Sidebar layouts repeat the colored column per page, or the template avoids a full-height sidebar. Decide per template after testing.
- Preview scales the true-size page with CSS transform, as the old app did.

## Export (the key risk)

Why this was open: the old app used `window.print()`. On iOS Safari there is no direct "Save as PDF" from print; users get a PDF via the print preview and share sheet, which most will not find ([Apple discussion](https://discussions.apple.com/thread/7567883), [AppleVis](https://applevis.com/comment/114350)). Those sources are older, so recheck on current iOS in the spike. On iPhone a generated PDF served as a file (`Blob` + `<a download>`) should save through Safari's download manager into Files; confirm on a real iPhone in spike S4. Khmer also needs correct shaping (stacked vowels and subscripts). Reports of broken Khmer output in PDF libraries exist for the Dart `pdf` package ([khmer_pdf_fixer](https://pub.dev/documentation/khmer_pdf_fixer/latest/)). I found no confirmation either way for JavaScript libraries, so it must be tested.

| Option | Khmer correct | Selectable text | Works on iOS | Cost / catch |
|---|---|---|---|---|
| A. `window.print()` (old app) | Yes | Yes | Awkward | Free. Needs user to change dialog settings |
| B. Render page to canvas, place images in a PDF (`html2canvas`/`dom-to-image` + `jsPDF`) | Yes (browser draws it) | **No** | Yes | Large files unless tuned. Memory heavy on low-end phones |
| C. Vector PDF library with embedded Khmer font (`pdfmake`, `@react-pdf/renderer`, `pdf-lib` + `fontkit`) | **Unknown, test** | Yes | Yes | Templates must be rewritten in the library's layout language |
| D. Server renders HTML with headless Chromium | Yes | Yes | Yes | Needs a backend. **Out of scope: frontend only** |
| E. Typst or HarfBuzz compiled to WASM | Yes | Yes | Yes | Heavy build and a second template language |

**Plan:**
1. **Spike S1 (Phase 0):** render a Khmer test page (long names, stacked consonants, mixed Latin and digits) through C (react-pdf and pdf-lib+fontkit) and E on three real devices. Check both the drawing and copy-paste of the text.
2. **Default if S1 fails:** ship B on every device, since it is a real file download and works on iPhone, and keep A as an extra "Print" button on desktop. B is tuned: render at 2x, slice at `[data-block]` boundaries, embed JPEG at quality 0.85, lazy-load the library on click.
3. **If C passes:** write the export as a separate template renderer for the formal Cambodian layout first, and keep B as fallback.
4. **Share:** `navigator.share({ files })` where supported, for sending to Telegram, email, and so on. Fall back to a normal download.
5. **In-app browsers:** detect Facebook, Messenger, and Telegram webviews by user agent and show an "Open in your browser" banner before export. Test whether downloads and print work there.
6. **Image export:** PNG or JPEG of each page, for chat apps.
7. **D** (server rendering) is out. The project is frontend only.

## Fonts

- Self-host Inter, Kantumruy Pro, and Moul as WOFF2. No Google Fonts request.
- Subset Latin and Khmer separately, use `unicode-range`, `font-display: swap`.
- Load Moul only for the formal template in Khmer.
- Android system Khmer (Noto Sans Khmer) as the fallback so text shows at once.
- The exported PDF embeds fonts (B does by drawing them; C needs the font files).

## Performance budget

Profile used: `vite-spa` (senior-frontend). Targets at p75 on a mid-range Android on 4G.

| Metric | Target |
|---|---|
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| Initial JS | ≤ 200 KB gzip |
| Each lazy chunk | ≤ 80 KB gzip (PDF engine, crop tool, each template) |
| Lighthouse mobile | Performance ≥ 90, Accessibility ≥ 95 |

Tactics: lazy-load templates, export engine, and crop tool; debounce the preview render; avoid re-render of the whole tree on each key; image `Blob` URLs not base64 in state; `size-limit` check in CI.

## PWA

- Precache app shell, fonts, and locales. Runtime cache for nothing else (no network data).
- Update flow: "New version ready, reload" toast, never a silent reload mid-edit.
- Install prompt on the Review step, not on first load.

## Security and privacy

- No third-party scripts. Content-Security-Policy meta/headers from the host.
- Imported files are untrusted: size limit, `normalizeDocument()` validation, no `dangerouslySetInnerHTML`, links get `rel="noopener noreferrer"`.
- Photo processing in a canvas, EXIF location stripped by re-encoding.
- Clear-all button wipes IndexedDB and `localStorage`.

## Hosting on Vercel

- Static Vite build (`npm run build`, output `dist`). No serverless functions, no database.
- Editor steps use the URL hash, so no SPA rewrite rules are needed. The landing page is a static file.
- `vercel.json` sets headers: Content-Security-Policy, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, long immutable cache for hashed assets, no-cache for `index.html` and the service worker.
- Every branch gets a preview URL. Open it on real phones to test; run Lighthouse CI against it.
- Do not enable Vercel Web Analytics or Speed Insights (decision D8).
- Domain: `cv-builder.vercel.app` if free, else a close name. Custom domain optional later. Check the current Vercel plan terms for a free, non-commercial tool.

## No analytics: how we still learn

- Lab tests: Lighthouse CI, Playwright device emulation, and a manual real-device checklist before each release.
- A "Report a problem" link (GitHub issue or email) that pre-fills browser, app version, and template, never CV content. The user sends it on purpose.
- A Help screen with a copyable local error log, kept only on the device.
- Beta interviews and follow-up messages.

## iPhone storage and install

- WebKit can clear script-writable storage (IndexedDB, `localStorage`) for sites the user has not visited for about a week; Home Screen web apps are exempt. Verify against current WebKit behavior in spike S4.
- Mitigation: request `navigator.storage.persist()`, show the date and time of the last save, and nudge "Download a backup file" after the first finished CV.
- iOS has no install prompt. On iPhone, show steps: Share, then Add to Home Screen. Chrome and Android show the normal install prompt.

## Quality gates (CI)

| Gate | Tool |
|---|---|
| Lint | ESLint |
| Unit | Vitest: `normalizeDocument()`, `moveItem`, `formatRange`, `toBullets`, pagination math |
| Component | Testing Library: stepper, field guidance, dialogs |
| E2E | Playwright (Chromium, WebKit, mobile viewport): create a CV, reload, export |
| Accessibility | `@axe-core/playwright` on every step and template |
| Visual | Playwright screenshots of each template with Khmer and English fixtures |
| Budget | `size-limit`, Lighthouse CI |

## Device and browser matrix

Android Chrome on a low-RAM phone, Samsung Internet, iOS Safari (current and one older), desktop Chrome, Edge, Firefox, and the Facebook and Telegram in-app browsers.

## Sources

- [Apple Support Communities: convert a web page to PDF in Safari](https://discussions.apple.com/thread/7567883)
- [AppleVis: Print to PDF from Safari in iOS](https://applevis.com/comment/114350)
- [khmer_pdf_fixer (Dart): Khmer PDF shaping issues](https://pub.dev/documentation/khmer_pdf_fixer/latest/)
- [DataReportal Digital 2026: Cambodia](https://datareportal.com/reports/digital-2026-cambodia)
