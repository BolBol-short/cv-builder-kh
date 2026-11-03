import { createContext, useContext } from 'react'

// showToast({ message, actionLabel, onAction }) - set up by <ToastProvider>.
export const ToastContext = createContext(() => {})

export function useToast() {
  return useContext(ToastContext)
}
