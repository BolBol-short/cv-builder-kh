// Text helpers used by the CV templates.

// A multi-line description becomes bullet points: one point per line.
// Bullet signs the user typed ("-", "•", "*") are removed.
export function toBullets(text) {
  return (text ?? '')
    .split('\n')
    .map((line) => line.replace(/^\s*[-•*]\s*/, '').trim())
    .filter(Boolean)
}

// Safe file name from a person's name: "Sok Dara" -> "Sok-Dara".
// Khmer letters are kept; characters that phones do not allow in file names are removed.
export function fileNameFrom(text, fallback) {
  const cleaned = (text ?? '')
    .trim()
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '-')
  return cleaned || fallback
}
