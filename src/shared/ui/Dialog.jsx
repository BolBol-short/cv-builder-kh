// A pop-up window built on the browser's own <dialog> element, which already
// traps keyboard focus, closes on Escape, and is read correctly by screen readers.
import { useEffect, useId, useRef } from 'react'
import { useI18n } from '../i18n.js'
import { Button, IconButton } from './Button.jsx'

export function Dialog({ open, onClose, title, children, actions, wide = false }) {
  const { t } = useI18n()
  const ref = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal?.()
    if (!open && dialog.open) dialog.close?.()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      className={`m-auto w-[calc(100%-2rem)] rounded-xl bg-paper p-0 text-ink backdrop:bg-ink/50 ${wide ? 'max-w-3xl' : 'max-w-md'}`}
    >
      {open && (
        <div className="p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h2 id={titleId} className="text-lg font-bold">
              {title}
            </h2>
            <IconButton icon="x" label={t('action.close')} onClick={onClose} className="-mt-2 -mr-2" />
          </div>
          {children}
          {actions && <div className="mt-5 flex flex-wrap justify-end gap-2">{actions}</div>}
        </div>
      )}
    </dialog>
  )
}

// "Are you sure?" with Cancel and a confirm button.
export function ConfirmDialog({ open, message, confirmLabel, onConfirm, onCancel }) {
  const { t } = useI18n()
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      title={message}
      actions={
        <>
          <Button onClick={onCancel}>{t('action.cancel')}</Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    />
  )
}
