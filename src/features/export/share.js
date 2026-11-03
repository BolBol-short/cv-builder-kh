// The phone's share sheet (Save to Files, Telegram, email...), where supported.

export function canShareFile(file) {
  return typeof navigator !== 'undefined' && Boolean(navigator.canShare?.({ files: [file] }))
}

/** Returns false if the user closed the share sheet without sharing. */
export async function shareFile(file) {
  try {
    await navigator.share({ files: [file], title: file.name })
    return true
  } catch (error) {
    if (error.name === 'AbortError') return false // the user cancelled: not an error
    throw error
  }
}

export function isIPhoneOrIPad(userAgent) {
  return /iPhone|iPad|iPod/.test(userAgent ?? '')
}
