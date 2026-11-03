import { createContext, useContext } from 'react'

// Gives every editor component the open CV, a way to change it (`dispatch`),
// and the save status. Set up by <DocumentProvider>.
export const DocumentContext = createContext(null)

export function useDocument() {
  return useContext(DocumentContext)
}
