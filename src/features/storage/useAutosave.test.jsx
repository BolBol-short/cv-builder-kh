import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useAutosave } from './useAutosave.js'

describe('useAutosave', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('waits half a second, then saves and reports "saved"', async () => {
    const save = vi.fn().mockResolvedValue(undefined)
    const first = { id: 1 }
    const { result, rerender } = renderHook(({ doc }) => useAutosave(doc, save), { initialProps: { doc: first } })
    expect(result.current.status).toBe('saved') // nothing changed yet

    const edited = { id: 1, name: 'x' }
    rerender({ doc: edited })
    expect(result.current.status).toBe('saving')
    expect(save).not.toHaveBeenCalled()

    await act(async () => vi.advanceTimersByTimeAsync(500))
    expect(save).toHaveBeenCalledWith(edited)
    expect(result.current.status).toBe('saved')
  })

  it('reports "failed" when saving throws', async () => {
    const save = vi.fn().mockRejectedValue(new Error('QuotaExceededError'))
    const { result, rerender } = renderHook(({ doc }) => useAutosave(doc, save), { initialProps: { doc: { id: 1 } } })
    rerender({ doc: { id: 1, name: 'x' } })
    await act(async () => vi.advanceTimersByTimeAsync(500))
    expect(result.current.status).toBe('failed')
  })
})
