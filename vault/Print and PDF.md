---
type: reference
updated: 2026-11-04
---

# Print and PDF

## Pages

`pagination/pageGeometry.js` holds the A4 numbers in screen pixels: 794 x 1123 px, first page content 1085 px (10 mm bottom margin), later pages 1040 px (12 mm top, 10 mm bottom).

`PagedDocument`:
1. Draws the CV once, hidden, as one long sheet and measures every `data-block`.
2. `findPageStarts()` (`paginate.js`, unit-tested) picks where each page starts: a block that would be cut moves to the next page, and a section title never stays alone at the bottom.
3. Draws each page as a white A4 box showing only its slice of the sheet.

`Preview` shrinks the pages with CSS `zoom` to fit the screen.

## PDF download (`features/export/`)

- Two taps on purpose: "Create PDF" draws the pages; then "Download PDF" (or "Share") is a fresh tap, which iPhone needs for downloads and the share sheet.
- `capturePages.js` loads `html2canvas-pro` only then, draws one page at a time at 2x scale, and turns each into a JPEG. `jpegPdf.js` (our own, about 100 lines, tested) writes the PDF. A two-page CV is about 250 KB.
- The PDF is pictures, so its text cannot be selected; Khmer is drawn by the browser, so it looks exactly as on screen.
- Page pictures (JPEG) can be downloaded for chat apps. File name: `CV-<name>.pdf`.
- Inside Facebook, Messenger or Telegram, `InAppBanner` asks the user to open the page in their normal browser.

## Verified

Desktop Chromium: English and Khmer PDFs correct. iPhone and Android: not yet (see [[Spike Results]]).
