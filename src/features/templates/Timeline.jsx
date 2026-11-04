// Timeline: jobs and schools hang on a vertical line, each with a dot and its dates.
import { formatRange } from '../../shared/format/dates.js'
import { contactItems, cvName, filledSections, personalFacts } from './cvData.js'
import {
  Bullets,
  CertificationEntries,
  ContactList,
  LanguageEntries,
  Photo,
  ReferenceEntries,
  SectionTitle,
  Tags,
} from './parts.jsx'

function Section({ title, children }) {
  return (
    <section className="mt-[1.6em]">
      <SectionTitle className="mb-[0.7em] text-[1.2em] font-bold text-(--cv-accent)">{title}</SectionTitle>
      {children}
    </section>
  )
}

// One point on the line: dot, dates, title, place and bullet points.
function TimelineItem({ date, title, subtitle, body }) {
  return (
    <div data-block="" className="relative border-l-2 border-(--cv-accent)/30 pb-[1em] pl-[1.4em] last:pb-0">
      <span className="absolute top-[0.35em] -left-[0.45em] h-[0.8em] w-[0.8em] rounded-full border-2 border-paper bg-(--cv-accent)" />
      {date && <p className="text-[0.9em] font-semibold text-(--cv-accent)">{date}</p>}
      <p className="text-[1.08em] font-semibold">{title}</p>
      {subtitle && <p className="text-ink/70">{subtitle}</p>}
      {body && <Bullets text={body} className="mt-[0.25em] text-ink/80" />}
    </div>
  )
}

export function Timeline({ cv, settings, t, lang }) {
  const name = cvName(cv.personal, lang, t)
  const facts = personalFacts(cv.personal, t, lang)
  const show = filledSections(cv)

  return (
    <div className="px-[4em] py-[3.4em]">
      <header data-block="" className="flex items-center gap-[1.6em]">
        {settings.showPhoto && <Photo src={cv.photo} size="7.5em" className="border-4 border-(--cv-accent)/20" />}
        <div className="min-w-0 flex-1">
          <h1 className="text-[2.3em] leading-tight font-bold">{name.main}</h1>
          {name.other && <p className="text-ink/70">{name.other}</p>}
          {cv.personal.headline && <p className="text-[1.15em] text-(--cv-accent)">{cv.personal.headline}</p>}
          <ContactList items={contactItems(cv)} className="mt-[0.6em] grid grid-cols-2 gap-x-[1.2em] space-y-0" />
        </div>
      </header>

      {facts.length > 0 && (
        <p data-block="" className="mt-[1.2em] rounded bg-(--cv-accent)/8 px-[0.8em] py-[0.4em] text-ink/80">
          {facts.map((fact) => `${fact.label}: ${fact.value}`).join('   ·   ')}
        </p>
      )}

      {show.summary && (
        <Section title={t('section.summary')}>
          <p data-block="" className="whitespace-pre-line text-ink/80">
            {cv.summary}
          </p>
        </Section>
      )}
      {show.experience && (
        <Section title={t('section.experience')}>
          {cv.experience.map((job) => (
            <TimelineItem
              key={job.id}
              date={formatRange(job, t, lang)}
              title={job.jobTitle}
              subtitle={[job.company, job.location].filter(Boolean).join(' · ')}
              body={job.description}
            />
          ))}
        </Section>
      )}
      {show.education && (
        <Section title={t('section.education')}>
          {cv.education.map((school) => (
            <TimelineItem
              key={school.id}
              date={formatRange(school, t, lang)}
              title={school.degree || school.institution}
              subtitle={[school.degree ? school.institution : '', school.location].filter(Boolean).join(' · ')}
              body={school.gpa ? `${t('field.gpa')}: ${school.gpa}` : ''}
            />
          ))}
        </Section>
      )}
      {show.certifications && (
        <Section title={t('section.certifications')}>
          <CertificationEntries cv={cv} lang={lang} />
        </Section>
      )}

      <div className="grid grid-cols-3 gap-x-[2em]">
        {show.skills && (
          <Section title={t('section.skills')}>
            <Tags items={cv.skills} className="bg-(--cv-accent)/10" />
          </Section>
        )}
        {show.languages && (
          <Section title={t('section.languages')}>
            <LanguageEntries cv={cv} t={t} />
          </Section>
        )}
        {show.hobbies && (
          <Section title={t('section.hobbies')}>
            <p data-block="">{cv.hobbies.join(', ')}</p>
          </Section>
        )}
      </div>

      {show.references && (
        <Section title={t('section.references')}>
          <ReferenceEntries cv={cv} />
        </Section>
      )}
    </div>
  )
}
