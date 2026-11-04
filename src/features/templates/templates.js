// Template id -> template component. To add a template: create the component,
// add it here, add its id to TEMPLATE_IDS in storage/schema.js, and add a
// "template.<id>" name to both language files.
import { Bold } from './Bold.jsx'
import { Centered } from './Centered.jsx'
import { Classic } from './Classic.jsx'
import { Compact } from './Compact.jsx'
import { Elegant } from './Elegant.jsx'
import { Minimal } from './Minimal.jsx'
import { Modern } from './Modern.jsx'
import { Professional } from './Professional.jsx'
import { Timeline } from './Timeline.jsx'
import { Traditional } from './Traditional.jsx'

export const TEMPLATES = {
  traditional: Traditional,
  classic: Classic,
  modern: Modern,
  professional: Professional,
  minimal: Minimal,
  compact: Compact,
  timeline: Timeline,
  elegant: Elegant,
  centered: Centered,
  bold: Bold,
}
