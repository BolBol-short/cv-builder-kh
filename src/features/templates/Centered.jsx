// Centered: photo and name in the middle, personal details in a row under
// them, then two equal columns.
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
    <section className="mt-[1.5em]">
      <SectionTitle className="mb-[0.6em] border-l-4 border-(--cv-accent) pl-[0.6em] text-[1.1em] font-bold">
        {title}
      </SectionTitle>
      {children}
    </section>
  )
}

export function Centered({ cv, settings, t, lang }) {
  const name = cvName(cv.personal, lang, t)
  const facts = personalFacts(cv.personal, t, lang)
  const contacts = contactItems(cv)
  const show = filledSections(cv)

  return (
    <div className="px-[4em] py-[3.4em]">
      <header data-block="" className="flex flex-col items-center text-center">
        {settings.showPhoto && <Photo src={cv.photo} size="8em" className="mb-[0.8em]" />}
        <h1 className="text-[2.4em] leading-tight font-bold">{name.main}</h1>
        {name.other && <p className="text-ink/70">{name.other}</p>}
        {cv.personal.headline && (
          <p className="mt-[0.2em] text-[1.15em] font-medium text-(--cv-accent)">{cv.personal.headline}</p>
        )}
        {contacts.length > 0 && (
          <ContactList items={contacts} className="mt-[0.8em] flex flex-wrap justify-center gap-x-[1.4em] space-y-0" />
        )}
      </header>

      {facts.length > 0 && (
        <dl
          data-block=""
          className="mt-[1.4em] grid grid-cols-3 gap-[0.6em] border-y border-ink/15 py-[0.8em] text-center"
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[0.85em] text-ink/70">{fact.label}</dt>
              <dd className="font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="grid grid-cols-2 gap-x-[2.4em]">
        <div>
          {show.summary && (
            <Section title={t('section.summary')}>
              <p data-block="" className="whitespace-pre-line text-ink/80">
                {cv.summary}
              </p>
            </Section>
          )}
          {show.experience && (
            <Section title={t('section.experience')}>
              <ExperienceEntries cv={cv} t={t} lang={lang} />
            </Section>
          )}
        </div>
        <div>
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
          {show.hobbies && (
            <Section title={t('section.hobbies')}>
              <p data-block="">{cv.hobbies.join(', ')}</p>
            </Section>
          )}
        </div>
      </div>

      {show.references && (
        <Section title={t('section.references')}>
          <ReferenceEntries cv={cv} />
        </Section>
      )}
    </div>
  )
}
