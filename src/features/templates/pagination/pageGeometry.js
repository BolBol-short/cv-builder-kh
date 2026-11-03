// The size of an A4 page and its margins, in screen pixels (96 per inch).
// Every part of the app (preview, page splitting, PDF export) uses these numbers.

export const PX_PER_MM = 96 / 25.4

export function mmToPx(mm) {
  return mm * PX_PER_MM
}

export const PAGE_WIDTH = Math.round(mmToPx(210)) // 794 px
export const PAGE_HEIGHT = Math.round(mmToPx(297)) // 1123 px

// Page 1 starts at the very top (header colors touch the edge).
// Later pages leave a white strip at the top so text does not touch the edge.
export const TOP_MARGIN_LATER_PAGES = Math.round(mmToPx(12)) // 45 px
export const BOTTOM_MARGIN = Math.round(mmToPx(10)) // 38 px

// How much of the CV fits on each page.
export const FIRST_PAGE_CONTENT = PAGE_HEIGHT - BOTTOM_MARGIN // 1085 px
export const LATER_PAGE_CONTENT = PAGE_HEIGHT - TOP_MARGIN_LATER_PAGES - BOTTOM_MARGIN // 1040 px
