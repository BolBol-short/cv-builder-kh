---
type: reference
source: src/features/storage/schema.js
updated: 2026-11-04
---

# Data Model

One saved CV is a **document**:

```
document
├─ schemaVersion   1
├─ id, createdAt, updatedAt
├─ settings
│   ├─ cvLang       en | km           (language printed on the CV)
│   ├─ template     traditional | classic | modern | professional | minimal | compact | timeline | elegant | centered | bold
│   ├─ accentColor  "#rrggbb"         (the CV's own color)
│   ├─ fontSize     small | normal | large
│   └─ showPhoto    true | false
└─ cv
    ├─ personal     nameKm, nameLatin, headline, gender*, dateOfBirth, placeOfBirth,
    │               nationality, maritalStatus*, phone, email, address, salaryExpectation
    ├─ photo        square JPEG (400 px) as a data URL, shown as a circle; or ""
    ├─ summary
    ├─ experience   { id, jobTitle, company, location, startDate, endDate, current, description }[]
    ├─ education    { id, institution, degree, gpa, location, startDate, endDate, current }[]
    ├─ certifications { id, name, issuer, date }[]
    ├─ languages    { id, language, level* }[]
    ├─ references   { id, name, position, organization, contact }[]
    └─ skills, hobbies, links   string[]
```

`*` stored as a code (`female`, `married`, `fluent`) and translated when shown; free text still works.

- Months are `YYYY-MM` (or just `YYYY`), date of birth is `YYYY-MM-DD`. `current: true` shows "Present".
- `description` is one bullet per line.
- `normalizeDocument()` repairs anything read back: missing fields get empty values, wrong types are reset, unknown fields are dropped, text is cut at 5,000 characters, lists at 50 items, the photo must be a `data:image/` URL. Tested in `storage.test.js`.
- Rule: fields are only added. A later format change bumps `schemaVersion` and adds a repair step.
- Backup file = the document plus `app: "cv-builder"`, as JSON. Opening one gives it a new id.

See [[Persistence]].
