# CROSS-EXAMINATION: PLAINTIFF'S ANSWERS (finalists A1, A2, A7a, A7, A3, A4, B1, B2, B3)

Plaintiff. No discovery filed in cross-exam (0 of 3 used), so no new exhibits (none from E50). Each point: result is REBUTTED (exhibit cited), MITIGATED (condition named) or CONCEDED. The Judge's "Prosecution:" questions are answered inside the matching point. An [A] claim of mine is never offered as the basis for a FATAL charge.

Standing concessions that apply to every finalist:
- Struck claims stay struck (G-1 to G-9). I do not re-argue "several MB", "employers", "5 MB quota", "viewer share button", "doubles work".
- E18 is counted once (G-5). I do not re-charge it per option except where an option's own export path depends on it.
- Absence of a search result is not a finding. I withdraw every "no known X" phrasing.

---

## A1 Print only (FATAL charge filed: constraint 7)

Defendant's three strongest points:

1. "Browser layout shapes Khmer natively, so no library adds shaping risk."
   Result: CONCEDED. Browser Khmer is the most plausible renderer in docket A. My only exhibit is E28 [V], which covers line breaking and letter-spacing quirks, not shaping, so I cannot say browser Khmer is wrong. This point does not touch my FATAL charge, which is about the save path, not the glyphs.

2. "Zero new code, zero new bytes, fully reversible; every other option layers on top."
   Result: CONCEDED. It is true and it is why A1 scores 71 before the override (FO5, CM5). I do not contest cost. Cost cannot cure a binding constraint (Judge G-9).

3. (Implied by the Defense's silence on the pinch route and by E37) "A route to Files exists, so constraint 7 is met."
   Result: REBUTTED on the constraint's own words, E37 [R]. Four independent how-to sites (iphonelife, igeeksblog, macmost, bgr) all describe the same hidden gesture: Print, pinch outward on the preview, Share, Save to Files. The user's constraint 7 says "like a normal download". A gesture that needs a how-to article is not a normal download, and the Defense conceded the premise in its brief. That is the user's fact (binding, case file section 2) plus several independent [R], which meets the clear-and-convincing standard.

Answers to the Judge's three Prosecution questions:
- Q1 (is the standard met, and the strongest contrary reading?). Yes, by user fact plus E37. The strongest contrary reading, which I state fairly: constraint 7 means only "the user can end up with a file in Files". Under that reading E37 satisfies it and the FATAL falls. The text "like a normal download" favors my reading, but only the user can settle it. I do not claim more than the Judge's medium confidence.
- Q2 (would a labelled "how to save" prompt cure the charge?). MITIGATED, not cured. A prompt that teaches the pinch gesture lowers the harm, but the route stays non-standard and it adds Khmer and English instruction text to maintain. It cures the charge only if the user rules that a taught gesture counts. Condition: the user restates constraint 7.
- Q3 (where is the evidence the pinch route fails on current iOS?). CONCEDED: I have none. E37 [R] says it works, with varying dates and labels. My charge is that the route is hidden, not that it fails. I withdraw any claim that it fails.

Other conditions: if A1 survives only as the A7a desktop button, FATAL does not apply on desktop (desktop Save as PDF is a normal file save). I do not oppose that role.

Net: FATAL stands on the narrow reading; the user can reverse it with one sentence.

---

## A2 Canvas capture to image PDF

Defendant's three strongest points:

1. "The browser shapes the Khmer first; the PDF only embeds pixels; shape-then-embed is the published workaround (E7, khmer_pdf_fixer)."
   Result: MITIGATED, with a part-concession. E7 [R] is a Dart/Flutter workaround where Flutter's own text engine shapes, then the image is embedded. It is not html2canvas. html2canvas re-draws text itself on a canvas, so "the browser shapes it" is [A] for this tool. Judge Q1 asks what ties D2's Tamil bug to Khmer today. Nothing does: D2 [R] is an old issue (#226) on Tamil, and E38 [R] says the typedrawers Khmer problem was "not on iOS". I concede the Tamil bug is not evidence of a Khmer fault now. The true state is E8 and E38 GAP: unproven either way, and the Defense carries merit. Condition: S1 spike with a Khmer stress string (stacked subscripts and vowels) through html2canvas and dom-to-image on a real iPhone, Android and desktop, compared with the DOM: owner, Phase 0.

2. "Scale 2 is about 3.6M pixels per page, under the iOS 16.8M cap (E25, E26)."
   Result: MITIGATED. Judge Q2: yes, for a single page at scale 2 (and at scale 3, 8.0M) the arithmetic holds; I concede it. E26 is [A] on top of E25 [R], and the real open question is memory across a 3-page export and on low-end Android (E27 GAP). Condition: render pages one at a time, release each canvas, and test 3 pages at scale 2 on the oldest phone: owner, Phase 0, final check Phase 4.

3. "Templates stay in React and Tailwind; no rewrite, no new language."
   Result: CONCEDED. This is A2's real advantage over A3 and A4 and the reason it leads docket A. I do not contest FO4 or the cost side.

Also answered: Judge Q3 (source that employers reject image PDFs). CONCEDED, none; the charge was struck and I withdraw it. What remains, and the Defense concedes it, is that image text is not selectable or searchable. That is a quality limit, not a failure. The Defendant's claim 3 (Blob as "normal download path", hearsay on E16) was struck; I do not re-charge E18 here beyond S4: the Blob must be tested on a real iPhone.

Net: no FATAL. A2 is the best available but unproven; two GAP spikes decide it.

---

## A7a Amended: A2 + desktop Print button

I filed no brief on A7a (the amendment came after my blind brief). I state my A7a-specific charges now, as the Judge asked (Prosecution Q1).

A7a-specific charges:
- Layout parity: the desktop Print output is the browser's print flow, the mobile output is a canvas of fixed A4 containers. Keeping them identical is real work and it lands in docket D. [A]. Cheapest test: print the same 2-page Khmer CV and compare it to the A2 capture.
- Different engines, different Khmer: on desktop, text is browser-shaped vector; on phone, canvas pixels. The same CV could look different on the two platforms. [A].
- Not a fallback where it matters: the target is mobile first, and the button is desktop-only.
- Double counting is not charged: I do not re-charge A2's evidence (Judge ruling stands).

Defendant's three strongest points:

1. "A2 provides the Blob needed on iPhone; desktop Print gives selectable text where a printer dialog exists."
   Result: CONCEDED as stated for desktop. Desktop "Save as PDF" is a normal file save, so A1's FATAL does not reach A7a. I accept the button gives selectable text. This adds no mobile benefit, and the Judge already says mobile equals A2.

2. "The desktop button costs one handler, already in v1."
   Result: MITIGATED. The handler is cheap; the page-geometry parity is the cost, and the Defense concedes it (docket D work). Condition: print stylesheet renders the same fixed-A4 page nodes from one shared pageGeometry.js, so there is one layout source: owner, Phase 3.

3. "If A2 Khmer is flawed on one device, switch desktop users to Print immediately."
   Result: MITIGATED (Prosecution Q3: does a text-correct fallback reduce the A2 risk I charged? Partly). Yes for desktop users: a flaw found only on desktop Chrome or Firefox becomes a button swap. No for the flaw that matters most: a flaw on iPhone or Android. Those users have no vector fallback, and the Defense concedes it. A7a reduces A2 risk on the minority platform only. Condition: spike results per device decide whether the button is a fallback or an optional extra.

Prosecution Q2 (evidence that two paths create more bugs than one). CONCEDED: I have none, it is [A]; I keep it as a risk, not a finding.

Net: A7a is A2 plus a small, real, desktop-only hedge. Within 4 points of A2, tied. I do not oppose the Judge's ordering.

---

## A7 Hybrid (A2, Print on desktop, vector later if a spike proves it)

Defendant's three strongest points:

1. "Same Khmer logic as A2: the browser shapes, the PDF embeds pixels."
   Result: CONCEDED. If that is right, it is A2's merit and A2's risk, scored once under A2. I charge nothing under A7 that I do not charge under A2 (double counting stays sustained).

2. "Keeps A1 as a desktop Print button, a text-correct fallback."
   Result: MITIGATED. This is the A7a point, with the same limit: it helps desktop only. See A7a point 3.

3. "Defers vector work until a measurement exists, which is how the record's GAPs should be handled."
   Result: CONCEDED. Spike-first is sound practice. It is a process step that belongs in Phase 0 under any option, so it earns A7 no extra score. This is the "moving the goalposts" objection, already sustained.

Answers to the Judge's three Prosecution questions:
- Q1 (what charge applies to A7 and not A7a?). None of substance. The only difference is the A7b clause ("vector later"), a commitment with no content. I withdraw A7-specific charges except that one.
- Q2 (does severing A7b cure the goalposts objection?). Yes. Once A7b is severed as a process condition, A7 equals A7a. I accept that A7 is superseded.
- Q3 (what evidence supports "legacy format"?). CONCEDED: none, it was struck. I withdraw it.

Net: I ask the Judge to treat A7 as merged into A7a; it should not score above A7a.

---

## A3 @react-pdf/renderer + embedded Khmer font

Defendant's three strongest points:

1. "Stays JavaScript and React; the primitives are JSX."
   Result: REBUTTED in part, by the Defense's own concessions (and E3 / structure). JSX yes, but View/Text/StyleSheet are not DOM or Tailwind. Every template is rewritten onto a second layout engine and the on-screen preview stops being the PDF. The Defense concedes this ("replaces the CSS the owner knows"). Prosecution Q3 asks if the preview mismatch is a cost or only a risk: it is a cost, an agreed structural fact, not a speculation. How much it costs in components is unmeasured and I do not put a number on it. The "doubles work" figure stays struck.

2. "Vector, selectable text, small files if shaping works."
   Result: MITIGATED. The word "if" carries the point and the Defense concedes EV is at most 2. I admit this is A3's real upside over A2. Condition: shared S1 spike (Khmer stress string through react-pdf vs Chrome), plus `npm ls` on React 19 and a measured gzip build: owner, Phase 0.

3. "Khmer fonts can be registered by range in react-pdf; a user snippet does exactly that (E4)."
   Result: CONCEDED that registration is possible; REBUTTED that it shows shaping (E4 [V]: the thread does not discuss shaping; the Judge already struck the [V] label). Registering a font and shaping subscripts are different things.

Answers to the Judge's other Prosecution questions:
- Q1 (what evidence says react-pdf cannot shape Khmer, beyond E7?). CONCEDED: none. My case is the burden: no exhibit shows it can (E5 GAP) and E7 shows the failure pattern in engines without complex layout. I do not claim it cannot; I claim it is unproven, so the Defendant's merit burden is unmet.
- Q2 (source for fontkit's Universal shaper on Khmer?). I have none either way. E3 [V] names eight shapers and no Khmer; "Universal" may cover it; the fontkit PRs #54 and #99 match a "khmer" search for unknown reasons (E5, inference [A]). I withdraw "fontkit has no Khmer shaper" as a finding; it is a GAP in both directions.

Net: no FATAL. Dismissal risk only if the spike shows broken stacks.

---

## A4 pdfmake or pdf-lib + fontkit + Khmer font

Defendant's three strongest points:

1. "pdfmake has five closed Khmer issues and the maintainer answered the line-breaking one (E1, E2)."
   Result: REBUTTED, G-4. A closed issue is not a fix. E1 [V] shows the maintainer redirected the reporter to the foliojs/linebreak repo after two days, and the page says nothing about shaping. E2 [V] is titles only (#2319 "missing Khmer characters" and #332 "custom font not rendering as expected" were not read), and both titles read as problems. Prosecution Q1 (evidence for "no known shaping step") is CONCEDED: it was an absence of a search result. I withdraw it.

2. "Line breaking uses UAX #14, so a basic Khmer break path exists."
   Result: REBUTTED. E28 [V]: browsers break Khmer with dictionaries, and even they produce awkward breaks. The Defense concedes UAX #14 is not dictionary breaking. The line-break path exists but its Khmer quality is unproven (E29 GAP covers the Intl.Segmenter alternative).

3. "pdf-lib with fontkit is smaller than react-pdf."
   Result: CONCEDED as unprovable. Struck [A]. I make the same admission on my side: Prosecution Q2 (what measured weight do I claim?) is none; my "heavy weight" is [A]. A build measurement decides both.

Prosecution Q3 (does the shared spike moot my SP charge?). MITIGATED: yes. A clean Khmer render in the S1 spike replaces my SP charge with evidence (A3 and A4 would then each rise, per the Judge's trigger, to about 61). Until it runs, the Defendant's merit burden is unmet. Condition: read issues #2319 and #332, run the shared spike, measure the bundle: owner, Phase 0. A relevance point I accept: the Perl PDF::API2 comparison is partly E7 and is weak.

Net: no FATAL; tied with A3; same decisive test.

---

## B1 Blob + a[download], IndexedDB + persist(), A2HS guidance, last saved, backup nudge

Defendant's three strongest points:

1. "Safari can wipe script-writable storage after 7 days without interaction; Home Screen apps have their own counter; guidance and backup address a real loss path (E20)."
   Result: CONCEDED. E20 [V] supports the storage and guidance half, and I do not contest it. My case is against the export half (B1a) only. The Judge already notes the storage half carries the 65.

2. "persist() is granted on heuristics that favor Home Screen apps (E21, E22)."
   Result: CONCEDED on the heuristic. E21 [V] says Home Screen status is one heuristic. The "far larger quota" claim was struck and I do not revive it. Open: persist() in a plain Safari tab is a GAP on both sides. Condition: S4 reads the persist() boolean in a plain tab and from the Home Screen: owner, Phase 0.

3. "'Last saved' and a backup file protect data even if persist() is denied."
   Result: MITIGATED. The Judge asked (Defense Q3) how "last saved" is honest after a wipe: it is not protective, because it lives in the same wiped storage, and E20 [V] says IndexedDB is wiped like localStorage. The only protection that survives a wipe is the backup file. That file is itself a download, and E18 [V] reports TXT and XML files opening in the tab on iOS (JSON is not named; [A] inference that it behaves the same). Condition: S4 also tests the JSON backup file download on a real iPhone, and the "last saved" text must say "backup not yet saved" rather than imply safety: owner, Phase 5.

Answers to the Judge's Prosecution questions:
- Q1 (exhibit for the viewer-share claim). CONCEDED: none. E18 says only that an octet-stream blob workaround was suggested. The sustained fabrication finding is correct and I withdraw the claim.
- Q2 (does IndexedDB add risk over localStorage given E20?). On E20 alone, neither is safer: both are wiped. IndexedDB's gain is quota and non-string storage (photo blobs), which E21 [V] supports for origin quota; the localStorage limit is not in the record. The risk it adds is an API for a learner plus a dependency (idb-keyval). Condition: prototype idb-keyval in S2 before committing; if a photo is small, localStorage plus the backup file is enough.
- Q3 (cost of "nudge fatigue"). CONCEDED: [A], struck. Kept only as a design condition: one dismissible nudge, shown once per session at most.

Net: approvable with conditions. The export half (B1a) is the open exposure, once, via E18 (G-5).

---

## B2 Web Share API with PDF, download fallback

Defendant's three strongest points:

1. "canShare/share are supported in Safari 14 / 12.1 (E15); feature-detect, then fall back (E16)."
   Result: REBUTTED in part, E36 [R]. Version support of the method is not support for sharing a PDF file. E16 [V] says canShare returns false when file sharing is unsupported, and E36 (three independent sources, admitted as a negative signal) reports file-share regressions on iOS 17 and 18 (WebKit 261498, no resolution seen) and a missing "Save to Files" in iPadOS 17.5.1. The first point is true of the API, but it does not close E17.

2. "The share sheet is a native route that does not rely on the blob-in-tab path E18 reports."
   Result: MITIGATED. It is plausible and I cannot refute it: E18 does not test share. It is [A] and the Judge struck the "Save to Files is listed" companion claim. Condition: S4 on a real iPhone, iOS 17 or 18, PDF Blob through canShare then share, and check that "Save to Files" appears: owner, Phase 0.

3. "The fallback keeps desktop and Android working (E16)."
   Result: CONCEDED. Prosecution Q2 (is the fallback no worse than B1?): correct, the fallback is B1's path, so B2's floor is B1's score. B2's downside is extra code and error handling (a cancelled share throws AbortError, which must not show as failure), not worse outcomes.

Answers to the Judge's other Prosecution questions:
- Q1 (source showing activation expiry on iOS). CONCEDED: none; [A] and struck as a finding. It stays a test item: share() called after a 3-second PDF generation. The mitigation, if it bites, is generating the PDF first and showing a second "Share" button, which needs a second tap.
- Q3 (does the iOS 17.6 fix weaken my charge?). Partly. E36 says "Save to Files" returned after 17.6 for that iPadOS case, which weakens that one charge. WebKit 261498 (missing target apps on iOS 17 and 18) has no resolution in the record, and the dependency on OS version is the point. MITIGATED by the S4 test on the current iOS version.

Net: tied with B1 on the export axis; B2 needs a Blob (moot under A1).

---

## B3 localStorage only (v1), no guidance, no nudge (FATAL charge filed)

Defendant's three strongest points:

1. "Zero new code; simplest; fits a solo learner."
   Result: CONCEDED. It is true and why B3 holds 58 (FO5, CM5).

2. "Data loss exists only after 7 days without interaction in Safari tab use; users who return weekly are unaffected (E20)."
   Result: CONCEDED as to those users. E20 [V] counts days of Safari use without interaction on the site, so a light or weekly Safari user may not hit it. How often the at-risk user (someone who drafts a CV once and comes back after a gap) appears is [A] and unknown; v1 has no users, so there is no loss data either way. The risk is real but its rate is unproven. MITIGATED further by a condition: B3 is tolerated only until the IndexedDB and backup layer (B1b to B1d) lands, Phase 1.

3. "A CV is small text; localStorage is synchronous and trivial."
   Result: MITIGATED. True for text. The Judge struck my "about 5 MB" figure and I withdraw it. The photo is the open item: a base64 photo may be large, and the localStorage limit is not in the record. Condition: test a typical phone photo as base64 on a real iPhone before relying on localStorage: owner, Phase 0.

Answers to the Judge's Prosecution questions (my FATAL charge):
- Q1 (which words of constraint 5 does a platform wipe break?). CONCEDED: none. Constraint 5 says "CV data stays on the user's device. Account-free." A wipe leaves the data on the device, or removes it, and no data leaves. The Judge's ruling (FATAL not sustained, reduced to a risk) is correct and I accept it. The user can still say that constraint 5 includes durability; I do not claim they did.
- Q2 (source for the quota I cited). CONCEDED: none. Withdrawn.
- Q3 (is a condition, a backup file, enough to cure it?). MITIGATED, and honest about what it means: a backup file does cure the loss risk, but E20 [V] shows IndexedDB does not, so the cure is the backup nudge plus Home Screen guidance, which are B1b to B1d. B3 plus its cure is B1. B3 has no standalone merit beyond cost. Also, "owner never learns" (constraint 3) stays a risk, not a finding.

Net: FATAL withdrawn in effect; B3 is a stopgap at 58.

---

## Tally

27 points answered (3 per finalist): 5 REBUTTED, 9 MITIGATED, 13 CONCEDED. FATAL charges: A1 stands (narrow reading of constraint 7, medium confidence); B3 conceded as not sustained. No new evidence filed.
