import { useDocument } from '../../app/documentContext.js'
import { makeT, useI18n } from '../../shared/i18n.js'

/**
 * Returns guide(name) -> { tip, example } for a field.
 * The tip is in the app language. The example is in the CV language,
 * because it shows what to type into the CV.
 */
export function useGuide() {
  const { t } = useI18n()
  const { document } = useDocument()
  const cvT = makeT(document.settings.cvLang)

  return function guide(name) {
    const tipKey = `guide.${name}.tip`
    const exampleKey = `guide.${name}.example`
    const tip = t(tipKey)
    const example = cvT(exampleKey)
    return {
      tip: tip === tipKey ? undefined : tip,
      example: example === exampleKey ? undefined : example,
    }
  }
}
