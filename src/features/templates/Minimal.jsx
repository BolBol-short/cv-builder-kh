// Minimal: a centered header, lots of white space, section titles in a narrow
// left column. The color is used only for small details.
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

function Row({ title, children }) {
  return (
    <section className="grid grid-cols-[11em_1fr] gap-[1.8em] border-b border-ink/10 py-[1.1em]">
      <SectionTitle className="pt-[0.1em] text-[0.92em] font-semibold tracking-wider text-ink/50 uppercase">
        {title}
      </SectionTitle>
      <div>{children}</div>
    </section>
  )
}

export function Minimal({ cv, settings, t, lang }) {
  const name = cvName(cv.personal, lang, t)
  const facts = personalFacts(cv.personal, t, lang)
  const contacts = contactItems(cv)
  const show = filledSections(cv)

  return (
    <div className="px-[4.8em] py-[4.2em]">
      <header data-block="" className="text-center">
        {settings.showPhoto && cv.photo && (
          <div className="mb-[1em] flex justify-center">
            <Photo src={cv.photo} size="7em" />
          </div>
        )}
        <h1 className="text-[2.3em] font-light tracking-wide">{name.main}</h1>
        {name.other && <p className="text-ink/60">{name.other}</p>}
        {cv.personal.headline && (
          <p className="mt-[0.3em] tracking-[0.2em] text-(--cv-accent) uppercase">{cv.personal.headline}</p>
        )}
        {contacts.length > 0 && (
          <p className="mt-[0.8em] text-[0.92em] text-ink/60">{contacts.map((item) => item.value).join('   |   ')}</p>
        )}
      </header>

      <div className="mt-[2.2em] border-t border-ink/10">
        {facts.length > 0 && (
          <Row title={t('section.personal')}>
            <p data-block="" className="text-ink/80">
              {facts.map((fact) => `${fact.label}: ${fact.value}`).join('  ·  ')}
            </p>
          </Row>
        )}
        {show.summary && (
          <Row title={t('section.summary')}>
            <p data-block="" className="whitespace-pre-line text-ink/80">
              {cv.summary}
            </p>
          </Row>
        )}
        {show.experience && (
          <Row title={t('section.experience')}>
            <ExperienceEntries cv={cv} t={t} lang={lang} />
          </Row>
        )}
        {show.education && (
          <Row title={t('section.education')}>
            <EducationEntries cv={cv} t={t} lang={lang} />
          </Row>
        )}
        {show.certifications && (
          <Row title={t('section.certifications')}>
            <CertificationEntries cv={cv} lang={lang} />
          </Row>
        )}
        {show.skills && (
          <Row title={t('section.skills')}>
            <p data-block="" className="text-ink/80">
              {cv.skills.join('  ·  ')}
            </p>
          </Row>
        )}
        {show.languages && (
          <Row title={t('section.languages')}>
            <div className="max-w-[20em]">
              <LanguageEntries cv={cv} t={t} />
            </div>
          </Row>
        )}
        {show.hobbies && (
          <Row title={t('section.hobbies')}>
            <p data-block="" className="text-ink/80">
              {cv.hobbies.join('  ·  ')}
            </p>
          </Row>
        )}
        {show.references && (
          <Row title={t('section.references')}>
            <ReferenceEntries cv={cv} />
          </Row>
        )}
      </div>
    </div>
  )
}
