---
type: product
status: draft
tags: [rebuild, ux, accessibility]
---

# Product — users, flows, features, UX, accessibility

Part of [[Plan]]. Data in [[CV Spec]], build in [[Technical Design]].

## Users

| Persona | Situation | Needs |
|---|---|---|
| Fresh graduate | First CV, phone only, little work history | Examples, short one-page CV, nothing to fill that they do not have |
| Job changer | Has an old Word or PDF CV | Quick edit, clean result, English version |
| Factory/service worker | Basic phone, may type slowly, may prefer Khmer | Large controls, Khmer first, few steps |
| Helper (relative, shop owner, teacher) | Making CVs for others on a shared PC or phone | Many CVs, a "clear this device" button |

## Main flow (phone)

```
Start → Language & style → Photo & name → Contact & personal → Summary
      → Education → Experience → Skills & languages → References → Review → Download / Share
```

- **Start:** "Make a new CV", "Open saved CV", "Open a file", "Try an example". Pick the CV language (Khmer or English) and a template.
- **Steps:** one topic per screen. Sticky bottom bar: Back, Next, and "Preview". Progress shown as "Step 3 of 9". Any step can be skipped.
- **Each field:** label, one-line tip, example placeholder. Suggestion chips for skills, hobbies, languages.
- **Review:** shows the full A4 preview, a checklist of gaps ("No phone number yet"), and the page count.
- **Download:** PDF as a real file (on iPhone it goes to Files), image (for chat apps), share sheet when available. See export in [[Technical Design]].

## Desktop flow

Same steps, but two panes: editor on the left, live A4 preview on the right, a section list as a side nav so people can jump around. Design panel (template, color, font size, spacing) is a drawer, not a tab.

## Feature list (MoSCoW)

**Must**
- Guided step flow with tips and examples (Khmer and English)
- Mobile-first layout; two-pane desktop layout
- Photo upload with a circle crop; the photo is a circle on every template
- Cambodian formal template plus at least two others, all print-correct in Khmer and English
- Reliable PDF download on Android and iOS
- Autosave that tells the truth (saved, saving, failed)
- Export and import a backup file (a copy you can keep)
- Accessible dialogs and errors (no `alert`/`confirm`)
- Offline use after first load (PWA)
- Privacy statement: "Your CV stays on your device"

**Should**
- Multiple saved CVs on one device
- Accent color, font size, and density controls
- Undo for deletions (toast with Undo)
- Page-count and "too long" warning
- Section show/hide and reorder
- Share to Telegram, Facebook, email via the Web Share API
- "Open in browser" banner inside Facebook/Telegram in-app browsers
- Landing page with examples (SEO in Khmer and English)
- Backup-file reminder and a "Report a problem" link (with no analytics, this is how problems reach you)

**Could**
- Cover letter ("លិខិតស្នើសុំការងារ") builder
- Job-application-form mode that mimics bank/NGO forms
- One-page graduate template
- Print-shop mode (A4 PDF, no colors, high contrast)
- Spell-check hints for English

**Won't (for now)**
- Accounts, cloud sync, AI writing, job matching, payments

## Mobile UX rules

- Touch targets 44 px or larger.
- Input text 16 px or larger so iOS does not zoom on focus.
- Correct `inputmode`, `type`, and `autocomplete` on phone, email, name, and address fields.
- No native `type="month"` (poor iOS and Android consistency). Use a month select plus a year select with Khmer month names.
- Keyboard must not hide the field or the Next button.
- Preview opens as a full-screen sheet with pinch-zoom, not a cramped half panel.
- Reordering uses explicit Up/Down buttons (already in the old app) as well as drag where supported.
- All actions work with one thumb. Primary action sits at the bottom.
- Works with slow input: no heavy re-render per keystroke on low-end phones (debounce preview).

## Accessibility (WCAG 2.2 AA)

| Area | Rule |
|---|---|
| Structure | Landmarks, one `h1`, headings in order, skip link |
| Forms | A visible label on every control, errors linked with `aria-describedby`, required marked in text not color alone |
| Focus | Visible focus ring, logical order, focus moved into dialogs and returned on close |
| Targets | 24 px minimum (2.2 AA); aim for 44 px |
| Color | Contrast 4.5:1 for text, 3:1 for controls. Accent colors in the picker are checked, and the CV warns if text on the accent has low contrast |
| Motion | Respect `prefers-reduced-motion` |
| Zoom | Usable at 200% text size and 320 px width without horizontal scroll |
| Language | `lang` on the page and on mixed-language spans (`km`, `en`) |
| Status | `aria-live` for save status and export progress |
| Dialogs | Real dialog elements/components, Escape closes, no `alert`/`confirm` |
| Testing | axe in CI, manual keyboard pass, TalkBack and VoiceOver pass each release (Khmer voice support may be limited; note it in docs) |

Accessibility of the exported file: a text PDF is far better than an image PDF for screen readers and recruiter software. This is why the PDF choice in [[Technical Design]] matters.

## Copy and tone

Short sentences, everyday words, no jargon like "ATS". Khmer copy starts from the old app's strings, accepted as written (D10 in [[Plan]]); beta users can flag wording. Errors say what happened and what to do.

## Privacy and safety

- All CV data stays in the browser. Say so on the start screen.
- "Clear everything on this device" button for shared computers.
- No analytics and no tracking (decision D8).
- Show a notice before export from a shared device if the CV contains a phone number and address.
