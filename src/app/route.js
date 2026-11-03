// A tiny router using the part of the address after "#":
//   #/                       -> start screen
//   #/edit/<cv id>/<step id> -> editor
// Using "#" means the server never sees these addresses, so any static host works.
import { useEffect, useState } from 'react'

export function parseRoute(hash) {
  const parts = hash.replace(/^#\/?/, '').split('/')
  if (parts[0] === 'edit' && parts[1]) {
    return { screen: 'edit', documentId: parts[1], stepId: parts[2] || 'style' }
  }
  return { screen: 'start' }
}

export function editPath(documentId, stepId = 'style') {
  return `/edit/${documentId}/${stepId}`
}

export function goTo(path) {
  window.location.hash = path
}

export function useRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return parseRoute(hash)
}
