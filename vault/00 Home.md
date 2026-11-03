---
type: index
updated: 2026-11-03
---

# CV Builder — Vault Home

Second-brain notes for the cv-builder project. **Status (2026-11-03):** the first version (`v1/`) stays in place as the read-only reference. The app will be rebuilt in the main folder (`src/`), taking v1 as the base and adding ideas from the research. Notes marked "v1 note" describe v1; the Rebuild plan notes are current. Start here, then follow the links. Open the `vault/` folder in Obsidian (or any markdown viewer) for the link graph.

## What it is

A fully client-side web app for writing a CV, aimed at Cambodia and Southeast Asia. The user fills in a form, picks a template and accent color, sees a live A4 preview, and prints it to PDF. No server, no account. See [[Overview]].

## Notes

| Note | Holds |
|---|---|
| [[Overview]] | Purpose, users, features, stack, status |
| [[Architecture]] | How the pieces fit: state, data flow, render path |
| [[Data Model]] | `emptyCV` shape, settings, save-file contract |
| [[File Map]] | Every source file and what it does |
| [[Templates]] | The five CV layouts and how to add a sixth |
| [[i18n and Khmer]] | UI language vs CV language, fonts, digits, dates |
| [[Print and PDF]] | A4 sizing, page-break math, print CSS |
| [[Persistence]] | Autosave, JSON import/export, photo handling |
| [[Decisions]] | Why things are built the way they are |
| [[Gotchas and Backlog]] | Known issues of the old app, ideas for the rebuild |
| [[Timeline]] | Commit history and milestones |
| [[Commands]] | Dev, build, lint, PDF steps |

## Rebuild plan (current)

| Note | Holds |
|---|---|
| [[Plan]] | Vision, goals, audit of the old app, decisions, risks, targets |
| [[Product]] | Users, flows, features (MoSCoW), mobile UX, accessibility |
| [[CV Spec]] | Cambodian CV fields, layouts, Khmer typography, research task |
| [[Technical Design]] | Stack, data model, pagination, PDF options, performance, CI |
| [[Roadmap]] | Phases with exit criteria, feature checklist, launch |
| [[Solutions]] | Decision Court rulings on the hard problems, gates, open tests |
| [[Build Plan]] | Ordered build tasks with files and checks, for the builder |

Court records (briefs, record, verdicts): `plan/court/`. Test results go in [[Spike Results]].

## Collections (quick lookup)

- **Templates:** classic, modern, professional, minimal, traditional → [[Templates]]
- **CV sections:** personal, summary, experience, education, certifications, skills, languages, hobbies, links, references → [[Data Model]]
- **Option lists** (skills, hobbies, languages, nationality, genders, marital status, language levels, accent presets): `v1/src/constants/options.js` → [[File Map]]
- **UI languages:** English, Khmer → [[i18n and Khmer]]

## How to keep this vault useful

- Update a note in the same session you change the code it describes.
- One topic per note. Link instead of copying.
- Add a dated line to [[Timeline]] when something notable ships.
- Move fixed items out of [[Gotchas and Backlog]] and record the reason in [[Decisions]].
