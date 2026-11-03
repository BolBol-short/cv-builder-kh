// Checks the size of the JavaScript the editor downloads, after `npm run build`.
//   - first load (what app.html needs to start): at most 200 KB gzip
//   - each lazy part (loaded only when used, e.g. the PDF maker): at most 80 KB gzip
// Run: node scripts/check-size.js
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const FIRST_LOAD_LIMIT_KB = 200
const LAZY_LIMIT_KB = 80

const manifest = JSON.parse(readFileSync('dist/.vite/manifest.json', 'utf8'))

function gzipKb(file) {
  return gzipSync(readFileSync(`dist/${file}`)).length / 1024
}

// All chunks a chunk needs right away (its static imports, and theirs).
function staticChunks(key, found = new Set()) {
  if (found.has(key)) return found
  found.add(key)
  for (const imported of manifest[key].imports ?? []) staticChunks(imported, found)
  return found
}

const firstLoad = staticChunks('app.html')
let firstLoadKb = 0
for (const key of firstLoad) firstLoadKb += gzipKb(manifest[key].file)

let failed = firstLoadKb > FIRST_LOAD_LIMIT_KB
console.log(`First load: ${firstLoadKb.toFixed(1)} KB gzip (limit ${FIRST_LOAD_LIMIT_KB})`)

// Lazy parts: chunks loaded with import() that are not already in the first load.
const lazyKeys = new Set()
for (const key of firstLoad) for (const dynamic of manifest[key].dynamicImports ?? []) lazyKeys.add(dynamic)
for (const key of lazyKeys) {
  let kb = 0
  for (const part of staticChunks(key)) if (!firstLoad.has(part)) kb += gzipKb(manifest[part].file)
  const tooBig = kb > LAZY_LIMIT_KB
  failed ||= tooBig
  console.log(`Lazy ${manifest[key].file}: ${kb.toFixed(1)} KB gzip${tooBig ? `  <- over ${LAZY_LIMIT_KB}` : ''}`)
}

if (failed) {
  console.error('Size check failed.')
  process.exit(1)
}
console.log('Size check passed.')
