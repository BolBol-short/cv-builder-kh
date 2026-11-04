// Decides where each page starts.
//
// The CV is first drawn as one long sheet. Then, page by page, we look at
// where the page would end. If that line would cut through a block (a job,
// a table row...), the next page starts at the top of that block instead.
// A section title that would end up last on a page also moves to the next page.
import { FIRST_PAGE_CONTENT, LATER_PAGE_CONTENT } from './pageGeometry.js'

/**
 * @param {{ top: number, bottom: number, isHeading: boolean }[]} blocks  positions in px from the top of the sheet
 * @param {number} sheetHeight  height of the whole sheet in px
 * @returns {number[]} where each page starts, in px from the top of the sheet (the first is always 0)
 */
export function findPageStarts(
  blocks,
  sheetHeight,
  firstPageHeight = FIRST_PAGE_CONTENT,
  laterPageHeight = LATER_PAGE_CONTENT,
) {
  const starts = [0]
  let pageStart = 0
  let pageHeight = firstPageHeight

  // Measured heights can be off by a fraction of a pixel when the preview is shrunk,
  // which would otherwise add an empty last page.
  while (sheetHeight - pageStart > pageHeight + 1) {
    const pageEnd = pageStart + pageHeight
    let nextStart = pageEnd

    // Blocks that start on this page but would be cut by the page end.
    const cutBlocks = blocks.filter((block) => block.top > pageStart && block.top < pageEnd && block.bottom > pageEnd)
    for (const block of cutBlocks) nextStart = Math.min(nextStart, block.top)

    // A heading with nothing after it on this page moves to the next page.
    const lonelyHeading = blocks.find(
      (block) =>
        block.isHeading &&
        block.top > pageStart &&
        block.bottom <= nextStart &&
        !blocks.some((other) => !other.isHeading && other.top >= block.bottom && other.top < nextStart),
    )
    if (lonelyHeading) nextStart = lonelyHeading.top

    starts.push(nextStart)
    pageStart = nextStart
    pageHeight = laterPageHeight
  }
  return starts
}
