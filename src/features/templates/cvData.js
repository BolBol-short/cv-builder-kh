// Small helpers that prepare CV data for the templates.
import { optionLabel } from '../../shared/i18n.js'
import { formatDate } from '../../shared/format/dates.js'

/**
 * The name to show big, and the other spelling to show small under it.
 * A Khmer CV leads with the Khmer name; an English CV with the Latin name.
 */
export function cvName(personal, lang, t) {
  const khmer = personal.nameKm.trim()
  const latin = personal.nameLatin.trim()
  const main = lang === 'km' ? khmer || latin : latin || khmer
  const other = main === khmer ? latin : khmer
  return { main: main || t('cv.yourName'), other }
}

/** Label/value pairs: gender, date and place of birth, nationality, marital status. */
export function personalFacts(personal, t, lang) {
  return [
    [t('field.gender'), optionLabel(t, 'gender', personal.gender)],
    [t('field.dateOfBirth'), formatDate(personal.dateOfBirth, lang)],
    [t('field.placeOfBirth'), personal.placeOfBirth],
    [t('field.nationality'), personal.nationality],
    [t('field.maritalStatus'), optionLabel(t, 'marital', personal.maritalStatus)],
    [t('cv.salary'), personal.salaryExpectation],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => ({ label, value }))
}

/** Phone, email, address and links, with the icon to show for each. */
export function contactItems(cv) {
  const { personal } = cv
  return [
    { icon: 'phone', value: personal.phone },
    { icon: 'mail', value: personal.email },
    { icon: 'pin', value: personal.address },
    ...cv.links.map((link) => ({ icon: 'link', value: link })),
  ].filter((item) => item.value)
}

/** Which sections have something to show. Empty sections are left out of the CV. */
export function filledSections(cv) {
  return {
    summary: cv.summary.trim() !== '',
    experience: cv.experience.length > 0,
    education: cv.education.length > 0,
    certifications: cv.certifications.length > 0,
    skills: cv.skills.length > 0,
    languages: cv.languages.some((item) => item.language),
    hobbies: cv.hobbies.length > 0,
    references: cv.references.length > 0,
  }
}
