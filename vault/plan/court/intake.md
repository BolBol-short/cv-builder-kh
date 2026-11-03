# Intake (written by the main session, input for the Registrar)

## Decision question
CV-Builder v2 is a web app that makes Cambodian-style CVs (Khmer and English), mobile first, and exports a PDF. Which solution should be chosen for each of the seven problems (dockets A to G) below? "Done" = one recommended solution per docket, with conditions and the cheapest test that would change the ruling.

## Binding constraints (user's facts, not assumptions)
- JavaScript and React only. NO TypeScript (owner has not learned it).
- Frontend only. NO backend, serverless functions, or database.
- NO analytics of any kind.
- Hosting: Vercel, static build.
- CV data stays on the user's device. Account-free.
- Users: Cambodia, Khmer and English; mobile first (phones, incl. iPhone) plus desktop.
- iPhone users must be able to SAVE the PDF as a file in their Files folder, like a normal download.
- Owner: solo, part-time, still learning JS/React. Prefers the smallest working solution.
- Owner's own test devices: UNKNOWN (asked, not yet answered).
- Stack: Vite, React 19, Tailwind 4, plain JS. v1 exists (print-based PDF) with no users; may be deleted.
- Accessibility target WCAG 2.2 AA. Budget: initial JS <= 200 KB gzip, lazy chunks <= 80 KB gzip, LCP <= 2.5 s on mid-range Android 4G (lab).

## Conflict of interest
The assistant (Claude) proposed every option except A1 and B3, which are v1 behavior. The Plaintiff must attack the assistant's options as hard as the user's.

## Criteria and weights (adapted for engineering choices; replaces the project-topic defaults)
Total = sum of (score / 5 x weight).
| Code | Criterion | Weight | 1 | 3 | 5 |
|---|---|---|---|---|---|
| SP | Solves the problem on target devices (correct Khmer, iPhone, Android, desktop) | 25 | Fails on a target device or Khmer is wrong | Works with a known flaw or on most devices | Verified to work on all target devices |
| FO | Fits the owner (JS+React only, frontend only, solo, learning) | 20 | Needs a banned stack or skills far off | One new area to learn | Within current skills |
| EV | Evidence (is it verified?) | 15 | Assumed only | A named source reports it | Verified in an exhibit or a run test |
| CM | Cost to ship and maintain (bundle size, speed on low-end phones, upkeep) | 15 | Heavy or fragile | Moderate | Light and stable |
| RR | Risk and reversibility (5 = low risk or easy to switch later) | 15 | Serious risk, hard to undo | Manageable with conditions | Negligible |
| PC | Fit with plan constraints (privacy, a11y, no backend, no analytics, Vercel static) | 10 | Breaks one | Acceptable | Strong fit |

Verdict scale: APPROVED >= 75 and no sustained FATAL; WITH CONDITIONS 60-74; REMANDED 45-59; DISMISSED < 45 or an unanswered sustained FATAL. A FATAL charge here = breaks a binding constraint, or a proven failure on Khmer or on iPhone.
Ranking: within each docket, one current score per option; ties within 5 points are TIED with a decisive test.

## Dockets and options

### Docket A: a PDF file with correct Khmer, on every device
Problem: v1 uses window.print(). iPhone has no direct "save as PDF" from print. Khmer stacks vowels and subscripts and has no spaces between words, so PDF libraries may draw or wrap it wrongly.
- A1 Print only (window.print) on all devices (v1 status quo).
- A2 Draw the page to canvas (html2canvas or dom-to-image), put page images into a PDF (jsPDF/pdf-lib). Image PDF, not selectable. Download via Blob.
- A3 Vector PDF with @react-pdf/renderer and an embedded Khmer font; templates rewritten in react-pdf components.
- A4 Vector PDF with pdfmake or pdf-lib + fontkit and an embedded Khmer font; templates rewritten as document definitions.
- A5 Shape Khmer text in the browser with HarfBuzz compiled to WASM, then draw positioned glyphs into a vector PDF with pdf-lib.
- A6 Typst compiled to WASM in the browser (typst.ts), with Khmer fonts; templates rewritten in Typst.
- A7 Hybrid: ship A2 first on every device (A1 stays as an extra Print button on desktop); add a vector path for the formal template later only if a spike proves Khmer correct.

### Docket B: saving on iPhone and not losing data
Problem: a generated PDF must reach the Files app. Safari may also clear a site's IndexedDB/localStorage after about a week without a visit (Home Screen web apps exempt). Data is only on the device.
- B1 Blob + <a download> for the PDF; IndexedDB with navigator.storage.persist(); Add-to-Home-Screen instructions on iOS; "last saved" display; backup-file nudge.
- B2 Web Share API with the PDF file as the primary iOS path (share sheet, then "Save to Files"); download link as fallback; same storage as B1.
- B3 Keep localStorage only (v1 behavior), no install guidance, no backup nudge.
- B4 Require installing to the Home Screen before the editor opens on iOS.

### Docket C: Facebook and Telegram in-app browsers
Problem: many Cambodian users open links inside the Facebook or Telegram viewer, where downloads and print may be blocked.
- C1 Detect by user agent and show an "Open in your browser" banner with steps; still allow trying.
- C2 Detect and offer to copy the link plus steps, and offer image export (long-press to save) as a fallback inside the viewer.
- C3 Try forced redirect out of the viewer (intent:// on Android, other schemes on iOS).
- C4 Do nothing; mention it in the Help page.

### Docket D: splitting a CV across A4 pages cleanly
Problem: v1 lets the browser flow content with CSS break rules, and keeps A4 numbers in three files. A generated PDF (image or vector) needs the app to choose break points. Sidebar layouts across page 2 are untested.
- D1 Mark blocks with data-block; measure them; compute break offsets; render each page as a fixed A4 container (one shared pageGeometry.js).
- D2 CSS break rules and the browser print flow only (v1 approach).
- D3 One-page-only templates that shrink to fit (no page 2).
- D4 Fixed two-page layouts where the user chooses which sections go on page 1.

### Docket E: Khmer fonts and loading speed
Problem: Khmer fonts are large. Google Fonts CDN is used in v1. The exported PDF must show the same font on every phone.
- E1 Self-host subset WOFF2 (Latin and Khmer separate), unicode-range, font-display swap, lazy-load Moul only for the formal Khmer template.
- E2 Use system fonts only (Noto Sans Khmer on Android, system Khmer on iOS), no web fonts.
- E3 Keep Google Fonts CDN as in v1.
- E4 Self-host one full font file per family, no subsetting.

### Docket F: testing without owning every device
Problem: risks in A to C need real iPhone and low-end Android checks. Owner's devices are unknown.
- F1 Borrow or buy a cheap Android phone, and use the owner's or friends' iPhone; run a manual checklist per release.
- F2 Use a cloud real-device service (e.g. BrowserStack, LambdaTest) on a free tier or trial.
- F3 Emulation only (Playwright WebKit and Chromium, DevTools throttling).
- F4 Let beta testers be the device testers, with a short test script.

### Docket G: learning what breaks without analytics
Problem: no analytics, so problems are invisible after launch.
- G1 "Report a problem" link (GitHub issue form or mailto) that pre-fills browser, app version, template; never CV content.
- G2 A Help screen with a copyable local error log kept on the device.
- G3 Beta interviews and follow-up messages only.

## Facts for shared discovery (priority order)
1. Khmer shaping in react-pdf, pdfmake, jsPDF, pdf-lib+fontkit (GitHub issues, docs).
2. Browser-side HarfBuzz WASM and Typst WASM with Khmer; sizes of the WASM files.
3. iOS Safari: Blob + a[download] saves to Files? Web Share API with files support on iOS.
4. WebKit 7-day storage cap (ITP) for IndexedDB/localStorage; Home Screen web app exemption; navigator.storage.persist() on Safari.
5. Facebook / Telegram / Messenger in-app browser limits on downloads and print; user-agent detection.
6. html2canvas / canvas size and memory limits on iOS Safari and low-end Android; Khmer text in html2canvas.
7. Khmer line breaking: browser dictionary breaking, Intl.Segmenter support for km.
8. Size of Kantumruy Pro, Moul, Inter files; Google Fonts licensing for self-hosting (OFL).
9. EXIF orientation handling in canvas / createImageBitmap.
10. Free tiers and limits of cloud real-device testing services.

## Precedents
None.
