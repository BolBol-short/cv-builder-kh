---
type: log
status: iPhone done 2026-11-04; Android pending
tags: [rebuild, tests]
---

# Spike Results

Fill this in as the Phase 0 tests run. Gates and what each result decides: [[Solutions]] and section 6 of [[Build Plan]]. Never record a result that was not observed on a device.

## Owner answers (2026-11-03)

- Export: a real PDF download, no server. Print-only (A1) stays dismissed.
- Devices: iPhone only (iPhone, iOS 18.6.2, Safari). No Android phone; Android covered by borrowed phone or beta testers.

## Results

| Test | What | Device and OS | Result | Decision |
|---|---|---|---|---|
| T0 | Real app: Try an example CV, Create PDF, Download PDF (English and Khmer) | iPhone iOS 18.6.2 | CV and Khmer look right. Download PDF only opened the viewer (no save). Share worked but sent the PDF plus a text item. Empty name gave `CV-CV.pdf` | Fixed: download as octet-stream, share without title, file name `CV.pdf` when no name |
| T1 | Khmer stress string, html2canvas and dom-to-image into PDF | iPhone iOS 18.6.2 | Looked fine (owner) | Export engine stays: picture PDF (A2) |
| T2 | Vector libraries (only if T1 fails on a phone) | | | |
| T3 | Download / share to Files (a, b, c, d) | iPhone iOS 18.6.2 | a) PDF type: No. b) octet-stream: **Yes**. c) JSON: Yes. d1-d3) share: AbortError (sheet closed) | iPhone save path: download with octet-stream type (B1, variant b) |
| T4 | Print route: taps to Files without pinch | iPhone iOS 18.6.2 | No | A1 (print only) stays out |
| T5 | IndexedDB, `persist()`, photo size | iPhone iOS 18.6.2 | IndexedDB works; persist() false in a Safari tab; quota about 39 GB | Storage stays IndexedDB; backup reminder and Home Screen help stay |
| T6 | Lazy chunk size, 3-page export at scale 2 | iPhone iOS 18.6.2 | OK, 1.5 MB, 0.4 s, no crash | Scale 2 is fine |
| T7 | Open link in Facebook, Messenger, Telegram; export; mailto | iPhone iOS 18.6.2 | Messenger: download did not work; mailto did not work | Banner stays, now also on the start screen |
| T8 | Font sizes and throttled LCP | iPhone iOS 18.6.2 | 781 KB in 63 files on the test page (html-to-image loads every font to embed them; the app itself does not use it) | Fonts stay (E1a subsets) |

## Android status

Unverified until someone with an Android phone runs the spike page and sends a screenshot. List who ran it, the phone model, and the date here.

## How to run the tests (owner)

The test page was `spikes/index.html` (at `/spikes/`). It was deleted on 2026-11-04 after the iPhone tests; it is still in git history (commit `d9542aa` and earlier).

1. Push the code to GitHub and let Vercel build it (or run `npx vercel` once to get a preview link). The page must be opened over **https**: sharing, copying and storage tests do not work on a plain `http://` address.
2. On the iPhone, open `https://<your-preview-address>/spikes/` in Safari.
3. Run T1, T3, T4, T5, T6 and T8 from top to bottom and answer each Yes/No question.
4. For T7, send the link to yourself in Messenger and in Telegram, open it from inside each app, and repeat T3 a) and the email link there.
5. Press **Copy results** and paste the text into the table above (or send it to the builder).
6. Ask two people with Android phones to do steps 2 to 5 and send their copied results.
