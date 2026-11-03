// Edits a list of short texts (skills, hobbies, links): type and press Add,
// or tap a suggestion. Added items show as chips with a remove button.
import { useId, useState } from 'react'
import { useDocument } from '../../../app/documentContext.js'
import { useI18n } from '../../../shared/i18n.js'
import { Button } from '../../../shared/ui/Button.jsx'
import { Field } from '../../../shared/ui/Field.jsx'
import { Icon } from '../../../shared/ui/Icon.jsx'

export function TextList({ list, label, tip, example, suggestions = [], inputMode = 'text' }) {
  const { t } = useI18n()
  const { document, dispatch } = useDocument()
  const [draft, setDraft] = useState('')
  const id = useId()
  const items = document.cv[list]
  const unusedSuggestions = suggestions.filter((suggestion) => !items.includes(suggestion))

  function add(text) {
    dispatch({ type: 'addText', list, text })
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          add(draft)
          setDraft('')
        }}
      >
        <Field id={id} label={label} tip={tip} example={example}>
          <div className="flex gap-2">
            <input
              id={id}
              className="min-h-11 w-full rounded-lg border border-ink/25 bg-paper px-3 py-2 text-base"
              value={draft}
              inputMode={inputMode}
              placeholder={t('field.typeAndAdd')}
              onChange={(event) => setDraft(event.target.value)}
              aria-describedby={tip || example ? `${id}-hint` : undefined}
            />
            <Button type="submit" variant="primary" disabled={!draft.trim()}>
              {t('action.add')}
            </Button>
          </div>
        </Field>
      </form>

      {items.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-1 rounded-full bg-accent/10 py-1 pr-1 pl-3">
              <span className="max-w-60 truncate">{item}</span>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent/20"
                aria-label={`${t('action.remove')}: ${item}`}
                onClick={() => dispatch({ type: 'removeText', list, text: item })}
              >
                <Icon name="x" className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {unusedSuggestions.length > 0 && (
        <div className="mt-3">
          <p className="mb-2 text-sm text-ink/60">{t('field.suggestions')}</p>
          <div className="flex flex-wrap gap-2">
            {unusedSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="inline-flex min-h-9 items-center gap-1 rounded-full border border-dashed border-ink/30 px-3 text-sm hover:border-accent hover:text-accent"
                onClick={() => add(suggestion)}
              >
                <Icon name="plus" className="h-4 w-4" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
