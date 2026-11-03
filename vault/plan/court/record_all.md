# REGISTRAR RECORD, PRELIMINARY HEARING (dockets A to G, 31 entries: 30 options + A7a)

Neutral. No scoring, no argument. No cross-examination file exists. Objections are flagged; the Judge rules.
Key: D = Defense, P = Plaintiff. "Addr" = criteria addressed, "Dodged" = criteria not addressed. Criteria: SP, FO, EV, CM, RR, PC.
Neither side labelled its points by criterion; addressed/dodged is the Registrar's reading of the content.

## New exhibits (expert witness, 4 of 4 searches used; all tier [R] because only search-result summaries were read, no page was fetched)

- **E36 [R]** iOS share of files. Search returned: WebKit bug 261498 (canShare({files}) code worked on iOS 16; on iOS 17 and 18 the target app is missing from the share sheet; tagged "REGRESSION (iOS 17)?", no resolution seen); Apple Discussions thread 255684738 (iPadOS 17.5.1 user: "Save to Files" vanished from the share sheet for a Safari PDF, returned after 17.6); a Russian Q&A (qna.habr.com/q/996459) that iOS 14 fails the canShare file check. Nothing found confirming that a web-shared PDF offers "Save to Files" on current iOS. Effect: E17 GAP narrowed, not closed; adds a negative signal for B2 and an OS-version dependence. https://bugs.webkit.org/show_bug.cgi?id=261498 , https://discussions.apple.com/thread/255684738 , https://qna.habr.com/q/996459
- **E37 [R]** iPhone Safari print to Files. Several independent how-to sites (iphonelife.com, igeeksblog.com, macmost.com, bgr.com) describe one path: Print, pinch outward on the preview to open it as a PDF, then Share, Save to Files. Third-party and of varying dates; the menu labels may differ by iOS version. Effect: the user's premise that iOS print has no direct save-as-PDF is half-confirmed: there is no direct button, but a hidden-gesture path does reach Files. Bears on A1's FATAL charge and on constraint 7 ("like a normal download"). https://iphonelife.com/node/273074 , https://www.igeeksblog.com/how-to-save-webpages-as-pdf-iphone-ipad , https://macmost.com/how-to-create-a-pdf-from-almost-any-app-on-your-iphone.html , https://bgr.com/tech/this-brilliant-hidden-iphone-feature-lets-you-print-anything-to-pdf/
- **E38 [R]** html2canvas and Khmer. No html2canvas-specific Khmer source found (E8 GAP stands). Related snippets only: Figma forum (Thai marks detach when the canvas pipeline skips GPOS; not html2canvas); a SIL Khmer specification note (Chrome 81 mis-rendered a below-subscript followed by a vowel, Firefox 76 did not); a typedrawers.com report that the problem shows with Noto Khmer and DaunPenh on some Windows and Chromebook setups, "not on iOS". Effect: no verification either way for A2 and A7a. https://forum.figma.com/report-a-problem-6/thai-script-rendering-broken-on-frame-names-vowels-and-tone-marks-detached-from-consonants-51323 , https://github.com/sillsdev/khmer-character-specification , https://typedrawers.com/discussion/comment/57796
- **E39 [R]** pdf-lib, fontkit and Khmer. No pdf-lib or fontkit Khmer finding. Related: dompdf #2900 (maintainer: no complex text layout; suggests pre-shaping text), khmer_pdf_fixer (Dart: shape in Flutter, embed image), Apryse/PDFTron forum (shaping enabled via glyph-index font encoding), Aspose forum (Khmer PDF render issue). Largely repeats E7. Effect: E5 GAP stands for A3, A4, A5. https://github.com/dompdf/dompdf/issues/2900 , https://pub.dev/packages/khmer_pdf_fixer , https://community.apryse.com/t/how-to-write-diacritic-text-such-as-khmer-cambodian/6309 , https://forum.aspose.com/t/khmer-pdf-render-issue/324383

Cross-cutting notes that apply to many options:
- **Cross-cutting Defense point:** The Defense cites "case file section 10" or "section 2.10" as [V]. Those passages are the Registrar's summary or the user's constraints, not exhibits; where they are used to prove an outcome, the Registrar flags hearsay as fact.
- **Cross-cutting E23 point:** both sides cite E23 (files received in Messenger) for web-app downloads in in-app browsers; it does not address that.
- **Cross-cutting user-behavior point:** both sides assert that Cambodian users mostly open links from Facebook or Telegram. No exhibit; [A] on both sides.
- **Cross-cutting "closed issue" point:** a closed issue (E1, E2, E4, E6) is not shown to be a fixed or successful outcome.

---

# DOCKET A: PDF with correct Khmer

## A1 Print only (v1)
- **Issue:** does browser print meet constraint 7 (iPhone saves a file) while giving correct Khmer?
- **Agreed:** browser lays out Khmer itself; zero new code; no Blob exists; D2 works only with it; D concedes SP low on iPhone.
- **Disputed:** whether print fails constraint 7 (E37 shows a pinch-and-share path to Files exists; "like a normal download" is the standard); whether browser Khmer is "correct".
- **Objections:** speculation (D claim 1, "only renderer shown correct": E28 covers line breaking, not shaping); speculation (D claims 3, 4); hearsay as fact (P FATAL rests on a user premise, E17 GAP, now E37 [R]).
- **Struck:** D "the only renderer already shown to produce correct Khmer" (no exhibit). P "headers/footers user-controlled" (no source, [A]).
- **Missing:** a run on a real iPhone; Khmer correctness in each browser.
- **Criteria:** D addr FO, RR, CM; dodged SP (conceded), EV. P addr SP, PC; dodged FO, CM, RR.
- **FATAL:** filed (constraint 7); unanswered, pending cross (D conceded the premise in its brief, did not contest it).
- **Overlap:** D2 depends on it; B2 moot under it; A7a retains it as the desktop button.

## A2 Canvas capture to image PDF
- **Issue:** can html2canvas or dom-to-image keep Khmer correct and deliver a Blob that saves on iPhone?
- **Agreed:** no Khmer-specific html2canvas evidence (E8, E38); image PDF is not selectable; needs D1, D3 or D4; scale 2 area is under the iOS cap (E25 [R], E26 [A]).
- **Disputed:** does canvas redraw lose shaping; does multi-page memory pass; does the Blob save work (E18, E36).
- **Objections:** hearsay as fact (D claim 3 cites E16 for a "normal download path"; E16 says only feature-detect, and E18 contradicts the download path); speculation (D claims 4, 5 are [A]); double counting (P cites E18 here and again under B1 and B2).
- **Struck:** P "several MB per page", "blurry at scale 2", "exceeds 80 KB lazy budget" (no measurement, [A]); P "employers" (see A7).
- **Missing:** a run: Khmer test string, per-page memory on low-end Android and old iPhone, bundle size.
- **Criteria:** D addr SP, FO, CM(limited); dodged RR, PC. P addr SP, CM, EV; dodged FO, RR.
- **FATAL:** none filed.
- **Overlap:** A7, A7a (contain it); C2b; B2 and B1a (Blob consumers); needs docket D.

## A3 @react-pdf/renderer
- **Issue:** does react-pdf shape Khmer correctly with an embedded font, at an acceptable bundle size?
- **Agreed:** E5 GAP; E4 does not discuss shaping; E3 names no Khmer shaper; all templates rewritten; EV at most 2 (D conceded).
- **Disputed:** whether Khmer renders correctly (the decisive spike); size against 80 KB; React 19 compatibility.
- **Objections:** hearsay as fact (D claim 3 labels E4 [V] for "fonts can be registered by range"; E4 only shows a user snippet, not that it works); speculation (D claims 1, 2, 4); speculation (P bundle and React 19 are [A]).
- **Struck:** P and D size claims (no measurement). P "doubles template work" kept as a risk only.
- **Missing:** one-hour spike; bundle measure; `npm ls` on React 19.
- **Criteria:** D addr FO (partial), EV (conceded), PC; dodged CM, RR. P addr SP, CM, FO, EV; dodged PC.
- **FATAL:** none filed ("becomes FATAL if the spike shows broken stacks").
- **Overlap:** A4 (shared Khmer spike); depends on docket E font bytes; forces D1, D3 or D4.

## A4 pdfmake or pdf-lib + fontkit
- **Issue:** same shaping question for pdfmake or pdf-lib, plus line breaking.
- **Agreed:** UAX #14 line breaking (E1); five closed pdfmake Khmer issues (E2; #2319, #332 unread); no shaping source (E3, E5, E39); templates move to definitions.
- **Disputed:** do "closed" issues mean fixed; is UAX #14 adequate for Khmer; the pdf-lib path.
- **Objections:** speculation (D claim 4 "pdf-lib smaller" [A]; P "heavy weight" [A]); hearsay as fact (D uses E2's five closed issues as support; titles only); relevance (P cites Perl PDF::API2 via D5, a different engine, partly via E7).
- **Struck:** D "pdf-lib is smaller than react-pdf" (no measurement). P "pdf-lib has no known shaping step" (absence of a search result, not a finding).
- **Missing:** read #2319 and #332; one Khmer render; bundle size.
- **Criteria:** D addr FO, PC, EV (limited); dodged CM, RR, SP. P addr SP, CM, EV; dodged FO, PC.
- **FATAL:** none filed.
- **Overlap:** A3 (shared test), A5 (pdf-lib), docket E.

## A5 HarfBuzz WASM + pdf-lib
- **Issue:** can a real shaper plus hand-built layout be justified for a solo learner?
- **Agreed:** E14 GAP; E13 size from 2019 over 80 KB; heavy custom layout work; FO lowest of A (both sides); credit for plausible correct shaping.
- **Disputed:** current wasm size; whether harfbuzzjs shapes Khmer in a browser; effort of the custom engine.
- **Objections:** hearsay as fact (D claim 1 "reference shaper for Khmer" cites E14, a GAP that carries a rustybuzz note [R] and does not mention Khmer); speculation (D claim 2; P custom-engine list is [A]).
- **Struck:** D "reference shaper for Khmer" as a fact. P "Intl.Segmenter unverified" kept (E29 GAP).
- **Missing:** a current wasm size; a shaped Khmer paragraph; line-count of the layout code.
- **Criteria:** D addr SP (plausible), EV(low); dodged CM, RR (conceded FO, CM). P addr FO, CM, SP; dodged PC.
- **FATAL:** none filed ("not FATAL, as it rests on [A]").
- **Overlap:** A6 (shaper family); A4 (pdf-lib); E29 and docket E.

## A6 Typst WASM
- **Issue:** does a 7.62 MB gzip compiler fit constraint 11?
- **Agreed:** E9 size; E10 runtime GitHub font fetch; templates leave JS and React; E12 text-extraction wrong; D does not contest summary judgment.
- **Disputed:** nothing material (only that "in spirit" breaks of constraints 1 and 8).
- **Objections:** speculation (P "breaks constraints 1 and 8 in spirit", [A]); the 97x figure is the Registrar's arithmetic on [V] E9.
- **Struck:** none.
- **Missing:** whether lazy-loaded size could be separated from the 80 KB rule if the compiler runs on demand (none claimed).
- **Criteria:** D addr SP (plausible), EV (conceded); dodged FO, CM, RR, PC. P addr CM, FO, PC, EV; dodged SP.
- **FATAL:** filed (constraint 11 budget, E9 [V]); unanswered, pending cross. D concedes in its brief.
- **Overlap:** A5 (shaping family).

## A7 Hybrid: A2, Print on desktop, vector later
- **Issue:** does the bundle add anything beyond A2, and is "later if spike" a solution?
- **Agreed:** A7 = A2 + Print + a process condition; both sides flag double counting; A7b not defended as a solution.
- **Disputed:** whether the added Print button and spike gate carry merit; whether two code paths are a cost.
- **Objections:** double counting (A2 evidence credited and charged in both A2 and A7); moving the goalposts (A7b process condition inside an option, P asks for severance); speculation (P "legacy format shared with employers").
- **Struck:** P "image PDF becomes a legacy format... employers reject" (no source).
- **Missing:** none beyond A2's.
- **Criteria:** D addr SP (via A2), RR; dodged EV, CM. P addr RR, CM; dodged FO, PC.
- **FATAL:** none filed.
- **Overlap:** A2 (contains it), A7a (amended form), A1 (print button), docket D.

## A7a Amended: A2 now + desktop Print button
- **Issue:** is A2 plus a desktop Print button sounder than A2 alone?
- **Agreed:** inherits all A2 concessions; the Print layout must match the A2 layout (docket D); P filed no brief on A7a (prosecution was blind before the amendment).
- **Disputed:** whether desktop Print is a real fallback if the image PDF has Khmer flaws.
- **Objections:** speculation (D claims 1, 3 are [A]); double counting risk against A2 (D claims added value only from the button). No formal filing as an amended option by the Registrar yet; the Judge may treat the P's A7 charges as applying.
- **Struck:** none.
- **Missing:** a Plaintiff brief on A7a; whether desktop Print layout can match capture layout.
- **Criteria:** D addr SP, RR, FO; dodged EV, CM, PC. P none specific.
- **FATAL:** not applicable (none filed against A7a; A7 had none).
- **Overlap:** A2, A7, A1 (button), D2 (print flow).

---

# DOCKET B: iPhone save and data loss

## B1 Blob + a[download]; IndexedDB + persist(); A2HS; last saved; backup nudge
- **Issue:** does the bundle save the PDF on iPhone and protect data?
- **Agreed:** E20, E21 verified; E18 reports blob PDFs opening in the tab; E17 GAP; plain-tab persist() unknown; bundle severable (B1a-d).
- **Disputed:** whether download reaches Files; benefit of IndexedDB over localStorage; "last saved" misleading after a wipe.
- **Objections:** hearsay as fact (D claim 2 "quota far larger for Home Screen apps": E21 says browser apps 60%, other apps 15%, and does not tie that to Home Screen); fabrication (P "the viewer's share button can still save the file", attributed to E18, which says only an octet-stream workaround); double counting (E18 cited again under A2, B2).
- **Struck:** D quota comparison for Home Screen; P viewer-share-button claim; P "nudge fatigue" [A].
- **Missing:** a real iPhone run (download, persist() in a plain tab).
- **Criteria:** D addr SP, RR, PC, FO; dodged CM. P addr SP, EV, FO; dodged PC.
- **FATAL:** none filed.
- **Overlap:** B2 (storage and guidance parts identical), B3, B4 (guidance), G2, A2.

## B2 Web Share API for PDF, download fallback
- **Issue:** does share-sheet export beat blob download on iPhone?
- **Agreed:** needs a Blob (moot under A1); E17 GAP; user gesture and HTTPS needed; Share is "export", not download.
- **Disputed:** canShare true for PDF on current iOS (E36: unreliable iOS 17+); "Save to Files" availability (E36: disappears on some OS versions); activation expiry after slow PDF generation.
- **Objections:** speculation (D claims 2, 4, [A]); speculation (P activation expiry, AbortError, [A]).
- **Struck:** D "native Save to Files is listed for files generally" (no source). P "NotAllowedError after seconds of delay" (untested).
- **Missing:** an iPhone test with PDF Blob and a delayed call.
- **Criteria:** D addr SP, PC, RR; dodged FO, CM. P addr SP, EV, RR; dodged PC.
- **FATAL:** none filed.
- **Overlap:** B1 (same storage; export differs), A2 to A6, C2.

## B3 localStorage only (v1)
- **Issue:** is silent 7-day wipe a FATAL breach of constraint 5, or a risk?
- **Agreed:** E20 verifies the wipe rule; no users yet; simplest; D concedes RR low; D notes interaction resets the counter.
- **Disputed:** whether the wipe breaks constraint 5 (which is about data staying on device, not durability); how often users hit it; whether E20 (2020) still holds (E21 does not mention the cap).
- **Objections:** straw man or relevance (P FATAL stretches constraint 5 to cover platform deletion); speculation (P "owner never learns", "no backup, one wipe is total loss" are [A]); fabrication (P "about 5 MB" localStorage quota, no source).
- **Struck:** P 5 MB quota (no exhibit).
- **Missing:** an iPhone test; current wipe applicability.
- **Criteria:** D addr FO, CM; dodged SP, PC. P addr RR, PC, EV; dodged FO.
- **FATAL:** filed (E20); unanswered, pending cross. Note: D already argued interaction resets the counter.
- **Overlap:** B1 (storage axis), G2 (storage wipe).

## B4 Require Home Screen install on iOS
- **Issue:** does the gate's storage benefit outweigh blocking users?
- **Agreed:** E20, E21 support the storage benefit; the gate is the charge; B1c gives most of the benefit; E24 GAP on viewers.
- **Disputed:** users' ability and willingness to install; viewer dead end.
- **Objections:** speculation (P: constraint 6 breach and "dead end" are [A]); speculation (D claim 2).
- **Struck:** none.
- **Missing:** dropout test; Cambodian users' familiarity.
- **Criteria:** D addr RR, PC (limited); dodged SP, FO, CM (conceded). P addr SP, RR; dodged FO, CM.
- **FATAL:** none filed.
- **Overlap:** B1 (A2HS guidance), docket C (viewers).

---

# DOCKET C: in-app browsers

## C1 UA detection + banner
- **Issue:** does a banner solve a real, sized problem?
- **Agreed:** E24 GAP; E23 is about received files; FBAN/FBAV marks Facebook (D4 [R]); Telegram UA unknown; reversible.
- **Disputed:** problem size; UA drift; whether "still allow trying" leaves the failure.
- **Objections:** hearsay as fact / relevance (both cite E23 for web-app downloads); speculation (D claims 1, 2, 4; P steps and upkeep).
- **Struck:** none; E23 used for a purpose it does not support.
- **Missing:** one-phone test in Facebook, Messenger, Telegram.
- **Criteria:** D addr FO, CM, RR; dodged EV (GAP). P addr EV, CM; dodged SP.
- **FATAL:** none filed.
- **Overlap:** C2 (joinder with C2a), C4.

## C2 Detect + copy link + steps + image export
- **Issue:** does image export add value beyond C1?
- **Agreed:** C2a = C1; C2b reuses A2 code only if A2 is chosen; E24 GAP; long-press unverified.
- **Disputed:** clipboard in webviews; whether a Photos image counts as "in Files".
- **Objections:** double counting (C2a merits are C1's); speculation (D claims 1 to 3; P "1-in-N use case"); straw man risk (P treats image as the deliverable; D calls it optional).
- **Struck:** none.
- **Missing:** a test of copy and long-press inside the Facebook viewer.
- **Criteria:** D addr SP, CM (reuse); dodged EV. P addr SP, FO; dodged PC.
- **FATAL:** none filed.
- **Overlap:** C1, A2 (shared canvas code), B2.

## C3 Forced redirect
- **Issue:** can a forced exit from the viewer work and be acceptable?
- **Agreed:** no source (E24 GAP); D defends only an Android form; intent:// is Android Chrome only; iOS lacks a known scheme.
- **Disputed:** reliability; loop and phishing risk.
- **Objections:** moving the goalposts (D defends "C3a Android-only" without filing an amended option); speculation (P "dark pattern", "WCAG 3.2", both [A]).
- **Struck:** P "dark pattern / WCAG 3.2 predictable problem" as a finding.
- **Missing:** a test on iPhone and Android.
- **Criteria:** D addr SP (Android only); dodged EV, RR. P addr SP, RR, PC; dodged FO.
- **FATAL:** none filed.
- **Overlap:** C1 (same goal, other mechanism).

## C4 Do nothing; Help page
- **Issue:** is the cheapest baseline enough?
- **Agreed:** E24 GAP; E23 not on point; v1 has no users; zero cost.
- **Disputed:** how common the in-app path is for Cambodian users; whether failure is silent.
- **Objections:** speculation (both sides assert the usage pattern; no exhibit); relevance (P cites E23 though it is received files).
- **Struck:** none.
- **Missing:** where users open links (ask five).
- **Criteria:** D addr FO, CM; dodged SP, RR. P addr SP, EV; dodged FO, CM.
- **FATAL:** none filed.
- **Overlap:** C1, G1 (feedback path).

---

# DOCKET D: page splitting

## D1 Measure and compute breaks; pageGeometry.js
- **Issue:** is measure-then-paginate stable across devices with Khmer?
- **Agreed:** needed for A2 to A7a (intake [A]); fonts must be ready; blocks taller than a page unhandled; D1a is useful alone.
- **Disputed:** E28 cuts both ways (same-engine measuring vs cross-browser differences; E28 does not show row-height drift between Chrome Android and iOS Safari); learner effort.
- **Objections:** speculation (D claims 1, 3, 4); partly overstated (P cites E28 as showing break offsets differ by engine; it describes line breaking and letter-spacing quirks on macOS).
- **Struck:** none; P "learner builds a layout engine" is [A].
- **Missing:** compare offsets in Chrome Android vs iOS Safari.
- **Criteria:** D addr SP, FO, CM; dodged RR, EV. P addr SP, FO; dodged PC.
- **FATAL:** none filed.
- **Overlap:** D3, D4 (D1-lite), A2 to A7a, E1 (fonts ready), A1 (D2 alternative).

## D2 CSS break rules + print flow (v1)
- **Issue:** can CSS alone split pages, and does it only serve print?
- **Agreed:** works only with A1 (and A7a's Print); mobile CSS support uneven [A]; no v1 users.
- **Disputed:** that it "works" (no test); Khmer line breaking interplay.
- **Objections:** hearsay as fact (D claim 2 cites the case file for "works for desktop print"; case file only says v1 exists); speculation (P items are [A]).
- **Struck:** D "works for desktop print". P "no evidence it worked in v1" is absence, not a finding.
- **Missing:** print a 2-page Khmer CV from iPhone Safari and Android Chrome.
- **Criteria:** D addr FO, CM; dodged SP, RR. P addr SP, EV; dodged FO.
- **FATAL:** none filed.
- **Overlap:** A1, A7a (print button), D1.

## D3 One-page, shrink to fit
- **Issue:** is one-page acceptable for real CVs?
- **Agreed:** no pagination; no evidence on Cambodian CV length; D concedes it is not general.
- **Disputed:** minimum legible size; whether shrink loops still need measurement.
- **Objections:** speculation (all of D and P is [A]); relevance (P WCAG 1.4.4 applies to the app, not the PDF, as D noted); straw man risk (P "contradicts the two-page need docket D assumes": the docket states no such need).
- **Struck:** D "one-page CVs are a common expectation" (no source).
- **Missing:** fit 30 Khmer lines on one page and measure.
- **Criteria:** D addr FO, CM; dodged SP, EV, RR. P addr SP, PC; dodged FO.
- **FATAL:** none filed.
- **Overlap:** D1 (D1-lite), A2.

## D4 Fixed two-page layouts
- **Issue:** does user-chosen page assignment beat computed breaks?
- **Agreed:** deterministic; user burden; short CVs leave an empty page; overflow still needs handling.
- **Disputed:** whether overflow detection returns measurement code; whether users accept it.
- **Objections:** speculation (all items [A], both sides).
- **Struck:** P "doubles per-template design work" (no source).
- **Missing:** fill a template with the longest realistic Khmer text.
- **Criteria:** D addr FO, CM; dodged SP, EV. P addr SP, FO; dodged PC.
- **FATAL:** none filed.
- **Overlap:** D1, D3, A2.

---

# DOCKET E: fonts

## E1 Self-host subset WOFF2, unicode-range, swap, Moul lazy
- **Issue:** does subsetting stay inside the budget without breaking Khmer shaping?
- **Agreed:** OFL-1.1 (E30); sizes unknown (E31 GAP); subsetting risk unresearched; E1a/E1b severable; pre-made subsets are the safe route.
- **Disputed:** budget; GSUB/GPOS survival; swap shifting measurement; WOFF2 decoding for PDF libraries.
- **Objections:** speculation (D claims 3, 4; P swap, pyftsubset, brotli); hearsay as fact (D claim 2: E30 snippet only lists subsets; "normal practice" is inference).
- **Struck:** none.
- **Missing:** build and measure; shaping test of the subset.
- **Criteria:** D addr CM, PC, FO; dodged EV, SP. P addr CM, SP, FO; dodged PC.
- **FATAL:** none filed.
- **Overlap:** E4 (same self-host), docket A (font bytes), D1 (fonts ready).

## E2 System fonts only
- **Issue:** does it fail the "same font on every phone" need?
- **Agreed:** zero bytes; PDF differs per phone; cannot embed; older Android may lack Khmer (both [A]).
- **Disputed:** how bad the variance is.
- **Objections:** speculation (platform font claims have no exhibit on either side).
- **Struck:** D "Noto Sans Khmer on Android, system Khmer on iOS" has no exhibit.
- **Missing:** open Khmer text on the lowest device.
- **Criteria:** D addr CM, PC; dodged SP (conceded), EV. P addr SP, FO; dodged CM.
- **FATAL:** none filed.
- **Overlap:** A3 to A5 (needs bytes), E1.

## E3 Google Fonts CDN (v1)
- **Issue:** do privacy, latency and offline use matter enough?
- **Agreed:** works in v1; no constraint forbids a CDN; PDF font bytes unavailable; network needed.
- **Disputed:** whether font requests to Google breach constraint 3; latency from Cambodia.
- **Objections:** hearsay as fact (D claim 2: E30 does not say Google applies unicode-range); speculation (P privacy, latency [A]).
- **Struck:** D "Google serves unicode-range automatically" as stated; P Cambodia latency.
- **Missing:** network panel; LCP lab run.
- **Criteria:** D addr FO, CM; dodged PC. P addr PC, CM, RR; dodged FO.
- **FATAL:** none filed.
- **Overlap:** E4, E1, docket A.

## E4 One full font file per family
- **Issue:** is the simple self-host acceptable for LCP on 4G?
- **Agreed:** sizes unknown (E31 GAP); no unicode-range; no subsetting risk; Kantumruy Pro is variable (E30).
- **Disputed:** LCP risk; variable means larger.
- **Objections:** speculation (P "usually larger" for variable is [A] on top of E30; D "single file" inference).
- **Struck:** none.
- **Missing:** gzip sizes.
- **Criteria:** D addr FO, PC; dodged CM, SP. P addr CM; dodged FO, PC.
- **FATAL:** none filed.
- **Overlap:** E1 (same direction), E3.

---

# DOCKET F: device testing

## F1 Real Android + iPhone + checklist
- **Issue:** can the owner get real devices?
- **Agreed:** only real devices settle E17, E18; constraint 9 UNKNOWN; cost real; checklist severable; one model per OS.
- **Disputed:** whether skipped checklists matter; Facebook and Telegram coverage.
- **Objections:** hearsay as fact (D claim 2 cites case file section 10 as [V]; that section only suggests tests); speculation (P checklist skipped).
- **Struck:** none.
- **Missing:** owner's device list.
- **Criteria:** D addr SP, EV; dodged CM. P addr FO, CM, RR; dodged SP.
- **FATAL:** none filed.
- **Overlap:** F4, F2, F3, G3.

## F2 Cloud real-device service
- **Issue:** can free tiers do real iPhone checks?
- **Agreed:** E34 aggregators disagree; E35 GAP; trial expiry; no recurring plan.
- **Disputed:** whether Files, share sheet, storage are observable remotely.
- **Objections:** hearsay as fact (D claim 1 uses E34 for "real iOS Safari is reachable"; E34 is on minutes); relevance/hearsay (P uses D3, a Playwright page, to say vendors are biased); speculation (P latency).
- **Struck:** D reachability claim; P vendor-bias inference.
- **Missing:** official vendor terms.
- **Criteria:** D addr CM, FO; dodged SP, EV. P addr SP, CM, EV; dodged FO.
- **FATAL:** none filed.
- **Overlap:** F1, F3.

## F3 Emulation only
- **Issue:** can emulation replace real iOS?
- **Agreed:** E35 GAP; Playwright WebKit not equal to iOS Safari (D3 [R]); D defends it as a complement; cannot cover in-app browsers.
- **Disputed:** Windows WebKit text stack ([A]); usefulness for LCP.
- **Objections:** speculation (P Windows/CoreText claim, D claims 1 to 3).
- **Struck:** P "WebKit on Windows uses a different text stack" (no source).
- **Missing:** same blob download in Playwright and a real iPhone.
- **Criteria:** D addr CM, FO; dodged SP. P addr SP, EV; dodged CM.
- **FATAL:** none filed.
- **Overlap:** F1, F2.

## F4 Beta testers
- **Issue:** can beta users stand in for devices?
- **Agreed:** no tester evidence; zero hardware cost; slow; not a gate; overlaps G3.
- **Disputed:** report quality; privacy of real CVs.
- **Objections:** speculation (all [A]); relevance (P "no analytics so devices uncovered": testers can self-report).
- **Struck:** none.
- **Missing:** pilot with three people.
- **Criteria:** D addr CM, SP; dodged EV. P addr SP, RR; dodged FO.
- **FATAL:** none filed.
- **Overlap:** G3, F1, G1.

---

# DOCKET G: learning what breaks

## G1 "Report a problem" link
- **Issue:** does a user-sent prefilled report work for this audience?
- **Agreed:** no backend or analytics; user initiates; reporting rates unknown; silent bounce; prefill user-visible.
- **Disputed:** GitHub account and mailto reachability; triage load.
- **Objections:** speculation (D claims 2, 3; P account, public issues, mailto in viewers [A]); hearsay as fact (D claim 4 tags a design rule as [V] constraint 5).
- **Struck:** none.
- **Missing:** tap mailto in the Facebook viewer.
- **Criteria:** D addr PC, FO, CM; dodged EV, SP. P addr SP, PC; dodged FO.
- **FATAL:** none filed.
- **Overlap:** G2 (attachment), G3, C4.

## G2 Copyable local error log
- **Issue:** does a local log yield useful, safe diagnostics?
- **Agreed:** alone teaches nothing; wipe risk (E20); value as G1 attachment; user effort.
- **Disputed:** whether E18 failures throw JS errors (P [A] says none); CV text in stack traces.
- **Objections:** speculation (P claims; D claims 2, 3).
- **Struck:** P "E18 throws no JS error" (E18 does not say).
- **Missing:** reproduce E18 and inspect the log.
- **Criteria:** D addr PC, FO; dodged EV, SP. P addr PC, EV, RR; dodged CM.
- **FATAL:** none filed.
- **Overlap:** G1, B1/B3 (storage).

## G3 Interviews only
- **Issue:** is zero-code feedback enough?
- **Agreed:** no scale; no device data; complement to G1; owner time.
- **Disputed:** nothing material.
- **Objections:** speculation (both sides all [A]).
- **Struck:** none.
- **Missing:** message five users and count replies.
- **Criteria:** D addr FO, PC, CM; dodged SP, EV. P addr SP, RR; dodged PC.
- **FATAL:** none filed.
- **Overlap:** F4, G1.

---

# Cross-exam candidates (Registrar suggestions, no scoring; the Judge decides)

- **A:** A2 and A7a (A7a differs only by the Print button, so the two will likely sit within 5 points; tied-risk). A3 and A4 (share one decisive Khmer spike). A1 (FATAL charge filed and the premise is partly disputed by E37; strong if the Judge reads constraint 7 narrowly). A5 and A6 can stay out (A6 conceded; A5 lowest on FO).
- **B:** B1 and B2 (same storage; export path differs; likely within 5). B3 (FATAL candidate with a disputed reading of constraint 5). B4 can stay out.
- **C:** C1 (joined with C2a), C2 (C2b only), C4 (baseline). C3 stays out.
- **D:** D1, D4 and D2 (D2 is tied to the A1 outcome). D3 optional.
- **E:** E1 and E4 (likely close; sizes decide), E3. E2 stays out.
- **F:** F1, F4, F3 (F2 optional). F is not exclusive, so rank by marginal value.
- **G:** G1, G2, G3 (all likely within 5; G2 depends on G1). Not exclusive.
- **Within-5 watch (docket-level):** A2 vs A7a; B1 vs B2; E1 vs E4; G1 vs G2 vs G3; F1 vs F4.
- **FATAL-filed options to cross:** A1, A6 (concession record), B3.

Exhibit count in this record: 39 (E1 to E35 from the case file, plus E36 to E39 new, all [R]). GAPs now: E5, E14, E17 (narrowed by E36 and E37), E24, E27, E31, E33, E35.
