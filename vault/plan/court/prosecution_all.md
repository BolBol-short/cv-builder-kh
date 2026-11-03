# PROSECUTION: all 30 options (Plaintiff, blind)

Discovery filed: 5 of 5 searches. Findings tagged [R] with site (ids D1-D5 below, cited by name in charges).
- D1 [R] developer.mozilla.org/Navigator/share and docs.w3cub.com: advice is canShare({files}) first; a developer report says iOS 14 failed canShare for PDF/image files. Nothing confirms "Save to Files" for web-shared files on current iOS.
- D2 [R] github.com/niklasvh/html2canvas/issues/226: non-Latin glyphs drawn wrong through html2canvas but fine via plain canvas fillText (Tamil, old version). forum.figma.com: canvas pipeline may skip GPOS, breaking Burmese/Khmer/Lao marks.
- D3 [R] browserstack.com/guide/playwright-safari, soledadpenades.com: Playwright WebKit is "close to but not identical" to iOS Safari; some bugs only on real iPhones. Vendor pages, marketing-adjacent.
- D4 [R] forums.meteor.com, stackoverflow mirror (kiwix): Facebook in-app browser UA carries FBAN/FBAV; in-app browser breaks some features (service worker). No source on blob/print/Share limits.
- D5 [R] github.com/dompdf/dompdf/issues/2900, github.com/PhilterPaper/Perl-PDF-Builder/issues/35, forum.aspose.com: Khmer breaks in PDF engines that embed glyphs without OpenType shaping (coeng/subscript shown side by side). Nothing found on pdf-lib/fontkit specifically.

---

## A1 Print only (v1)
- FATAL [R, user-disclosed premise] Constraint 7: iPhone must save a PDF file to Files; user states iOS print has no direct save-as-PDF. E17 GAP means no exhibit confirms it, but the constraint is binding and the premise is the user's own fact. Judge decides whether this is "plain". Test: on one iPhone, print from Safari and check whether a file lands in Files without the share-sheet pinch-zoom trick.
- [A] Output depends on the browser's print dialog: headers/footers, margins and paper size are user-controlled, so the "same PDF everywhere" goal is unreachable.
- [A] No Blob exists, so B2 (share) has nothing to share.
- Credit due: browser shaping makes Khmer correct (E28 [V] shows the browser, not the app, does the line breaking).

## A2 Canvas capture to image PDF
- [R] Khmer under html2canvas is unproven: E8 [V] shows one Khmer-tagged issue (#2246) of unknown content; D2 [R] shows non-Latin glyphs mis-drawn through html2canvas. Test: render a fixed Khmer string with stacked subscripts and vowels through html2canvas and dom-to-image on iPhone Safari and Android Chrome; compare to DOM.
- [R] iOS canvas area cap 16.8M px (E25); A4 at scale 3 is 8M (E26 [A]). Multi-page memory unknown (E27 GAP). Test: 3-page export at scale 3 on the oldest available iPhone.
- [A] Image PDF: no selectable or searchable text, larger files (several MB per page at scale 3), blurry at print size at scale 2. Test: export and measure KB.
- [A] html2canvas + jsPDF together may exceed the 80 KB gzip lazy budget. Test: `vite build` bundle visualizer.
- [V] The Blob download path hits E18 (blob PDF opens in the tab on iOS Safari, bug still open).
- Needs D1/D3/D4 pagination (section 6 dependency).

## A3 @react-pdf/renderer + embedded Khmer font
- [V] E4: the only Khmer-tagged react-pdf issue is #933; Khmer appears only in a user's snippet and shaping is not discussed. E5 GAP: no source shows correct Khmer in react-pdf. D5 [R] shows the failure pattern in engines without shaping. Test: one-hour spike rendering the Khmer test string, compared with Chrome.
- [V] E3: fontkit README names no Khmer shaper (Universal/Indic may still apply, E5 GAP).
- [A] react-pdf bundle (yoga + pdfkit + fontkit) very likely exceeds 80 KB gzip lazy and 200 KB if not lazy. Test: build and measure.
- [A] Templates are rewritten in react-pdf primitives, with no Tailwind or CSS: doubles template work for a solo learner, and the preview no longer equals the PDF.
- [A] React 19 compatibility unchecked. Test: `npm ls` / install on React 19.
- Not FATAL yet; becomes FATAL if the spike shows broken stacks.

## A4 pdfmake or pdf-lib + fontkit + Khmer font
- [V] E1: pdfmake line breaks by UAX #14, and the Khmer line-breaking issue was closed within two days with a pointer to another repo, so no dictionary breaking. E2 [V]: five closed Khmer issues, including "missing Khmer characters" (#2319, contents unread).
- [V] E3 plus E5 GAP: no source shows fontkit shaping Khmer. For pdf-lib, D5 [R] says nothing found; there is no known shaping step.
- [R] E7: other PDF engines without complex-script layout broke Khmer (dompdf, Dart pdf; D5 [R] adds Perl PDF::API2).
- [A] Document definitions replace JSX templates: rewrite plus preview mismatch.
- [A] pdfmake's bundled fonts and fontkit add heavy weight. Test: bundle measure.
- Shared spike with A3. Not FATAL on the current record.

## A5 HarfBuzz WASM shaping + pdf-lib glyph drawing
- [R] E13: HarfBuzz WASM was 164-214 KB zipped in 2019, over the 80 KB lazy budget; E14 GAP has no current size. Test: fetch harfbuzzjs wasm and gzip it.
- [A] You write a text layout engine yourself: line breaking (Khmer needs a dictionary; Intl.Segmenter km is unverified, E29 GAP), glyph-ID drawing, justification, ToUnicode maps so text stays copyable (E12 [R] shows copy/search breaks otherwise). Test: draw one Khmer paragraph with wrapping and see how many lines of code it takes.
- [A] Constraint 8 (solo, learning, smallest solution) is strained; FO is the lowest of all A options. Not FATAL, as it rests on [A].
- Fair credit: correct shaping is plausible (HarfBuzz is the reference engine), and a vector PDF.

## A6 Typst WASM
- FATAL [V] E9: typst.ts web compiler 7.62 MB gzip versus the 80 KB lazy budget (about 97 times); constraint 11 is binding.
- [V] E10: minimal bundle fetches fonts from GitHub at runtime (needs internet, breaks Vercel-static self-containment).
- [A] Templates move to the Typst language: breaks constraints 1 and 8 in spirit (JS and React only, smallest solution).
- [R] E12: Typst renders Khmer visually but extraction yields wrong Unicode.
- Test (no spike needed): the budget alone decides it.

## A7 Hybrid: A2 now, Print on desktop, vector later if spike passes
- Double counting: A2's merits and A2's defects are the same evidence. All A2 charges apply: E8 [V]/D2 [R] unproven Khmer in html2canvas, E25 [R] canvas cap, E18 [V] blob download.
- [A] Two outputs per user (image PDF on phones, print PDF on desktop) means two code paths, two Khmer behaviours, and different layouts for the same CV: a bug-report generator.
- [A] "Later, only if a spike proves it" is a process condition, not a solution, so A7 ships A2's flaws now. Sever A7b.
- [A] The A2 image PDF becomes a legacy format users have already shared with employers.
- Test: ship A2 to one user, ask whether employers reject image PDFs.

## B1 Blob + download, IndexedDB + persist(), A2HS guidance, last saved, backup nudge
- [V] E18: blob PDF/image downloads open in the tab on iOS Safari instead of saving; bug NEW, 2026-05. This is B1's own export path on exactly the target device. The viewer's share button can still save the file, so a condition, not FATAL. Test: one real iPhone, blob + a[download] PDF.
- [V] E20: Safari deletes IndexedDB and LocalStorage after 7 days of Safari use without interaction; IndexedDB gives no extra safety. Only the Home Screen counter is protected, and E21 [V] says persist() is a heuristic. GAP: persist() in a plain Safari tab is unknown. Test: persist() call on iPhone Safari, read the boolean.
- [A] Bundle of four ideas; each adds JS and Khmer copy; nudge fatigue; "last saved" misleads after a wipe.
- [A] IndexedDB is a new API for a learner, and a library is a dependency.
- Severance applies (B1a-d).

## B2 Web Share API for PDF, download fallback
- [R] D1: iOS 14 reports of canShare({files}) failing for PDF; E17 GAP: nothing confirms canShare true for PDF or "Save to Files" on current iOS. Test: share a PDF Blob from Safari on one iPhone.
- [A] Share requires a user gesture; if PDF generation (html2canvas, seconds) runs before navigator.share, the activation can expire and Safari throws NotAllowedError. Test: same iPhone, 3-second delay before share.
- [R] E15/E16: sharing needs HTTPS and a user gesture; unsupported implementations return false, so the fallback is the E18 path.
- [A] Cancel throws AbortError, easily mistaken for failure.
- Moot unless A2-A6 emit a Blob (section 6).

## B3 localStorage only, no guidance, no nudge (v1)
- FATAL candidate [V] E20: Safari deletes LocalStorage after 7 days of Safari use without interaction; a CV a user drafts and returns to later can vanish. Constraint 5 ("data stays on device") is silently broken by the platform. Judge may reduce to a condition if "days of use" is held to be rare. Test: iPhone Safari, create CV, advance device clock 8 days of use, reopen.
- [A] No backup file means one wipe is total loss.
- [A] Silent failure with no analytics (constraint 3): the owner would never learn.
- [A] localStorage quota (about 5 MB) would be hit by a Base64 photo plus several CVs.
- Credit: simplest possible; fits FO fully.

## B4 Require Home Screen install before the editor opens on iOS
- [A] iOS cannot be forced to install; users who cannot or will not (Chrome iOS, work phones, unfamiliar) are blocked completely, which breaks constraint 6 (iPhone users must be able to use the app) for those users.
- [A] Inside Facebook/Telegram viewers (docket C) the install flow is not offered; a dead end. E24 GAP.
- [V] E20/E21: A2HS gets its own counter and a better persist() heuristic, so the data benefit is real; the charge is the gate, not the install.
- [A] Cambodian users' familiarity with "Add to Home Screen" is unknown. Test: put a dummy install gate in front of five iPhone users and count dropouts.
- Not FATAL, as it rests on [A]; a soft prompt (B1) gives the same benefit with no gate.

## C1 UA detection + "Open in browser" banner, still allow trying
- [R] D4: FBAN/FBAV marks Facebook; no source on Telegram or Messenger UAs (E24 GAP); UA strings change without notice.
- [A] Steps differ by app, OS and version; each needs Khmer and English text and upkeep.
- [A] "Still allow trying" lets users hit the broken download anyway; E23 [R] shows PDF failures in Messenger.
- [A] False negatives show no banner. Test: deploy and open in FB, Messenger, Telegram on one phone each, record UA.
- Join with C2a (section 7a).

## C2 Detect + copy link + steps, plus image export fallback
- [A] Everything C1 has, plus code: clipboard write in a webview may be denied (E24 GAP). Test: tap copy in the Facebook viewer.
- [A] Image export is a different deliverable; employers want a PDF. It overlaps A2 (section 6): coupled to A2's Khmer risk (E8 [V], D2 [R]).
- [A] iOS in-app viewer long-press-to-save is unverified, and an image saved in the Photos app is not "in Files".
- [A] Scope creep for a solo part-time learner on a 1-in-N use case with no data on N.
- Severance applies.

## C3 Forced redirect out of the viewer
- [A] intent:// is Android Chrome only; iOS has no supported scheme to open Safari from a web page (googlechromes:// needs Chrome installed). Test: on an iPhone in Facebook viewer, try each scheme.
- [A] In-app browsers can block custom schemes; the user lands on a blank page or a loop. E24 GAP.
- [A] Redirecting without consent is a dark pattern and a likely WCAG 3.2 (predictable) problem.
- [A] Untestable without Facebook accounts and the apps (F3 cannot cover it).
- Not FATAL: all [A].

## C4 Do nothing; mention in Help
- [R] E23: PDF failures in Messenger-opened files are reported by users; none for web-app downloads (E24 GAP).
- [A] Cambodian users commonly open links from Facebook/Telegram, so the failure path may be the main path, not an edge. Test: ask five target users where they open links.
- [A] Failure is silent, and constraint 3 means the owner never sees it.
- [A] Help pages are unread by users already blocked.
- Credit: zero cost.

## D1 data-block marks, measure, break offsets, fixed A4 containers, pageGeometry.js
- [V] E28: browsers' Khmer word breaking is dictionary-based and differs by browser. Heights measured in one engine can differ from the engine that prints or captures. Test: same long Khmer CV in Chrome Android and iOS Safari, compare break offsets.
- [A] Measuring before fonts load (E1/E4 swap) gives wrong offsets. Needs document.fonts.ready.
- [A] A block taller than a page, or a break inside a block, is unhandled by design.
- [A] A learner builds a layout engine; D1a (pageGeometry.js) is sensible alone, D1b is not.
- Credit: required for A2-A6 anyway.

## D2 CSS break rules + browser print flow (v1)
- [A] Only works with A1 (section 6), so inherits A1's iPhone charge; not independently FATAL.
- [A] break-inside: avoid is unevenly honored in mobile print engines and by Khmer dictionary line breaking (E28 [V]).
- [A] No evidence it worked in v1 (no users).
- [A] Print margins and headers/footers are outside app control.
- Test: print a 2-page Khmer CV from iPhone Safari and Android Chrome.

## D3 One-page templates that shrink to fit
- [A] Khmer stacked marks need generous line height; shrinking reaches illegible size on a phone-sized A4 preview. Test: fit 30 lines of Khmer to one page and measure the minimum px.
- [A] Real CVs (long histories) lose content or get tiny text; WCAG 1.4.4 (resize text) risk.
- [A] Shrink loops need measurement, so it still needs D1-lite.
- [A] Contradicts the two-page need that docket D itself assumes.
- Credit: simplest layout; no pagination.

## D4 Fixed two-page layouts; user picks sections for page 1
- [A] Overflow still needs detection and warning, so measurement code returns (D1-lite).
- [A] Moves the layout burden onto users; less able users produce half-empty pages.
- [A] Fixed capacity per template cannot hold varying Khmer line counts. Test: fill a template with the longest realistic Khmer text.
- [A] Doubles per-template design work.
- Credit: predictable and cheap to test.

## E1 Self-host subset WOFF2, unicode-range, swap, lazy Moul
- [GAP] E31: no sizes known; budget claim untestable. Test: build fonts and measure.
- [GAP] Subsetting may strip or break Khmer GSUB/GPOS tables, so stacks render wrong. E31 GAP says not researched. Test: subset Kantumruy Pro, compare shaping of the test string.
- [A] font-display swap flashes a fallback and shifts layout, harming D1 measurements and LCP.
- [A] Subset tooling (pyftsubset) is a Python toolchain for a JS learner; Fontsource may already ship khmer subset (E30 [V] pages show no sizes).
- [A] PDF libraries need TTF/OTF bytes; WOFF2 decoding needs brotli.
- Severance E1a/E1b.

## E2 System fonts only
- [A] A PDF cannot embed system fonts (section 6 dependency), so A3-A5 are impossible; only A1 or A2 remain.
- [A] Khmer font varies by phone; low-end or old Android may lack Khmer and show boxes. Test: open Khmer text on the lowest phone available.
- [A] Moul and other designed Khmer templates unavailable; "formal Khmer" CV looks generic. SP is weak: same CV looks different on each phone.
- [A] Stack rendering quality differs by font.
- Credit: zero bytes, zero upkeep.

## E3 Google Fonts CDN (v1)
- [A] Every visit sends a request to Google from the user's IP; conflicts with the privacy spirit of constraints 3 and 5, but no constraint forbids a CDN. Test: view network panel.
- [A] A3-A5 need font bytes at export time and offline use fails; CDN down or blocked means fallback boxes.
- [A] Latency on Cambodian mobile links to Google; extra DNS and TLS before text paints; LCP risk.
- [A] Cannot subset Khmer for unicode-range on your own terms.
- Not FATAL.

## E4 Self-host one full font file per family, no subsetting
- [A] Full Khmer plus Latin files are large for Cambodian 4G; E31 GAP has no sizes. Test: download and gzip Kantumruy Pro and Moul.
- [V] E30: Kantumruy Pro is variable (100-700), which usually makes the file larger.
- [A] No unicode-range means Latin-only visitors still download Khmer glyphs.
- [A] LCP at 2.5 s on mid-range Android 4G is at risk.
- Credit: no subsetting hazard to Khmer shaping tables (opposite of E1 charge).

## F1 Borrow or buy cheap Android; owner's or friends' iPhone; manual checklist
- [A] Constraint 9 (owner's devices) is UNKNOWN; the plan costs money or favors depending on an unanswered fact.
- [A] One iPhone model and one iOS version; E18 and storage behavior vary by version.
- [A] Manual checklist per release gets skipped by a part-time solo owner.
- [A] Cannot cover Facebook and Telegram viewers without accounts and apps (still doable by hand).
- Test: ask the owner which phones exist.
- Credit: only option that sees real behavior (E17, E18 gaps need exactly this).

## F2 Cloud real-device service on free tier or trial
- [R] E34: aggregators disagree on free minutes (30 vs 100); real-device access may be 1-minute sessions; E35 GAP no vendor page read.
- [A] Cannot test the Files app, the share sheet or Facebook viewer meaningfully in a remote session. Test: sign up and try a PDF save on a remote iPhone.
- [A] Trials expire; the cost recurs.
- [A] Latency from Cambodia (remote UI is hard to use).
- [R] D3: vendors are the main source of "real devices" claims, with marketing interest.

## F3 Emulation only (Playwright WebKit + Chromium, throttling)
- [R] D3 (browserstack.com, soledadpenades.com): Playwright WebKit is not iOS Safari; some bugs show only on real iPhones. E35 GAP: nothing on download, share and storage fidelity.
- [A] E18 and E20 behaviours (blob opens in tab, storage eviction) are iOS-specific and unreproducible. Test: run the same blob download in Playwright WebKit and a real iPhone.
- [A] On Windows, WebKit builds use a different text stack than CoreText, so Khmer shaping may differ from the iPhone: the main risk (Khmer) goes untested.
- [A] Cannot cover in-app browsers.
- Credit: free and automatable; good as a supplement.

## F4 Beta testers as device testers with a short script
- [A] Device coverage is random; no analytics (constraint 3) so no way to know which devices were covered.
- [A] Testers rarely report precisely; a Khmer script and screenshots are needed. Test: pilot with three people and count usable reports.
- [A] Testing with real CV data is a privacy hazard; need a sample CV.
- [A] Users find bugs after the release rather than before.
- Credit: only way to reach real target phones at zero cash.

## G1 "Report a problem" link (GitHub form or mailto), pre-filled with browser, version, template
- [A] A GitHub issue form requires an account and is public; many Cambodian users have none, and a public issue exposes their device and any text they type. mailto needs a configured mail app and may be blocked in in-app browsers. Test: tap mailto in the Facebook viewer.
- [A] Only motivated users report; silent failure persists.
- [A] Pre-filled UA is on-device and user-sent, so it should be compatible with constraint 3, but the Judge should confirm.
- [A] Needs triage by a solo owner.
- Credit: simplest.

## G2 Help screen with copyable local error log
- [A] Log stored on device may hold CV text via error messages and stack traces; copying and sending leaks content unless sanitized.
- [A] The log lives in localStorage or IndexedDB, subject to E20 [V] wipes.
- [A] Users still need to find, copy and send it; low-skill users will not.
- [A] Silent failures (PDF opens in tab, E18) throw no JS error, so the log is empty exactly when it matters. Test: reproduce E18 and look at the log.
- [A] Extra code for a learner; error-capture quirks across webviews.

## G3 Beta interviews and follow-up messages only
- [A] Does not scale; reaches only people the owner knows (selection bias).
- [A] Interviewed users forget details; no device or version data.
- [A] Post-launch breakage reaches no one; depends on the owner's time (part-time).
- [A] Language and channel (Facebook/Telegram) friction. Test: message five users, count replies within a week.
- Credit: zero code, no privacy risk, richest qualitative feedback; best as a complement to G1.
