// A unique id for each list item (job, school, reference...), so React can
// keep track of items when they are moved or removed.
export function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
