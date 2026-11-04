---
type: collection
updated: 2026-11-04
---

# Templates

Ten templates in `src/features/templates/`, in picker order (`TEMPLATE_IDS` in `storage/schema.js`):

| id | English / Khmer name | Layout |
|---|---|---|
| `traditional` | Traditional / ប្រពៃណី | Formal Cambodian: centered "ប្រវត្តិរូបសង្ខេប" title (Moul font in Khmer), photo top right, colon table, Roman-numbered sections |
| `classic` | Classic / បុរាណ | One column, photo and contacts on top |
| `modern` | Modern / ទំនើប | Colored side column with contact, details, skills, languages |
| `professional` | Professional / វិជ្ជាជីវៈ | Colored top band, main column plus tinted side column |
| `minimal` | Minimal / សាមញ្ញ | Centered header, section titles in a narrow left column |
| `compact` | Compact / បង្រួម | Small text, two columns, made to fit one page |
| `timeline` | Timeline / បន្ទាត់ពេលវេលា | Jobs and schools on a vertical line with dots and dates |
| `elegant` | Elegant / ឆើតឆាយ | Centered serif name, titles between thin lines |
| `centered` | Centered / តម្រឹមកណ្ដាល | Centered header, details row, two equal columns |
| `bold` | Bold / ដិតច្បាស់ | Big colored header, titles on colored labels |

## Rules every template follows

- Signature: `({ cv, settings, t, lang })`. `t` is the CV-language translator.
- Colors: `ink` (with transparency for muted text, at least 65 to 70 percent), `paper`, and the CV's own color through `text-(--cv-accent)` / `bg-(--cv-accent)`. No other colors, no gradients.
- Sizes in `em`, so the text-size setting scales the whole CV.
- Photo through `Photo` from `parts.jsx`: always a circle; respect `settings.showPhoto`.
- Mark anything that must not be cut by a page break with `data-block`, and section titles with `SectionTitle` (it is `data-block="heading"`).
- Skip empty sections with `filledSections(cv)`.

## Add a template

1. Create `Name.jsx` following the rules (copy a similar template).
2. Add it to `TEMPLATES` in `templates.js` and its id to `TEMPLATE_IDS` in `storage/schema.js`.
3. Add `template.<id>` to `locales/en.js` and `locales/km.js`.
4. Add its names to `e2e/templates.spec.js` and run `npm run e2e -- --update-snapshots`.

The picker thumbnail is drawn from the real template automatically.
