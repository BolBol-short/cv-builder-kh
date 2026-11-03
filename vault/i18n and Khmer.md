---
type: reference
---

# i18n and Khmer

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


## Two languages, two settings

| Setting | Stored in | Drives |
|---|---|---|
| UI language (`uiLang`) | `localStorage` key `cv-builder-ui-lang`, per browser | Editor labels, buttons, messages (via `I18nContext`) |
| CV language (`settings.cvLang`) | Inside the CV file and draft | Section headings in the CV, month names, digits, suggestion lists, sample CV |

Both default to Khmer if `navigator.language` starts with `km`, otherwise English.

## Dictionary

`i18n/translations.js`: flat objects keyed by dotted ids (`action.pdf`, `field.name`, `section.experience`, `level.fluent`). English is the source of truth.

`makeT(lang)` returns `t(key, fallback)` with this lookup order: chosen language → English → `fallback` → the key itself. A missing Khmer string therefore shows English, not a blank.

`optionLabel(t, group, value)` translates a stored code (`female`, `fluent`) and passes unknown free text through unchanged.

## Why suggestion lists depend on `cvLang`

Clicking a suggestion chip puts the string **into the CV text**. So skills, hobbies, languages, and nationality come from `options.js` keyed by the CV language, not the UI language.

## Khmer specifics

- Fonts: Inter for Latin and Kantumruy Pro for Khmer (the browser picks per glyph). Moul is the formal display face used by the Traditional title. See `index.css`.
- `:lang(km) { line-height: 1.7 }` because Khmer stacks vowels and subscripts vertically. `Preview` sets `lang` on the page node, so it applies only to a Khmer CV.
- `formatMonth` and `formatDate` use Khmer month names and `toKhmerDigits` when `lang === "km"`.
- `document.documentElement.lang` follows the UI language.

## Add a language

1. Add an entry to `LANGS`.
2. Add a dictionary under `translations`.
3. Add keys to each list in `options.js` (`SKILL_OPTIONS`, `HOBBY_OPTIONS`, `LANGUAGE_OPTIONS`, `NATIONALITY_OPTIONS`) and to `MONTHS` in `format.js`.
4. Check fonts and line height for the script.

Related: [[Architecture]], [[Templates]].
