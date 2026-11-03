# DEFENSE BRIEF, ALL DOCKETS (A to G)

Discovery filed: 3 of 5 searches. Findings tagged [R] by site. Net result: none verified Khmer shaping in any JS PDF library, or Save-to-Files behavior on iOS. I do not claim otherwise.
- Search 1 (developer.mozilla.org, Navigator.share): feature-detect canShare then share; reports of canShare failing for files on iOS 14 are old. [R]
- Search 2 (html2canvas Khmer): no html2canvas-specific Khmer source found. [R] Canvas engines can lose GPOS positioning (Figma forum, Thai, not html2canvas).
- Search 3 (pub.dev khmer_pdf_fixer): the shape-elsewhere, embed-as-image workaround is the published fix for PDF libraries lacking Khmer shaping. [R]

---

## A1 Print only (window.print)
**As defended:** keep v1 print on all devices, because the browser's own text engine is the only renderer already shown to produce correct Khmer.
1. Browser layout shapes Khmer natively; no library adds a shaping risk. [A] Context: E28 describes browser Khmer behavior (dictionary line breaking, some quirks) as the baseline everyone sees.
2. Zero new code, zero new bytes, within the owner's skills (constraint 8). [V] v1 exists (case file §2.10).
3. Fully reversible; every other option can be layered on top (A7a keeps Print on desktop). [A]
4. Desktop "Save as PDF" in the print dialog is a normal file save. [A]

**Concessions:** Constraint 7 (iPhone saves a file "like a download") is stated by the user as unmet by iPhone print; E17 GAP means it is unverified but I do not contest the user's premise. Produces no Blob, so B2 is moot. Page splitting depends on browser print flow (D2 only). I expect SP to score low on iPhone.

## A2 Canvas capture into PDF (image PDF, Blob download)
**As defended:** capture each fixed A4 page node (scale 2, under the iOS canvas cap) with html2canvas (or dom-to-image), place the image on a PDF page with jsPDF or pdf-lib, and download the Blob.
1. Browser shapes the Khmer first; the PDF only embeds pixels. Shape-then-embed-as-image is the published workaround where PDF libraries cannot shape Khmer. [R] E7 (khmer_pdf_fixer, dompdf #2900); search 3, pub.dev.
2. Scale 2 is about 3.6M pixels per page, under iOS's 16.8M cap. [R] E25 with [A] E26 arithmetic.
3. Produces a real Blob/File, the only prerequisite for B2 and a normal download path. [V] E16 (canShare takes files).
4. Same capture code serves C2b image export (cheap reuse). [A]
5. Templates stay in React/Tailwind; no rewrite, no new language. [V] constraint 1, v1 stack.

**Concessions:** No Khmer-specific html2canvas evidence exists (E8: one unrelated issue; search 2 found none), so correct Khmer under html2canvas is unproven; html2canvas redraws text itself and may lose shaping or break with letter-spacing [A]. Text in the PDF is not selectable or searchable; files are larger and softer. E27 GAP on low-end memory. A decisive spike (Khmer string on one iPhone and one Android) is required before shipping.

## A3 Vector PDF with @react-pdf/renderer + embedded Khmer font
**As defended:** rewrite templates in react-pdf primitives, embed Noto Sans Khmer, and render client-side to a Blob.
1. Stays JavaScript and React; the primitives are JSX. [A]
2. Vector, selectable text, small files if shaping works. [A]
3. Khmer fonts can be registered by range in react-pdf; a user snippet does exactly that. [V] E4 (issue #933: Khmer-to-Noto Sans Khmer mapping, closed).
4. The decisive test is cheap: one Khmer string compared to the browser. [A] §10 of case file.

**Concessions:** E5 GAP: no source shows correct Khmer in react-pdf. E4 does not discuss shaping. E3: fontkit's README names no Khmer shaper. react-pdf's bundle size is unmeasured on this record; I expect it to exceed the 80 KB lazy budget [A]. All templates must be rewritten, and a second layout engine replaces the CSS the owner knows. A real risk of stacked vowels and subscripts rendering wrong (E7 shows other engines failed this way). EV is at most 2.

## A4 Vector PDF with pdfmake or pdf-lib + fontkit
**As defended:** describe templates as document definitions (pdfmake) or draw with pdf-lib plus fontkit, with an embedded Khmer font.
1. Libraries are pure JS; no backend, within constraint 2. [A]
2. pdfmake has had five Khmer issues, all closed, and the maintainer answered the line-breaking one. [V] E1, E2 (titles only for #2319, #332).
3. Line breaking uses UAX #14, so a basic Khmer break path exists. [V] E1 (it says nothing on shaping).
4. pdf-lib with fontkit is smaller than react-pdf. [A]

**Concessions:** E5 GAP: no source shows correct Khmer shaping through pdfmake or pdf-lib+fontkit. E3: fontkit names no Khmer shaper. E1 confirms line breaking only, not glyph shaping. UAX #14 is not dictionary-based Khmer word breaking (E28), so lines can break awkwardly. Bundle size unmeasured. Templates move to a new definition format. Same shared unknown as A3, one test serves both.

## A5 HarfBuzz WASM shaping + draw glyphs with pdf-lib
**As defended:** shape with a real HarfBuzz build, then place the positioned glyphs into a vector PDF.
1. HarfBuzz is the reference shaper for Khmer (also underlies rustybuzz); this avoids the fontkit gap. [R] E14 docs.rs (rustybuzz is a Rust port of HarfBuzz shaping).
2. Vector output with selectable text is possible; sidesteps the E3 gap. [A]
3. harfbuzzjs exists as an npm package. [R] E13.

**Concessions:** E14 GAP: no source shows harfbuzzjs shaping Khmer in a browser, and no current wasm size. E13 gives about 164 to 214 KB zipped in 2019, above the 80 KB lazy budget if still true. I would have to hand-build glyph placement, cluster mapping, line breaking (E28 dictionary needed), and the text-extraction ToUnicode map (E12 shows extraction can go wrong). That is far beyond a solo learner's current skills (constraint 8). I do not expect this to pass FO or CM. Defended only as the long-term spike for the formal template.

## A6 Typst compiled to WASM (typst.ts)
**As defended:** compile Typst templates in the browser with Khmer fonts.
1. A forum post reports Typst renders Khmer visually correct. [R] E12 (snippet; also says extracted text is wrong).
2. Typst uses a HarfBuzz-derived shaper (rustybuzz), so shaping is plausible. [R] E14 docs.rs; no Khmer source verified.

**Concessions:** E9 [V]: web compiler is 7.62 MB gzip, about 97 times the 80 KB lazy budget, a binding constraint. Templates move out of JS and React (constraints 1 and 8). E10: minimal bundle fetches fonts from GitHub at runtime. E12: copy, search and extraction yield wrong Unicode. I do not contest summary judgment. I rest nothing further on this option.

## A7 Hybrid: A2 first, A1 as desktop Print, vector later if a spike proves it
**As defended:** see A7a, which I file as the cleaner statement. As drafted, A7 bundles a solution and a process condition.
1. Same Khmer logic as A2: the browser shapes, the PDF embeds pixels. [R] E7, search 3.
2. Keeps A1 as an extra desktop button, so a user with a broken image PDF has a fallback with correct text. [A]
3. Defers vector work until a measurement exists, which is how the record's GAPs (E5, E14) should be handled. [V] case file §10.

**Concessions:** All A2 concessions apply. I claim no merit from A2's evidence a second time: A7's added value is only the desktop Print button and the spike gate (double-counting flagged by the Registrar).

## A7a Amended: A2 now + desktop Print button (no vector promise)
**As defended:** ship A2 on every device; show a "Print" button on desktop only; make no commitment to vector PDF. A7b (spike-gated vector path) is a process condition and is not defended as a solution.
1. A2 provides the Blob needed on iPhone; desktop Print gives selectable text where a printer dialog exists. [A]
2. The desktop button costs one handler (window.print), already in v1. [V] case file §2.10.
3. Fallback if the image PDF has any Khmer flaw found by the spike: switch the desktop users to Print immediately without code rewrites. [A]

**Concessions:** Inherits every A2 concession (no Khmer proof for html2canvas, image-only PDF, E27 GAP). Mobile users get no vector fallback. Print needs D2-style flow, so the desktop Print layout must match the A2 layout (page-splitting work in docket D).

---

## B1 Blob + a[download], IndexedDB + persist(), A2HS guidance, last-saved, backup nudge
**As defended:** the full bundle; severed pieces B1a to B1d are separable and the guidance and storage pieces earn their keep independent of the export path.
1. Safari can wipe script-writable storage (IndexedDB, localStorage) after 7 days without interaction, and Home Screen apps have their own counter, so Home Screen guidance and a backup nudge address a real loss path. [V] E20.
2. persist() is granted on heuristics that favor Home Screen apps, and quota is far larger for them. [V] E21; E22 (browser may refuse).
3. "Last saved" and a backup file protect data even when persist() is denied. [A]
4. All client-side, no backend, no analytics. [V] constraints 2, 3, 5.

**Concessions:** E18 [V]: blob PDF downloads reportedly open in the tab instead of downloading on iOS Safari, status NEW; E19 shows a workaround may be needed. E17 GAP: no verification that a[download] reaches Files, so the iPhone-save path is unproven. Whether persist() is granted in a plain Safari tab is a GAP. IndexedDB adds API complexity for a learner (use a tiny wrapper or idb-keyval [A]). Constraint 7 is unmet if E18 bites.

## B2 Web Share API with PDF file as primary iOS path (download fallback)
**As defended:** on iOS call navigator.share({files:[pdf]}) after canShare; fall back to a download link; same storage as B1.
1. Share is invoked from a user gesture, as required, and canShare/share are supported in Safari 14 / 12.1. [R] E15; [V] E16 says feature-detect and fall back.
2. Share sheet is a native route that does not rely on the blob-in-tab path, which E18 reports as broken. [A] (inference; E18 does not test share).
3. The fallback keeps desktop and Android working. [V] E16.
4. Native "Save to Files" is listed in the iOS share sheet for files generally. [A]

**Concessions:** E17 GAP: nothing verifies that canShare returns true for a PDF on iOS or that "Save to Files" appears. Search 1 found only old iOS 14 reports of canShare failing for files [R]. Share is "export", not an exact "download" (the user must tap Save to Files). Depends on a Blob from A2 to A6 (moot under A1). Decisive test: one real iPhone.

## B3 localStorage only (v1), no guidance, no nudge
**As defended:** the status quo with zero change.
1. Zero new code; the simplest thing; fits a solo learner. [A]
2. CV is small text; localStorage reads and writes are synchronous and trivial. [A]
3. Data loss exists only in Safari tab use after 7 days without interaction; users who return weekly are unaffected. [V] E20 (limits; interaction resets it).

**Concessions:** E20 [V] shows the exact data-loss risk the docket exists to prevent: a CV could vanish after a week. Photos as base64 may exceed the localStorage quota (E21 gives quota for origin storage generally; localStorage's limit is not in the record). No backup, no warning. v1 has no users, so there is no evidence of actual loss (no data, not safe). I expect RR to score low.

## B4 Require Home Screen install before the editor opens on iOS
**As defended:** gate the editor on iOS until the app is installed to the Home Screen.
1. Home Screen apps get their own use counter and persist() heuristics favor them, so storage is most durable there. [V] E20, E21.
2. Forces the best-case storage path for every iOS user, removing the long tail of tab-based data loss. [A]

**Concessions:** Blocks first use: users must follow instructions before seeing the product, a heavy conversion cost [A]. It also blocks iPhone users inside Facebook/Telegram viewers (Docket C; E24 GAP on their behavior). Install steps are manual on iOS, no install prompt API [A]. It does not fix E18 or E17. A soft prompt (B1c) captures most of the benefit. I do not expect B4 to beat B1.

---

## C1 UA detection + "Open in your browser" banner with steps (still allow trying)
**As defended:** detect FBAN/FBAV and Telegram, show a dismissible banner with steps and a copy-link button. (Joinder candidate with C2a.)
1. Client-only, tiny (a regex and a component), no backend, no analytics. [A]
2. Never blocks the user, so a false positive costs a dismissal. [A]
3. E23: users report PDFs failing in Messenger's in-app viewer; steering to an external browser is the workaround users themselves report. [R] E23 (concerns received files, not web-app downloads).
4. A banner is easily reversible and A/B-free to remove. [A]

**Concessions:** E24 GAP: no primary source on in-app browser limits or UA strings; the problem's size is unverified. E23 is about received files, not downloads from a web app. UA sniffing can drift when Meta changes strings [A]. Telegram may not set a distinctive UA [A]. Decisive test: open the deployed link inside Facebook and Telegram on one phone.

## C2 Detect + copy-link + steps, plus image export fallback in the viewer
**As defended:** C1 plus an image export (long-press to save) for users who stay in the viewer.
1. Image export gives a file path when PDF download fails in the viewer. [A]
2. Reuses the A2 rendering code, which already produces the canvas. [A] (overlap flagged by Registrar)
3. Long-press save on images is a well-known gesture in mobile browsers. [A]
4. Canvas size at scale 2 is under the iOS cap. [R] E25; [A] E26.

**Concessions:** Without A2 the image export has no code to reuse. C2a is C1 (join); the added merit is only C2b. E24 GAP: nothing shows long-press works in these viewers. E27 GAP on low-end memory. Image is not a PDF (the user's goal is a PDF). I defend C2b only as an optional extra after A2.

## C3 Forced redirect out of the viewer (intent:// on Android, schemes on iOS)
**As defended:** auto-open the page in the default browser on Android via an intent:// URL, with an iOS equivalent where one exists.
1. On Android, an intent:// link can hand the page to Chrome. [A] No source in the record.
2. Removes the in-app problem without user effort. [A]

**Concessions:** E24 GAP: no source for intent:// behavior. I know of no reliable iOS scheme to leave the Facebook viewer [A]. Forced redirects can loop, fail silently or look like phishing to link scanners [A]. Violates the "still allow trying" principle in C1. I defend only an Android-only amended form (C3a) and expect it to rank below C1.

## C4 Do nothing; mention in Help page
**As defended:** no detection; one Help paragraph.
1. Zero code and zero maintenance. [A]
2. The scale of the problem is unverified: E24 GAP and E23 concern received files, not web-app downloads. [R] E23 / GAP E24
3. v1 has no users, so no observed failure (case file §2.10). [V]
4. Revisit using G1 reports if any appear. [A]

**Concessions:** Cambodian users commonly open links from Facebook and Telegram [A], so the in-app path is likely common. A Help page is read only after failure. C1 costs very little more. I defend C4 as the cheapest baseline, not as the best option.

---

## D1 data-block marks; measure; compute break offsets; fixed A4 per page; shared pageGeometry.js
**As defended:** mark blocks (data-block), measure heights in the DOM after fonts load, compute break offsets, render each page in a fixed A4 container. D1a (shared geometry) is separable.
1. The PDF path (A2 to A7a) needs the app to choose breaks, as the intake states. [A] intake quoted in case file §6.
2. Measuring in the same browser that renders Khmer keeps preview, break and capture consistent, despite the browser's dictionary line breaking. [V] E28 (browser behavior); [A] inference.
3. One pageGeometry.js removes duplicated constants across template, preview and export. [A]
4. Plain JS, no library; within the owner's skills. [A]

**Concessions:** Measuring must wait for fonts (document.fonts.ready), or offsets will be wrong with E1/E3 swap fonts [A]. Needs per-template tuning; blocks taller than a page need a fallback. Moderate complexity for a learner. Khmer line-break differences across browsers (E28) can shift heights between devices. Only a test across devices proves stability.

## D2 CSS break rules and browser print flow only (v1)
**As defended:** break-inside: avoid and print CSS, nothing more.
1. Smallest code: CSS only. [A]
2. Works for desktop print through A1 or A7a's Print button. [V] case file §2.10 (v1).
3. Browser handles Khmer line breaking itself. [V] E28.

**Concessions:** Works only with A1 (print flow); a generated PDF (A2 to A7) needs D1, D3 or D4. CSS break support in mobile browsers is uneven [A]. No preview that matches the PDF is guaranteed. As the sole page strategy it is incompatible with the iPhone file path; defended only as the desktop-print baseline.

## D3 One-page-only templates that shrink to fit
**As defended:** every template is one A4 page; font and spacing scale down to fit.
1. No page-break logic at all; the simplest to build and test. [A]
2. One-page CVs are a common expectation for young job seekers [A], so fit may be acceptable for many users.
3. Works with canvas capture (one canvas per CV). [A]

**Concessions:** No evidence about Cambodian CV length expectations. Experienced users with long histories hit shrink limits and tiny text, hurting readability and WCAG-style legibility (target is WCAG 2.2 AA for the app, not the PDF) [A]. Photo and sections cannot overflow. Not a general solution; defended as a fast first version.

## D4 Fixed two-page layouts; user chooses sections for page 1
**As defended:** every template has two fixed pages; the user assigns sections.
1. No measurement code: layout is deterministic and testable. [A]
2. Predictable output across devices; Khmer line-breaking differences cannot shift the page boundary. [A]
3. Works with A2 (two fixed canvases). [A]

**Concessions:** Pushes layout work onto the user (a bad fit for a mobile-first, low-effort tool) [A]. Short CVs have an empty page 2; long sections can still overflow a page without a fallback. No evidence users want this. Likely inferior to D1 for UX but cheaper to build.

---

## E1 Self-host subset WOFF2 (Latin and Khmer separate), unicode-range, swap, lazy-load Moul
**As defended:** two subset files per family with unicode-range, font-display: swap, and Moul only for the formal Khmer template. E1a and E1b are separable.
1. Kantumruy Pro and Moul are OFL-1.1, so self-hosting and embedding are permitted. [V] E30.
2. Google Fonts lists a Khmer subset for Kantumruy Pro, which shows the split is normal practice. [R] E30 (snippet).
3. Self-hosting removes the third-party request and gives bytes for a later A3 to A5 embed. [A]
4. unicode-range means Latin-only visitors skip the Khmer file. [A]

**Concessions:** E31 GAP: no file sizes found, so the font budget cannot be checked. Subsetting might damage Khmer OpenType tables [A]; the safest route is to use a pre-made Google/Fontsource Khmer subset rather than cutting our own. Moul is display weight 400 only. More build setup than E3/E4 for a learner. Needs a size measurement before approval.

## E2 System fonts only
**As defended:** rely on the device's Khmer font (Noto Sans Khmer on Android, system Khmer on iOS).
1. Zero font bytes and zero loading delay: best LCP. [A]
2. Under A1 and A2 the PDF captures whatever the browser renders, so embedding is not needed. [A] reasoning; E26 arithmetic does not depend on fonts.
3. Native fonts are tuned to the platform's Khmer shaping. [A]

**Concessions:** The PDF would differ per phone: fails the stated need for the same font on every device. System fonts cannot be embedded for A3 to A5. Moul and display fonts are lost, narrowing template choice. Older Android versions may lack a Khmer font [A]. Fails SP rather than a binding constraint; I expect a middling-to-low total.

## E3 Keep Google Fonts CDN as in v1
**As defended:** keep the existing link.
1. Already works in v1; zero change. [V] case file §2.10.
2. Google serves the Khmer subset and unicode-range automatically. [R] E30.
3. No constraint explicitly forbids a CDN. [V] case file §7c.

**Concessions:** Each visitor's IP and request go to Google, straining the privacy spirit of constraint 5 (data stays on device; CV data does not leave, but visit metadata does). No font bytes for A3 to A5 embedding. Needs internet; offline use and PDF consistency are not guaranteed. A render-blocking CSS request on 4G can hurt LCP [A]. The canvas capture must wait for the font to load. I expect PC and RR to be the weak scores.

## E4 Self-host one full font file per family, no subsetting
**As defended:** drop the full WOFF2 files into public/ and reference them.
1. No tooling, no subsetting risk to Khmer OpenType tables; the simplest self-host. [A]
2. Variable Kantumruy Pro (weights 100 to 700) is a single file. [V] E30.
3. OFL-1.1 permits it. [V] E30.

**Concessions:** E31 GAP: sizes unknown, so budget compliance is unproven. Without unicode-range, Latin visitors download the Khmer glyphs too and vice versa. Moul loads for all users unless lazy. Likely heavier than E1 on low-end 4G [A]. Defended as the fallback if subsetting proves risky.

---

## F1 Borrow or buy a cheap Android; owner's or friends' iPhone; manual checklist per release
**As defended:** real devices plus a short release checklist (F1a Android, F1b iPhone, F1c checklist).
1. The open questions are device behaviors: blob download on iOS Safari (E18 is a live WebKit bug), share, storage (E20, E21). Only a real device settles them. [V] E18, E20, E21.
2. E17 GAP and E24 GAP are both closed by a one-phone test. [V] case file §10.
3. Checklist (F1c) is free and combines with F2/F4. [A]

**Concessions:** Owner's device list is UNKNOWN (constraint 9); an Android phone has a cost, and iPhone access depends on friends. Manual testing is slow and runs only when remembered. A single Android model does not cover the range. Cost is real for a hobbyist.

## F2 Cloud real-device service (BrowserStack, LambdaTest) on free tier or trial
**As defended:** use a real-device cloud for spot checks on iPhone and Android.
1. No hardware purchase; a real iOS Safari is reachable. [R] E34 (aggregators).
2. Fits a one-time spike for E17 and E18. [A]

**Concessions:** E34 [R] aggregators disagree on free minutes; E35 GAP: no vendor page read, so free real-iPhone minutes are unknown. One source reports 1-minute sessions and 5 uses. Downloads to Files, share sheets and storage persistence may not be observable in cloud sessions [A]. Free tier may not cover a single spike. Not a recurring plan.

## F3 Emulation only (Playwright WebKit and Chromium, DevTools throttling)
**As defended:** automated browser runs and throttled DevTools for performance.
1. Free, scriptable, repeatable per release. [A]
2. Chromium throttling directly checks the LCP and bundle budgets. [A]
3. Playwright WebKit catches layout regressions. [A]

**Concessions:** E35 GAP: no source on how closely Playwright WebKit reproduces iOS Safari download, share or storage. The decisive unknowns (E17, E18, E20) are iOS behaviors which emulation likely does not reproduce [A]. It cannot show real Khmer fonts on a phone. Defended as a complement for performance, not as the sole method.

## F4 Beta testers as device testers, with a short test script
**As defended:** recruit a handful of users on their own phones, give them a 5-step script.
1. Real devices in the target population, including Khmer system fonts. [A]
2. Zero hardware cost; the script is a short text. [A]
3. Covers device diversity better than one owned phone. [A]

**Concessions:** No evidence yet of available testers; recruiting costs time. Quality of reports varies; no logs. iOS testers may not be found. Results arrive slowly and cannot gate a release. Overlaps G3; no exhibit supports it. Best as a supplement to F1.

---

## G1 "Report a problem" link (GitHub issue form or mailto) with pre-filled browser, version, template
**As defended:** a link that pre-fills non-CV technical context; user reviews before sending.
1. No backend, no analytics: the user initiates the message. [V] constraints 2, 3.
2. Pre-filled UA, app version and template removes the usual "what device?" back-and-forth. [A]
3. mailto needs no account. [A]
4. Never includes CV content, protecting constraint 5. [V] constraint 5 (design rule).

**Concessions:** GitHub issue forms need a GitHub account, unlikely for many Cambodian users [A]; mailto needs a configured mail app on the phone [A]. Only users who hit a problem and care enough will report (silent bounce). No evidence on reporting rates. The prefill must be user-visible to avoid looking like tracking.

## G2 Help screen with a copyable local error log kept on device
**As defended:** log errors to localStorage/IndexedDB; the user can copy them from Help.
1. Data stays on the device, so no privacy conflict. [V] constraint 5.
2. Captures failures the user cannot describe (stack, step) when paired with G1. [A]
3. Small code: an error handler plus a text area. [A]

**Concessions:** Nothing leaves the device unless the user sends it, so alone it teaches the owner nothing. Subject to the same 7-day wipe as other storage (E20). Users must find Help and paste. Real value only as the attachment to G1. Adds code a learner must maintain.

## G3 Beta interviews and follow-up messages only
**As defended:** talk to a small group of beta users; no in-app mechanism.
1. Zero code, zero privacy exposure. [A]
2. Interviews reveal why users bounce, which logs cannot. [A]
3. Fits a solo owner with few users. [A]

**Concessions:** No scale: finds only what people say, misses silent failures. Relies on the owner's time and tester availability (same constraint as F4). No exhibit supports reach or response rate. Cannot capture device or version details. Best as a complement to G1.
