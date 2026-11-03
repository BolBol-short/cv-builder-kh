// Helpers that change lists without modifying the original (React needs new arrays).

// Lists of text, like skills or hobbies.
export function addText(list, text) {
  const value = text.trim()
  if (!value || list.includes(value)) return list
  return [...list, value]
}

export function removeText(list, text) {
  return list.filter((item) => item !== text)
}

// Lists of objects with an `id`, like jobs or schools.
export function updateItem(list, id, field, value) {
  return list.map((item) => (item.id === id ? { ...item, [field]: value } : item))
}

export function removeItem(list, id) {
  return list.filter((item) => item.id !== id)
}

// Puts an item back at its old position (used by "Undo").
export function insertItem(list, item, index) {
  const copy = [...list]
  copy.splice(Math.min(index, copy.length), 0, item)
  return copy
}

// direction: -1 moves up, +1 moves down. Moving past the ends does nothing.
export function moveItem(list, id, direction) {
  const from = list.findIndex((item) => item.id === id)
  const to = from + direction
  if (from < 0 || to < 0 || to >= list.length) return list
  const copy = [...list]
  ;[copy[from], copy[to]] = [copy[to], copy[from]]
  return copy
}
