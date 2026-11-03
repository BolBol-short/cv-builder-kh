// Every change to the open CV goes through this one function.
// It receives the current document and an "action" (a plain object that says
// what happened) and returns a new document. It never changes the old one.
import { ITEM_FACTORIES } from '../features/storage/schema.js'
import { addText, insertItem, moveItem, removeItem, removeText, updateItem } from '../shared/format/lists.js'

// Replaces one top-level part of the CV, e.g. cv.experience or cv.summary.
function withCv(doc, field, value) {
  return { ...doc, cv: { ...doc.cv, [field]: value } }
}

export function documentReducer(doc, action) {
  const { cv } = doc

  switch (action.type) {
    case 'setSetting':
      return { ...doc, settings: { ...doc.settings, [action.field]: action.value } }

    case 'setPersonal':
      return withCv(doc, 'personal', { ...cv.personal, [action.field]: action.value })

    case 'setCvField': // summary or photo
      return withCv(doc, action.field, action.value)

    case 'addItem':
      return withCv(doc, action.list, [...cv[action.list], ITEM_FACTORIES[action.list]()])

    case 'updateItem':
      return withCv(doc, action.list, updateItem(cv[action.list], action.id, action.field, action.value))

    case 'removeItem':
      return withCv(doc, action.list, removeItem(cv[action.list], action.id))

    case 'insertItem': // used by "Undo"
      return withCv(doc, action.list, insertItem(cv[action.list], action.item, action.index))

    case 'moveItem':
      return withCv(doc, action.list, moveItem(cv[action.list], action.id, action.direction))

    case 'addText':
      return withCv(doc, action.list, addText(cv[action.list], action.text))

    case 'removeText':
      return withCv(doc, action.list, removeText(cv[action.list], action.text))

    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
