---
type: architecture
---

# Architecture

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


## Shape

```
index.html → v1/src/main.jsx → App.jsx
                                 ├─ Header            (UI-lang switch, file menu, Download PDF)
                                 ├─ editor column     (screen only, class no-print)
                                 │    ├─ progress bar (completeness)
                                 │    ├─ tab: ContentEditor | DesignPanel
                                 └─ preview column    (class print-area)
                                      └─ Preview → TEMPLATES[settings.template]
```

## State

All state lives in `App.jsx` as plain `useState`. No context for CV data.

| State | Type | Notes |
|---|---|---|
| `cv` | object | Shape of `emptyCV`. See [[Data Model]] |
| `settings` | `{ accentColor, template, cvLang }` | Design choices, saved with the CV |
| `uiLang` | `"en" \| "km"` | Editor language, stored separately |
| `tab` | `"content" \| "design"` | Editor panel |
| `mobileView` | `"edit" \| "preview"` | Below `lg` only |

`cv` and `settings` are hydrated once from `localStorage` via `loadDraft` (lazy `useState(loadDraft)`), then written back by a 500 ms debounced effect. See [[Persistence]].

## Data flow

1. User edits a field in `ContentEditor`. It calls `setCv` with a functional update.
2. `App` re-renders. `Preview` receives the new `cv` and `settings`.
3. `Preview` picks the template component, builds a `t` for the **CV language**, and renders at true A4 width (794 px), scaled down with CSS `transform` to fit the column.
4. A debounced effect saves the draft.

## Two translation functions

- UI chrome uses `I18nContext` (`useI18n()`), driven by `uiLang`.
- Templates get `t` as a prop, built from `settings.cvLang` in `Preview`. Templates never read the context.

This is what lets the editor be Khmer while the CV is English. See [[i18n and Khmer]].

## Editor building blocks

`ContentEditor` is one collapsible `Section` card per CV section. It builds two handler factories and reuses them:

- `stringHandlers(field, underPersonal)` → `StringListField` (skills, hobbies, links)
- `listHandlers(field, factory, underPersonal)` → `ObjectListField` (experience, education, certifications, languages, references)

`ObjectListField` is driven by a `fields` descriptor array (text, textarea, month, select, checkbox, datalist suggestions). Adding a field to a section is a one-line descriptor change, plus the factory in `utils/cv.js` and the shape in `cvData.js`.

## Template contract

A template is `({ cv, t, lang }) => JSX` wrapped in `<Page>`. It reads the accent color from the CSS variable `--accent` that `Preview` sets. See [[Templates]].

## Pure helpers

- `utils/cv.js`: immutable list ops (`addItem`, `updateItem`, `removeItem`, `moveItem`), string-list ops, item factories, `completeness`.
- `utils/format.js`: month/date formatting (with Khmer digits), `toBullets`, `personalFacts`, `sectionsWithContent`, `contactItems`.
- `utils/cvFile.js`: JSON import/export, normalization, localStorage.

Related: [[File Map]], [[Decisions]].
