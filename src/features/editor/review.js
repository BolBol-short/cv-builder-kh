// Finds what is still missing from a CV, for the Review step.
// Each gap names the step where the user can add it.

export function findGaps(doc) {
  const { cv } = doc
  const { personal } = cv
  const checks = [
    { key: 'gap.name', step: 'photo', missing: !personal.nameKm && !personal.nameLatin },
    { key: 'gap.photo', step: 'photo', missing: !cv.photo && doc.settings.showPhoto },
    { key: 'gap.phone', step: 'personal', missing: !personal.phone },
    { key: 'gap.email', step: 'personal', missing: !personal.email },
    { key: 'gap.summary', step: 'summary', missing: !cv.summary.trim() },
    { key: 'gap.education', step: 'education', missing: cv.education.length === 0 },
    { key: 'gap.experience', step: 'experience', missing: cv.experience.length === 0 },
    { key: 'gap.skills', step: 'skills', missing: cv.skills.length === 0 },
    { key: 'gap.languages', step: 'skills', missing: cv.languages.length === 0 },
    { key: 'gap.references', step: 'references', missing: cv.references.length === 0 },
  ]
  return checks.filter((check) => check.missing)
}
