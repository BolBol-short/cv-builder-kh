---
type: reference
updated: 2026-11-04
---

# i18n and Khmer

## Two languages

| Setting | Stored in | Drives |
|---|---|---|
| App language | `localStorage` key `cv-builder:ui-lang` | Menus, buttons, tips (`useI18n()`) |
| CV language (`settings.cvLang`) | Inside the CV | Headings on the CV, month names, digits, suggestion lists, field examples |

Both start as Khmer when the phone's language starts with `km`, otherwise English.

## Text files

`src/locales/en.js` and `km.js`, flat keys like `step.photo`, `field.phone`, `guide.phone.tip`. A test fails if the two files do not have exactly the same keys, or if a text is empty.

`makeT(lang)` returns `t(key, values)`: fills `{name}` placeholders; a missing Khmer key falls back to English, then to the key. `optionLabel(t, group, code)` translates stored codes and leaves typed text as it is.

## Khmer details

- Fonts: Inter (Latin) with Kantumruy Pro (Khmer) as fallback per letter; Moul for the Traditional title.
- `:lang(km)`: line height 1.7 and **no letter spacing** (spacing breaks Khmer letter clusters, on screen and in the PDF).
- Dates in a Khmer CV use Khmer month names and Khmer digits (`shared/format/dates.js`).
- Khmer text was written by the builder and accepted by the owner (decision D10); beta users can flag wording.
