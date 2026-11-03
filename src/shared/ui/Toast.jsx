// A short message at the bottom of the screen, with an optional button
// (for example "Entry removed - Undo"). Screen readers announce it.
import { useCallback, useEffect, useState } from 'react'
import { Button } from './Button.jsx'
import { ToastContext } from './toastContext.js'

const SHOW_FOR_MS = 7000

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null) // { message, actionLabel, onAction }

  const showToast = useCallback((nextToast) => setToast({ ...nextToast, key: Date.now() }), [])

  // Hide the toast after a few seconds.
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), SHOW_FOR_MS)
    return () => clearTimeout(timer)
  }, [toast])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 lg:bottom-6"
      >
        {toast && (
          <div className="pointer-events-auto flex items-center gap-3 rounded-lg bg-ink px-4 py-2 text-paper shadow-lg">
            <span>{toast.message}</span>
            {toast.actionLabel && (
              <Button
                variant="ghost"
                className="text-paper hover:bg-paper/10"
                onClick={() => {
                  toast.onAction()
                  setToast(null)
                }}
              >
                {toast.actionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}
