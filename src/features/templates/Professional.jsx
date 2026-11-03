// Professional: a colored band across the top, then a wide main column and a
// lightly tinted side column.
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
    <section className="mb-[1.6em]">
      <SectionTitle className="mb-[0.6em] font-bold tracking-wider text-(--cv-accent) uppercase">{title}</SectionTitle>
      {children}
    </section>
  )
}

export function Professional({ cv, settings, t, lang }) {
  const name = cvName(cv.personal, lang, t)
  const facts = personalFacts(cv.personal, t, lang)
  const contacts = contactItems(cv)
  const show = filledSections(cv)
  const tagStyle = 'bg-paper ring-1 ring-ink/15'

  return (
    <div className="flex min-h-[1085px] flex-col">
      <header data-block="" className="flex items-center gap-[1.8em] bg-(--cv-accent) px-[3.6em] py-[2.6em] text-paper">
        {settings.showPhoto && <Photo src={cv.photo} size="8em" className="border-2 border-paper/50" />}
        <div className="min-w-0 flex-1">
          <h1 className="text-[2.4em] leading-tight font-bold">{name.main}</h1>
          {name.other && <p className="text-[1.05em] text-paper/80">{name.other}</p>}
          {cv.personal.headline && <p className="mt-[0.2em] text-[1.2em] text-paper/90">{cv.personal.headline}</p>}
        </div>
      </header>

      <div className="grid flex-1 grid-cols-[1fr_18em]">
        <main className="px-[3.6em] py-[2.4em]">
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
          {show.references && (
            <Section title={t('section.references')}>
              <ReferenceEntries cv={cv} />
            </Section>
          )}
        </main>

        <aside className="bg-(--cv-accent)/8 px-[2em] py-[2.4em]">
          {contacts.length > 0 && (
            <Section title={t('section.contact')}>
              <ContactList items={contacts} />
            </Section>
          )}
          {facts.length > 0 && (
            <Section title={t('section.personal')}>
              <dl className="space-y-[0.4em]">
                {facts.map((fact) => (
                  <div key={fact.label} data-block="">
                    <dt className="text-[0.85em] text-ink/60 uppercase">{fact.label}</dt>
                    <dd className="font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}
          {show.skills && (
            <Section title={t('section.skills')}>
              <Tags items={cv.skills} className={tagStyle} />
            </Section>
          )}
          {show.languages && (
            <Section title={t('section.languages')}>
              <LanguageEntries cv={cv} t={t} />
            </Section>
          )}
          {show.hobbies && (
            <Section title={t('section.hobbies')}>
              <Tags items={cv.hobbies} className={tagStyle} />
            </Section>
          )}
        </aside>
      </div>
    </div>
  )
}
