---
type: index
updated: 2026-11-04
---

# CV Builder — Vault Home

Second-brain notes for the cv-builder project. **Status (2026-11-04):** version 2 is built (Phases 0 to 5). v1 was deleted (it stays in git history, commit `62f39be`). Waiting for real-phone tests and a beta. All notes describe the new app. Start here, then follow the links. Open the `vault/` folder in Obsidian (or any markdown viewer) for the link graph.

## What it is

A web app that only makes CVs, the way Cambodian employers expect them, in Khmer or English. Nine guided steps with tips and examples, ten templates, a live A4 preview, and a PDF download that works on phones. No server, no account, no analytics. See [[Overview]].

## Notes

| Note | Holds |
|---|---|
| [[Overview]] | Purpose, users, features, stack, status |
| [[Architecture]] | How the pieces fit: state, data flow, render path |
| [[Data Model]] | The saved CV shape, settings, backup files, data repair |
| [[File Map]] | Every source file and what it does |
| [[Templates]] | The ten CV designs, their rules, how to add one |
| [[i18n and Khmer]] | UI language vs CV language, fonts, digits, dates |
| [[Print and PDF]] | A4 pages, page splitting, PDF download |
| [[Persistence]] | Saving on the device, backups, photos, clearing data |
| [[Decisions]] | Why things are built the way they are |
| [[Gotchas and Backlog]] | Open issues and ideas |
| [[Timeline]] | Commit history and milestones |
| [[Security Review]] | Security test results (2026-11-05), fixes and accepted risks |
| [[Commands]] | Dev, build, test and check commands |

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

- **Templates (10):** traditional, classic, modern, professional, minimal, compact, timeline, elegant, centered, bold → [[Templates]]
- **CV sections:** personal, summary, experience, education, certifications, skills, languages, hobbies, links, references → [[Data Model]]
- **Option lists** (skills, hobbies, languages, nationality, genders, marital status, language levels, CV colors): `src/features/editor/options.js` → [[File Map]]
- **UI languages:** English, Khmer → [[i18n and Khmer]]

## How to keep this vault useful

- Update a note in the same session you change the code it describes.
- One topic per note. Link instead of copying.
- Add a dated line to [[Timeline]] when something notable ships.
- Move fixed items out of [[Gotchas and Backlog]] and record the reason in [[Decisions]].
