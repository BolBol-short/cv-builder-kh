// Classic: one column. Photo and contact details at the top, then each section.
import { contactItems, cvName, filledSections, personalFacts } from './cvData.js'
import {
  CertificationEntries,
  ContactList,
  EducationEntries,
  ExperienceEntries,
  LanguageEntries,
  Photo,
  ReferenceEntries,
  SectionTitle,
  Tags,
} from './parts.jsx'

function Section({ title, children }) {
  return (
    <section className="mt-[1.4em]">
      <SectionTitle className="mb-[0.5em] border-b border-ink/15 pb-[0.2em] font-bold tracking-wider text-(--cv-accent) uppercase">
        {title}
      </SectionTitle>
      {children}
    </section>
  )
}

export function Classic({ cv, settings, t, lang }) {
  const name = cvName(cv.personal, lang, t)
  const facts = personalFacts(cv.personal, t, lang)
  const show = filledSections(cv)

  return (
    <div className="px-[4.2em] py-[3.6em]">
      <header data-block="" className="flex items-center gap-[1.6em] border-b-2 border-(--cv-accent) pb-[1.4em]">
        {settings.showPhoto && <Photo src={cv.photo} size="7.5em" />}
        <div className="min-w-0 flex-1">
          <h1 className="text-[2.2em] leading-tight font-bold">{name.main}</h1>
          {name.other && <p className="text-[1.05em] text-ink/70">{name.other}</p>}
          {cv.personal.headline && (
            <p className="mt-[0.2em] text-[1.15em] font-medium text-(--cv-accent)">{cv.personal.headline}</p>
          )}
          <ContactList items={contactItems(cv)} className="mt-[0.8em] grid grid-cols-2 gap-x-[1.2em] space-y-0" />
        </div>
      </header>

      {facts.length > 0 && (
        <Section title={t('section.personal')}>
          <dl className="grid grid-cols-2 gap-x-[1.5em] gap-y-[0.25em]">
            {facts.map((fact) => (
              <div key={fact.label} data-block="" className="flex gap-[0.5em]">
                <dt className="w-[9em] shrink-0 text-ink/70">{fact.label}</dt>
                <dd className="font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {show.summary && (
        <Section title={t('section.summary')}>
          <p data-block="" className="whitespace-pre-line">
            {cv.summary}
          </p>
        </Section>
      )}
      {show.experience && (
        <Section title={t('section.experience')}>
          <ExperienceEntries cv={cv} t={t} lang={lang} />
        </Section>
      )}
      {show.education && (
        <Section title={t('section.education')}>
          <EducationEntries cv={cv} t={t} lang={lang} />
        </Section>
      )}
      {show.certifications && (
        <Section title={t('section.certifications')}>
          <CertificationEntries cv={cv} lang={lang} />
        </Section>
      )}

      <div className="grid grid-cols-2 gap-x-[2.4em]">
        {show.skills && (
          <Section title={t('section.skills')}>
            <Tags items={cv.skills} />
          </Section>
        )}
        {show.languages && (
          <Section title={t('section.languages')}>
            <LanguageEntries cv={cv} t={t} />
          </Section>
        )}
      </div>

      {show.hobbies && (
        <Section title={t('section.hobbies')}>
          <Tags items={cv.hobbies} />
        </Section>
      )}
      {show.references && (
        <Section title={t('section.references')}>
          <ReferenceEntries cv={cv} />
        </Section>
      )}
    </div>
  )
}
