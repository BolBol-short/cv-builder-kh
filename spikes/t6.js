// T6: can this phone make a 3-page PDF without running out of memory?
// Each page is drawn on its own canvas, one at a time, then thrown away.
import html2canvas from 'html2canvas-pro'
import { jpegsToPdf, canvasToJpeg } from '../src/features/export/jpegPdf.js'
import { log, record } from './results.js'

const PAGE_COUNT = 3

function makePage(pageNumber) {
  const page = document.createElement('div')
  page.className = 'a4'
  page.lang = 'km'
  const stressText = document.getElementById('stress').innerHTML
  page.innerHTML = `<p style="font-weight:700">Page ${pageNumber}</p>${stressText.repeat(5)}`
  return page
}

export function setupT6() {
  document.getElementById('t6-run').addEventListener('click', async () => {
    const area = document.getElementById('pageArea')
    log('t6', 'Working...')
    const started = performance.now()
    try {
      await document.fonts.ready
      const images = []
      for (let number = 1; number <= PAGE_COUNT; number++) {
        const page = makePage(number)
        area.append(page)
        const canvas = await html2canvas(page, { scale: 2, backgroundColor: '#ffffff' })
        images.push(await canvasToJpeg(canvas))
        page.remove()
        canvas.width = 0 // frees the canvas memory right away
      }
      const pdf = jpegsToPdf(images)
      const seconds = ((performance.now() - started) / 1000).toFixed(1)
      const kb = Math.round(pdf.size / 1024)
      log('t6', `Done: ${PAGE_COUNT} pages, ${kb} KB, ${seconds} s`)
      record('T6 three pages', `ok, ${kb} KB, ${seconds} s`)

      const link = document.createElement('a')
      link.href = URL.createObjectURL(pdf)
      link.target = '_blank'
      link.textContent = 'Open the 3-page PDF (check for blank pages)'
      document.getElementById('t6-log').append(link)
    } catch (error) {
      log('t6', `Failed: ${error.message}`)
      record('T6 three pages', `failed: ${error.message}`)
    }
  })
}
