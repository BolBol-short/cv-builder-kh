// Checks that a CV color is dark enough: text in that color on white paper
// (and white text on that color) must be easy to read. WCAG asks for 4.5 : 1.

// How bright a color looks, from 0 (black) to 1 (white). Formula from WCAG.
function luminance(hex) {
  const channels = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255)
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastWithWhite(hex) {
  return 1.05 / (luminance(hex) + 0.05)
}

export function hasReadableContrast(hex) {
  return contrastWithWhite(hex) >= 4.5
}
