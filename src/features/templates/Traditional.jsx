// Traditional: the formal Cambodian layout. Centered title "ប្រវត្តិរូបសង្ខេប"
// (or "CURRICULUM VITAE"), circle photo top right, a table of personal details,
// then numbered sections (I, II, III...) with tables for education.
import { formatMonth, formatRange } from '../../shared/format/dates.js'
import { toBullets } from '../../shared/format/text.js'
import { optionLabel } from '../../shared/i18n.js'
import { cvName, filledSections, personalFacts } from './cvData.js'
import { Photo, SectionTitle } from './parts.jsx'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

// Three columns: date | main text | details
function Table({ rows }) {
  return (
    <table className="w-full border-collapse">
      <tbody>
        {rows.map((cells, index) => (
          <tr key={index} data-block="" className="border-b border-ink/10 last:border-0">
            <td className="w-[13em] py-[0.3em] pr-[0.8em] align-top font-medium text-ink/70">{cells[0]}</td>
            <td className="py-[0.3em] pr-[0.8em] align-top">{cells[1]}</td>
            <td className="py-[0.3em] align-top text-ink/80">{cells[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function Traditional({ cv, settings, t, lang }) {
  const { personal } = cv
  const name = cvName(personal, lang, t)
  const show = filledSections(cv)

  const personalRows = [
    { label: t('field.nameKm'), value: personal.nameKm },
    { label: t('field.nameLatin'), value: personal.nameLatin },
    ...personalFacts(personal, t, lang),
    { label: t('field.address'), value: personal.address },
    { label: t('field.phone'), value: personal.phone },
    { label: t('field.email'), value: personal.email },
    ...cv.links.map((link) => ({ label: t('section.links'), value: link })),
  ].filter((row) => row.value)

  // Build the list first, so numbering skips empty sections.
  const sections = [
    personalRows.length > 0 && {
      title: t('section.personal'),
      body: (
        <table className="w-full">
          <tbody>
            {personalRows.map((row, index) => (
              <tr key={index} data-block="">
                <td className="w-[13em] py-[0.15em] align-top text-ink/70">{row.label}</td>
                <td className="w-[1.2em] py-[0.15em] align-top">:</td>
                <td className="py-[0.15em] align-top font-medium break-all">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    show.summary && {
      title: t('section.summary'),
      body: (
        <p data-block="" className="whitespace-pre-line">
          {cv.summary}
        </p>
      ),
    },
    show.education && {
      title: t('section.education'),
      body: (
        <Table
          rows={cv.education.map((school) => [
            formatRange(school, t, lang),
            <>
              <b>{school.institution}</b>
              {school.location && `, ${school.location}`}
            </>,
            [school.degree, school.gpa && `${t('field.gpa')}: ${school.gpa}`].filter(Boolean).join(' — '),
          ])}
        />
      ),
    },
    show.experience && {
      title: t('section.experience'),
      body: cv.experience.map((job) => (
        <div key={job.id} data-block="" className="mb-[0.8em] grid grid-cols-[13em_1fr] gap-[0.8em]">
          <p className="font-medium text-ink/70">{formatRange(job, t, lang)}</p>
          <div>
            <p className="font-bold">{job.jobTitle}</p>
            <p className="text-ink/80">{[job.company, job.location].filter(Boolean).join(', ')}</p>
            {toBullets(job.description).length > 0 && (
              <ul className="mt-[0.2em] list-disc pl-[1.2em]">
                {toBullets(job.description).map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )),
    },
    show.certifications && {
      title: t('section.certifications'),
      body: (
        <Table
          rows={cv.certifications.map((item) => [
            formatMonth(item.date, lang),
            <b key="name">{item.name}</b>,
            item.issuer,
          ])}
        />
      ),
    },
    show.languages && {
      title: t('section.languages'),
      body: (
        <Table
          rows={cv.languages
            .filter((item) => item.language)
            .map((item) => [item.language, optionLabel(t, 'level', item.level), ''])}
        />
      ),
    },
    show.skills && {
      title: t('section.skills'),
      body: (
        <ul className="grid grid-cols-2 gap-x-[1.8em] list-disc pl-[1.2em]">
          {cv.skills.map((skill) => (
            <li key={skill} data-block="">
              {skill}
            </li>
          ))}
        </ul>
      ),
    },
    show.hobbies && {
      title: t('section.hobbies'),
      body: <p data-block="">{cv.hobbies.join(', ')}</p>,
    },
    show.references && {
      title: t('section.references'),
      body: (
        <ol className="list-decimal space-y-[0.4em] pl-[1.5em]">
          {cv.references.map((person) => (
            <li key={person.id} data-block="">
              <b>{person.name}</b>
              {[person.position, person.organization].filter(Boolean).length > 0 &&
                `, ${[person.position, person.organization].filter(Boolean).join(', ')}`}
              {person.contact && <span className="block text-ink/70">{person.contact}</span>}
            </li>
          ))}
        </ol>
      ),
    },
  ].filter(Boolean)

  return (
    <div className="px-[4.8em] py-[3.6em]">
      <header data-block="" className="relative min-h-[10em]">
        <h1
          className={`pt-[1.8em] text-center text-(--cv-accent) ${
            lang === 'km' ? 'font-moul text-[1.9em]' : 'text-[1.9em] font-bold tracking-[0.2em] uppercase'
          }`}
        >
          {t('cv.title')}
        </h1>
        <div className="mx-auto mt-[0.6em] h-[0.15em] w-[12em] bg-(--cv-accent)" />
        <p className="mt-[0.7em] text-center text-[1.2em] font-semibold">{name.main}</p>
        {personal.headline && <p className="text-center text-ink/70">{personal.headline}</p>}
        {settings.showPhoto && <Photo src={cv.photo} size="8em" className="absolute top-0 right-0" />}
      </header>

      {sections.map((section, index) => (
        <section key={section.title} className="mt-[1.6em]">
          <SectionTitle className="mb-[0.5em] text-[1.08em] font-bold">
            {ROMAN[index]}.{' '}
            <span className="border-b border-(--cv-accent) pb-[0.1em] text-(--cv-accent)">{section.title}</span>
          </SectionTitle>
          <div className="pl-[1.8em]">{section.body}</div>
        </section>
      ))}
    </div>
  )
}
