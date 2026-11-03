---
type: collection
---

# Templates

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


All five live in `v1/src/templates/` and share building blocks from `shared.jsx`. Order in the picker follows `TEMPLATE_IDS`.

| id | Layout | Notes |
|---|---|---|
| `classic` | Single column. Photo top-left, name, headline and contact grid, accent rule under the header. Skills and languages sit side by side in two columns | Default. Skills shown as tags |
| `modern` | 260 px accent sidebar plus white main column. Sidebar: round photo, contact, personal facts, skills, languages, hobbies. Main: name, About, experience, education, certifications, references | Summary heading uses `section.about` |
| `professional` | Full-width accent header band (photo, name, headline). Below: main column (summary, experience, education, certifications, references) plus a 250 px tinted side column (contact, personal, skills, languages, hobbies) | Side tint is `--accent` at 6% |
| `minimal` | Centered header with round photo and one-line contact. Each section is a row: 150 px grey label, content on the right | Skills and hobbies print as dot-separated text, not tags |
| `traditional` | Formal Cambodian format. Centered title, 4×6-style photo top-right, colon-aligned personal table, Roman-numbered sections, tabular education | Title is "ប្រវត្តិរូបសង្ខេប" in Khmer (Moul font) or "CURRICULUM VITAE" |

## Contract

```jsx
export function MyTemplate({ cv, t, lang }) {
  return <Page className="..."> ... </Page>;
}
```

- `t` is the **CV-language** translator, not the UI one.
- Color comes from `var(--accent)` (Tailwind: `text-(--accent)`, `bg-(--accent)`). Never hardcode it.
- Wrap everything in `<Page>`. It sets 794 px width, min height 1085 px, and the `cv-page` class that print CSS targets.
- Use `sectionsWithContent(cv)` to skip empty sections. Use `break-inside-avoid` on anything that must not split across pages.
- Everything must be valid printable HTML.

## Shared pieces (`shared.jsx`)

`Page`, `Photo` (renders nothing without a src), `Bullets`, `ContactList`, `Tags`, `Entry`, `ExperienceList`, `EducationList`, `CertificationList`, `LanguageList`, `ReferenceList`.

## Add a template

1. Create `templates/MyTemplate.jsx` following the contract.
2. Add the id to `TEMPLATE_IDS` in `templateIds.js`.
3. Import and register it in `TEMPLATES` in `templates/index.js`.
4. Add a `template.<id>` label to both dictionaries in `i18n/translations.js`.
5. Add a schematic for it in `Thumb` inside `DesignPanel.jsx`.

Step 5 is easy to forget. Without it the picker has no thumbnail body for the new id. See [[Print and PDF]] for layout limits.
