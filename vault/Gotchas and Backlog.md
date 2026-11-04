---
type: backlog
updated: 2026-11-04
---

# Gotchas and Backlog

## Open

1. **Real phones not tested.** PDF to Files on iPhone, Khmer in the PDF on phones, Facebook/Telegram behavior and Android are unverified. See [[Spike Results]].
2. **Editor load time** is 2.5 s on a simulated slow phone, right at the target.
3. **Elegant template** uses the phone's own serif font for English letters, so it can look slightly different on Android.
4. **Domain** is `cv-builder-ebon-xi.vercel.app` (set 2026-11-04). If it changes, update `index.html`, `public/robots.txt` and `public/sitemap.xml`.
5. **PDF text is not selectable** (picture pages). Fine for sending and printing; recruiter software cannot read it.
6. **No browser tests.** The `e2e/` browser tests were removed on 2026-11-04 at the owner's request. Check the PDF download, photo crop, offline mode and templates by hand after big changes.
7. **Device test page removed.** `spikes/` and `html-to-image` were deleted on 2026-11-04 after the iPhone tests; results stay in [[Spike Results]].
8. **npm audit** warnings come from dev tools (ESLint dependencies), not from the app.

## Ideas (only about making CVs)

- More templates if users ask.
- Section show/hide and reorder (not built; wait for beta feedback).

Out of scope: cover letters, application forms, other documents, accounts, analytics (see [[Decisions]]).
