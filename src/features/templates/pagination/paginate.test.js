import { describe, expect, it } from 'vitest'
import { findPageStarts } from './paginate.js'

const block = (top, bottom, isHeading = false) => ({ top, bottom, isHeading })

describe('findPageStarts', () => {
  it('keeps a short CV on one page', () => {
    expect(findPageStarts([block(0, 500)], 900, 1000, 1000)).toEqual([0])
  })

  it('cuts at the page end when no block is in the way', () => {
    expect(findPageStarts([block(0, 400), block(1100, 1200)], 1500, 1000, 1000)).toEqual([0, 1000])
  })

  it('moves a block that would be cut to the next page', () => {
    const blocks = [block(0, 900), block(950, 1100)]
    expect(findPageStarts(blocks, 1500, 1000, 1000)).toEqual([0, 950])
  })

  it('uses the highest cut block when two columns are cut', () => {
    const blocks = [block(900, 1050), block(960, 1020)]
    expect(findPageStarts(blocks, 1500, 1000, 1000)).toEqual([0, 900])
  })

  it('never leaves a heading alone at the bottom of a page', () => {
    const blocks = [block(0, 800), block(820, 850, true), block(860, 1100)]
    // The entry at 860 is cut, so it moves; the heading above it moves with it.
    expect(findPageStarts(blocks, 1500, 1000, 1000)).toEqual([0, 820])
  })

  it('cuts a block taller than a page instead of looping forever', () => {
    const blocks = [block(0, 2500)]
    expect(findPageStarts(blocks, 2500, 1000, 1000)).toEqual([0, 1000, 2000])
  })

  it('uses the smaller height for later pages', () => {
    expect(findPageStarts([], 2200, 1085, 1040)).toEqual([0, 1085, 2125])
  })
})
