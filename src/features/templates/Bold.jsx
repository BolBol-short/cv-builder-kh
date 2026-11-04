// Bold: a large colored header with the name, and section titles shown as
// colored labels. Strong and easy to scan.
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
    <section className="mt-[1.6em]">
      <SectionTitle className="mb-[0.7em]">
        <span className="inline-block rounded-[0.3em] bg-(--cv-accent) px-[0.7em] py-[0.15em] text-[1em] font-bold text-paper uppercase">
          {title}
        </span>
      </SectionTitle>
      {children}
    </section>
  )
}

export function Bold({ cv, settings, t, lang }) {
  const name = cvName(cv.personal, lang, t)
  const facts = personalFacts(cv.personal, t, lang)
  const show = filledSections(cv)

  return (
    <div>
      <header data-block="" className="flex items-center gap-[2em] bg-(--cv-accent) px-[4em] py-[2.8em] text-paper">
        <div className="min-w-0 flex-1">
          <h1 className="text-[3em] leading-none font-extrabold">{name.main}</h1>
          {name.other && <p className="mt-[0.3em] text-[1.1em] text-paper/85">{name.other}</p>}
          {cv.personal.headline && (
            <p className="mt-[0.4em] text-[1.25em] font-semibold tracking-wide uppercase">{cv.personal.headline}</p>
          )}
        </div>
        {settings.showPhoto && <Photo src={cv.photo} size="8.5em" className="border-4 border-paper" />}
      </header>

      <div className="px-[4em] py-[1.6em]">
        <div data-block="" className="flex flex-wrap gap-x-[2em] gap-y-[0.4em] border-b-2 border-ink/10 pb-[1em]">
          <ContactList items={contactItems(cv)} className="flex flex-wrap gap-x-[1.6em] space-y-0" />
        </div>

        {facts.length > 0 && (
          <Section title={t('section.personal')}>
            <dl className="grid grid-cols-3 gap-[0.6em]">
              {facts.map((fact) => (
                <div key={fact.label} data-block="">
                  <dt className="text-[0.85em] text-ink/70">{fact.label}</dt>
                  <dd className="font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}
        {show.summary && (
          <Section title={t('section.summary')}>
            <p data-block="" className="text-[1.05em] whitespace-pre-line">
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
    </div>
  )
}
