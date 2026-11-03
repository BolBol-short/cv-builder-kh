---
type: reference
root: v1/src
---

# File Map

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


Root files: `index.html` (entry, fonts, meta), `vite.config.js` (react + tailwind plugins), `eslint.config.js`, `package.json`, `README.md`. The Vite entry is `/v1/src/main.jsx`. The `dist/` folder is build output and is gitignored.

## `v1/src/`

| File | Role |
|---|---|
| `main.jsx` | React mount, imports `index.css` |
| `App.jsx` | Owns all state, layout, import/sample/reset handlers, `Segmented` toggle |
| `index.css` | Tailwind import, fonts (`--font-sans`, `--font-moul`), Khmer line height, print CSS. See [[Print and PDF]] |

### `components/`

| File | Role |
|---|---|
| `Header.jsx` | Brand, EN/ខ្មែរ switch, "More" menu (import, save, example, clear), Download PDF → `window.print()` |
| `ContentEditor.jsx` | The Content tab. One collapsible card per CV section |
| `DesignPanel.jsx` | Template picker (with `Thumb` schematics), accent presets and custom color, CV language, print tip |
| `Preview.jsx` | A4 shell: scaling, `--accent`, page-break markers |
| `ObjectListField.jsx` | Generic editor for arrays of objects, driven by a `fields` descriptor |
| `StringListField.jsx` | Chips editor for string arrays with suggestion chips |
| `CustomizedInput.jsx` | `CustomizedInput`, `TextArea`, `Select`, `Field`, `Checkbox` |
| `PhotoPicker.jsx` | Upload and canvas-resize to 600 px max edge, JPEG q0.85 |
| `Icon.jsx` | Inline SVG icon set, used by name |

### `templates/`

| File | Role |
|---|---|
| `index.js` | `TEMPLATES` id → component map |
| `templateIds.js` | `TEMPLATE_IDS`, `DEFAULT_TEMPLATE`. Split out so `cvFile.js` can validate without importing React |
| `shared.jsx` | `Page`, `Photo`, `Bullets`, `ContactList`, `Tags`, `Entry`, and the shared section bodies |
| `Classic.jsx`, `Modern.jsx`, `Professional.jsx`, `Minimal.jsx`, `Traditional.jsx` | The layouts. See [[Templates]] |

### `utils/`

| File | Role |
|---|---|
| `cv.js` | List ops, item factories, `completeness`, `makeId` |
| `format.js` | `formatMonth`, `formatDate`, `formatRange`, `toKhmerDigits`, `toBullets`, `personalFacts`, `sectionsWithContent`, `contactItems` |
| `cvFile.js` | Export, import, normalize, draft and UI-language storage. See [[Persistence]] |

### `constants/`, `context/`, `i18n/`

| File | Role |
|---|---|
| `constants/options.js` | Suggestion lists per language, code lists, `ACCENT_PRESETS` |
| `constants/sampleCV.js` | `sampleCV(lang)` example CV |
| `context/cvData.js` | `emptyCV` (despite the folder name, no React context lives here). See [[Data Model]] |
| `i18n/translations.js` | `LANGS`, flat `en`/`km` dictionaries (105 keys each, same keys in both), `makeT`, `isLang`, `optionLabel` |
| `i18n/I18nContext.js` | Context and `useI18n` for the editor UI. See [[i18n and Khmer]] |

Related: [[Architecture]].
