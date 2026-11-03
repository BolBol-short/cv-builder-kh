// Phase 0 device test page. Each test lives in its own file.
import '../src/styles/fonts.js'
import { log, askYesNo, record, resultsText, showResults } from './results.js'
import { setupT1 } from './t1.js'
import { setupT3 } from './t3.js'
import { setupT5 } from './t5.js'
import { setupT6 } from './t6.js'
import { detectInAppBrowser } from '../src/features/export/inAppBrowser.js'

setupT1()
setupT3()
setupT5()
setupT6()

// T4: the print route. We can only ask the tester what happened.
document.getElementById('t4-print').addEventListener('click', () => {
  window.print()
  askYesNo('t4', 'Did you get a PDF into Files without the pinch gesture?', 'T4 print without pinch')
})

// T7: which in-app browser (if any) is this?
const inApp = detectInAppBrowser(navigator.userAgent)
log('t7', `In-app browser detected: ${inApp ?? 'none'}`)
record('T7 in-app browser', inApp ?? 'none')
askYesNo('t7', 'Did T3 a) work inside this app?', 'T7 download works in app')
askYesNo('t7', 'Did the email link open your mail app?', 'T7 mailto works in app')

// T8: which font files did the browser download, and how big were they?
document.getElementById('t8-fonts').addEventListener('click', () => {
  const fonts = performance.getEntriesByType('resource').filter((entry) => entry.name.includes('.woff'))
  let totalKb = 0
  for (const font of fonts) {
    const kb = Math.round((font.transferSize || font.encodedBodySize || 0) / 1024)
    totalKb += kb
    log('t8', `${font.name.split('/').pop()}: ${kb} KB`)
  }
  log('t8', `Total: ${totalKb} KB in ${fonts.length} files`)
  record('T8 font download', `${totalKb} KB in ${fonts.length} files`)
})

document.getElementById('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(resultsText())
    document.getElementById('copy').textContent = 'Copied'
  } catch {
    document.getElementById('copy').textContent = 'Copy failed - take a screenshot instead'
  }
})

showResults()
