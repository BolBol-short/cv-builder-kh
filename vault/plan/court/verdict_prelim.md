# JUDGE'S PRELIMINARY VERDICT: CV-Builder v2, dockets A to G (31 entries)

Preliminary hearing. Ruled on the record only. No cross-examination yet. No precedents.
Formula: total = 5*SP + 4*FO + 3*EV + 3*CM + 3*RR + 2*PC (the six adapted criteria; max 100). Scores are judgments, not measurements.
Phase = v2 Roadmap phase (0 Discovery and spikes, 1 Foundation, 2 Guided editor, 3 Templates and pagination, 4 Export and sharing, 5 PWA and hardening, 6 Beta and launch). Owner = the project owner in every condition.

## Global rulings (apply to every option below)

- G-1. Hearsay as fact, SUSTAINED: the Defense's use of "case file section 10 / 2.10 / 7c" as [V] for outcomes. Those are the Registrar's summary or the user's constraints, not exhibits. Struck wherever it carried a merit claim.
- G-2. Relevance, SUSTAINED: E23 concerns files received in Messenger, not downloads from a web app. Context only. Neither side may use it for C1, C2 or C4 merit.
- G-3. Speculation, SUSTAINED: "Cambodian users mostly open links from Facebook/Telegram" is [A] on both sides. It can support a risk, not a finding.
- G-4. A closed issue (E1, E2, E4, E6) is not a fixed or successful outcome. Discounted.
- G-5. Double counting, SUSTAINED: E18 is counted once in the iPhone-save risk and is not re-charged per docket. It lowers SP on A2, B1, B2 once each only where that option's own export path depends on it.
- G-6. Gap exhibits (E5, E14, E17, E24, E27, E31, E33, E35) are not evidence for anyone. No EV above 2 on a claim resting only on a GAP.
- G-7. EV is scored as "how well verified is the option's case", direction-neutral. A verified harm to the option shows up in SP/RR, not in a high EV.
- G-8. User facts: constraint 7 (iPhone saves a file to Files "like a normal download") is binding. Its plain consequence, that a hidden pinch-and-share route is not a normal download, is a fact, not an assumption. E36 and E37 are [R] only; E36 is several independent sources and carries weight as a negative signal.
- G-9. FATAL rulings: A1 SUSTAINED, A6 SUSTAINED, B3 NOT sustained (reduced to a risk and condition). No other FATAL was filed.

---

# DOCKET A: PDF with correct Khmer

### A1 Print only: DISMISSED (sustained FATAL, constraint 7). Score 71, overridden.
- SP2 FO5 EV2 CM5 RR4 PC4 = 71. The number is overridden by the FATAL; it is shown only so the order is honest.
- Objections: hearsay (P's FATAL leaned on the user premise alone) OVERRULED in effect, because the premise is a user fact and E37 [R] has four independent how-to sites describing a Print, pinch, Share, Save to Files route: not a normal download. Speculation (D claim 1 "only renderer shown correct") SUSTAINED, struck. P "headers/footers" struck [A].
- Reasoning: Constraint 7 is binding and the Defense conceded the premise. E37 shows a path exists but it is a hidden gesture, not a normal download. Clear and convincing standard met by user fact plus several independent [R]. Browser Khmer is plausible but unverified.
- Conditions: none as a solution. May survive only as the desktop Print button inside A7a (Phase 4, owner).
- Appeal triggers: a [V] run on a real iPhone showing Print gives a one-tap save to Files (reverses, score stands at about 71 and FATAL drops); user restating constraint 7 to include the pinch route (reverses).
- Confidence: medium. Reason: rests on how "like a normal download" is read, and E37 is [R].
- Dissent: constraint 7 could be read as "the user can end up with a file in Files", which E37 satisfies. Then A1 is APPROVED WITH CONDITIONS on cost, but the user's own wording rejects it.

### A2 Canvas capture to image PDF: REMANDED. Score 58.
- SP2 FO4 EV2 CM3 RR3 PC4 = 58.
- Objections: hearsay (D claim 3 cites E16 for a "normal download path"; E16 says only feature-detect) SUSTAINED. Speculation (D claims 4, 5) SUSTAINED. P "several MB", "blurry", "exceeds 80 KB" struck [A]. P "employers" struck. Double counting (E18 re-charged) SUSTAINED per G-5.
- Reasoning: Best available in docket A, but Khmer under html2canvas has no source (E8, E38 GAP) and E18 [V] is a live iPhone Blob risk. Image PDF is not selectable. Templates stay in React, which keeps cost and risk low. Not at 60 until a spike.
- Conditions: (1) Khmer stress-string spike (stacked subscripts and vowels) through html2canvas and dom-to-image on a real iPhone, Android and desktop, compared with the DOM: owner, Phase 0 (S1). (2) Real-iPhone save-to-Files test of the Blob: owner, Phase 0 (S4). (3) Bundle gzip and 3-page memory at scale 2 on the oldest phone: owner, Phase 0, final check Phase 4.
- Appeal triggers: spike passes on iPhone and Android and the file saves, SP 2 to 4, score 58 to 68, APPROVED WITH CONDITIONS (up). Khmer wrong on any device, or the Blob cannot be saved: SP 1, about 53, DISMISSED-risk (down).
- Confidence: low. Reason: both load-bearing facts are GAPs.
- Dissent: Defense side would hold SP 3 because browser canvas uses the browser shaper, giving 63. That claim is [A], so rejected.

### A3 @react-pdf/renderer: REMANDED. Score 48. TIED with A4.
- SP2 FO3 EV2 CM2 RR2 PC4 = 48.
- Objections: hearsay (D claim 3 labels E4 [V] for "fonts register by range"; E4 shows a user snippet only) SUSTAINED. Speculation (D claims 1, 2, 4; P bundle and React 19) SUSTAINED, both sides' size claims struck.
- Reasoning: Vector text would be best if Khmer shapes, but E5 GAP, E3 names no Khmer shaper, and E7 shows engines without complex layout break Khmer. Rewrites every template into a second layout system. Bundle unmeasured. Defense conceded EV is at most 2.
- Conditions: shared spike with A4 (Khmer test string vs Chrome) plus `npm ls` on React 19 and a build-size measure: owner, Phase 0 (S1).
- Appeal triggers: spike shows correct stacks (SP 4, EV 3): about 61, up. Broken stacks: FATAL-eligible and dismissed, down.
- Confidence: low. Reason: the decisive test has not been run.
- Dissent: none (not close to approval).

### A4 pdfmake or pdf-lib + fontkit: REMANDED. Score 48. TIED with A3.
- SP2 FO3 EV2 CM2 RR2 PC4 = 48.
- Objections: hearsay (D uses E2's five closed issues as support; titles only) SUSTAINED. D "pdf-lib is smaller" struck [A]. P "pdf-lib has no known shaping step" struck (absence of a result). P's Perl PDF::API2 point SUSTAINED as relevance, partly E7.
- Reasoning: E1 verifies UAX #14 line breaking only, which is not dictionary Khmer breaking (E28). No shaping source. Same template rewrite as A3.
- Conditions: read issues #2319 and #332 and run the shared spike: owner, Phase 0 (S1).
- Appeal triggers: as A3 (up on a clean Khmer render; down on broken stacks).
- Confidence: low. Reason: same GAP as A3.
- Dissent: none.

### A5 HarfBuzz WASM + pdf-lib: DISMISSED. Score 35.
- SP2 FO1 EV2 CM1 RR2 PC3 = 35.
- Objections: hearsay (D "reference shaper for Khmer" citing E14, a GAP) SUSTAINED, struck as fact. P's custom-engine list is [A] kept as a risk only.
- Reasoning: Correct shaping is plausible but unverified, and the owner would hand-build line breaking, glyph placement and the text map. Both sides agree FO is lowest. 2019 wasm size exceeds the 80 KB lazy budget [R]. Not FATAL (rests on [A]).
- Conditions: none. Reopen only if both A2 and A3/A4 spikes fail.
- Appeal triggers: A2 and A3/A4 both fail Khmer (up, to remanded); a current harfbuzzjs wasm under 80 KB gz (CM 1 to 3, about 41, still dismissed).
- Confidence: high. Reason: both sides concede FO and CM.
- Dissent: none.

### A6 Typst WASM: DISMISSED (sustained FATAL, constraint 11). Score 31, overridden.
- SP2 FO1 EV2 CM1 RR2 PC1 = 31.
- Objections: speculation (P "breaks constraints 1 and 8 in spirit") SUSTAINED, struck. The 97x figure is the Registrar's arithmetic on [V] E9; accepted.
- Reasoning: E9 [V] shows 7.62 MB gzip against an 80 KB lazy budget, a binding constraint. Defense conceded. E10 adds a runtime GitHub font fetch, E12 wrong text extraction.
- Conditions: none.
- Appeal triggers: none realistic. Only a changed budget from the user.
- Confidence: high. Reason: [V] exhibit plus concession.
- Dissent: none.

### A7 Hybrid (A2 + Print + vector later): REMANDED. Score 51.
- SP2 FO3 EV2 CM2 RR3 PC4 = 51.
- Objections: double counting SUSTAINED (A2 evidence credited and charged twice; scored here only on its increment). Moving the goalposts SUSTAINED (A7b is a process condition, not a solution; severed, not scored). P "legacy format shared with employers" struck.
- Reasoning: A7 adds two code paths and a vague "later". The Defense itself filed A7a as the cleaner statement. Refile as A7a.
- Conditions: refile as A7a: owner, Phase 0 (before spikes close).
- Appeal triggers: none; superseded by A7a.
- Confidence: medium.
- Dissent: none.

### A7a Amended: A2 + desktop Print button: REMANDED. Score 54. TIED with A2.
- SP2 FO3 EV2 CM2 RR4 PC4 = 54.
- Objections: speculation (D claims 1, 3 are [A]) SUSTAINED. Double counting against A2 SUSTAINED: credited only for the button. No Plaintiff brief on A7a; A7's charges apply by transfer.
- Reasoning: The button is a real fallback and matches the roadmap's desktop print path, but costs a second path and a layout-parity task with docket D. Mobile outcome equals A2, so SP does not rise.
- Conditions: desktop Print layout matches the A2 capture layout (shared pageGeometry.js): owner, Phase 3. Decide keep or drop after the Phase 0 Khmer spike: owner, Phase 0 exit.
- Appeal triggers: A2 spike shows Khmer flaws in the image PDF (A7a rises past A2, up); A2 spike clean (button optional, A2 leads).
- Confidence: low. Reason: tied with A2 and depends on one spike.
- Dissent: the fallback is worth more than I credit if A2 Khmer fails on any one device. Then A7a is about 59.

#### Docket A ranking (one current score each)
1. A1 71 (DISMISSED by sustained FATAL; excluded from the ranking order)
1. A2 58 REMANDED. TIED with A7a (54).
2. A7a 54 REMANDED. TIED with A2. Decisive test: run the Khmer stress-string through html2canvas on real iPhone and Android and print the same page on desktop; compare layouts. If A2 Khmer is flawed on any device, A7a wins; if clean, A2 alone suffices.
3. A7 51 REMANDED (refile as A7a)
4. A3 48 REMANDED, TIED with A4 48. Decisive test: one Khmer stress string through react-pdf and pdf-lib+fontkit/pdfmake with Noto Sans Khmer, against Chrome.
4. A4 48 REMANDED
6. A5 35 DISMISSED
7. A6 31 DISMISSED (FATAL)
Not mutually exclusive: A7a = A2 plus the A1 print button. Recommended combination: A2 with a desktop Print button (A7a), final choice after Phase 0.

---

# DOCKET B: iPhone save and data loss

### B1 Blob+download, IndexedDB+persist(), A2HS, last saved, backup nudge: APPROVED WITH CONDITIONS. Score 65.
- SP3 FO3 EV3 CM3 RR4 PC4 = 65.
- Objections: hearsay (D claim 2 "quota far larger for Home Screen apps"; E21 says browser apps 60%, other apps 15%) SUSTAINED, struck. Fabrication (P "viewer's share button can still save the file" attributed to E18) SUSTAINED, struck, and P loses credibility on that point. Speculation (P "nudge fatigue") struck. Double counting of E18 per G-5.
- Reasoning: Storage half is well supported: E20 [V] and E21 [V] show real loss and a Home Screen mitigation. Export half is unproven and E18 [V] cuts against the download link. Severable into B1a-d. The data half carries the score.
- Conditions: (1) Real-iPhone run: blob+a[download], persist() boolean in a plain tab and from the Home Screen: owner, Phase 0 (S4). (2) IndexedDB with idb-keyval prototype: owner, Phase 0 (S2). (3) Storage layer with saved/saving/failed state: owner, Phase 1. (4) A2HS steps, last-saved display and backup nudge: owner, Phase 5.
- Appeal triggers: S4 shows the download lands in Files (SP 3 to 4, 68, up); download opens in the tab with no save route (SP down, below 60, down).
- Confidence: medium. Reason: storage half verified, export half a GAP.
- Dissent: B2 is close and may be the better export path.

### B2 Web Share with PDF, download fallback: APPROVED WITH CONDITIONS. Score 62. TIED with B1.
- SP3 FO3 EV2 CM3 RR4 PC4 = 62.
- Objections: speculation (D claims 2, 4; P activation expiry, AbortError) SUSTAINED, struck as findings; kept as test items. D "Save to Files is listed for files generally" struck. E36 [R] ADMITTED as a negative signal (three independent sources).
- Reasoning: Share is a possible native route, but E36 shows canShare/share-sheet regressions on iOS 17 and 18 and OS-version dependence. Falls back to the B1 download path, so SP is about equal. Needs a Blob (moot under A1). Share is export, not a normal download.
- Conditions: iPhone test with a PDF Blob and a 3-second delay before share(), on two iOS versions if available: owner, Phase 0 (S4). Feature-detect and fallback implementation: owner, Phase 4.
- Appeal triggers: share sheet offers Save to Files reliably on current iOS (SP 4, 67, up, and B2 leads); canShare false or no Save to Files (EV and SP down, below 60).
- Confidence: low. Reason: tie with B1 and the key test is not run.
- Dissent: none beyond B1/B2 closeness.

### B3 localStorage only (v1): REMANDED. Score 58. FATAL not sustained.
- SP1 FO5 EV2 CM5 RR2 PC3 = 58.
- Objections: straw man / relevance SUSTAINED: constraint 5 is about data staying on the device and account-free, not about durability, so the FATAL charge fails. Fabrication (P "about 5 MB quota", no exhibit) SUSTAINED, struck. Speculation (P "owner never learns") SUSTAINED, kept as a risk.
- Reasoning: E20 [V] proves the wipe rule, so the data-loss half of the docket is unaddressed and the iPhone save is untouched. Cheapness alone gives 58. Not FATAL because it does not break constraint 5 as written; scored as a loss-risk instead.
- Conditions: tolerated only until the IndexedDB layer lands: owner, Phase 1.
- Appeal triggers: user states constraint 5 includes durability (FATAL sustained, DISMISSED, down); an iPhone test shows no wipe in normal use (RR 2 to 3, 61, up).
- Confidence: medium. Reason: FATAL ruling turns on the reading of constraint 5.
- Dissent: Plaintiff would say silent loss of a CV breaks the spirit of constraint 5. Rejected under the standard.

### B4 Require Home Screen install: REMANDED. Score 54.
- SP2 FO4 EV2 CM4 RR2 PC2 = 54.
- Objections: speculation (P "dead end" and constraint 6 breach) SUSTAINED, kept as a risk. D claim 2 [A] struck.
- Reasoning: E20/E21 verify the storage benefit, but the gate blocks first use, cannot be installed from inside viewers and does not fix save. B1c gives most of the benefit softly. Under constraint 3 the owner cannot see drop-out.
- Conditions: none. Revive only after a drop-out test.
- Appeal triggers: five-iPhone-user dummy gate shows under 20% drop-out (RR 2 to 3, 57, up).
- Confidence: medium.
- Dissent: none.

#### Docket B ranking
1. B1 65 APPROVED WITH CONDITIONS. TIED with B2.
2. B2 62 APPROVED WITH CONDITIONS. Decisive test: one real iPhone (iOS 17 or 18): blob+a[download] result vs navigator.share({files}) with a delayed call, and whether "Save to Files" appears.
3. B3 58 REMANDED. TIED with B4 (not contending).
4. B4 54 REMANDED.
Not exclusive: B1/B2 differ only on the export axis. Recommended combination: B1 storage and guidance (B1b to B1d, always) plus an export path chosen by the iPhone test: share-first (B2) if it works, else download (B1a).

---

# DOCKET C: in-app browsers

### C1 UA detection + banner (joined with C2a): APPROVED WITH CONDITIONS. Score 72.
- SP3 FO4 EV2 CM4 RR5 PC4 = 72.
- Objections: hearsay / relevance (E23 used for web downloads) SUSTAINED per G-2. Speculation (D claims 1, 2, 4; P step upkeep) SUSTAINED. D4 [R] (FBAN/FBAV) admitted for Facebook detection only.
- Reasoning: Tiny, dismissible and reversible. Problem size is unverified (E24 GAP) so EV stays 2. UA drift and unknown Telegram UA are real costs. Still allowing a try leaves the failure possible but costs nothing.
- Conditions: open the deployed link in Facebook, Messenger and Telegram on one phone each; record UA and whether export works: owner, Phase 4 (earlier at the Phase 1 preview deploy if a phone is at hand). Banner bilingual, dismissible, with copy-link: owner, Phase 4.
- Appeal triggers: viewer test shows export works inside all three (C4 rises, C1 down); fails in any (C1 up, SP 4, 77).
- Confidence: low. Reason: the problem's size is a GAP.
- Dissent: C4 is within 4 points and wins if the viewer test shows no failure.

### C2 Detect + copy link + steps + image export: APPROVED WITH CONDITIONS. Score 62.
- SP3 FO3 EV2 CM3 RR4 PC4 = 62.
- Objections: double counting SUSTAINED (C2a merits are C1's). Straw man risk: P treats the image as the deliverable; D calls it optional; ruled as optional. Long-press and clipboard claims [A] struck.
- Reasoning: C2a equals C1. C2b is only worth anything if A2 exists and long-press works in the viewers. A Photos image is not "in Files". Scored on the increment.
- Conditions: C2b only after A2 is chosen and tested; test copy and long-press in the Facebook viewer: owner, Phase 4.
- Appeal triggers: viewer test shows PDF blocked but long-press save works (up); A2 dismissed (C2b moot, down).
- Confidence: low.
- Dissent: none.

### C3 Forced redirect: REMANDED. Score 47.
- SP2 FO4 EV1 CM2 RR2 PC3 = 47.
- Objections: moving the goalposts SUSTAINED (the Android-only C3a was not filed as an amended option; not scored). P "dark pattern / WCAG 3.2" struck as a finding, kept as a risk. No source at all (E24 GAP).
- Reasoning: iOS has no known scheme, Android intent:// is unproven here, and loops or blank pages are likely. All claims are [A].
- Conditions: none; not recommended.
- Appeal triggers: a [V] test showing intent:// leaves the Facebook viewer cleanly on Android (EV 1 to 3, 53, up, still remanded).
- Confidence: medium.
- Dissent: none.

### C4 Do nothing; Help page: APPROVED WITH CONDITIONS. Score 68. TIED with C1.
- SP2 FO5 EV2 CM5 RR3 PC4 = 68.
- Objections: speculation (usage pattern, both sides) SUSTAINED. Relevance (P's E23) SUSTAINED per G-2.
- Reasoning: Cheapest baseline and no evidence the problem exists for web-app downloads. But failure is silent, a Help page is read after the failure, and constraint 3 hides it. Cheap options earn FO and CM; SP stays low.
- Conditions: viewer test as for C1: owner, Phase 4. Add C1 if any failure shows.
- Appeal triggers: viewer test shows failures (C1 leads); shows clean export (C4 leads, up to about 73).
- Confidence: low. Reason: tie and a GAP.
- Dissent: Plaintiff would say the failure path may be the main path. [A], not credited.

#### Docket C ranking
1. C1 72 APPROVED WITH CONDITIONS. TIED with C4 (68).
2. C4 68 APPROVED WITH CONDITIONS. Decisive test: open the deployed link inside Facebook and Telegram on one phone and run the PDF export; if it works, C4; if not, C1.
3. C2 62 APPROVED WITH CONDITIONS
4. C3 47 REMANDED
Not exclusive: C1+C2 (C2a is C1; C2b is an optional add-on). Recommended: C1 (including C2a) now, C2b only if A2 is chosen and the viewer test shows PDF fails but image long-press works.

---

# DOCKET D: A4 page splitting

### D1 Measure, compute breaks, pageGeometry.js: REMANDED. Score 59.
- SP3 FO3 EV2 CM3 RR3 PC4 = 59.
- Objections: speculation (D claims 1, 3, 4; P "learner builds a layout engine") SUSTAINED, kept as risks. P's use of E28 for break-offset differences partly overstated: E28 covers line breaking and letter-spacing quirks, not row-height drift; partly SUSTAINED.
- Reasoning: Needed for any generated PDF (A2 to A7a). Measuring in the same engine that renders is sound, but cross-browser height drift is untested and fonts must be ready. D1a is useful alone. One point from approval.
- Conditions: D1a pageGeometry.js shared by template, preview and export: owner, Phase 3. Compare break offsets for one long Khmer CV in Chrome Android and iOS Safari, with document.fonts.ready: owner, Phase 3.
- Appeal triggers: offsets match across the two browsers (SP 4, 64, up); they drift beyond one line (down).
- Confidence: medium.
- Dissent: none.

### D2 CSS breaks + print flow (v1): REMANDED. Score 51.
- SP1 FO5 EV1 CM3 RR2 PC4 = 51.
- Objections: hearsay (D "works for desktop print" citing the case file) SUSTAINED, struck. P "no evidence it worked in v1" is absence, not a finding.
- Reasoning: Works only with A1, which is dismissed, so as a sole strategy it fails on phones. Fits only the desktop print button. SP 1 reflects dependency on a dismissed path.
- Conditions: use only as minimal break CSS for the A7a Print button: owner, Phase 3.
- Appeal triggers: A1 is reinstated (SP rises, up).
- Confidence: medium.
- Dissent: none.

### D3 One-page, shrink to fit: REMANDED. Score 53.
- SP2 FO4 EV1 CM3 RR3 PC3 = 53.
- Objections: relevance SUSTAINED (WCAG 1.4.4 applies to the app, not the PDF). Straw man: "contradicts the two-page need docket D assumes" struck; docket states none. D "common expectation" struck.
- Reasoning: Simplest layout, but long histories shrink to tiny Khmer text and the shrink loop still needs measurement. Defense concedes it is not general.
- Conditions: if used, as a one-page template only: owner, Phase 3. Fit 30 Khmer lines on one page and record minimum size.
- Appeal triggers: a legible minimum size for a realistic CV (up).
- Confidence: low.
- Dissent: none.

### D4 Fixed two-page, user picks sections: REMANDED. Score 49.
- SP2 FO3 EV1 CM3 RR3 PC3 = 49.
- Objections: speculation (all [A], both sides) SUSTAINED. P "doubles design work" struck.
- Reasoning: Deterministic but pushes layout work onto a mobile-first user and brings overflow measurement back.
- Conditions: none.
- Appeal triggers: three beta testers complete assignment without help (up).
- Confidence: low.
- Dissent: none.

#### Docket D ranking
1. D1 59 REMANDED
2. D3 53 REMANDED (TIED with D2 and D4, none contending)
3. D2 51 REMANDED
4. D4 49 REMANDED. Decisive test for D2/D3/D4: fit the longest realistic Khmer CV into each.
Not exclusive: D1a is useful under any option. Recommended: D1 (with D1a first), D2's break CSS only for the desktop Print button.

---

# DOCKET E: Khmer fonts

### E1 Self-host subset WOFF2 + unicode-range + Moul lazy: APPROVED WITH CONDITIONS. Score 64.
- SP3 FO3 EV2 CM3 RR4 PC5 = 64.
- Objections: hearsay (D claim 2, E30 snippet lists subsets; "normal practice" is inference) SUSTAINED. Speculation (P swap shift, pyftsubset, brotli) SUSTAINED, kept as risks. P's GSUB/GPOS charge is a GAP-based risk, not a finding.
- Reasoning: Self-hosted, private, offline-ready, OFL-1.1 (E30 [V]). Sizes and subset shaping integrity are unknown (E31 GAP). Using pre-made Khmer and Latin subsets avoids cutting fonts yourself. Roadmap already plans subset fonts.
- Conditions: build and measure gzip sizes of the Khmer and Latin subsets and Moul, and test the stress string against the full font: owner, Phase 1.
- Appeal triggers: subset breaks stacks (SP down, below 60); subsets give a clear LCP win over E4 (up, E1 leads).
- Confidence: low. Reason: E31 GAP.
- Dissent: none beyond the tie with E4.

### E2 System fonts only: REMANDED. Score 57.
- SP1 FO5 EV1 CM5 RR2 PC4 = 57.
- Objections: speculation (platform font claims, no exhibit) SUSTAINED; D's "Noto Sans Khmer on Android" struck.
- Reasoning: The Defense conceded the PDF differs per phone, fonts cannot be embedded (blocks A3 to A5) and Moul/formal fonts are lost. Older devices lacking Khmer would be silent failures under constraint 3. Only cost keeps it at 57.
- Conditions: none; not recommended.
- Appeal triggers: user drops the same-font-everywhere need (SP 1 to 3, 67, up).
- Confidence: medium.
- Dissent: none.

### E3 Google Fonts CDN (v1): APPROVED WITH CONDITIONS. Score 63. TIED with E1.
- SP3 FO5 EV2 CM3 RR3 PC2 = 63.
- Objections: hearsay (D "Google serves unicode-range automatically" from E30) SUSTAINED, struck. P Cambodia latency struck [A]. No constraint forbids a CDN: ruled.
- Reasoning: Works in v1 and needs no work, but third-party request per visit strains the privacy story, there are no font bytes for vector PDF, and offline PWA use (Phase 5) is awkward. Score is held up by FO.
- Conditions: if kept, document the Google request on the privacy page: owner, Phase 5. Measure network and LCP from a throttled run: owner, Phase 1.
- Appeal triggers: user states privacy rules out third-party requests (PC 1, 61, down); a lab run shows CDN beats self-host on LCP (up).
- Confidence: low.
- Dissent: none.

### E4 Self-host one full file per family: APPROVED WITH CONDITIONS. Score 69. TIED with E1.
- SP3 FO5 EV2 CM2 RR4 PC5 = 69.
- Objections: speculation (P "variable usually larger"; D "single file") SUSTAINED; kept as risks.
- Reasoning: Simplest self-host and no subsetting risk to Khmer tables. Sizes unknown (E31 GAP) and no unicode-range, so Latin visitors fetch Khmer glyphs and LCP on 4G is the risk. Highest because it costs least with privacy intact.
- Conditions: download and gzip Kantumruy Pro and Moul; lab-run LCP on throttled mid-range Android: owner, Phase 1. Lazy-load Moul only for the formal template: owner, Phase 3.
- Appeal triggers: full files push LCP past 2.5 s (E1 takes over, down for E4).
- Confidence: low. Reason: sizes unknown.
- Dissent: E1 is the safer long-term path for the 4G budget.

#### Docket E ranking
1. E4 69 APPROVED WITH CONDITIONS
2. E1 64 APPROVED WITH CONDITIONS. TIED with E4 (5) and E3 (1).
3. E3 63 APPROVED WITH CONDITIONS. Decisive test: build and measure woff2 gzip sizes (Khmer, Latin, Moul), shape the stress string with the subset vs full font, and run a throttled-Android LCP lab for E4 vs E1 vs E3.
4. E2 57 REMANDED
Not strictly exclusive: E1b (lazy Moul) attaches to E4. Recommended: E4 first with E1b lazy Moul; switch to E1a (pre-made Khmer and Latin subsets) only if the size or LCP test fails.

---

# DOCKET F: device testing (not exclusive; ranked by marginal value)

### F1 Real Android + iPhone + checklist: APPROVED WITH CONDITIONS. Score 71.
- SP3 FO4 EV3 CM3 RR4 PC5 = 71.
- Objections: hearsay (D claim 2 cites case file section 10 as [V]) SUSTAINED, struck. P "checklist skipped" speculation SUSTAINED, kept as a risk.
- Reasoning: Real devices are the only route that closes E17 and E18; both sides agree, and D3 [R] says emulators diverge. One model per OS and iOS-version dependence (E36) cap SP. Cost depends on constraint 9, still unknown.
- Conditions: owner states which phones exist: owner, Phase 0 (start). One iPhone and one Android before S4: owner, Phase 0. One-page checklist: owner, Phase 4.
- Appeal triggers: owner has no iPhone and no loan source (down, falls toward F2/F4); owner already has both (FO 5, 75, up).
- Confidence: medium. Reason: constraint 9 unanswered.
- Dissent: none.

### F2 Cloud real-device service: REMANDED. Score 58. TIED with F3, F4.
- SP2 FO4 EV2 CM2 RR4 PC4 = 58.
- Objections: hearsay (D "real iOS Safari is reachable" from E34, which is about minutes) SUSTAINED. P's vendor-bias inference struck. Free-minute figures conflict (E34) and no vendor page was read (E35 GAP).
- Reasoning: Free real-iPhone minutes are unknown and Files/share sheet may not be observable remotely. A trial might serve one spike but no recurring plan.
- Conditions: read the vendor's official trial page before use: owner, Phase 0.
- Appeal triggers: official page gives enough real-iPhone minutes and Files/share is observable (up).
- Confidence: low.
- Dissent: none.

### F3 Emulation only: REMANDED. Score 59. TIED with F2, F4.
- SP2 FO3 EV2 CM4 RR3 PC5 = 59.
- Objections: speculation (P "Windows WebKit uses a different text stack") struck. D3 [R] admitted: Playwright WebKit is close to, not identical to, iOS Safari. E35 GAP on fidelity.
- Reasoning: Free, scriptable and good for LCP and bundle budgets, but E18, E20 and E36 are iOS behaviors it cannot be shown to reproduce. Approvable as a complement, not alone.
- Conditions: use Chromium throttling and Playwright in CI as a complement only: owner, Phase 1 (CI) and Phase 6.
- Appeal triggers: same blob download behaves identically in Playwright WebKit and a real iPhone (EV and SP up).
- Confidence: low.
- Dissent: none.

### F4 Beta testers with a script: REMANDED. Score 58. TIED with F2, F3.
- SP2 FO4 EV1 CM4 RR3 PC4 = 58.
- Objections: relevance (P "no analytics so devices uncovered": testers can self-report) SUSTAINED. Speculation (all [A]) SUSTAINED.
- Reasoning: Reaches real target phones at no cash cost but arrives late, cannot gate a release, and report quality is unknown. Overlaps G3.
- Conditions: a 5-step script with a sample CV (no real CV data): owner, Phase 6.
- Appeal triggers: a three-person pilot gives usable reports (EV 1 to 3, 64, up).
- Confidence: low.
- Dissent: none.

#### Docket F ranking
1. F1 71 APPROVED WITH CONDITIONS
2. F3 59 REMANDED, TIED with F2 and F4.
3. F2 58 REMANDED, TIED. Decisive test: F2 read official trial terms; F3 run the same blob download in Playwright WebKit and a real iPhone; F4 three-person pilot, count usable reports.
3. F4 58 REMANDED, TIED
Not exclusive. Recommended combination: F1 as the core, F3 for Chromium throttling and regression in CI, F4 in the Phase 6 beta; F2 only as a one-off if no iPhone can be reached.

---

# DOCKET G: learning what breaks (not exclusive)

### G1 "Report a problem" link: APPROVED WITH CONDITIONS. Score 73.
- SP3 FO5 EV2 CM4 RR4 PC4 = 73.
- Objections: hearsay (D claim 4 tags a design rule as [V] constraint 5) SUSTAINED, treated as a design condition. Speculation (account, mailto in viewers) SUSTAINED, kept as risks.
- Reasoning: User-initiated, no backend, no analytics, and the roadmap already depends on it. Only motivated users report and GitHub needs an account, so mailto/ in-page copy is needed too. Prefill must exclude CV content and be shown to the user.
- Conditions: prefill browser, app version, template only; user can edit before sending: owner, Phase 5. Tap-test mailto inside the Facebook viewer: owner, Phase 4.
- Appeal triggers: mailto blocked in viewers and no account route (down); beta users send reports (up).
- Confidence: medium.
- Dissent: none.

### G2 Copyable local error log: REMANDED. Score 49.
- SP2 FO3 EV1 CM3 RR3 PC3 = 49.
- Objections: speculation (P "E18 throws no JS error") struck; E18 does not say. P's CV text in stack traces kept as a risk. D conceded it teaches nothing alone.
- Reasoning: Value only as an attachment to G1, subject to E20 wipes, and needs sanitising. Whether the key failures throw JS errors is untested.
- Conditions: build only if S4 shows the iPhone failures throw errors: owner, Phase 5.
- Appeal triggers: reproduce E18 and the log captures it (EV 1 to 3, 55, up).
- Confidence: medium.
- Dissent: none.

### G3 Interviews and follow-ups only: APPROVED WITH CONDITIONS. Score 67.
- SP2 FO5 EV1 CM4 RR4 PC5 = 67.
- Objections: speculation (all [A] both sides) SUSTAINED.
- Reasoning: Zero code and zero privacy exposure; richest why-data. No scale, no device data and misses silent failures. Complement, not a system.
- Conditions: message five beta users and count replies in a week: owner, Phase 6.
- Appeal triggers: reply rate under 2 of 5 (down).
- Confidence: medium.
- Dissent: none.

#### Docket G ranking
1. G1 73 APPROVED WITH CONDITIONS
2. G3 67 APPROVED WITH CONDITIONS (6 below G1, not tied)
3. G2 49 REMANDED
Not exclusive. Recommended combination: G1 plus G3 (matching Phase 6); G2 deferred and only as a G1 attachment if the S4 test shows errors are catchable.

---

# CROSS-EXAM ORDER

Options sent to cross-examination, only where it could change the ruling. Three questions per side.

Not sent: A5 (35, concession-level), A6 (FATAL sustained on [V] and conceded; cross cannot change it), B4 (54, not contending), C2 and C3 (6+ points away), D1 to D4 (D1 leads by 6 and ties below it are not contending), G1 to G3 (no ties; G1 leads by 6), E2 (57, 6 below).

### A1 (FATAL-filed)
- Defense: 1. Do you contest that Print then pinch then Share is not "like a normal download"? 2. Can you cite any run showing a one-tap save to Files? 3. What does A1 do for an iPhone user who has never seen the pinch gesture?
- Prosecution: 1. Is the FATAL standard met by E37 [R] plus user fact, and what is the strongest contrary reading? 2. Would a labelled "how to save" prompt cure the charge? 3. Where is the evidence the pinch route fails on current iOS?

### A2 (top 3 and tied with A7a)
- Defense: 1. What run shows Khmer stacks survive html2canvas on iPhone? 2. How does a Blob save to Files given E18? 3. What is the measured gz size and per-page memory on the oldest phone?
- Prosecution: 1. What evidence ties D2's Tamil bug to Khmer today? 2. Does scale 2 stay under the canvas cap per E25/E26? 3. What source says an image PDF is rejected by employers?

### A7a (top 3, tied)
- Defense: 1. What does the Print button add beyond A2 that is not double counting? 2. How will desktop Print layout match the capture layout? 3. What do you do if A2 Khmer is flawed on only one device?
- Prosecution: 1. State your charges specific to A7a. 2. What evidence says two paths create more bugs than one? 3. Does a fallback with correct text reduce the risk you charged under A2?

### A7 (top 3)
- Defense: 1. Why is A7 not simply A7a? 2. What does "vector later" commit the owner to? 3. Do you withdraw the A7 filing?
- Prosecution: 1. What charge applies to A7 that does not apply to A7a? 2. Does severing A7b cure your goalposts objection? 3. What evidence supports "legacy format"?

### A3 (tied with A4)
- Defense: 1. What run shows react-pdf shapes Khmer subscripts? 2. What is the measured bundle size on React 19? 3. How much template work is rewritten, in components?
- Prosecution: 1. What evidence says react-pdf cannot shape Khmer, beyond E7's other engines? 2. Which source says fontkit's Universal shaper handles Khmer or does not? 3. Is the preview mismatch a cost or only a risk?

### A4 (tied with A3)
- Defense: 1. What do issues #2319 and #332 say? 2. How does UAX #14 break Khmer without a dictionary? 3. Why pdfmake vs pdf-lib+fontkit?
- Prosecution: 1. What evidence supports "no known shaping step"? 2. What measured weight do you claim? 3. Does the shared spike moot your SP charge?

### B1 (tied with B2)
- Defense: 1. What run shows blob+a[download] reaches Files on iOS 17 or 18? 2. Does persist() return true in a plain Safari tab? 3. How is "last saved" honest after a wipe?
- Prosecution: 1. What exhibit supports your viewer-share claim? 2. Does IndexedDB add risk over localStorage given E20? 3. What cost is "nudge fatigue" in a part-time app?

### B2 (tied with B1)
- Defense: 1. Does canShare({files:[pdf]}) return true on current iOS? 2. Does Save to Files appear, given E36? 3. How do you keep user activation across slow PDF generation?
- Prosecution: 1. What source shows activation expiry on iOS? 2. Is the fallback no worse than B1? 3. Does E36's fix in iOS 17.6 weaken your charge?

### B3 (FATAL-filed)
- Defense: 1. Does interaction reset the counter in E20 in a way that covers a weekly user? 2. How do you tell a user a CV was wiped? 3. What happens to photos at the localStorage limit?
- Prosecution: 1. Which words of constraint 5 does a platform wipe break? 2. What source gives the quota you cited? 3. Is a condition (backup file) enough to cure the charge?

### C1 (tied with C4)
- Defense: 1. What source shows the in-app viewer blocks a web-app download? 2. What is the Telegram UA? 3. What does "still allow trying" do for a user who ignores the banner?
- Prosecution: 1. What evidence says false negatives are common? 2. Is the maintenance cost more than one regex? 3. What would show a banner is unnecessary?

### C4 (tied with C1)
- Defense: 1. Where do five target users open links? 2. How will you know of failures under constraint 3? 3. At what point do you add C1?
- Prosecution: 1. What source shows web-app downloads fail in these viewers? 2. Is E23 relevant at all? 3. What share of users must be affected to justify C1?

### E4 (tied with E1)
- Defense: 1. What is the gzip size of full Kantumruy Pro and Moul? 2. What is lab LCP on throttled Android? 3. Why not lazy-load Moul with E4?
- Prosecution: 1. What source says variable fonts are larger here? 2. Which target device fails the LCP? 3. What is E4's cost versus E1's tooling?

### E1 (tied with E4 and E3)
- Defense: 1. Do pre-made Khmer subsets keep GSUB/GPOS? 2. What are the subset sizes? 3. What does swap do to your D1 measurements?
- Prosecution: 1. What source shows subsetting broke Khmer? 2. Is pyftsubset needed if pre-made subsets exist? 3. Does WOFF2 decoding block A3 to A5?

### E3 (tied with E1)
- Defense: 1. Does a Google request breach constraint 3 or 5 as written? 2. What is the offline behavior in the Phase 5 PWA? 3. What is the measured LCP from a throttled Android?
- Prosecution: 1. What source shows Cambodian latency to Google Fonts? 2. Which constraint does E3 break? 3. Would a documented privacy note cure the charge?

### F2 (tied with F3, F4)
- Defense: 1. What do the vendor's official pages give in real-iPhone minutes? 2. Can Files and share sheet be observed remotely? 3. What is the latency for a Cambodian user?
- Prosecution: 1. What source supports vendor bias? 2. Does a one-off spike justify a trial? 3. Is F2 a fallback for no iPhone?

### F3 (tied with F2, F4)
- Defense: 1. What source says Playwright WebKit reproduces iOS download? 2. What does Chromium throttling cover for LCP? 3. Which regressions can only an iPhone show?
- Prosecution: 1. What source shows WebKit on Windows uses a different text stack? 2. Does F3 as a complement meet your charge? 3. Which test would show equivalence?

### F4 (tied with F2, F3)
- Defense: 1. Who are the first three testers? 2. How are privacy and sample CVs handled? 3. What is the script?
- Prosecution: 1. What stops testers self-reporting their device? 2. What is a usable-report threshold? 3. Why can F4 not be a pre-release check?

---

# RECOMMENDATIONS PER DOCKET (3 lines each)

**A.** None approved. Best available: A2, with an optional desktop Print button (A7a), REMANDED at 58 and 54.
Decide after the Phase 0 Khmer and iPhone-save spikes (S1, S4); A3 and A4 (48) only if A2 fails; A5 and A6 dismissed, A1 dismissed by FATAL.
The decisive test is a Khmer stress string through html2canvas on a real iPhone and Android, and whether the Blob saves to Files.

**B.** Approve B1's storage and guidance parts (B1b to B1d) now at 65, with the export path chosen by an iPhone test: B2 share-first if it works, else the B1a download.
B1 and B2 are tied (65 and 62). B3 stays a stopgap only until Phase 1. B4 not approved.
Decisive test: one real iPhone on iOS 17 or 18, download vs share({files}) with a delay.

**C.** Approve C1 (including C2a) at 72, tied with doing nothing (C4, 68).
The viewer test settles it: open the deployed link in Facebook and Telegram and run the export. C2b only if A2 stands and long-press works. C3 not recommended.

**D.** None approved; D1 (59) is the only workable path for generated PDFs. Start with D1a (shared pageGeometry.js).
D2 only as minimal break CSS for the desktop Print button; D3 and D4 not recommended.
Decisive test: same long Khmer CV in Chrome Android and iOS Safari, compare break offsets.

**E.** E4 (69), E1 (64) and E3 (63) are tied; recommend E4 with lazy-loaded Moul (E1b), moving to E1a pre-made subsets only if the size or LCP test fails. E2 not approved.
Decisive test: measure gzip sizes and throttled-Android LCP for each.
E3 only if the owner accepts the Google request and documents it.

**F.** Recommend a combination: F1 (71) as the core, F3 for CI and throttled budget checks, F4 in the Phase 6 beta; F2 only if no iPhone can be reached.
The owner must first answer constraint 9 (which devices exist) in Phase 0.
F2, F3 and F4 are tied at 58 to 59 and are not mutually exclusive.

**G.** Recommend G1 (73) plus G3 (67), as the roadmap's Phase 6 already assumes. G2 deferred; build only as a G1 attachment if S4 shows catchable errors.
Prefill never includes CV content and is shown to the user.
No tie: G1 leads G3 by 6.

---

# LIMITS
- Not checked: any real-device behavior (all iPhone, Khmer and in-app claims remain [A]/[R]/GAP). Scores are judgments, not measurements. A1 and A6 FATAL rulings are final for this hearing unless new facts reopen them. B3's FATAL was not sustained on a reading of constraint 5 that the user can overturn.
- Confidence is low on every option whose load-bearing fact is a GAP (A2, A3, A4, B2, C1, C4, E1, E3, E4).
