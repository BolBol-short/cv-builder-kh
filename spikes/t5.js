// T5: how much can this phone store, and does it promise to keep it?
import { set, get, del } from 'idb-keyval'
import { log, record } from './results.js'

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function tryLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value)
    localStorage.removeItem(key)
    return 'fits'
  } catch (error) {
    return error.name // usually QuotaExceededError
  }
}

export function setupT5() {
  document.getElementById('t5-idb').addEventListener('click', async () => {
    try {
      const saved = { time: Date.now() }
      await set('spike-test', saved)
      const readBack = await get('spike-test')
      await del('spike-test')
      const ok = readBack?.time === saved.time
      log('t5', `IndexedDB write and read: ${ok ? 'works' : 'wrong value'}`)
      record('T5 IndexedDB', ok ? 'works' : 'wrong value')
    } catch (error) {
      log('t5', `IndexedDB failed: ${error.name}`)
      record('T5 IndexedDB', `failed: ${error.name}`)
    }
  })

  document.getElementById('t5-persist').addEventListener('click', async () => {
    if (!navigator.storage?.persist) {
      log('t5', 'persist() is not supported')
      record('T5 persist', 'not supported')
      return
    }
    const granted = await navigator.storage.persist()
    const estimate = navigator.storage.estimate ? await navigator.storage.estimate() : null
    const quotaMb = estimate ? Math.round(estimate.quota / 1024 / 1024) : '?'
    log('t5', `persist() returned ${granted}. Storage quota about ${quotaMb} MB`)
    record('T5 persist', `${granted} (quota ${quotaMb} MB)`)
  })

  document.getElementById('t5-photo').addEventListener('change', async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const dataUrl = await readAsDataUrl(file)
    const kb = Math.round(dataUrl.length / 1024)
    const localResult = tryLocalStorage('spike-photo', dataUrl)
    log('t5', `Full photo as text: ${kb} KB. localStorage: ${localResult}`)
    record('T5 full photo in localStorage', `${kb} KB, ${localResult}`)

    try {
      await set('spike-photo', file)
      await del('spike-photo')
      log('t5', 'Full photo in IndexedDB: fits')
      record('T5 full photo in IndexedDB', 'fits')
    } catch (error) {
      log('t5', `Full photo in IndexedDB: ${error.name}`)
      record('T5 full photo in IndexedDB', error.name)
    }
  })
}
