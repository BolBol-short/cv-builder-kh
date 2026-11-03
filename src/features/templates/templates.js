// Template id -> template component. To add a template: create the component,
// add it here, add its id to TEMPLATE_IDS in storage/schema.js, and add a
// "template.<id>" name to both language files.
import { Classic } from './Classic.jsx'
import { Minimal } from './Minimal.jsx'
import { Modern } from './Modern.jsx'
import { Professional } from './Professional.jsx'
import { Traditional } from './Traditional.jsx'

export const TEMPLATES = {
  traditional: Traditional,
  classic: Classic,
  modern: Modern,
  professional: Professional,
  minimal: Minimal,
}
