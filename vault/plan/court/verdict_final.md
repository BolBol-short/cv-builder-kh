# JUDGE'S FINAL VERDICT (motion to reopen, narrow rehearing): CV-Builder v2, dockets A and B, with C to G confirmed

Ruled on the record: verdict_prelim.md (precedent), cross_defense.md, cross_prosecution.md. No new exhibits were filed in cross (0 of 3 discovery used), so no [V] evidence changed. Only concessions and conditions moved scores.
Formula unchanged: total = 5*SP + 4*FO + 3*EV + 3*CM + 3*RR + 2*PC (max 100). Scores are judgments, not measurements.
Owner = the project owner on every condition. Phase = v2 roadmap phase 0 to 6.
Precedent kept: G-1 to G-9 stand. E18 is counted once (G-5). Struck claims stay struck (both sides withdrew them).
Arithmetic note: the preliminary verdict wrote "B1 68" as the S4-pass trigger. SP 3 to 4 adds 5 points, so the correct figure is 70. Corrected below.

---

## 1. THE A1 FATAL QUESTION (constraint 7)

Question 1: is the user's binding constraint (iPhone users must be able to save the PDF as a file like a normal download) plainly broken by A1?
Ruling: Yes, on the ordinary meaning of the words.
- A1 produces no file or Blob, so the app cannot offer a Download action (Defense concession, cross A1 point 3 and "No Blob").
- E37 [R], four independent how-to sites, describes the only iPhone route: Print, pinch outward on the preview, Share, Save to Files. Neither side disputes what the route is.
- "Like a normal download" means a visible, offered save. A gesture that needs a how-to article is not that. The Defense conceded the premise (3 of 3 points CONCEDED) and the Plaintiff conceded the route works (Q3). The charge rests on the route being hidden, not on it failing.

Question 2: is the FATAL standard (clear and convincing: a [V] exhibit or several independent [R]) met?
Ruling: Met, narrowly. The facts come from the user's binding constraint (a fact, G-8) plus E37, several independent [R]. The only contrary reading ("the user can end up with a file in Files") is advanced by no counsel. It appears only as my own dissent, and the Plaintiff states it fairly and admits only the user can settle it. A charge that stands on a user fact plus uncontested [R], with every counsel conceding the premise, meets the standard. [A] was not used (the Plaintiff's "print dialog output" point stays struck).

Holding: A1 FATAL SUSTAINED. DISMISSED. The number 71 is overridden and shown only so the order is honest. No criterion changes (the Plaintiff conceded browser Khmer is plausible and cost is best-in-docket; those were already in FO5 and CM5, and browser Khmer stays unverified).
Surviving role: the desktop-only Print button (inside A7a). Desktop "Save as PDF" is a normal file save, so constraint 7 is not engaged there. Owner, Phase 4 (Plaintiff does not oppose).
Confidence: medium. All counsel concede the premise, but the reading is the user's to give, and a reversal changes the docket lead (A1 at 71 would beat A2 at 58). That asymmetry is why this stays at medium.
Cheapest settlement (zero code): the user answers one sentence. "Does a taught Print, pinch, Share, Save to Files route count as 'like a normal download'?" If yes, the FATAL drops and A1 leads docket A at 71 (APPROVED WITH CONDITIONS, with a "how to save" prompt as a binding condition, owner, Phase 4). If no, the ruling stands. Test T4 below also checks whether Print offers a one-tap save without the pinch.
Dissent: unchanged from the preliminary ruling. The wording can be read as "ends up in Files".

## 2. B3 FATAL

Ruling: stays UNSUSTAINED. The Plaintiff conceded (Q1) that no word of constraint 5 ("CV data stays on the user's device. Account-free.") is broken by a wipe, withdrew the quota figure (Q2), and accepted that the FATAL is "withdrawn in effect". The Defense rebutted on the constraint's words. Both sides agree. Reduced to a risk and scored under RR.
Trigger to reverse: the user states constraint 5 includes durability.

---

## 3. RE-SCORING (only criteria the cross affected)

### A1 Print only
No change. 71 (overridden), DISMISSED by sustained FATAL. Reason: concessions confirm the FATAL; no criterion moves.

### A2 Canvas capture to image PDF
No change. 58, REMANDED. Reason: the Plaintiff conceded the Tamil bug is not Khmer evidence, the single-page canvas cap (E26 [A] on E25 [R]) and the employers point, and the Defense conceded Khmer, Blob and 3-page memory are unproven. The concessions cancel out. Both load-bearing facts stay GAPs, so SP, EV and RR hold.
Binding conditions (all owner):
1. Khmer stress string through html2canvas and dom-to-image, with letter-spacing 0 on Khmer text (E28 [V]), on a real iPhone, Android and desktop, against the DOM. Phase 0 (T1). Fail on iPhone or Android: A2 SP 1, dismissed on SP.
2. Blob save on a real iPhone. Phase 0 (T3). Fallbacks: the octet-stream re-typed blob (E18 comment) and/or B2.
3. Dynamic `import()` on the Export tap, bundle visualizer, lazy chunk under 80 KB gz, 3 pages at scale 2 on the oldest phone, one canvas at a time. Phase 0 (T6), final check Phase 4.

### A7a Amended: A2 + desktop Print button
A7a: RR 4 -> 3, total 54 -> 51, because the Defense conceded the button "adds nothing on mobile", offers no fallback if Khmer is flawed on iPhone or Android, and helps only desktop (cross A7a point 3, cross A7 point 2). The Plaintiff concedes the same (A7a point 3), and concedes it has no evidence that two paths create more bugs (Q2). The preliminary RR 4 and the dissent figure of about 59 both rested on the fallback mattering on the devices that count. That support is conceded away. Reversibility stays good: the Defense binds itself to drop the button if the overlay diverges.
Binding conditions (owner): overlay the print preview on the capture for one 2-page Khmer CV using one shared pageGeometry.js (D1a), and drop the button if they diverge. Phase 3. Keep or drop decided at Phase 0 exit from T1.
Result: A7a is now 7 behind A2 and no longer tied with it. A2 leads. The button is added only if T1 shows a desktop-only Khmer flaw (then it is the fix).
Confidence: medium (was low).
Dissent: if T1 shows a Khmer flaw on desktop only, A7a beats A2.

### A7 Hybrid
A7: no change, 51, but MERGED into A7a. The Defense withdrew A7 (cross A7 point 3); the Plaintiff accepts the merger and withdrew all A7-only charges. The A7b "vector later" clause is a process rule (no vector work unless T1 proves Khmer), not scored. A7 is not a separate contender. Its number equals A7a's by construction.

### A3 @react-pdf/renderer and A4 pdfmake or pdf-lib + fontkit
A3: no change, 48. A4: no change, 48. Reason: both sides conceded everything the preliminary ruling already scored (no Khmer run, bundle unmeasured, full template rewrite, preview becomes a second renderer, UAX #14 gives no dictionary Khmer breaks). The Plaintiff withdrew "no Khmer shaper" and "no known shaping step"; those had been struck, so nothing is added.
New binding conditions (owner, Phase 0, T2): run the shared spike with an `Intl.Segmenter('km')` zero-width-space pre-pass for line breaks (E29 [R], quality GAP, so not free); `npm ls` on React 19; read issues #2319 and #332; count the v1 template components (more than a couple means FO fails in practice).
Triggers: clean stacks and acceptable breaks: SP 4, EV 3, about 61 (up). Broken stacks: both dismissed together.

### A5, A6
No change (not cross-examined). A5 35 DISMISSED; A6 31 DISMISSED (FATAL, constraint 11).

### B1 Blob + download, IndexedDB + persist(), A2HS, last saved, backup nudge
No change. 65, APPROVED WITH CONDITIONS. Reason: the Plaintiff conceded the storage half rests on E20 and E21 [V] and that the viewer-share claim has no exhibit. The Defense conceded no run, persist() unknown, IndexedDB buys capacity and not safety (E20 deletes both), and "last saved" cannot detect a wipe. These lower the Defense's claims but not the criteria: SP 3 rests on A2HS guidance and the backup file, which the concessions leave standing. The new point (the backup JSON is itself an iPhone download under E18) is handled as a condition, not a second charge, so E18 is counted once (G-5).
Binding conditions (owner):
1. S4 run (T3): blob + a[download] and the octet-stream blob, plus the JSON backup download, on a real iPhone. Phase 0.
2. S2/T5: idb-keyval prototype, a typical phone photo as base64 in localStorage vs IndexedDB, persist() boolean in a plain tab and from the Home Screen. Phase 0. If the photo fits in localStorage, drop IndexedDB (cost down, CM may rise to 4).
3. Redesign "last saved": show it only for data currently held; show "last backup file" as a date the user can check in Files; on an empty start show "Restore from a backup file"; never claim wipe detection. Phase 1 (storage state), Phase 5 (wording).
4. Backup nudge at most once per 30 days, dismissible. Phase 5.
Confidence: medium.

### B2 Web Share with PDF, download fallback
No change. 62, APPROVED WITH CONDITIONS. Reason: the Defense conceded canShare and Save to Files are unconfirmed and that share is an export, not a download. The Plaintiff conceded the fallback equals B1, so B2's floor is B1, and that activation expiry is [A]. The preliminary ruling already priced all of this (E36 [R]; PC 4 stands).
Binding conditions (owner): two-tap design (a "Create PDF" tap, then a visible "Save to Files" button that calls share() with the ready Blob) and ignore AbortError on cancel: Phase 4. Test canShare({files}), the Save to Files entry, and a 3-second delay on one or two iOS versions (17.6 or later if possible): Phase 0 (T3).
Confidence: low (unchanged; key test not run).

### B3 localStorage only
B3: RR 2 -> 1, total 58 -> 55, because the Defense withdrew its mitigation (weekly users are NOT safe: E20 [V] counts days of Safari use without interaction on the site) and conceded three points: no wipe detection, no backup, and silent QuotaExceededError for a photo. The remaining protections are the absent user base and the Phase 1 stopgap limit, which keep it from scoring lower. Other criteria unchanged. Still REMANDED. FATAL unsustained (section 2).
Binding condition (owner): tolerated only until the storage layer lands. Phase 1. Test a typical phone photo as base64 before relying on it. Phase 0 (T5).

### B4
No change (not cross-examined). 54 REMANDED.

---

## 4. FINAL RANKING

### Docket A: PDF with correct Khmer (one current score each)
| Rank | Option | Score | Verdict | Notes |
|---|---|---|---|---|
| 1 | A2 | 58 | REMANDED | Leads by 7. Not tied. Confidence low (two GAPs). |
| 2 | A7a | 51 | REMANDED | TIED with A3 and A4 (within 5). A7 (51) is merged into it. |
| 3 (tied) | A3 | 48 | REMANDED | TIED with A4 and A7a |
| 3 (tied) | A4 | 48 | REMANDED | TIED with A3 and A7a |
| 5 | A5 | 35 | DISMISSED | |
| 6 | A6 | 31 | DISMISSED (FATAL) | Overridden number |
| excluded | A1 | 71 | DISMISSED (FATAL sustained) | Overridden number, not ranked. Reversible only by the user (section 1). |

Decisive test for the A7a, A3, A4 tie: T1, then T2 if T1 fails on a mobile device. T1 pass on iPhone and Android: A7a/A2 stay ahead and A3/A4 are parked. T1 fail on mobile: A2 falls to about 53 and the A3/A4 spike (T2) decides. T1 fail on desktop only: A7a (add the Print button) becomes the choice.
A3 vs A4: same T2 run. Winner is the one whose stacks and line breaks pass and whose lazy chunk is under 80 KB gz. If both pass, pdfmake first (less layout code), per the Defense.
Recommendation: A2 (with the desktop Print button only if T1 asks for it). A1 only if the user answers "yes" to the one-sentence question.

### Docket B: iPhone save and data loss
| Rank | Option | Score | Verdict | Notes |
|---|---|---|---|---|
| 1 | B1 | 65 | APPROVED WITH CONDITIONS | TIED with B2 (3 points) |
| 2 | B2 | 62 | APPROVED WITH CONDITIONS | TIED with B1 |
| 3 | B3 | 55 | REMANDED (FATAL unsustained) | TIED with B4 (1 point), neither contending |
| 4 | B4 | 54 | REMANDED | |

Decisive test for B1 vs B2: T3. Download lands in Files and share does not: B1 leads (SP 4, 70). Share offers Save to Files and the download fails: B2 leads (SP 4, 67; B1 below 60). Both work: choose the fewer-tap path, tie goes to B1 (simpler). Neither works: the export problem is unsolved for every docket-A option and the user must be told (see T3 fail rule).
B3 vs B4: not contending. B3 is a stopgap until Phase 1. B4 revives only after a five-iPhone-user drop-out test (cannot be run by the owner alone).
Recommendation unchanged in shape: B1 storage and guidance (B1b to B1d, always, with the redesigned "last saved") plus the export path T3 selects.

---

## 5. DOCKETS C, D, E, F, G: preliminary rulings confirmed

The cross touched none of these directly. Two dependencies were checked and left alone.
- D2's break CSS exists only for the A7a Print button. If the button is dropped after T1 or the Phase 3 overlay, D2 is not needed. D recommendation is unchanged.
- C2b depends on A2 standing. A2 still leads, so C2b stays optional.

| Docket | Final choice (unchanged) | Score | Tie / decisive test |
|---|---|---|---|
| C | C1 UA detection + banner (incl. C2a); C2b only if A2 stands and long-press works; C3 not recommended | C1 72, C4 68 | TIED C1/C4. T7 settles it. |
| D | D1 (D1a pageGeometry.js first); D2 break CSS only if the Print button is kept; D3, D4 not recommended | D1 59 | None contending. D1 leads by 6. |
| E | E4 (full file per family) with lazy-loaded Moul (E1b); move to E1a pre-made subsets only if size or LCP fails; E2 not approved | E4 69, E1 64, E3 63 | TIED E4/E1/E3. T8 settles it. |
| F | F1 core, F3 for Chromium throttling and CI, F4 in the Phase 6 beta; F2 only if no iPhone is reachable | F1 71, F3 59, F2 58, F4 58 | F2/F3/F4 TIED, not exclusive. F3 equivalence is checked inside T3. |
| G | G1 plus G3; G2 deferred and only as a G1 attachment if T3 shows catchable errors | G1 73, G3 67, G2 49 | No tie. |

---

## 6. SPIKE PLAN (Phase 0, in order, 8 tests)

Step 0 (no code, 5 minutes): the owner (a) answers the A1 one-sentence question (section 1), and (b) states which phones exist (constraint 9: iPhone and Android, which iOS version). F1's condition depends on (b). Read the cloud device vendor's official trial page only if no iPhone can be borrowed (F2).
Devices: "iPhone" = a real iPhone, iOS 17 or 18, Safari, plus one extra iOS version if a friend's phone is at hand. "Android" = a real mid-range Android, Chrome. "Desktop" = Chrome.
Build one test page with a bilingual stress string (stacked subscripts and vowels, one long unbroken Khmer line, a Latin line) and reuse it in T1, T2, T3 and T8.

| # | What to run | Device | Pass condition | If pass | If fail |
|---|---|---|---|---|---|
| T1 | Render the stress string block through html2canvas and dom-to-image (scale 2, Khmer letter-spacing 0), embed in a PDF, compare to the DOM | iPhone, Android, desktop | Stacks, vowel order and spacing identical to the DOM on all three | A2 SP 2 -> 4, 68 APPROVED WITH CONDITIONS. A7a button optional. A3/A4 parked. | Fail on iPhone or Android: A2 SP 1, about 53, run T2. Fail on desktop only: add the A7a Print button and it wins. |
| T2 | Same string through react-pdf (React 19 `npm ls`), pdfmake and pdf-lib + fontkit with Noto Sans Khmer and the Intl.Segmenter ZWSP pre-pass, then open the PDF in iPhone Files preview. Read issues #2319 and #332. Run only if T1 fails on mobile, or to break the A7a/A3/A4 tie. | Desktop Chrome as reference, iPhone to view | Stacks correct, breaks acceptable, lazy chunk under 80 KB gz | The passing library wins (SP 4, EV 3, about 61); pdfmake first if both pass. A3/A4 move above A7a. | Both dismissed. Reopen A5 only if A2 also failed. |
| T3 | One test page, four buttons: (a) blob + a[download] (application/pdf), (b) the octet-stream re-typed blob, (c) a JSON backup download, (d) canShare then share({files}) tapped at once, after a 3-second delay, and via the two-tap design. Also run (a) once in Playwright WebKit to compare with the iPhone (F3). | iPhone (two iOS versions if possible) | A visible prompt and the file lands in Files in 2 taps or fewer | (a) or (b) passes: B1 leads, 70. (d) passes: B2 leads, 67 (B1 below 60 if (a)/(b) fail). Both pass: fewer taps wins, tie to B1. (c) passing validates the backup nudge. Playwright match raises F3. | Neither (a), (b) nor (d) works: the iPhone export is unsolved for A2 and for B; tell the user. At that point the A1 reversal question gains weight. (c) failing: the backup cure needs a share route. |
| T4 | Tap the existing v1 Print button on iPhone Safari. Count the taps to a file in Files without the pinch. | iPhone | Save to Files in one visible tap | A1 FATAL drops (appeal trigger met). A1 71 leads docket A. | Ruling stands (expected, per E37). |
| T5 | idb-keyval write and read; read navigator.storage.persist() in a plain tab and from the Home Screen; save a typical phone photo as base64 in localStorage and in IndexedDB | iPhone | Photo fits localStorage with no QuotaExceededError, and persist() result is recorded | Photo fits: drop IndexedDB (B1 CM up). persist() true from Home Screen: A2HS guidance gets its evidence. | Photo fails localStorage: B3 stays at RR 1 and IndexedDB stays. persist() false everywhere: the backup file carries the protection alone. |
| T6 | `vite build` with a bundle visualizer for html2canvas plus the PDF writer as a lazy chunk; then a 3-page export at scale 2, one canvas at a time | Oldest iPhone and oldest Android | Lazy chunk under 80 KB gz and no blank page or crash | A2 CM 3 holds. | Over 80 KB: A2 CM 3 -> 2 (55), pick the smaller writer. Crash: lower the scale or drop to 2 pages. |
| T7 | Open the deployed link inside Facebook, Messenger and Telegram, log the UA, run the export (also tap a mailto: link for G1) | One phone per app | Export works in all three | C4 leads (about 73). | Any failure: C1 leads (77). Add C2b only if long-press save works. |
| T8 | Download full Kantumruy Pro and Moul, gzip them, build the Khmer and Latin subsets, shape the stress string with each, and run a throttled-4G LCP on the Android | Android (also desktop for sizes) | Full files give LCP under 2.5 s and the full font shapes the string | E4 leads (about 69 stays). | LCP over 2.5 s: E1 takes over. Subset breaks stacks: E4. CDN (E3) only if the owner accepts the Google request. |

Order and effort: T1 and T3 first (they decide A and B); T4 takes 5 minutes in the T3 session; T6 reuses the T1 page; T2 only if needed; T5, T7, T8 in the same week or at Phase 1 and Phase 4 for T7. A solo part-time owner can run T1, T3, T4, T5 in one sitting with one iPhone and one Android.
Tests not on the list: D1 break-offset comparison (D1 leads by 6, Phase 3), F4 pilot (Phase 6), G3 reply count (Phase 6), and the real E20 seven-day wipe (cannot be run quickly; stays [V] from the exhibit).

---

## 7. LIMITS
- No new evidence was filed. Every change came from concessions and conditions. Real-device behavior is still untested; A2, A3, A4, B2, C1, C4, E1, E3, E4 stay low confidence until T1 to T8 run.
- The A1 FATAL and the B3 FATAL both turn on how the user reads a constraint. The user may overrule either with one sentence.
- Scores are judgments, not measurements.
