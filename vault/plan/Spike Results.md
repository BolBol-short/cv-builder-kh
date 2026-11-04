---
type: log
status: waiting for Phase 0
tags: [rebuild, tests]
---

# Spike Results

Fill this in as the Phase 0 tests run. Gates and what each result decides: [[Solutions]] and section 6 of [[Build Plan]]. Never record a result that was not observed on a device.

## Owner answers (2026-11-03)

- Export: a real PDF download, no server. Print-only (A1) stays dismissed.
- Devices: iPhone only (iOS version: _to fill_). No Android phone; Android covered by borrowed phone or beta testers.

## Results

| Test | What | Device and OS | Result | Decision |
|---|---|---|---|---|
| T0 | Real app: Try an example CV, Create PDF, Download PDF (English and Khmer) | iPhone, Android (tester) | | Confirms the whole export path |
| T1 | Khmer stress string, html2canvas and dom-to-image into PDF | iPhone, desktop, Android (tester) | | Export engine gate |
| T2 | Vector libraries (only if T1 fails on a phone) | | | |
| T3 | Download / share to Files (a, b, c, d) | iPhone | | iPhone save path gate |
| T4 | Print route: taps to Files without pinch | iPhone | | Confirms A1 stays out |
| T5 | IndexedDB, `persist()`, photo size | iPhone | | Storage gate |
| T6 | Lazy chunk size, 3-page export at scale 2 | iPhone, Android (tester) | | Engine and bundle |
| T7 | Open link in Facebook, Messenger, Telegram; export; mailto | iPhone | | Viewer banner gate |
| T8 | Font sizes and throttled LCP | desktop lab, iPhone | | Fonts gate |

## Android status

Unverified until someone with an Android phone runs the spike page and sends a screenshot. List who ran it, the phone model, and the date here.

## How to run the tests (owner)

The test page is `spikes/index.html` (built into the site at `/spikes/`).

1. Push the code to GitHub and let Vercel build it (or run `npx vercel` once to get a preview link). The page must be opened over **https**: sharing, copying and storage tests do not work on a plain `http://` address.
2. On the iPhone, open `https://<your-preview-address>/spikes/` in Safari.
3. Run T1, T3, T4, T5, T6 and T8 from top to bottom and answer each Yes/No question.
4. For T7, send the link to yourself in Messenger and in Telegram, open it from inside each app, and repeat T3 a) and the email link there.
5. Press **Copy results** and paste the text into the table above (or send it to the builder).
6. Ask two people with Android phones to do steps 2 to 5 and send their copied results.
