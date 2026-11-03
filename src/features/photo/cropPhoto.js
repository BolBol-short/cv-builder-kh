// Cuts the chosen square out of the photo and makes a small JPEG.
// Drawing on a canvas also removes hidden photo data (like GPS location),
// and the browser already turns sideways phone photos the right way up.

const OUTPUT_SIZE = 400 // px, sharp enough for print and only a few dozen KB

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('error.image'))
    image.src = url
  })
}

/**
 * @param {string} imageUrl  the original photo
 * @param {{ x: number, y: number, width: number, height: number }} area  the square to keep, in photo pixels
 * @returns {Promise<string>} a JPEG data URL
 */
export async function cropPhoto(imageUrl, area) {
  const image = await loadImage(imageUrl)
  const canvas = document.createElement('canvas')
  canvas.width = OUTPUT_SIZE
  canvas.height = OUTPUT_SIZE
  const context = canvas.getContext('2d')
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE)
  context.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE)
  return canvas.toDataURL('image/jpeg', 0.85)
}
