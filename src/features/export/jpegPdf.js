// Builds a PDF where every page is one JPEG picture filling an A4 page.
//
// We write the PDF by hand instead of using a PDF library: a picture-only PDF
// needs just a few "objects", and this keeps about 100 KB out of the app.
//
// A PDF file is: a header, numbered objects, a table of where each object
// starts (the "xref" table), and a trailer that points at the first object.

const A4_WIDTH_PT = 595.28 // 210 mm in PDF points (1 point = 1/72 inch)
const A4_HEIGHT_PT = 841.89 // 297 mm

/**
 * @typedef {Object} JpegImage
 * @property {Uint8Array} bytes  the JPEG file data
 * @property {number} width      in pixels
 * @property {number} height     in pixels
 */

/**
 * @param {JpegImage[]} images  one image per page, in page order
 * @returns {Blob} a PDF file
 */
export function jpegsToPdf(images) {
  const encoder = new TextEncoder()
  const parts = [] // pieces of the file, all as bytes
  const objectStart = [] // objectStart[id] = byte position where object `id` begins
  let fileLength = 0

  function write(text) {
    const bytes = typeof text === 'string' ? encoder.encode(text) : text
    parts.push(bytes)
    fileLength += bytes.length
  }

  function beginObject(id) {
    objectStart[id] = fileLength
    write(`${id} 0 obj\n`)
  }

  // Object 1 is the catalog, object 2 the page list.
  // Every page then uses three objects: the page, its drawing commands, its image.
  const pageIds = images.map((_, index) => 3 + index * 3)

  write('%PDF-1.4\n')

  beginObject(1)
  write('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')

  beginObject(2)
  const kids = pageIds.map((id) => `${id} 0 R`).join(' ')
  write(`<< /Type /Pages /Kids [${kids}] /Count ${images.length} >>\nendobj\n`)

  images.forEach((image, index) => {
    const pageId = pageIds[index]
    const drawingId = pageId + 1
    const imageId = pageId + 2
    const imageName = `/Im${index}`

    beginObject(pageId)
    write(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4_WIDTH_PT} ${A4_HEIGHT_PT}] ` +
        `/Resources << /XObject << ${imageName} ${imageId} 0 R >> >> /Contents ${drawingId} 0 R >>\nendobj\n`,
    )

    // "Stretch the image over the whole page, then draw it."
    const drawing = `q ${A4_WIDTH_PT} 0 0 ${A4_HEIGHT_PT} 0 0 cm ${imageName} Do Q`
    beginObject(drawingId)
    write(`<< /Length ${drawing.length} >>\nstream\n${drawing}\nendstream\nendobj\n`)

    beginObject(imageId)
    write(
      `<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`,
    )
    write(image.bytes)
    write('\nendstream\nendobj\n')
  })

  // The xref table: one 20-byte line per object, giving its byte position.
  const xrefStart = fileLength
  const objectCount = objectStart.length // includes the unused object 0
  let xref = `xref\n0 ${objectCount}\n0000000000 65535 f \n`
  for (let id = 1; id < objectCount; id++) {
    xref += `${String(objectStart[id]).padStart(10, '0')} 00000 n \n`
  }
  write(xref)
  write(`trailer\n<< /Size ${objectCount} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`)

  return new Blob(parts, { type: 'application/pdf' })
}

/**
 * Turns a canvas into JPEG data for jpegsToPdf.
 * @param {HTMLCanvasElement} canvas
 * @param {number} quality  0 to 1
 * @returns {Promise<JpegImage>}
 */
export async function canvasToJpeg(canvas, quality = 0.85) {
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
  const bytes = new Uint8Array(await blob.arrayBuffer())
  return { bytes, width: canvas.width, height: canvas.height }
}
