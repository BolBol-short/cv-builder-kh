// Steps 4 to 8: summary, education, experience, skills and references.
// They are short, so they share one file.
import { useDocument } from '../../../app/documentContext.js'
import { optionLabel, useI18n } from '../../../shared/i18n.js'
import { TextAreaField } from '../../../shared/ui/Field.jsx'
import { ObjectList } from '../fields/ObjectList.jsx'
import { TextList } from '../fields/TextList.jsx'
import { HOBBY_OPTIONS, LANGUAGE_LEVELS, LANGUAGE_OPTIONS, SKILL_OPTIONS } from '../options.js'
import { useGuide } from '../useGuide.js'

// The start, end and "I work/study here now" fields used by jobs and schools.
function periodFields(t, currentLabelKey) {
  return [
    { name: 'startDate', label: t('field.startDate'), type: 'month' },
    { name: 'endDate', label: t('field.endDate'), type: 'month', disabledWhen: (item) => item.current },
    { name: 'current', label: t(currentLabelKey), type: 'checkbox' },
  ]
}

function SubHeading({ children }) {
  return <h2 className="mb-3 text-lg font-bold">{children}</h2>
}

export function SummaryStep() {
  const { t } = useI18n()
  const { document, dispatch } = useDocument()
  const guide = useGuide()
  return (
    <TextAreaField
      label={t('field.summary')}
      {...guide('summary')}
      rows={6}
      value={document.cv.summary}
      onChange={(value) => dispatch({ type: 'setCvField', field: 'summary', value })}
    />
  )
}

export function EducationStep() {
  const { t } = useI18n()
  const guide = useGuide()
  return (
    <div className="space-y-10">
      <ObjectList
        list="education"
        titleOf={(item) => item.institution}
        fields={[
          { name: 'institution', label: t('field.institution'), wide: true, ...guide('institution') },
          { name: 'degree', label: t('field.degree'), ...guide('degree') },
          { name: 'gpa', label: t('field.gpa'), ...guide('gpa') },
          { name: 'location', label: t('field.location'), wide: true, ...guide('location') },
          ...periodFields(t, 'field.currentStudy'),
        ]}
      />
      <section>
        <SubHeading>{t('field.certifications')}</SubHeading>
        <ObjectList
          list="certifications"
          headingLevel={3}
          titleOf={(item) => item.name}
          fields={[
            { name: 'name', label: t('field.certName'), wide: true, ...guide('certName') },
            { name: 'issuer', label: t('field.issuer'), ...guide('issuer') },
            { name: 'date', label: t('field.date'), type: 'month' },
          ]}
        />
      </section>
    </div>
  )
}

export function ExperienceStep() {
  const { t } = useI18n()
  const guide = useGuide()
  return (
    <ObjectList
      list="experience"
      titleOf={(item) => [item.jobTitle, item.company].filter(Boolean).join(' · ')}
      fields={[
        { name: 'jobTitle', label: t('field.jobTitle'), ...guide('jobTitle') },
        { name: 'company', label: t('field.company'), ...guide('company') },
        { name: 'location', label: t('field.location'), wide: true, ...guide('location') },
        ...periodFields(t, 'field.currentJob'),
        { name: 'description', label: t('field.description'), type: 'textarea', ...guide('description') },
      ]}
    />
  )
}

export function SkillsStep() {
  const { t } = useI18n()
  const { document } = useDocument()
  const guide = useGuide()
  const cvLang = document.settings.cvLang
  const levelOptions = LANGUAGE_LEVELS.map((level) => ({ value: level, label: optionLabel(t, 'level', level) }))

  return (
    <div className="space-y-10">
      <TextList list="skills" label={t('field.skills')} {...guide('skills')} suggestions={SKILL_OPTIONS[cvLang]} />
      <section>
        <SubHeading>{t('field.languages')}</SubHeading>
        <p className="mb-3 text-sm text-ink/60">{guide('languages').tip}</p>
        <ObjectList
          list="languages"
          headingLevel={3}
          titleOf={(item) => item.language}
          fields={[
            { name: 'language', label: t('field.language'), suggestions: LANGUAGE_OPTIONS[cvLang] },
            { name: 'level', label: t('field.level'), type: 'select', options: levelOptions },
          ]}
        />
      </section>
      <TextList list="hobbies" label={t('field.hobbies')} {...guide('hobbies')} suggestions={HOBBY_OPTIONS[cvLang]} />
    </div>
  )
}

export function ReferencesStep() {
  const { t } = useI18n()
  const guide = useGuide()
  return (
    <ObjectList
      list="references"
      titleOf={(item) => item.name}
      fields={[
        { name: 'name', label: t('field.refName'), ...guide('refName') },
        { name: 'position', label: t('field.refPosition'), ...guide('refPosition') },
        { name: 'organization', label: t('field.refOrganization'), ...guide('refOrganization') },
        { name: 'contact', label: t('field.refContact'), ...guide('refContact') },
      ]}
    />
  )
}
