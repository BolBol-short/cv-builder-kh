// The top of the app: picks the app language and shows the right screen.
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useRoute } from './app/route.js'
import { StartScreen } from './features/start/StartScreen.jsx'
import { getSavedUiLang, saveUiLang } from './features/storage/db.js'
import { I18nContext, isLang, makeT } from './shared/i18n.js'
import { ToastProvider } from './shared/ui/Toast.jsx'
import { UpdatePrompt } from './app/UpdatePrompt.jsx'

// The editor is loaded only when a CV is opened, so the start screen appears faster.
const Editor = lazy(() => import('./features/editor/Editor.jsx').then((module) => ({ default: module.Editor })))

// Use the language chosen before, otherwise the phone's language.
function startingUiLang() {
  const saved = getSavedUiLang()
  if (isLang(saved)) return saved
  return navigator.language?.startsWith('km') ? 'km' : 'en'
}

export default function App() {
  const [uiLang, setUiLang] = useState(startingUiLang)
  const i18n = useMemo(() => ({ lang: uiLang, t: makeT(uiLang) }), [uiLang])
  const route = useRoute()

  useEffect(() => {
    document.documentElement.lang = uiLang
    saveUiLang(uiLang)
  }, [uiLang])

  return (
    <I18nContext.Provider value={i18n}>
      <ToastProvider>
        <UpdatePrompt />
        {route.screen === 'edit' ? (
          <Suspense fallback={null}>
            <Editor documentId={route.documentId} stepId={route.stepId} onUiLang={setUiLang} />
          </Suspense>
        ) : (
          <StartScreen onUiLang={setUiLang} />
        )}
      </ToastProvider>
    </I18nContext.Provider>
  )
}
