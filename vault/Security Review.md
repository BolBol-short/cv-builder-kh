---
type: report
date: 2026-11-05
scope: CV-Builder static site (https://cv-builder-ebon-xi.vercel.app/), local production build, source code and git history
updated: 2026-11-05
---

# Security Review

Authorized test by the project owner. Non-destructive checks only. CV-Builder has no server, no accounts, no database and no analytics, so the attack surface is the static files, the HTTP headers, the browser code and what a user can feed it (typed text, photos, backup files).

**Overall risk: Low.** No critical or high issue reaches users. Six small issues were fixed during the test; five low or informational items are accepted.

## Fixed during the test

| # | Finding | Severity | Fix |
|---|---|---|---|
| 1 | Build tools had known advisories (Vite dev server, PostCSS, nanoid, source-map-js). They run only on the developer's computer, not in users' browsers | Medium (developer machine only) | `npm audit fix` (Vite 8.3.5). `npm audit --omit=dev` now reports 0 |
| 2 | `/.vite/manifest.json` was publicly served (list of build file names) | Low | The manifest is now made only by `npm run check` (`vite build --manifest`), not by the normal build |
| 3 | A backup file could set the photo to an SVG data URL. Shown in `<img>` it cannot run code, but it is unnecessary | Low | Photos must be `data:image/jpeg`, `png` or `webp` (`schema.js`, tested) |
| 4 | No `X-Frame-Options` header (older browsers ignore CSP `frame-ancestors`) | Low | `X-Frame-Options: DENY` added in `vercel.json` |
| 5 | A very large "backup" file was read fully into memory before being refused | Low | File size checked before reading (`StartScreen.jsx`) |
| 6 | `/spikes/` test page still live | Info | Deleted in code; gone after the next push and deploy |

## Accepted

| # | Finding | Severity | Reason |
|---|---|---|---|
| 7 | Advisories in development-only tools (ESLint, the offline-plugin build chain: minimatch, glob, ejs) | Low | Build time only; the only offered "fix" downgrades the plugin. Re-run `npm audit` when new versions come out |
| 8 | CSP allows inline styles (`style-src 'unsafe-inline'`) | Low | Needed for the CV's own color and page scaling. Scripts stay locked to the site's own files (`script-src 'self'`) |
| 9 | `Access-Control-Allow-Origin: *` on static files (added by Vercel) | Info | Public files, no cookies or credentials |
| 10 | CVs are stored unencrypted in the browser (IndexedDB) | Info | By design: data stays on the device. "Clear everything" and the privacy page cover shared devices |
| 11 | The git author email is visible in public commit history | Info | Normal for git. Use GitHub's noreply email in `git config user.email` to hide it in future commits |

## Tests that passed

- **Headers (live):** Content-Security-Policy (`script-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`), HSTS with preload, `nosniff`, Referrer-Policy, Permissions-Policy.
- **Transport:** HTTP redirects to HTTPS (308); TLS 1.1 is refused; TLS 1.2+ works.
- **Exposed files:** `.git`, `.env`, `package.json`, `vault/`, `src/`, `README.md`, `vercel.json`, `/admin`, `/api` all return 404. No source maps are shipped.
- **Secrets:** no API keys, tokens, private keys or passwords in the files or in the full git history; no personal email in the code.
- **Code:** no `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, `document.write` or inline scripts. User text is rendered as text by React. Links built from data are in-page `#` links or a fixed GitHub URL with escaped values; new-tab links use `rel="noopener noreferrer"`.
- **Malicious backup file** (imported into the real app in Chromium): script tags, `onerror`/`onload` handlers, `javascript:` links, CSS injection in the color, `__proto__` prototype pollution, an SVG photo, wrong types and a 100,000-character text. Result: no script ran, no pollution, the color fell back to the default, the SVG photo was dropped, `javascript:` text stayed plain text, no CSP violations, and the PDF still worked.
- **Invalid files:** non-JSON and over-5 MB files are refused with a clear message.

## Not tested

Vercel's own platform, denial-of-service or load, phone operating systems, and the security of users' devices.

## How to repeat

```
npm audit --omit=dev
npm run check
curl -sI https://cv-builder-ebon-xi.vercel.app/
```

Related: [[Decisions]], [[Persistence]], [[Data Model]].
