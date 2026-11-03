---
type: decision-record
status: ruled, pending device tests
created: 2026-11-03
tags: [rebuild, decision-court]
---

# Solutions (Decision Court judgment)

Result of running the `decision-court` skill on the problems in [[Plan]]. Seven dockets, 30 options plus one amended option, 39 exhibits, preliminary hearing, cross-examination of nine finalists, and a final ruling. Full records are in `vault/plan/court/` (start with `verdict_final.md`; `intake.md` holds the constraints and criteria).

**Conflict of interest:** I (Claude) proposed every option except the two old-app behaviors (A1, B3). The Plaintiff attacked them as hard as the rest.

**Read this first:** scores are judgments, not measurements. The court found almost nothing verified for Khmer and iPhone behavior. Most rulings are "pending a real-device test", listed in [[Build Plan]] as Phase 0. Confidence is low or medium on most items.

## Rulings

| Docket | Problem | Ruling | Score | Confidence |
|---|---|---|---|---|
| A | PDF file with correct Khmer | **A2:** draw the page to canvas, put images in a PDF, download as a file. A1 (print only) dismissed on a sustained FATAL charge. Vector options (A3, A4) wait for test T1/T2. A5, A6 dismissed | A2 58 (remanded) | Low |
| B | Saving on iPhone, data loss | **B1** storage and guidance now; export path (download vs share) picked by test T3. B3 (localStorage only) is a stopgap only | B1 65, B2 62 (approved with conditions) | Medium / low |
| C | Facebook/Telegram viewers | **C1:** detect and show "Open in your browser" banner; verify with T7 | C1 72, C4 68 | Low |
| D | Page splitting | **D1:** `data-block` measuring with one shared `pageGeometry.js` | D1 59 | Medium |
| E | Khmer fonts | **E4:** self-host full font files, lazy-load Moul; switch to subsets (E1) only if size or LCP fails | E4 69, E1 64, E3 63 | Low |
| F | Testing devices | **F1** real phones as core, **F3** emulation in CI, **F4** beta testers | F1 71 | Medium |
| G | Learning without analytics | **G1** "Report a problem" link plus **G3** beta follow-ups. G2 error log deferred | G1 73, G3 67 | Medium |

## Why A1 (print only) lost

Your requirement: iPhone users can save the PDF into their folder like a normal download. Print-only gives no file, only a hidden route (Print, pinch the preview, Share, Save to Files). The court ruled that this plainly breaks the requirement.

**Answered 2026-11-03:** the owner wants a real PDF download and no server, so A1 stays dismissed. The owner has an iPhone only.

## What the cross-examination changed

Only concessions moved scores: A7a (A2 plus a desktop Print button) 54 to 51, B3 58 to 55. A2 leads A7a by 7. The Print button is added only if test T1 shows a desktop-only Khmer problem.

## Decision gates the build must follow

| Gate | Default | Switches to | When |
|---|---|---|---|
| Export engine | A2 (canvas to image PDF) | A3 or A4 (vector, after T2 passes) | T1 fails on a phone |
| Export engine | A2 | A7a (add Print button) | T1 fails on desktop only |
| iPhone save path | B1 (download) | B2 (Web Share, two-tap) | T3: download fails, share works |
| Storage | IndexedDB | localStorage | T5: a typical photo fits |
| Viewer banner | C1 | C4 (do nothing) | T7: export works in all three viewers |
| Fonts | E4 | E1 (subsets) | T8: LCP over 2.5 s |
| Print-only (A1) | dismissed | not reopened | Owner answered: a real download, no server |

## Open items (cannot be settled by argument)

- Khmer stacks in html2canvas on a real iPhone and Android (T1).
- Blob download reaching Files on iOS 17 or 18 (T3).
- Whether Safari's storage wipe hits a given user (E20 is documented, not tested).
- Android behavior: the owner has an iPhone only, so Android needs a borrowed phone or beta testers (court condition on F1).

Related: [[Plan]], [[Technical Design]], [[Roadmap]], [[Decisions]].
