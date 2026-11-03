// Saves a file to the device (on iPhone: the Files app, Downloads folder).

/**
 * @param {Blob} blob
 * @param {string} fileName
 */
export function downloadBlob(blob, fileName) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  document.body.append(link)
  link.click()
  link.remove()
  // iPhone needs the file address to stay valid for a while after the click.
  setTimeout(() => URL.revokeObjectURL(link.href), 60_000)
}
