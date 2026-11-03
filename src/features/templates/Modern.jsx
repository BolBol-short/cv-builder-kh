// Modern: a colored side column (photo, contact, personal details, skills,
// languages, hobbies) next to a white main column.
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
} from './parts.jsx'

function SideSection({ title, children }) {
  return (
    <section className="mb-[1.6em]">
      <SectionTitle className="mb-[0.5em] border-b border-paper/30 pb-[0.2em] text-[0.92em] font-bold tracking-widest uppercase">
        {title}
      </SectionTitle>
      {children}
    </section>
  )
}

function MainSection({ title, children }) {
  return (
    <section className="mt-[1.8em]">
      <SectionTitle className="mb-[0.7em] flex items-center gap-[0.6em] text-[1.15em] font-bold">
        <span className="h-[1.1em] w-[0.35em] rounded-full bg-(--cv-accent)" />
        {title}
      </SectionTitle>
      {children}
    </section>
  )
}

export function Modern({ cv, settings, t, lang }) {
  const name = cvName(cv.personal, lang, t)
  const facts = personalFacts(cv.personal, t, lang)
  const contacts = contactItems(cv)
  const show = filledSections(cv)

  return (
    <div className="grid min-h-[1085px] grid-cols-[19em_1fr]">
      <aside className="bg-(--cv-accent) px-[2em] py-[3em] text-paper">
        {settings.showPhoto && cv.photo && (
          <div data-block="" className="mb-[1.6em] flex justify-center">
            <Photo src={cv.photo} size="10em" className="border-4 border-paper/40" />
          </div>
        )}
        {contacts.length > 0 && (
          <SideSection title={t('section.contact')}>
            <ContactList items={contacts} iconClass="text-paper/70" />
          </SideSection>
        )}
        {facts.length > 0 && (
          <SideSection title={t('section.personal')}>
            <dl className="space-y-[0.4em]">
              {facts.map((fact) => (
                <div key={fact.label} data-block="">
                  <dt className="text-[0.85em] text-paper/70 uppercase">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </SideSection>
        )}
        {show.skills && (
          <SideSection title={t('section.skills')}>
            <ul className="space-y-[0.25em]">
              {cv.skills.map((skill) => (
                <li key={skill} data-block="" className="flex items-center gap-[0.5em]">
                  <span className="h-[0.4em] w-[0.4em] shrink-0 rounded-full bg-paper/70" />
                  {skill}
                </li>
              ))}
            </ul>
          </SideSection>
        )}
        {show.languages && (
          <SideSection title={t('section.languages')}>
            <LanguageEntries cv={cv} t={t} levelClass="text-paper/70" />
          </SideSection>
        )}
        {show.hobbies && (
          <SideSection title={t('section.hobbies')}>
            <p data-block="">{cv.hobbies.join(' · ')}</p>
          </SideSection>
        )}
      </aside>

      <main className="px-[2.6em] py-[3.4em]">
        <header data-block="">
          <h1 className="text-[2.5em] leading-tight font-bold">{name.main}</h1>
          {name.other && <p className="text-[1.1em] text-ink/70">{name.other}</p>}
          {cv.personal.headline && (
            <p className="mt-[0.3em] text-[1.2em] font-medium tracking-wide text-(--cv-accent) uppercase">
              {cv.personal.headline}
            </p>
          )}
        </header>
        {show.summary && (
          <MainSection title={t('section.about')}>
            <p data-block="" className="whitespace-pre-line text-ink/80">
              {cv.summary}
            </p>
          </MainSection>
        )}
        {show.experience && (
          <MainSection title={t('section.experience')}>
            <ExperienceEntries cv={cv} t={t} lang={lang} />
          </MainSection>
        )}
        {show.education && (
          <MainSection title={t('section.education')}>
            <EducationEntries cv={cv} t={t} lang={lang} />
          </MainSection>
        )}
        {show.certifications && (
          <MainSection title={t('section.certifications')}>
            <CertificationEntries cv={cv} lang={lang} />
          </MainSection>
        )}
        {show.references && (
          <MainSection title={t('section.references')}>
            <ReferenceEntries cv={cv} />
          </MainSection>
        )}
      </main>
    </div>
  )
}
