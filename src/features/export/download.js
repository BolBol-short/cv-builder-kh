// Saves a file to the device (on iPhone: the Files app, Downloads folder).

/**
 * @param {Blob} blob
 * @param {string} fileName
 */
export function downloadBlob(blob, fileName) {
  // iPhone opens a PDF or picture in its viewer instead of saving it. Marking the file as
  // "plain data" (octet-stream) makes Safari save it to Files (device test T3, option b).
  const file = new Blob([blob], { type: 'application/octet-stream' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(file)
  link.download = fileName
  document.body.append(link)
  link.click()
  link.remove()
  // iPhone needs the file address to stay valid for a while after the click.
  setTimeout(() => URL.revokeObjectURL(link.href), 60_000)
}
