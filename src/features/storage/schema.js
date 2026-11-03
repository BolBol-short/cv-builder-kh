// The shape of a saved CV ("document"), and a function that repairs any data
// we read back (from storage or a backup file) so the app never crashes on it.
import { makeId } from '../../shared/ids.js'

export const SCHEMA_VERSION = 1
export const TEMPLATE_IDS = ['traditional', 'classic', 'modern', 'professional', 'minimal']
export const DEFAULT_TEMPLATE = 'classic'
export const DEFAULT_ACCENT = '#1d4ed8'
export const FONT_SIZES = ['small', 'normal', 'large']

const MAX_TEXT = 5000 // characters per field
const MAX_ITEMS = 50 // entries per list
const MAX_PHOTO = 2_000_000 // characters of the photo data URL (about 1.5 MB)

/**
 * @typedef {Object} Settings
 * @property {'en'|'km'} cvLang  language printed on the CV
 * @property {string} template   one of TEMPLATE_IDS
 * @property {string} accentColor like "#1d4ed8"
 * @property {'small'|'normal'|'large'} fontSize
 * @property {boolean} showPhoto
 */

/**
 * @typedef {Object} CvDocument
 * @property {number} schemaVersion
 * @property {string} id
 * @property {string} createdAt  ISO date
 * @property {string} updatedAt  ISO date
 * @property {Settings} settings
 * @property {ReturnType<typeof emptyCv>} cv
 */

// ---- Empty items for each list. These also define which fields an item has. ----

export const newExperience = () => ({
  id: makeId(),
  jobTitle: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
})

export const newEducation = () => ({
  id: makeId(),
  institution: '',
  degree: '',
  gpa: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
})

export const newCertification = () => ({ id: makeId(), name: '', issuer: '', date: '' })

export const newLanguage = () => ({ id: makeId(), language: '', level: '' })

export const newReference = () => ({ id: makeId(), name: '', position: '', organization: '', contact: '' })

// Which "new item" function belongs to which list.
export const ITEM_FACTORIES = {
  experience: newExperience,
  education: newEducation,
  certifications: newCertification,
  languages: newLanguage,
  references: newReference,
}

export const TEXT_LISTS = ['skills', 'hobbies', 'links']

export function emptyCv() {
  return {
    personal: {
      nameKm: '',
      nameLatin: '',
      headline: '',
      gender: '', // code: female | male | other
      dateOfBirth: '', // "1998-04-14"
      placeOfBirth: '',
      nationality: '',
      maritalStatus: '', // code: single | married | divorced | widowed
      phone: '',
      email: '',
      address: '',
      salaryExpectation: '',
    },
    photo: '', // circle-cropped JPEG as a data URL, or ""
    summary: '',
    experience: [],
    education: [],
    certifications: [],
    languages: [],
    references: [],
    skills: [],
    hobbies: [],
    links: [],
  }
}

export function defaultSettings(cvLang = 'en') {
  return {
    cvLang,
    template: DEFAULT_TEMPLATE,
    accentColor: DEFAULT_ACCENT,
    fontSize: 'normal',
    showPhoto: true,
  }
}

/** @returns {CvDocument} */
export function emptyDocument(cvLang = 'en') {
  const now = new Date().toISOString()
  return {
    schemaVersion: SCHEMA_VERSION,
    id: makeId(),
    createdAt: now,
    updatedAt: now,
    settings: defaultSettings(cvLang),
    cv: emptyCv(),
  }
}

// ---- Repairing data ----

function asText(value) {
  return typeof value === 'string' ? value.slice(0, MAX_TEXT) : ''
}

function asList(value) {
  return Array.isArray(value) ? value.slice(0, MAX_ITEMS) : []
}

// Keeps only the fields the empty item has, with the right type.
function repairItem(raw, emptyItem) {
  const item = {}
  for (const [field, emptyValue] of Object.entries(emptyItem)) {
    const value = raw?.[field]
    if (field === 'id') item.id = typeof value === 'string' && value ? value : emptyValue
    else if (typeof emptyValue === 'boolean') item[field] = value === true
    else item[field] = asText(value)
  }
  return item
}

function repairSettings(raw) {
  const defaults = defaultSettings()
  return {
    cvLang: raw?.cvLang === 'km' ? 'km' : 'en',
    template: TEMPLATE_IDS.includes(raw?.template) ? raw.template : defaults.template,
    accentColor: /^#[0-9a-fA-F]{6}$/.test(raw?.accentColor ?? '') ? raw.accentColor : defaults.accentColor,
    fontSize: FONT_SIZES.includes(raw?.fontSize) ? raw.fontSize : defaults.fontSize,
    showPhoto: raw?.showPhoto !== false,
  }
}

function repairCv(raw) {
  const empty = emptyCv()
  const cv = { ...empty, personal: {} }

  for (const field of Object.keys(empty.personal)) {
    cv.personal[field] = asText(raw?.personal?.[field])
  }

  const photo = raw?.photo
  cv.photo = typeof photo === 'string' && photo.startsWith('data:image/') && photo.length < MAX_PHOTO ? photo : ''

  cv.summary = asText(raw?.summary)

  for (const [listName, makeEmptyItem] of Object.entries(ITEM_FACTORIES)) {
    cv[listName] = asList(raw?.[listName]).map((item) => repairItem(item, makeEmptyItem()))
  }

  for (const listName of TEXT_LISTS) {
    cv[listName] = asList(raw?.[listName])
      .filter((text) => typeof text === 'string' && text.trim())
      .map((text) => text.slice(0, 200))
  }
  return cv
}

/**
 * Returns a valid document built from anything we read back.
 * Missing or broken fields get safe empty values.
 * @returns {CvDocument}
 */
export function normalizeDocument(raw) {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new Error('error.invalidFile')
  }
  const now = new Date().toISOString()
  return {
    schemaVersion: SCHEMA_VERSION,
    id: typeof raw.id === 'string' && raw.id ? raw.id : makeId(),
    createdAt: asText(raw.createdAt) || now,
    updatedAt: asText(raw.updatedAt) || now,
    settings: repairSettings(raw.settings),
    cv: repairCv(raw.cv),
  }
}

// The name shown in the "saved CVs" list.
export function documentTitle(doc) {
  const { nameLatin, nameKm } = doc.cv.personal
  return nameLatin || nameKm || ''
}
