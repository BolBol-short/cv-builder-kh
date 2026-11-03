// Building blocks shared by all templates.
//
// Page splitting: anything marked with `data-block` is never cut in half by a
// page break; it moves to the next page instead. A section title is marked
// `data-block="heading"` so it is never left alone at the bottom of a page.
//
// Sizes use "em", so the whole CV grows or shrinks with the text-size setting.
import { formatMonth, formatRange } from '../../shared/format/dates.js'
import { toBullets } from '../../shared/format/text.js'
import { optionLabel } from '../../shared/i18n.js'
import { Icon } from '../../shared/ui/Icon.jsx'

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 data-block="heading" className={className}>
      {children}
    </h2>
  )
}

// The profile photo. It is always a circle.
export function Photo({ src, size = '8em', className = '' }) {
  if (!src) return null
  return (
    <img
      src={src}
      alt=""
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

export function Bullets({ text, className = '' }) {
  const lines = toBullets(text)
  if (lines.length === 0) return null
  if (lines.length === 1) return <p className={className}>{lines[0]}</p>
  return (
    <ul className={`list-disc pl-[1.2em] marker:text-(--cv-accent) ${className}`}>
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  )
}

export function Tags({ items, className = 'bg-ink/5' }) {
  return (
    <div data-block="" className="flex flex-wrap gap-[0.4em]">
      {items.map((item) => (
        <span key={item} className={`rounded px-[0.6em] py-[0.15em] text-[0.92em] ${className}`}>
          {item}
        </span>
      ))}
    </div>
  )
}

export function ContactList({ items, iconClass = 'text-(--cv-accent)', className = '' }) {
  return (
    <ul className={`space-y-[0.35em] ${className}`}>
      {items.map((item) => (
        <li key={item.icon + item.value} data-block="" className="flex items-start gap-[0.5em] break-all">
          <span className={`mt-[0.15em] ${iconClass}`}>
            <Icon name={item.icon} className="h-[1em] w-[1em]" />
          </span>
          <span>{item.value}</span>
        </li>
      ))}
    </ul>
  )
}

// One job or school: title, place, dates and bullet points.
export function Entry({ title, subtitle, date, body }) {
  return (
    <div data-block="" className="mb-[0.9em] last:mb-0">
      <div className="flex items-baseline justify-between gap-[1em]">
        <p className="text-[1.08em] font-semibold">{title}</p>
        {date && <p className="shrink-0 text-[0.92em] text-ink/60">{date}</p>}
      </div>
      {subtitle && <p className="text-(--cv-accent)">{subtitle}</p>}
      {body && <Bullets text={body} className="mt-[0.25em] text-ink/80" />}
    </div>
  )
}

// ---- Section contents, the same in every template ----

export function ExperienceEntries({ cv, t, lang }) {
  return cv.experience.map((job) => (
    <Entry
      key={job.id}
      title={job.jobTitle}
      subtitle={[job.company, job.location].filter(Boolean).join(' · ')}
      date={formatRange(job, t, lang)}
      body={job.description}
    />
  ))
}

export function EducationEntries({ cv, t, lang }) {
  return cv.education.map((school) => (
    <Entry
      key={school.id}
      title={school.degree || school.institution}
      subtitle={[school.degree ? school.institution : '', school.location].filter(Boolean).join(' · ')}
      date={formatRange(school, t, lang)}
      body={school.gpa ? `${t('field.gpa')}: ${school.gpa}` : ''}
    />
  ))
}

export function CertificationEntries({ cv, lang }) {
  return (
    <ul className="space-y-[0.35em]">
      {cv.certifications.map((item) => (
        <li key={item.id} data-block="">
          <span className="font-semibold">{item.name}</span>
          {item.issuer && <span className="text-ink/70"> — {item.issuer}</span>}
          {item.date && <span className="text-ink/60"> ({formatMonth(item.date, lang)})</span>}
        </li>
      ))}
    </ul>
  )
}

export function LanguageEntries({ cv, t, levelClass = 'text-ink/60' }) {
  return (
    <ul className="space-y-[0.25em]">
      {cv.languages
        .filter((item) => item.language)
        .map((item) => (
          <li key={item.id} data-block="" className="flex justify-between gap-[0.5em]">
            <span>{item.language}</span>
            {item.level && <span className={levelClass}>{optionLabel(t, 'level', item.level)}</span>}
          </li>
        ))}
    </ul>
  )
}

export function ReferenceEntries({ cv, columns = 2 }) {
  return (
    <div className={`grid gap-[0.9em] ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {cv.references.map((person) => (
        <div key={person.id} data-block="">
          <p className="font-semibold">{person.name}</p>
          {person.position && <p className="text-ink/70">{person.position}</p>}
          {person.organization && <p className="text-ink/70">{person.organization}</p>}
          {person.contact && <p className="text-(--cv-accent)">{person.contact}</p>}
        </div>
      ))}
    </div>
  )
}
