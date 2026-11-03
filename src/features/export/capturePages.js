// Turns the CV pages into pictures, and the pictures into a PDF.
//
// The browser draws the text itself, so Khmer letters come out exactly as on
// screen. The drawing library is loaded only when the user asks for a PDF,
// so it does not slow down the app.
//
// We use html2canvas-pro (not the original html2canvas) because it understands
// the modern CSS colors that Tailwind 4 produces (color-mix, oklab).
import { canvasToJpeg, jpegsToPdf } from './jpegPdf.js'

const SCALE = 2 // 2 screen pixels per CV pixel: sharp when printed
const JPEG_QUALITY = 0.85

/**
 * @param {HTMLElement[]} pageElements  one element per A4 page
 * @param {(done: number, total: number) => void} [onProgress]
 * @returns {Promise<{ pdf: Blob, pictures: Blob[] }>}
 */
export async function capturePages(pageElements, onProgress) {
  const { default: html2canvas } = await import('html2canvas-pro')
  await document.fonts.ready

  const images = []
  for (const [index, element] of pageElements.entries()) {
    // One page at a time, so phones with little memory do not run out.
    const canvas = await html2canvas(element, { scale: SCALE, backgroundColor: '#ffffff', logging: false })
    images.push(await canvasToJpeg(canvas, JPEG_QUALITY))
    canvas.width = 0 // frees the canvas memory right away
    canvas.height = 0
    onProgress?.(index + 1, pageElements.length)
  }

  return {
    pdf: jpegsToPdf(images),
    pictures: images.map((image) => new Blob([image.bytes], { type: 'image/jpeg' })),
  }
}
