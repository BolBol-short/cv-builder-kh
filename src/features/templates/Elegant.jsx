// Elegant: a centered serif name, thin lines, and centered section titles.
// English letters use the phone's serif font; Khmer letters keep Kantumruy Pro.
import { contactItems, cvName, filledSections, personalFacts } from './cvData.js'
import {
  CertificationEntries,
  EducationEntries,
  ExperienceEntries,
  LanguageEntries,
  Photo,
  ReferenceEntries,
  SectionTitle,
} from './parts.jsx'

const SERIF = { fontFamily: 'Georgia, "Times New Roman", "Kantumruy Pro", serif' }

function Section({ title, children }) {
  return (
    <section className="mt-[1.8em]">
      <SectionTitle className="mb-[0.8em] flex items-center gap-[1em] text-[1.05em] tracking-[0.15em] text-(--cv-accent) uppercase">
        <span className="h-px flex-1 bg-(--cv-accent)/40" />
        <span style={SERIF}>{title}</span>
        <span className="h-px flex-1 bg-(--cv-accent)/40" />
      </SectionTitle>
      {children}
    </section>
  )
}

export function Elegant({ cv, settings, t, lang }) {
  const name = cvName(cv.personal, lang, t)
  const facts = personalFacts(cv.personal, t, lang)
  const contacts = contactItems(cv)
  const show = filledSections(cv)

  return (
    <div className="px-[5em] py-[4em]">
      <header data-block="" className="text-center">
        {settings.showPhoto && cv.photo && (
          <div className="mb-[1em] flex justify-center">
            <Photo src={cv.photo} size="7.5em" className="border border-(--cv-accent)/40 p-[0.3em]" />
          </div>
        )}
        <h1 className="text-[2.6em] leading-tight" style={SERIF}>
          {name.main}
        </h1>
        {name.other && <p className="text-ink/70">{name.other}</p>}
        {cv.personal.headline && (
          <p className="mt-[0.3em] text-[1.1em] text-(--cv-accent) italic" style={SERIF}>
            {cv.personal.headline}
          </p>
        )}
        {contacts.length > 0 && (
          <p className="mt-[0.8em] text-[0.92em] text-ink/70">{contacts.map((item) => item.value).join('  ·  ')}</p>
        )}
      </header>

      {facts.length > 0 && (
        <Section title={t('section.personal')}>
          <p data-block="" className="text-center text-ink/80">
            {facts.map((fact) => `${fact.label}: ${fact.value}`).join('   ·   ')}
          </p>
        </Section>
      )}
      {show.summary && (
        <Section title={t('section.summary')}>
          <p data-block="" className="text-center whitespace-pre-line text-ink/80">
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
      {(show.skills || show.languages) && (
        <div className="grid grid-cols-2 gap-x-[2.4em]">
          {show.skills && (
            <Section title={t('section.skills')}>
              <p data-block="" className="text-center">
                {cv.skills.join('  ·  ')}
              </p>
            </Section>
          )}
          {show.languages && (
            <Section title={t('section.languages')}>
              <LanguageEntries cv={cv} t={t} />
            </Section>
          )}
        </div>
      )}
      {show.hobbies && (
        <Section title={t('section.hobbies')}>
          <p data-block="" className="text-center">
            {cv.hobbies.join('  ·  ')}
          </p>
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
