import { describe, expect, it } from 'vitest'
import { jpegsToPdf } from './jpegPdf.js'
import { detectInAppBrowser } from './inAppBrowser.js'

describe('jpegsToPdf', () => {
  it('writes a PDF whose table of contents points at every object', async () => {
    const fakeJpeg = { bytes: new Uint8Array([0xff, 0xd8, 1, 2, 3, 0xff, 0xd9]), width: 10, height: 14 }
    const pdf = jpegsToPdf([fakeJpeg, fakeJpeg])
    expect(pdf.type).toBe('application/pdf')

    const text = new TextDecoder('latin1').decode(await pdf.arrayBuffer())
    expect(text.startsWith('%PDF-1.4')).toBe(true)
    expect(text).toContain('/Count 2')

    const xrefStart = Number(/startxref\n(\d+)/.exec(text)[1])
    expect(text.slice(xrefStart, xrefStart + 4)).toBe('xref')

    const entries = text
      .slice(xrefStart)
      .split('\n')
      .filter((line) => / n $/.test(line))
    expect(entries).toHaveLength(8) // catalog + page list + 3 objects per page
    entries.forEach((line, index) => {
      const position = Number(line.slice(0, 10))
      expect(text.slice(position).startsWith(`${index + 1} 0 obj`)).toBe(true)
    })
  })
})

describe('detectInAppBrowser', () => {
  it('recognises in-app browsers', () => {
    const facebook =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/470.0]'
    const messenger = 'Mozilla/5.0 (iPhone) AppleWebKit/605.1.15 Mobile/15E148 [FBAN/MessengerForiOS;FBAV/460.0]'
    const telegram =
      'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/126 Mobile Safari/537.36 Telegram-Android/11.0'
    expect(detectInAppBrowser(facebook)).toBe('Facebook')
    expect(detectInAppBrowser(messenger)).toBe('Messenger')
    expect(detectInAppBrowser(telegram)).toBe('Telegram')
  })

  it('returns null for normal browsers', () => {
    const safari =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
    expect(detectInAppBrowser(safari)).toBeNull()
    expect(detectInAppBrowser(undefined)).toBeNull()
  })
})
