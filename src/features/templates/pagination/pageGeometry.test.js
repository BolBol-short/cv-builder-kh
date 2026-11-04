import { describe, expect, it } from 'vitest'
import { FIRST_PAGE_CONTENT, LATER_PAGE_CONTENT, PAGE_HEIGHT, PAGE_WIDTH, mmToPx } from './pageGeometry.js'

describe('page geometry', () => {
  it('matches A4 at 96 dpi, as in the first version', () => {
    expect(PAGE_WIDTH).toBe(794)
    expect(PAGE_HEIGHT).toBe(1123)
    expect(FIRST_PAGE_CONTENT).toBe(1085)
    expect(LATER_PAGE_CONTENT).toBe(1040)
    expect(Math.round(mmToPx(25.4))).toBe(96)
  })
})
