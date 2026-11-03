// Edits a list of entries (jobs, schools, references...). Each entry is a card
// with its fields, plus buttons to move it up, down, or remove it (with Undo).
//
// `fields` describes the inputs of one entry, for example:
//   { name: 'jobTitle', label: 'Job title' }
//   { name: 'description', label, type: 'textarea', tip }
//   { name: 'level', label, type: 'select', options: [{ value, label }] }
//   { name: 'startDate', label, type: 'month' }
//   { name: 'endDate', label, type: 'month', disabledWhen: (item) => item.current }
//   { name: 'current', label, type: 'checkbox' }
//   { name: 'language', label, suggestions: ['Khmer', ...] }
import { useId, useRef } from 'react'
import { useDocument } from '../../../app/documentContext.js'
import { useI18n } from '../../../shared/i18n.js'
import { Button, IconButton } from '../../../shared/ui/Button.jsx'
import { CheckboxField, MonthYearField, SelectField, TextAreaField, TextField } from '../../../shared/ui/Field.jsx'
import { useToast } from '../../../shared/ui/toastContext.js'

// headingLevel: 2 when the list is the main content of a step, 3 when it sits under a sub-heading.
export function ObjectList({ list, fields, titleOf, headingLevel = 2 }) {
  const { t } = useI18n()
  const { document, dispatch } = useDocument()
  const showToast = useToast()
  const addButtonRef = useRef(null)
  const items = document.cv[list]
  const Heading = headingLevel === 3 ? 'h3' : 'h2'

  function remove(item, index) {
    dispatch({ type: 'removeItem', list, id: item.id })
    addButtonRef.current?.focus() // keep keyboard users in a sensible place
    showToast({
      message: t('toast.removed'),
      actionLabel: t('action.undo'),
      onAction: () => dispatch({ type: 'insertItem', list, item, index }),
    })
  }

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <p className="rounded-lg border border-dashed border-ink/25 p-4 text-center text-ink/70">{t('field.empty')}</p>
      )}

      {items.map((item, index) => {
        const title = titleOf(item) || t('field.untitled')
        return (
          <div key={item.id} className="rounded-xl border border-ink/15 p-4">
            <div className="mb-3 flex items-center gap-1">
              <Heading className="min-w-0 flex-1 truncate text-base font-semibold">{title}</Heading>
              <IconButton
                icon="up"
                label={`${t('action.moveUp')}: ${title}`}
                disabled={index === 0}
                onClick={() => dispatch({ type: 'moveItem', list, id: item.id, direction: -1 })}
              />
              <IconButton
                icon="down"
                label={`${t('action.moveDown')}: ${title}`}
                disabled={index === items.length - 1}
                onClick={() => dispatch({ type: 'moveItem', list, id: item.id, direction: 1 })}
              />
              <IconButton icon="trash" label={`${t('action.remove')}: ${title}`} onClick={() => remove(item, index)} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <ItemField
                  key={field.name}
                  field={field}
                  item={item}
                  onChange={(value) => dispatch({ type: 'updateItem', list, id: item.id, field: field.name, value })}
                />
              ))}
            </div>
          </div>
        )
      })}

      <Button ref={addButtonRef} icon="plus" className="w-full" onClick={() => dispatch({ type: 'addItem', list })}>
        {t('action.addEntry')}
      </Button>
    </div>
  )
}

function ItemField({ field, item, onChange }) {
  const listId = useId()
  const value = item[field.name]
  const isWide = field.wide || field.type === 'textarea' || field.type === 'checkbox'
  const className = isWide ? 'sm:col-span-2' : ''

  if (field.type === 'checkbox') {
    return <CheckboxField className={className} label={field.label} checked={value} onChange={onChange} />
  }
  if (field.type === 'textarea') {
    return <TextAreaField className={className} {...field} value={value} onChange={onChange} />
  }
  if (field.type === 'select') {
    return (
      <SelectField
        className={className}
        label={field.label}
        options={field.options}
        value={value}
        onChange={onChange}
      />
    )
  }
  if (field.type === 'month') {
    return (
      <MonthYearField
        className={className}
        label={field.label}
        value={value}
        onChange={onChange}
        disabled={field.disabledWhen?.(item)}
      />
    )
  }

  // A plain text box, with an optional list of suggestions shown by the browser.
  return (
    <>
      <TextField
        className={className}
        label={field.label}
        tip={field.tip}
        example={field.example}
        value={value}
        onChange={onChange}
        list={field.suggestions ? listId : undefined}
      />
      {field.suggestions && (
        <datalist id={listId}>
          {field.suggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
      )}
    </>
  )
}
