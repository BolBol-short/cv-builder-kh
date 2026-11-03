// T1: does Khmer still look right after we turn the text into a picture?
import html2canvas from 'html2canvas'
import { toCanvas } from 'html-to-image'
import { jpegsToPdf, canvasToJpeg } from '../src/features/export/jpegPdf.js'
import { log, askYesNo } from './results.js'

const A4_WIDTH = 794 // px at 96 dpi
const A4_HEIGHT = 1123

// Places the captured picture at the top of a white A4 page, then makes a PDF.
async function pictureToPdf(picture) {
  const page = document.createElement('canvas')
  page.width = A4_WIDTH * 2
  page.height = A4_HEIGHT * 2
  const context = page.getContext('2d')
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, page.width, page.height)
  const scale = Math.min(1, (page.width - 96) / picture.width)
  context.drawImage(picture, 48, 48, picture.width * scale, picture.height * scale)
  return jpegsToPdf([await canvasToJpeg(page)])
}

async function runTest(toolName, makeCanvas) {
  const stress = document.getElementById('stress')
  const output = document.getElementById('t1-output')
  log('t1', `${toolName}: working...`)
  try {
    await document.fonts.ready
    const started = performance.now()
    const canvas = await makeCanvas(stress)
    const ms = Math.round(performance.now() - started)

    const img = document.createElement('img')
    img.alt = `Picture made by ${toolName}`
    img.src = canvas.toDataURL('image/png')
    output.append(img)

    const pdf = await pictureToPdf(canvas)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(pdf)
    link.textContent = `Open the ${toolName} PDF`
    link.target = '_blank'
    output.append(link)

    log('t1', `${toolName}: done in ${ms} ms`)
    askYesNo('t1', `Does the ${toolName} picture match the text exactly (every vowel and subscript)?`, `T1 ${toolName} matches`)
  } catch (error) {
    log('t1', `${toolName} failed: ${error.message}`)
  }
}

export function setupT1() {
  document.getElementById('t1-html2canvas').addEventListener('click', () =>
    runTest('html2canvas', (node) => html2canvas(node, { scale: 2, backgroundColor: '#ffffff' })),
  )
  document.getElementById('t1-htmltoimage').addEventListener('click', () =>
    runTest('html-to-image', (node) => toCanvas(node, { pixelRatio: 2, backgroundColor: '#ffffff' })),
  )
}
