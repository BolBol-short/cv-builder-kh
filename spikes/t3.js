// T3: which way of saving gets the PDF into the iPhone Files app?
import { jpegsToPdf, canvasToJpeg } from '../src/features/export/jpegPdf.js'
import { log, askYesNo, record } from './results.js'

// A tiny one-page test PDF with some text drawn on it.
async function makeTestPdf() {
  const canvas = document.createElement('canvas')
  canvas.width = 794
  canvas.height = 1123
  const context = canvas.getContext('2d')
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#1c1917'
  context.font = '32px sans-serif'
  context.fillText('CV-Builder test PDF', 60, 100)
  return jpegsToPdf([await canvasToJpeg(canvas)])
}

function download(blob, fileName) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  document.body.append(link)
  link.click()
  link.remove()
  // iPhone needs the link to stay valid for a while after the click.
  setTimeout(() => URL.revokeObjectURL(link.href), 60_000)
}

async function share(blob, label) {
  const file = new File([blob], 'cv-builder-test.pdf', { type: 'application/pdf' })
  if (!navigator.canShare || !navigator.canShare({ files: [file] })) {
    log('t3', `${label}: sharing files is not supported here`)
    record(`T3 ${label}`, 'not supported')
    return
  }
  try {
    await navigator.share({ files: [file], title: 'CV-Builder test' })
    log('t3', `${label}: share sheet finished`)
    askYesNo('t3', `${label}: was "Save to Files" offered and did it work?`, `T3 ${label} saved`)
  } catch (error) {
    log('t3', `${label}: ${error.name} - ${error.message}`)
    record(`T3 ${label}`, error.name)
  }
}

export function setupT3() {
  const byId = (id) => document.getElementById(id)

  byId('t3-pdf').addEventListener('click', async () => {
    download(await makeTestPdf(), 'cv-builder-test.pdf')
    askYesNo('t3', 'a) Did the PDF reach Files?', 'T3 a download pdf')
  })

  byId('t3-octet').addEventListener('click', async () => {
    const pdf = await makeTestPdf()
    download(new Blob([pdf], { type: 'application/octet-stream' }), 'cv-builder-test-2.pdf')
    askYesNo('t3', 'b) Did the PDF reach Files?', 'T3 b download octet')
  })

  byId('t3-json').addEventListener('click', () => {
    const backup = JSON.stringify({ test: true, savedAt: new Date().toISOString() }, null, 2)
    download(new Blob([backup], { type: 'application/json' }), 'cv-builder-backup.json')
    askYesNo('t3', 'c) Did the backup file reach Files?', 'T3 c download json')
  })

  byId('t3-share-now').addEventListener('click', async () => share(await makeTestPdf(), 'd1 share now'))

  byId('t3-share-late').addEventListener('click', async () => {
    log('t3', 'd2: waiting 3 seconds...')
    const pdf = await makeTestPdf()
    await new Promise((resolve) => setTimeout(resolve, 3000))
    share(pdf, 'd2 share late')
  })

  // Two taps: the first makes the file, the second (a fresh tap) shares it.
  let preparedPdf = null
  byId('t3-prepare').addEventListener('click', async () => {
    preparedPdf = await makeTestPdf()
    byId('t3-save').hidden = false
    log('t3', 'd3: PDF ready, now press "Save to Files"')
  })
  byId('t3-save').addEventListener('click', () => share(preparedPdf, 'd3 two taps'))
}
