# CASE FILE: CV-Builder v2, seven engineering dockets (A to G)

Prepared by the Registrar (neutral). Discovery used 14 of 14 web searches plus WebFetch reads of primary pages. No precedents.

## 1. Question

CV-Builder v2 is a web app that makes Cambodian-style CVs (Khmer and English), mobile first, and exports a PDF. Choose one solution for each of seven problems (dockets A to G). "Done" = one recommended solution per docket, with conditions and the cheapest test that would change the ruling.

## 2. Binding constraints (user's facts, not assumptions)

1. JavaScript and React only. NO TypeScript.
2. Frontend only. NO backend, serverless functions, or database.
3. NO analytics of any kind.
4. Hosting: Vercel, static build.
5. CV data stays on the user's device. Account-free.
6. Users in Cambodia, Khmer and English; mobile first (phones, incl. iPhone) plus desktop.
7. iPhone users must be able to SAVE the PDF as a file in their Files folder, like a normal download.
8. Owner is solo, part-time, still learning JS/React; prefers the smallest working solution.
9. Owner's own test devices: UNKNOWN (asked, not yet answered).
10. Stack: Vite, React 19, Tailwind 4, plain JS. v1 exists (print-based PDF) with no users; may be deleted.
11. Accessibility target WCAG 2.2 AA. Budget: initial JS <= 200 KB gzip, lazy chunks <= 80 KB gzip, LCP <= 2.5 s on mid-range Android 4G (lab).

## 3. Conflict of interest (declared)

The assistant (Claude) proposed every option except A1 and B3, which the intake labels v1 behavior. The Plaintiff must attack the assistant's options as hard as the user's.

Registrar flag: D2 ("v1 approach") and E3 ("as in v1") also describe v1 behavior, and C4 and the F/G options are plain baselines, yet the intake credits the assistant as proposer for them. Treat D2 and E3 as status-quo options. Their proposer is ambiguous; the Judge should not favor or disfavor them on that basis.

## 4. Criteria, weights, rubric (adapted for engineering choices; replaces project-topic defaults)

Total = sum of (score / 5 x weight), out of 100.

| Code | Criterion | Weight | 1 | 3 | 5 |
|---|---|---|---|---|---|
| SP | Solves the problem on target devices (correct Khmer, iPhone, Android, desktop) | 25 | Fails on a target device or Khmer is wrong | Works with a known flaw or on most devices | Verified to work on all target devices |
| FO | Fits the owner (JS+React only, frontend only, solo, learning) | 20 | Needs a banned stack or skills far off | One new area to learn | Within current skills |
| EV | Evidence (is it verified?) | 15 | Assumed only | A named source reports it | Verified in an exhibit or a run test |
| CM | Cost to ship and maintain (bundle size, speed on low-end phones, upkeep) | 15 | Heavy or fragile | Moderate | Light and stable |
| RR | Risk and reversibility (5 = low risk or easy to switch later) | 15 | Serious risk, hard to undo | Manageable with conditions | Negligible |
| PC | Fit with plan constraints (privacy, a11y, no backend, no analytics, Vercel static) | 10 | Breaks one | Acceptable | Strong fit |

Scores 2 and 4 sit between anchors.

Verdict scale: APPROVED >= 75 and no sustained FATAL; APPROVED WITH CONDITIONS 60 to 74; REMANDED 45 to 59; DISMISSED < 45 or an unanswered sustained FATAL.

FATAL charge here = breaks a binding constraint, or a proven failure on Khmer or on iPhone. A FATAL charge is sustained only on clear and convincing evidence (at least one [V] exhibit, or several independent [R] sources). [A] alone never sustains FATAL.

Ranking: within each docket, one current score per option; options within 5 points are TIED and a decisive test is ordered.

## 5. Rules of evidence

- **[V] Verified**: a primary source the Registrar actually read (page fetched), or a test actually run. Search snippets alone are NOT [V].
- **[R] Reported**: named source not read in full (search snippet, aggregator, forum, third-party blog).
- **[A] Assumed**: reasoning with no source. May support a risk, never a finding.
- Weight: [V] > [R] > [A]. Several independent [R] may approach [V].
- Claims must cite an exhibit (E#) or named source; statistics with neither are struck.
- Burden: Defendant carries merit (preponderance; balanced evidence scores against the option). Plaintiff carries FATAL (clear and convincing).
- User's constraints (section 2) are binding facts.
- New evidence after the record closes only by motion to reopen naming the new fact and affected criteria.
- Objections the Registrar will flag: hearsay as fact, speculation, fabrication, relevance, double counting, straw man, moving the goalposts, leading the court, precedent ignored.
- Exhibits marked GAP record "not found"; an absence of evidence is not evidence of absence, and the Defendant cannot score EV above 2 on a claim resting only on a GAP.
- Caveat on [V]: WebFetch returns a small-model extraction of the page. Where the extraction itself said a detail was not shown (for example titles only), the exhibit says so.

## 6. Dockets and options (proposer for each)

Legend: C = proposed by assistant (conflict of interest, attack at full force). U/v1 = v1 behavior.

### Docket A: PDF file with correct Khmer on every device
| ID | Option | Proposer |
|---|---|---|
| A1 | Print only (window.print) on all devices (v1 status quo) | v1 behavior (not assistant) |
| A2 | Canvas capture (html2canvas or dom-to-image) into PDF (jsPDF/pdf-lib); image PDF; Blob download | C |
| A3 | Vector PDF with @react-pdf/renderer + embedded Khmer font; templates rewritten | C |
| A4 | Vector PDF with pdfmake or pdf-lib + fontkit + embedded Khmer font; templates as document definitions | C |
| A5 | HarfBuzz WASM shaping in browser, then draw positioned glyphs into vector PDF with pdf-lib | C |
| A6 | Typst compiled to WASM in browser (typst.ts), Khmer fonts; templates in Typst | C |
| A7 | Hybrid: A2 first on every device (A1 stays as extra Print button on desktop); vector path for the formal template later only if a spike proves Khmer correct | C |

### Docket B: iPhone save and data loss
| ID | Option | Proposer |
|---|---|---|
| B1 | Blob + a[download]; IndexedDB + navigator.storage.persist(); Add-to-Home-Screen instructions on iOS; "last saved" display; backup-file nudge | C |
| B2 | Web Share API with PDF file as primary iOS path (share sheet, "Save to Files"); download link fallback; same storage as B1 | C |
| B3 | localStorage only (v1), no install guidance, no backup nudge | v1 behavior (not assistant) |
| B4 | Require Home Screen install before the editor opens on iOS | C |

### Docket C: Facebook and Telegram in-app browsers
| ID | Option | Proposer |
|---|---|---|
| C1 | UA detection + "Open in your browser" banner with steps; still allow trying | C |
| C2 | Detect + copy-link offer + steps, plus image export (long-press to save) fallback inside the viewer | C |
| C3 | Forced redirect out of the viewer (intent:// on Android, other schemes on iOS) | C |
| C4 | Do nothing; mention in Help page | C |

### Docket D: A4 page splitting
| ID | Option | Proposer |
|---|---|---|
| D1 | data-block marks; measure; compute break offsets; fixed A4 container per page; one shared pageGeometry.js | C |
| D2 | CSS break rules and browser print flow only (v1 approach) | C per intake; status-quo (see section 3) |
| D3 | One-page-only templates that shrink to fit | C |
| D4 | Fixed two-page layouts; user chooses which sections go on page 1 | C |

### Docket E: Khmer fonts and loading
| ID | Option | Proposer |
|---|---|---|
| E1 | Self-host subset WOFF2 (Latin and Khmer separate), unicode-range, font-display swap, lazy-load Moul only for formal Khmer template | C |
| E2 | System fonts only (Noto Sans Khmer on Android, system Khmer on iOS) | C |
| E3 | Keep Google Fonts CDN as in v1 | C per intake; status-quo (see section 3) |
| E4 | Self-host one full font file per family, no subsetting | C |

### Docket F: testing without owning every device
| ID | Option | Proposer |
|---|---|---|
| F1 | Borrow or buy a cheap Android phone; owner's or friends' iPhone; manual checklist per release | C |
| F2 | Cloud real-device service (BrowserStack, LambdaTest) on free tier or trial | C |
| F3 | Emulation only (Playwright WebKit and Chromium, DevTools throttling) | C |
| F4 | Beta testers as device testers, with a short test script | C |

### Docket G: learning what breaks without analytics
| ID | Option | Proposer |
|---|---|---|
| G1 | "Report a problem" link (GitHub issue form or mailto) pre-filling browser, app version, template; never CV content | C |
| G2 | Help screen with a copyable local error log kept on device | C |
| G3 | Beta interviews and follow-up messages only | C |

Total: 30 options (A 7, B 4, C 4, D 4, E 4, F 4, G 3 = 30).

Cross-docket dependencies (for counsel, not removals):
- D2 only works with A1 (browser print flow). Choosing A2 to A7 forces D1, D3 or D4 (intake: "a generated PDF needs the app to choose break points").
- B2 is moot unless A2 to A6 produces a PDF Blob/File. A1 produces no file.
- C2's image export overlaps A2's rendering code.
- E choice feeds A: A3, A4, A5 need the font file bytes at export time (E2 system fonts cannot be embedded), and A6 needs fonts shipped to the Typst compiler. [A] reasoning, stated by the Registrar as a dependency to test, not an exhibit.
- F1 to F4 and G1 to G3 are not mutually exclusive; the court may rank by marginal value.

## 7. Pre-trial motions (Registrar's lists; the Registrar removes nothing)

### 7a. Joinder (merge same-idea options)
- C1 and the "detect + copy link + steps" half of C2 are the same idea (banner with steps, plus a copy-link button). Suggest joining C1 with C2a (see severance) as one case, leaving C2b (image export) separate.
- A7 contains A2 as its first stage. They stay separate cases, but A7's score must not double-count A2's merits. Flag "double counting" if both are credited with the same evidence.
- A3 and A4 share one load-bearing unknown: whether JS PDF text layout shapes Khmer correctly with the chosen font (E1 to E6). Not duplicates; a single shared test (render a fixed Khmer test string through each) serves both.

### 7b. Severance (split bundled options)
- A2: split into A2a html2canvas and A2b dom-to-image (different renderers, different Khmer behavior); and jsPDF versus pdf-lib as the PDF writer. Minimum: A2a/A2b.
- A7: split into A7a (A2 now + desktop Print button) and A7b (spike-gated vector path, a process condition, not a solution).
- B1: split into B1a Blob + a[download] export path; B1b IndexedDB + persist(); B1c Add-to-Home-Screen guidance; B1d "last saved" display + backup-file nudge. B2 differs from B1 only on the export path, so the real choices are on three axes: export path (download, share, both), storage (localStorage, IndexedDB + persist), guidance (none, A2HS instructions, backup nudge, forced install = B4).
- C2: split into C2a (detect + copy link + steps) and C2b (image export fallback).
- D1: split into D1a (one shared pageGeometry.js; useful under any option) and D1b (measure-and-paginate).
- E1: split into E1a (self-host subset WOFF2 with unicode-range and swap) and E1b (lazy-load Moul for the formal template only).
- F1: split into F1a (Android device), F1b (iPhone access) and F1c (manual checklist per release, usable with F2/F4).

### 7c. Candidates for summary judgment (one-line reason each; user may object)
- A1: breaks binding constraint 7 (iPhone must save a PDF file to Files) per the intake's own problem statement that iPhone print has no direct save-as-PDF. Registrar note: this premise comes from the user, no exhibit verifies it (see E17 GAP); the Judge decides whether it is plain.
- A6: lazy-chunk budget is 80 KB gzip, and the typst.ts web compiler alone is listed at 7.62 MB gzip (E9), roughly 97 times the budget; also templates would move to a non-JS/React language (constraint 1 and 8).

Borderline, NOT recommended for dismissal (for Judge awareness):
- A5: HarfBuzz WASM size reported at roughly 164 to 214 KB zipped in 2019 (E13), above the 80 KB lazy budget if still true, but current size not verified (E14 GAP).
- E3: Google Fonts CDN sends font requests to Google servers from every visitor; may strain PC (privacy), but no constraint explicitly forbids a CDN. Also cannot guarantee identical PDF font offline.
- E2: system fonts cannot be embedded into a PDF and differ per phone, which conflicts with the stated need that the PDF show the same font on every phone; fails SP rather than a binding constraint.
- B4: forced install blocks iPhone users inside Facebook/Telegram viewers (see Docket C), but breaks no listed constraint.
- D2: workable only with A1; see cross-docket dependencies.

## 8. Precedents

None.

## 9. Exhibit list (shared discovery)

Searches used: 14 of 14. Tier [V] = page fetched and read through WebFetch. GAP = searched, not found.

### Priority 1: Khmer shaping in JS PDF libraries
- **E1 [V]** pdfmake issue #2853 (Khmer line breaking; opened 2025-04-06, closed 2025-04-08): maintainer says pdfmake breaks lines with the Unicode Line Breaking Algorithm (UAX #14) and sent the reporter to the foliojs/linebreak repo; the page says nothing about shaping. https://github.com/bpampuch/pdfmake/issues/2853
- **E2 [V]** A search of pdfmake issues for "khmer" returns 5 issues, all closed: #2853, #2319 (missing Khmer characters), #562, #332 (custom font not rendering as expected), #33; the page showed titles only, so contents of #2319 and #332 were not read. https://github.com/bpampuch/pdfmake/issues?q=khmer
- **E3 [V]** fontkit README lists eight shapers (Default, Universal, Arabic, Indic, Hangul, Hebrew, Myanmar, Thai); Khmer is not named. https://github.com/foliojs/fontkit
- **E4 [V]** react-pdf issue search for "khmer" returns one issue, #933 "Font Fallback/Multilanguage support" (closed 2024-02-05); Khmer appears only in a user's code snippet mapping Khmer ranges to a Noto Sans Khmer family, and the thread does not discuss shaping; a 2020 comment in it states react-pdf does not support RTL. https://github.com/diegomura/react-pdf/issues/933 and https://github.com/diegomura/react-pdf/issues?q=khmer
- **E5 GAP** No source was found that verifies correct Khmer rendering (stacked vowels, subscripts, reordering) in react-pdf, pdfmake, or pdf-lib + fontkit; no source was found that fontkit's Universal or Indic shaper handles Khmer. fontkit PRs "Indic Shaper" (#99) and "Universal Shaping Engine" (#54) match a "khmer" search, but the reason was not shown (https://github.com/foliojs/fontkit/issues?q=khmer, [V] for the list, inference [A]).
- **E6 [V]** jsPDF issue search for "khmer" returns two closed issues: #3156 "Khmer error" (closed 2021-07-13) and #312 "Problem with Khmer UTF-8" (closed as duplicate 2014-07-24); contents not read. https://github.com/parallax/jsPDF/issues?q=khmer
- **E7 [R]** Other PDF engines have failed on Khmer complex-script shaping: dompdf issue #2900 (Khmer composite glyphs wrong; maintainers cite missing complex text layout), Dart `pdf` package workaround in khmer_pdf_fixer (shape in Flutter, embed as image), Blender issue #85083; PrinceXML later added Khmer support. Snippets only. https://github.com/dompdf/dompdf/issues/2900 , https://pub.dev/packages/khmer_pdf_fixer , https://projects.blender.org/blender/blender/issues/85083 , https://www.princexml.com/forum/topic/1250/
- **E8 [V]** html2canvas issue search for "khmer" returns one issue, #2246 "foreignObjectRendering issue"; state and Khmer relevance not shown. https://github.com/niklasvh/html2canvas/issues?q=khmer . **[R]** Generic non-Latin text problems in html2canvas (Tamil, Hindi, custom fonts) exist in older versions, from search snippets: https://github.com/niklasvh/html2canvas/issues/1272 , https://github.com/niklasvh/html2canvas/issues/559 . No Khmer-specific html2canvas finding was verified.

### Priority 2: HarfBuzz WASM and Typst WASM
- **E9 [V]** typst.ts get-started page, size table (header "Size (gzipped)"): web compiler 7.62 MB, renderer 351.15 KB, text+math+raw fonts 4.42 MB. Arithmetic: 7.62 MB / 80 KB is about 97 times the lazy-chunk budget (Registrar's calculation, [A] on top of [V]). https://myriad-dreamin.github.io/typst.ts/cookery/get-started.html
- **E10 [V]** typst.ts README: the minimal bundle downloads font assets from GitHub at runtime (needs internet); the page does not mention Khmer or text shaping. https://github.com/Myriad-Dreamin/typst.ts
- **E11 [V]** Typst GitHub releases page shows latest release v0.15.1 (2026-07-17); the page content read does not mention Khmer or rustybuzz (release notes partly truncated). https://github.com/typst/typst/releases
- **E12 [R]** A Typst forum post reports Typst can render Khmer visually correct while copy, search or extraction of the text yields wrong Unicode; snippet only. https://forum.typst.app/t/typsastra-enhanced-unicode-engine-for-better-unicode-in-pdfs/9709
- **E13 [R]** HarfBuzz WASM build sizes from a 2019 issue: about 710 KB, 599 KB without built-in Unicode data; zipped about 214 KB and 164 KB. harfbuzzjs npm 0.4.8 unpacked 2.8 MB (whole package). Snippets only. https://github.com/harfbuzz/harfbuzz/issues/1633 , https://npmjs.com/package/harfbuzzjs
- **E14 GAP** No current (non-2019) size for harfbuzzjs .wasm was found, and no source that shows harfbuzzjs or rustybuzz shaping Khmer in a browser; no verified "typst.ts renders Khmer" source (rustybuzz is a Rust port of HarfBuzz shaping per docs.rs, [R]: https://docs.rs/crate/rustybuzz/latest/source/src/hb/shape_wasm.rs ).

### Priority 3: iOS save and share
- **E15 [R]** web.dev: navigator.canShare() Safari 14, navigator.share() Safari 12.1; sharing needs HTTPS and a user gesture; canShare accepts only the `files` property in its data object. Snippet. https://web.dev/articles/web-share
- **E16 [V]** MDN canShare(): returns false if files are specified but the implementation does not support file sharing; feature-detect then fall back to a download link; secure context only. The compatibility table did not load, so no Safari or iOS version numbers were read. https://developer.mozilla.org/en-US/docs/Web/API/Navigator/canShare
- **E17 GAP** No source found that confirms (a) iOS Safari canShare({files}) returns true for PDF files, (b) the iOS share sheet offers "Save to Files" for a shared PDF, or (c) that blob + a[download] reliably lands in Files. The user-stated premise that iOS print has no direct save-as-PDF was not verified either.
- **E18 [V]** WebKit bug 263608 "TXT and XML Files open in tab on iOS Safari instead of downloading": status NEW, reported 2023-10-24, last modified 2026-05-19; commenters report blob-based PDF and image downloads show the same problem; one commenter's workaround is re-creating the blob with type application/octet-stream; WebKit reportedly tracks it internally. https://bugs.webkit.org/show_bug.cgi?id=263608
- **E19 [R]** WebKit bug 190351: blob URL + download failed in Safari 12 with target=_blank (popup blocker); commenters report persistence to iOS 13.4; workaround target=_self; a 2024 comment says a minimal example works on macOS and iOS. Snippet. https://www2.webkit.org/show_bug.cgi?id=190351

### Priority 4: storage
- **E20 [V]** WebKit blog 2020-03-24: Safari deletes all script-writable storage (including IndexedDB and LocalStorage) after seven days of Safari use without user interaction on the site; home-screen web apps "have their own counter of days of use" (the post does not use the word "exemption"). https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/
- **E21 [V]** WebKit blog 2023-08-10 (Safari 17 / iOS 17): StorageManager.persist() is granted "based on heuristics like whether the website is opened as a Home Screen Web App"; origin quota up to 60% of disk for browser apps, 15% for other apps; the page does not mention the 7-day cap. https://webkit.org/blog/14403/updates-to-storage-policy/
- **E22 [V]** MDN StorageManager.persist(): the browser may or may not honor the request; resolves true only if granted; secure context; widely available since December 2021 per the page; Safari version number not on the page. https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist
- Not found (GAP): a source stating whether persist() is granted in a plain Safari tab (not Home Screen) on iOS. E21 implies heuristics favor Home Screen apps.

### Priority 5: Facebook, Telegram, Messenger in-app browsers
- **E23 [R]** User reports (Brave community, Samsung community, 2025) that PDFs opened from Facebook Messenger fail to open or download; workaround: forward the file to oneself or open in an external browser. These concern files received in Messenger, not downloads from a web app inside the in-app browser. https://community.brave.app/t/opening-pdfs-from-fb-messenger/621107 , https://eu.community.samsung.com/t5/galaxy-s24-series/new-update-can-t-open-files-sent-in-facebook-messenger/m-p/12784877/highlight/true
- **E24 GAP** No primary source found on Facebook, Messenger or Telegram in-app browser limits for blob downloads, window.print, or Web Share, and none on user-agent strings (FBAN/FBAV, Telegram) or intent:// behavior. Docket C evidence rests on [A] and E23 only.

### Priority 6: canvas limits
- **E25 [R]** pqina.nl: iOS Safari canvas area limit is 16,777,216 pixels; larger canvases fail with a memory-limit error; high-DPR screens reach it quickly. Snippet. https://pqina.nl/blog/canvas-area-exceeds-the-maximum-limit/
- **E26 [A]** Registrar's arithmetic: A4 at 96 dpi is about 794 x 1123 CSS px; at scale 2 that is about 3.6 million pixels, at scale 3 about 8.0 million, both under 16.8 million. Scale 4 would be about 14.3 million. Whether iOS also enforces a total-memory limit across several page canvases is not established.
- **E27 GAP** No source found on canvas or memory limits on low-end Android, or on how html2canvas behaves on a page of Khmer text on iOS.

### Priority 7: Khmer line breaking
- **E28 [V]** W3C Khmer Gap Analysis: browsers use dictionary-based word breaking for Khmer, with awkward breaks possible for some words; browsers tend to apply the Khmer dictionary to any Khmer-script text; on macOS letter-spacing, Firefox keeps vowel signs with base, Chrome fails to keep vowel signs with a preceding subjoined consonant, Safari separates all characters; the page does not mention Intl.Segmenter. https://www.w3.org/TR/khmr-gap/
- **E29 [R]** Intl.Segmenter is Baseline (Chrome 87, Edge 87, Firefox 125, Safari 14.1) per web.dev and MDN snippets; userland split-khmer and khmer_segmenter projects exist. https://web.dev/blog/intl-segmenter , https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter , https://github.com/seanghay/split-khmer . **GAP:** no source verifies that Intl.Segmenter with locale km produces correct Khmer word boundaries in each browser.

### Priority 8: fonts
- **E30 [V]** Fontsource pages: Kantumruy Pro is OFL-1.1, variable weight 100 to 700; Moul exists, OFL-1.1, static weight 400, display. Subsets and file sizes were not shown on either page. Google Fonts lists Kantumruy Pro subsets khmer, latin, latin-ext ([R], snippet). https://fontsource.org/fonts/kantumruy-pro , https://fontsource.org/fonts/moul
- **E31 GAP** No file sizes found for Kantumruy Pro, Moul, or Inter woff2 files, with or without subsetting. Whether subsetting preserves Khmer OpenType shaping tables was not researched. Budget check (150-ish KB fonts versus 200 KB JS) cannot be done from the record.

### Priority 9: EXIF
- **E32 [R]** MDN createImageBitmap(): imageOrientation default "from-image" applies EXIF orientation; "none" ignores it; method widely available since September 2021. Snippet only. https://developer.mozilla.org/docs/Web/API/createImageBitmap
- **E33 GAP** No source found on whether drawImage of an <img> applies EXIF orientation by default in iOS Safari and Android Chrome, or on the CSS image-orientation default.

### Priority 10: cloud real-device testing
- **E34 [R]** Third-party aggregators (not vendor pages) disagree: LambdaTest (now TestMu AI) free tier about 60 min/month real-time browser testing, 100 lifetime emulator minutes, real devices limited (one source: 1-minute sessions, 5 uses); BrowserStack trial "on request", free-minute figures conflict (30 versus 100). https://costbench.com/software/browser-testing/lambdatest/free-plan/ , https://freetier.co/directory/products/browserstack , https://getautonoma.com/blog/browserstack-vs-lambdatest
- **E35 GAP** No official vendor pricing or free-trial page was read, so free-tier real-iPhone minutes cannot be stated. No source was searched or found on how closely Playwright WebKit reproduces iOS Safari download, share and storage behavior (relevant to F3).

Exhibit count: 35 numbered exhibits (E1 to E35), of which GAP exhibits: E5, E14, E17, E24, E27, E31, E33, E35 (8).

## 10. Discovery summary for counsel (neutral)

What the record verifies [V]: pdfmake uses UAX #14 line breaking (E1); fontkit lists no Khmer shaper by name (E3); typst.ts web compiler is 7.62 MB gzip (E9); a WebKit bug reports blob-based PDF downloads opening in the tab on iOS Safari and it is still open as of 2026-05 (E18); WebKit deletes script-writable storage after 7 days without interaction for Safari tabs and Home Screen apps count separately (E20); persist() grants are heuristic and favor Home Screen apps (E21); browsers break Khmer lines by dictionary (E28); Kantumruy Pro and Moul are OFL-1.1 (E30).

What is NOT established (GAP): correct Khmer in any JS PDF library (E5); iOS PDF file share and Files saving (E17); in-app browser behavior (E24); current HarfBuzz WASM size (E14); font file sizes (E31); Intl.Segmenter km quality (E29); EXIF in drawImage (E33); vendor free-tier terms (E35).

Suggested cheapest tests surfaced by the gaps (not rulings): render one fixed Khmer test string through react-pdf, pdfmake and pdf-lib+fontkit with Noto Sans Khmer and compare to the browser (E5); on one real iPhone, test blob + a[download] and navigator.share({files:[pdf]}) from Safari (E17, E18); build size check of subset woff2 files (E31); open the deployed link inside Facebook and Telegram on one phone (E24).
