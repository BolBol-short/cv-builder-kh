# DEFENSE CROSS-EXAMINATION: finalists A1, A2, A7a, A7, A3, A4, B1, B2, B3

Discovery filed: 0 of 3 (no new exhibits; nothing below is new evidence). Tags: REBUTTED (exhibit cited), MITIGATED (condition or test named), CONCEDED.
Test names follow the Judge's roadmap: S1 = Khmer stress-string spike, S2 = IndexedDB prototype, S4 = real-iPhone save/share/persist run. Owner = project owner for every condition.
Corrections to my own brief are marked CORRECTION.

---

## A1 Print only (window.print) [FATAL answered]

**FATAL charge (constraint 7, iPhone must save a file to Files "like a normal download"): CONCEDED as a stand-alone solution.**
I do not ask the court to lift it. My brief already conceded the premise. The one honest point for the record is the Judge's own dissent: E37 [R] shows the file can reach Files (Print, pinch, Share, Save to Files). But the user's wording is "like a normal download", and a hidden gesture is not that. I make no further argument.

1. Contest that Print, pinch, Share is not "like a normal download"? **CONCEDED.** It is a hidden gesture (E37 [R], four independent how-to sites). I do not contest it.
2. Any run showing a one-tap save to Files? **CONCEDED.** None exists. E17 GAP, and E37 says the opposite. Only a real-iPhone run (S4) could change this; it would be the appeal trigger the Judge already named.
3. What does A1 do for an iPhone user who has never seen the pinch gesture? **CONCEDED.** Nothing. A "how to save" label would help but would not make it a normal download. It also does not cure the missing Blob (B2 moot) or the D2 dependency.

Plaintiff's other points: "output depends on the print dialog" was struck [A] and I need not answer it. "No Blob" is **CONCEDED** (agreed in my brief).
Surviving use: only as the desktop-only Print button inside A7a, where constraint 7 (an iPhone constraint) is not engaged. That use is MITIGATED by being desktop-only.

---

## A2 Canvas capture to image PDF

1. Khmer stacks survive html2canvas on iPhone? **CONCEDED, MITIGATED-by-test (S1).** No run, no Khmer-specific source (E8, E38 GAP). I cannot rebut the Plaintiff's D2 (old Tamil bug). I note that the same D2 source says plain canvas `fillText` was fine, so the failure is in how html2canvas draws text, not in canvas itself. That is [R] and I do not stake EV on it. Conditions: (a) run the Khmer stress string (stacked subscripts and vowels) through html2canvas and dom-to-image on a real iPhone, Android and desktop, compared with the DOM; (b) set letter-spacing to 0 on all Khmer text, because E28 [V] shows letter-spacing already separates Khmer clusters in browsers (the cause in html2canvas is [A]). If any device fails, A2 is dismissed on SP and the court moves to the A3/A4 spike. I accept that.
2. How does the Blob save to Files given E18? **CONCEDED as unproven, MITIGATED-by-test (S4).** I withdraw my brief's claim 3, which the Judge struck. E18 [V] is open. The Blob export belongs to docket B, and G-5 counts E18 once. Conditions: S4 on a real iPhone; if the link opens in the tab, use the octet-stream re-typed blob (E18 commenter workaround) and/or B2.
3. Measured gzip size and per-page memory on the oldest phone? **CONCEDED, MITIGATED-by-test.** I have no measurement and claim none. Conditions: load html2canvas and the PDF writer by dynamic `import()` on the Export tap; run `vite build` with a bundle visualizer; if the lazy chunk is over 80 KB gz, pick the smaller writer or drop to the scale that fits. Render one page at a time and zero the canvas size after each page ([A]); test a 3-page export at scale 2 on the oldest available phone.

Plaintiff's top three, my result:
- Khmer unproven: MITIGATED (point 1).
- Canvas cap: **REBUTTED in part.** E26 [A] arithmetic over E25 [R]: scale 2 is about 3.6 M px per page against 16.8 M. Multi-page memory stays a GAP (E27), MITIGATED by the 3-page test above.
- Image PDF is not selectable and is larger: **CONCEDED.** "Several MB" and "blurry" were struck as [A] and I make no counter-claim. "Employers reject it" was struck; the Judge's ruling stands.

---

## A7a Amended: A2 + desktop Print button

1. What does Print add beyond A2 without double counting? **CONCEDED as small.** It adds only a desktop route to selectable text, and the handler is v1 code (`window.print`). It adds nothing on mobile. I claim no A2 merit twice. A7a's honest value is the one-line fallback, no more.
2. How will the Print layout match the capture layout? **MITIGATED.** Both read one `pageGeometry.js` (D1a) and the same fixed A4 containers, with print CSS showing those containers. Unproven. Condition: Phase 3, overlay the print preview on the capture for one 2-page Khmer CV and compare break positions. If they diverge, drop the Print button rather than patch it.
3. A2 Khmer flawed on only one device? **CONCEDED.** The button is desktop-only, and A1 on iPhone is the sustained FATAL. If the flaw appears on iPhone or Android, A7a offers no fallback on the devices that matter, and the answer is the A3/A4 spike, not A7a. If the flaw is on a desktop browser only, the Print button is the fix. That is the only case where A7a beats A2.

Plaintiff (no A7a brief; A7 charges apply by transfer):
- Two code paths and two Khmer behaviours: **MITIGATED.** The Print path already exists, it shares geometry, and the Plaintiff's "more bugs" claim is [A]. But I agree it is a real cost, and the layout-parity test decides it.
- Fallback with correct text reduces the A2 risk? **CONCEDED in part**, on desktop only (see 3).
- "Legacy format" was struck.

---

## A7 Hybrid (A2 + Print + vector later)

1. Why is A7 not simply A7a? **CONCEDED.** It is. A7 bundles a solution with a process rule. I withdraw A7 in favor of A7a (my brief already said A7a is the cleaner statement).
2. What does "vector later" commit the owner to? **CONCEDED, MITIGATED by severance.** Nothing as a deliverable. As A7b it is only a rule: no vector work unless the S1 spike proves Khmer correct. The Judge's goalposts ruling was right, and I do not defend A7b as a solution.
3. Withdraw the A7 filing? **Yes, CONCEDED.** Score A7a, not A7.

Plaintiff's top three: double counting of A2's merits and flaws: **CONCEDED**, nothing to add beyond A7a's increment. "Two paths": see A7a, **MITIGATED** the same way. "Legacy format shared with employers": struck [A]; I cite no counter-evidence. Severing A7b cures the goalposts objection: **CONCEDED**, yes.

---

## A3 @react-pdf/renderer + embedded Khmer font

1. A run showing react-pdf shapes Khmer subscripts? **CONCEDED.** None. E5 GAP; E4 shows only a user snippet; EV at most 2. **MITIGATED-by-test (S1).** The shared spike renders the stress string through react-pdf with Noto Sans Khmer, against Chrome. Broken stacks end A3. (fontkit's README names a "Universal" shaper, E3 [V], which is plausible for Khmer. That is [A] and the spike decides it.)
2. Measured bundle on React 19? **CONCEDED.** Unmeasured; I withdraw my brief's "I expect it to exceed 80 KB" as a finding. React 19 compatibility is unchecked. **MITIGATED-by-test:** `npm i` and `npm ls` on React 19, `vite build` plus visualizer. Over 80 KB gz in a lazy chunk or unsupported on React 19 means dismissal on CM or FO.
3. How much template work is rewritten? **CONCEDED.** All templates, in a second layout system with no Tailwind. I have not counted the components. Test: count the v1 template components before choosing; if more than a couple, A3 fails FO in practice.

Plaintiff's top three: Khmer shaping unproven: **CONCEDED** on EV, MITIGATED-by-test (S1). The Plaintiff's own E7 is other engines, so neither side has a react-pdf Khmer source. Bundle and React 19: **MITIGATED** (point 2); both sides' size claims were struck. Preview mismatch: **CONCEDED as a cost**, since the DOM preview and the PDF are two renderers. A Blob preview of the real PDF is possible but adds weight.
Also conceded: UAX #14 line breaking has no Khmer dictionary (E1, E28). Condition: insert zero-width spaces from `Intl.Segmenter('km')` (E29 [R], quality GAP) before layout, and test the result in S1.

---

## A4 pdfmake or pdf-lib + fontkit

1. What do issues #2319 and #332 say? **CONCEDED.** Unread (E2 shows titles only). I withdrew the "five closed issues" argument as support (G-4). **MITIGATED-by-test:** open both issues, a 5-minute read, in Phase 0 (S1).
2. How does UAX #14 break Khmer without a dictionary? **CONCEDED.** It does not (E1 [V] says nothing on shaping; E28 [V] says dictionary breaking is the browser's). Lines may break badly or not at all. **MITIGATED:** the same `Intl.Segmenter('km')` zero-width-space pre-pass as A3, tested in S1. That is extra code and a GAP (E29), so the condition is not free.
3. Why pdfmake vs pdf-lib + fontkit? **MITIGATED.** pdfmake takes declarative document definitions (less layout code for a learner). pdf-lib + fontkit is lower-level drawing (more code, more control). If S1 passes, pdfmake first. Both claims are [A]; the spike measures size.

Plaintiff's top three: "no known shaping step" was struck (absence of a result). On merit I still carry the burden and have no shaping source: **CONCEDED**, EV 2. Measured weight: neither side measured, both struck; **MITIGATED** by a build measure. The shared spike moots the SP charge only if it passes; if it fails, A3 and A4 both fail together, and I accept that.

---

## B1 Blob + download, IndexedDB + persist(), A2HS, last saved, backup nudge

1. A run showing blob + a[download] reaches Files on iOS 17 or 18? **CONCEDED.** None. E18 [V] cuts against it and is still open. E17 and E36 are GAP or [R]. **MITIGATED-by-test (S4)** with two fallbacks: the octet-stream re-typed blob (E18 commenter) and B2 share. B1 is severable: B1b to B1d rest on E20 and E21 [V] and do not depend on the export path. Score the storage half separately.
2. Does persist() return true in a plain Safari tab? **CONCEDED**, it is a GAP and I do not know. **MITIGATED:** nothing depends on a "yes". The backup-file nudge protects the user whatever persist() returns, and E21 [V] says Home Screen apps are favored by the heuristic. Test (S4): read the boolean in a plain tab and from the Home Screen.
3. How is "last saved" honest after a wipe? **CONCEDED, CORRECTION.** A "last saved" stamp lives in the same storage and dies with it, so the app cannot tell a wiped user from a new one. Honest design: show "last saved" only for data currently held; show "last backup file" as a date the user can verify against their Files; on an empty start show "Restore from a backup file". The app does not claim to detect a wipe.

Plaintiff's top three: viewer-share claim: **REBUTTED**, struck as fabrication (E18 mentions only the octet-stream workaround); I take no credit beyond that. IndexedDB adds risk over localStorage: **CONCEDED on durability.** E20 [V] deletes IndexedDB and localStorage alike, so IndexedDB buys capacity (photos), not safety. The localStorage limit is not in the record (the 5 MB claim was struck), so even the capacity benefit is [A]. **MITIGATED** by the S2 prototype (idb-keyval) before adoption, and by dropping IndexedDB if the photo test shows no need. Nudge fatigue (struck [A]): **MITIGATED** by showing it at most once per 30 days, dismissible.

---

## B2 Web Share with PDF file as primary iOS path, download fallback

1. Does canShare({files:[pdf]}) return true on current iOS? **CONCEDED**, unknown. E36 [R] reports regressions on iOS 17 and 18, with the target missing from the share sheet. **MITIGATED-by-test (S4):** two iOS versions if available, including 17.6 or later.
2. Does Save to Files appear, given E36? **CONCEDED**, unconfirmed. E36 itself says it vanished on iPadOS 17.5.1 and returned on 17.6, which is a fixed OS bug rather than a permanent absence, but it shows OS-version dependence. **MITIGATED:** feature-detect, and on false fall back to the B1 download. SP is then no worse than B1.
3. Keeping user activation across slow PDF generation? **MITIGATED by design.** Make the PDF on one tap ("Create PDF"), then show a second visible "Save to Files" button whose tap calls share() with the ready Blob. share() then runs inside a fresh gesture. The cost is one extra tap. Test: the 3-second delay case in S4.

Plaintiff's top three: activation expiry is [A] and was struck; the two-tap design makes it moot (**MITIGATED**). AbortError mistaken for failure: **MITIGATED** by ignoring `AbortError` when the user cancels. Fallback no worse than B1: **REBUTTED by logic** (the same Blob download), [A]; and the 17.6 fix in E36 weakens the charge. Constraint 7: I concede share is an export, not a download. I submit a labelled "Save to Files" button is a visible, first-class iOS route, unlike the hidden pinch (E37). That is [A]; the court may find otherwise. Moot under A1.

---

## B3 localStorage only (v1) [FATAL answered]

**FATAL charge (E20 wipe breaks constraint 5): REBUTTED on the constraint's words, CONCEDED on merit.**
Constraint 5 reads "CV data stays on the user's device. Account-free." A platform wipe keeps data on the device (it deletes it). E20 [V] describes deletion, not leakage, so no word of constraint 5 is broken. That matches the Judge's preliminary ruling (FATAL not sustained). I do not claim durability is outside the user's interests: B3 fails the docket's real problem, data loss, and I score it that way.

1. Does interaction reset the counter for a weekly user? **CONCEDED, CORRECTION.** My brief said weekly-returning users are unaffected. That is wrong. E20 [V] counts seven days of Safari use without interaction on the site, so a person who uses Safari daily but opens the CV site once a week can still hit it. Only users who return within fewer than seven days of Safari use are safe. Whether this cap still applies on current iOS is unverified (E21 [V] does not mention it), so the test is S4: clock-advance or wait.
2. How do you tell a user a CV was wiped? **CONCEDED.** You cannot; the flag is wiped too. The same limit applies to B1. The only protection is a backup file, which B3 lacks.
3. What happens to photos at the localStorage limit? **CONCEDED.** The limit is not in the record (the 5 MB claim was struck). A base64 photo risks `QuotaExceededError`. Unless caught it fails silently. I have no mitigation inside B3 short of changing the option (downscale the photo, or move to IndexedDB, which is B1).

Plaintiff's top three: FATAL: see above, REBUTTED. "No backup means one wipe is total loss": **CONCEDED.** Quota: struck as fabrication, though I cannot supply the real figure. Is a backup-file condition enough to cure it? It would make B3 into B1c and B1d, an amended option, and I do not file one; B1 already carries that. B3 is tolerable only as a stub until Phase 1 (the Judge's condition).
