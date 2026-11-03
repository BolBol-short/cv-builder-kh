---
type: reference
source: v1/src/context/cvData.js, v1/src/utils/cvFile.js
---

# Data Model

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


## `emptyCV`

```
cv
├─ personal
│   ├─ photo          base64 JPEG data URL, or ""
│   ├─ name, headline, tel, email, location, pob, nationality
│   ├─ gender         code: female | male | other
│   ├─ maritalStatus  code: single | married | divorced | widowed
│   ├─ dob            YYYY-MM-DD
│   ├─ hobbies        string[]
│   ├─ links          string[]
│   └─ languages      { id, language, level }[]   level: native|fluent|advanced|intermediate|basic, or free text
├─ summary            string
├─ skills             string[]
├─ experience         { id, jobTitle, company, description, location, startDate, endDate, current }[]
├─ education          { id, institution, degree, gpa, location, startDate, endDate, current }[]
├─ certifications     { id, name, issuer, date }[]
└─ references         { id, personName, position, companyName, link }[]
```

- Dates in lists are `YYYY-MM`. `current: true` shows "Present" and disables `endDate`.
- `description` is one bullet per line. `toBullets` strips leading `-`, `•`, `*`.
- `id` comes from `makeId()` (`crypto.randomUUID` with a fallback).
- Codes like `female` are stored, not labels. Labels come from the dictionary, so the same CV renders in either language. Free text still passes through via `optionLabel`.

## `settings`

```
{ accentColor: "#rrggbb", template: "classic|modern|professional|minimal|traditional", cvLang: "en|km" }
```

Defaults: accent `#2563eb`, template `classic`, `cvLang` from `navigator.language` (`km…` → Khmer, else English).

## Save-file contract ("the wrapper")

```json
{ "version": 1, "settings": { ... }, "cv": { ... } }
```

- Same wrapper is used for the JSON export and the localStorage draft.
- `parseCVFile` also accepts a legacy bare CV (no `cv` key).
- `normalizeCV` merges over `emptyCV` and coerces lists with `asArray`. Unknown or missing fields cannot crash the app. Rule: **`emptyCV` only gains fields, never loses or renames them.**
- Old saves stored "Female" / "Married"; `asCode` lowercases them into codes.
- `normalizeSettings` validates the accent against `/^#[0-9a-fA-F]{6}$/`, the template against `TEMPLATE_IDS`, and `cvLang` against `LANGS`.
- Import errors throw `Error(<translation key>)`; the caller translates and alerts.

## Completeness score

`completeness(cv)` = share of 12 checks that are truthy: name, headline, photo, email, tel, location, summary, ≥1 experience, ≥1 education, ≥1 skill, ≥1 language, ≥1 reference. Rough guide, not validation.

See [[Persistence]], [[Architecture]].
