// Compact: small text and two columns, made to fit a full CV on one page.
// Good for fresh graduates and short CVs.
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
    <section className="mt-[1.1em]">
      <SectionTitle className="mb-[0.4em] border-b border-(--cv-accent) pb-[0.15em] text-[0.92em] font-bold tracking-wider text-(--cv-accent) uppercase">
        {title}
      </SectionTitle>
      {children}
    </section>
  )
}

export function Compact({ cv, settings, t, lang }) {
  const name = cvName(cv.personal, lang, t)
  const facts = personalFacts(cv.personal, t, lang)
  const show = filledSections(cv)

  return (
    <div className="px-[3.2em] py-[2.8em] text-[0.92em]">
      <header data-block="" className="flex items-center gap-[1.2em]">
        {settings.showPhoto && <Photo src={cv.photo} size="6em" />}
        <div className="min-w-0 flex-1">
          <h1 className="text-[1.9em] leading-tight font-bold">{name.main}</h1>
          {name.other && <p className="text-ink/70">{name.other}</p>}
          {cv.personal.headline && <p className="font-medium text-(--cv-accent)">{cv.personal.headline}</p>}
        </div>
        <ContactList items={contactItems(cv)} className="max-w-[18em] text-[0.92em]" />
      </header>

      <div className="mt-[0.4em] grid grid-cols-[1fr_15em] gap-x-[2em]">
        <main>
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
        </main>

        <aside>
          {facts.length > 0 && (
            <Section title={t('section.personal')}>
              <dl className="space-y-[0.25em]">
                {facts.map((fact) => (
                  <div key={fact.label} data-block="">
                    <dt className="text-[0.88em] text-ink/70">{fact.label}</dt>
                    <dd className="font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
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
          {show.references && (
            <Section title={t('section.references')}>
              <ReferenceEntries cv={cv} columns={1} />
            </Section>
          )}
        </aside>
      </div>
    </div>
  )
}
