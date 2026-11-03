---
type: spec
status: draft, needs validation with real samples
tags: [rebuild, cambodia, cv]
---

# CV Spec — the Cambodian CV type

Part of [[Plan]]. Fields feed the data model in [[Technical Design]]; layouts feed [[Templates]].

## What the sources say

Evidence is thin, so every row below is marked **Source** (seen in a document) or **Validate** (my assumption, check against real CVs in Phase 0).

- A sample Cambodian CV lists nationality, date of birth, place of birth, gender, marital status, contact details, a 4x6 photo box, and a salary expectation field. ([sample CV](https://www.slideshare.net/slideshow/sample-standard-cv/2647190))
- A Cambodian bank's job application form asks for date of birth, place of birth, gender, marital status, a 4x6 photo, and two references who are not family members. ([Sacombank Cambodia form](https://www.sacombank.com.kh/wp-content/uploads/2023/08/Job-Application-Form.pdf))
- Regional guides say Asian CVs commonly carry a photo, gender, and birth date and place, unlike UK/US norms. ([VisualCV guide](https://www.visualcv.com/blog/what-to-include-in-a-cv/))

None of these is an official standard. Employers differ (bank, NGO, government, private company, factory).

## Sections and fields

| Section | Fields | Basis |
|---|---|---|
| Photo | Profile picture shown as a **circle** on every template (owner decision 2026-11-03), 1:1 round crop tool, optional. The Cambodian samples ask for a 4x6 rectangle; the owner chose a circle anyway, so the formal template differs from that sample on purpose | Source for having a photo; shape is an owner decision |
| Identity | Name in Khmer, name in Latin letters (both, either), gender | Source for gender; Validate for two name fields |
| Personal details | Date of birth, place of birth, nationality, marital status | Source |
| Contact | Phone (+855 format help), email, current address, links (LinkedIn, Facebook, Telegram) | Source for phone/email; Validate for Telegram and Facebook |
| Objective / summary | Short text, with examples | Validate |
| Education | Institution, degree/field, dates, GPA, location | Validate (common) |
| Work experience | Title, employer, dates, location, bullets, "currently here" | Validate (common) |
| Training and certificates | Name, issuer, date | Validate |
| Skills | Tags, with suggestions | Validate |
| Languages | Language and level | Validate |
| Hobbies / interests | Tags | Validate |
| References | Two people, not relatives: name, position, organization, phone/email | Source (two non-family) |
| Salary expectation | Optional, off by default | Source (sample CV) |

Considered and not included by default: ID card or passport number (sensitive, little value on a CV), family members' names (some older forms ask; **Validate** and offer only as an optional field if samples show it).

## Layout rules

- A4 portrait. Margins that survive print shop printers.
- The **formal Cambodian layout** (the old app's Traditional template) is the reference template: centered title "ប្រវត្តិរូបសង្ខេប" / "CURRICULUM VITAE", circle photo top-right, personal table with colons, numbered sections. Keep it as the default for Khmer CVs.
- A **short, clean layout** for private companies and multinationals (the old Classic, Modern, Minimal, Professional templates are candidates).
- Two pages maximum by default, with a warning if a template runs to three.
- One-page variant for fresh graduates (candidate new template).
- Page breaks never split an entry or leave a heading alone.

## Khmer typography

- Dates: Gregorian with Khmer month names and Khmer digits when the CV language is Khmer (the old app already did this). Keep it.
- Line height 1.7 or more for Khmer. Subscripts and stacked vowels must not clip.
- Fonts: Kantumruy Pro (body), Moul (formal title). Confirm print-shop PCs do not matter, because the PDF embeds fonts.
- Mixed Khmer and Latin in one line must look balanced (font size match, baseline).
- Names: show Khmer name large, Latin name under it, or the reverse for English CVs.

## Copy and guidance

For each section and field, store three things: a plain-language label, a one-line tip, and one realistic example in Khmer and in English (like "Sok Dara, Accountant"). This is what makes the guided flow work. Accepted as written (D10 in [[Plan]]); beta users can flag wording.

## Phase 0 research task

1. Collect 15 to 20 real Cambodian CVs and forms (bank, NGO, government, private, factory, university). Anonymize.
2. For each, record: sections present, order, photo size, language, page count, fields the plan lacks.
3. Update this table. Anything seen in fewer than 3 samples is optional, hidden by default.
4. Ask 5 job seekers what confused them when writing a CV.
