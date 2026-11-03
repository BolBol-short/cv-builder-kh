---
type: reference
---

# Print and PDF

> **v1 note.** Describes the first version, still in `v1/src/` as the read-only reference for the rebuild. The current plan is in [[Plan]].


PDF export is the browser print dialog. There is no PDF library. "Download PDF" calls `window.print()`.

User steps: choose "Save as PDF", paper size A4, turn off "Headers and footers".

## Preview matches print

`Preview.jsx` renders the template at real A4 width (794 px) and scales it with `transform: scale(w / 794)` so it fits the column. A `ResizeObserver` re-measures the frame and the page.

## Page-break markers

```
MM           = 96 / 25.4
FIRST_PAGE_H = (297 - 10) * MM        page 1: bottom margin only
NEXT_PAGE_H  = (297 - 12 - 10) * MM   later pages: top 12 mm + bottom 10 mm
```

`pageBreaks(height)` returns the y offsets where the printer starts a new page. They render as dashed rose lines with the page number.

## Print CSS (`index.css`)

- `@page { size: A4; margin: 12mm 0 10mm }` and `@page :first { margin: 0 0 10mm }`. Page 1 is full bleed so header bands and sidebars touch the edge. Later pages get a top margin.
- `@media print`: hide `.no-print`, unscale `.paper-scale`, remove frame sizing, force `print-color-adjust: exact` on `.cv-page` so backgrounds survive.
- `.cv-page h2 { break-after: avoid }` so a section heading never ends a page alone.

## Keep in sync

The numbers `12mm`, `10mm`, `297` appear in **both** `index.css` and `Preview.jsx`. Change one, change the other. `Page` in `shared.jsx` also hardcodes `min-h-[1085px]`, which is `(297 − 10) mm` in px.

## Known limits

- Untested: how the Modern and Professional sidebars behave once the CV runs onto page 2 (whether the colored column continues). Check in a real print preview before relying on it.
- Output depends on the browser's print engine. Chrome and Edge are the safe targets.

Related: [[Templates]], [[Gotchas and Backlog]].
