// The order of the editor steps. Each has an id (used in the address bar),
// an icon, and a component that shows its fields.
import { PersonalStep } from './PersonalStep.jsx'
import { PhotoStep } from './PhotoStep.jsx'
import { ReviewStep } from './ReviewStep.jsx'
import { StyleStep } from './StyleStep.jsx'
import { EducationStep, ExperienceStep, ReferencesStep, SkillsStep, SummaryStep } from './ListSteps.jsx'

export const STEPS = [
  { id: 'style', icon: 'palette', Component: StyleStep },
  { id: 'photo', icon: 'user', Component: PhotoStep },
  { id: 'personal', icon: 'phone', Component: PersonalStep },
  { id: 'summary', icon: 'text', Component: SummaryStep },
  { id: 'education', icon: 'cap', Component: EducationStep },
  { id: 'experience', icon: 'briefcase', Component: ExperienceStep },
  { id: 'skills', icon: 'star', Component: SkillsStep },
  { id: 'references', icon: 'users', Component: ReferencesStep },
  { id: 'review', icon: 'check', Component: ReviewStep },
]

export function stepIndex(stepId) {
  const index = STEPS.findIndex((step) => step.id === stepId)
  return index === -1 ? 0 : index
}
