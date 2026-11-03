// Android/Chrome sends a "beforeinstallprompt" event very early, often before
// the Review step is on screen. We keep it here until the Install button is pressed.
let savedPrompt = null
const listeners = new Set()

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault() // we show our own button instead of the browser's banner
    savedPrompt = event
    listeners.forEach((listener) => listener())
  })
}

export function getInstallPrompt() {
  return savedPrompt
}

export function onInstallPromptChange(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export async function showInstallPrompt() {
  if (!savedPrompt) return
  savedPrompt.prompt()
  savedPrompt = null
  listeners.forEach((listener) => listener())
}

// True when the app was opened from the Home Screen.
export function isInstalled() {
  return window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true
}
