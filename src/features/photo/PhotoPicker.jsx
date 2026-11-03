// Shows the current photo as a circle, with buttons to choose, change or remove it.
// On phones, choosing a photo also offers the camera.
import { lazy, Suspense, useRef, useState } from 'react'
import { useDocument } from '../../app/documentContext.js'
import { useI18n } from '../../shared/i18n.js'
import { Button } from '../../shared/ui/Button.jsx'
import { Icon } from '../../shared/ui/Icon.jsx'

const PhotoCropDialog = lazy(() => import('./PhotoCropDialog.jsx'))

export function PhotoPicker() {
  const { t } = useI18n()
  const { document, dispatch } = useDocument()
  const inputRef = useRef(null)
  const [chosenUrl, setChosenUrl] = useState(null) // the photo being cropped
  const photo = document.cv.photo

  function onFileChosen(event) {
    const file = event.target.files?.[0]
    event.target.value = '' // lets the same file be chosen again
    if (file) setChosenUrl(URL.createObjectURL(file))
  }

  function closeCrop() {
    URL.revokeObjectURL(chosenUrl)
    setChosenUrl(null)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink/15 bg-ink/5">
        {photo ? (
          <img src={photo} alt={t('field.photo')} className="h-full w-full object-cover" />
        ) : (
          <Icon name="user" className="h-10 w-10 text-ink/40" strokeWidth={1.5} />
        )}
      </div>

      <div className="space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-label={t('action.choosePhoto')}
          onChange={onFileChosen}
        />
        <Button icon="upload" onClick={() => inputRef.current?.click()}>
          {photo ? t('action.changePhoto') : t('action.choosePhoto')}
        </Button>
        {photo && (
          <Button
            variant="ghost"
            icon="trash"
            onClick={() => dispatch({ type: 'setCvField', field: 'photo', value: '' })}
          >
            {t('action.removePhoto')}
          </Button>
        )}
        <p className="text-sm text-ink/70">{t('guide.photo.tip')}</p>
      </div>

      {chosenUrl && (
        <Suspense fallback={null}>
          <PhotoCropDialog
            imageUrl={chosenUrl}
            onCancel={closeCrop}
            onDone={(dataUrl) => {
              dispatch({ type: 'setCvField', field: 'photo', value: dataUrl })
              closeCrop()
            }}
          />
        </Suspense>
      )}
    </div>
  )
}
