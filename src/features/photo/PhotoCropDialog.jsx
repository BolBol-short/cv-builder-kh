// The pop-up where the user moves and zooms the photo inside a circle.
// This file is loaded only when needed, so the crop tool does not slow down the app.
import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { useI18n } from '../../shared/i18n.js'
import { Button } from '../../shared/ui/Button.jsx'
import { Dialog } from '../../shared/ui/Dialog.jsx'
import { cropPhoto } from './cropPhoto.js'

export default function PhotoCropDialog({ imageUrl, onCancel, onDone }) {
  const { t } = useI18n()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [area, setArea] = useState(null)
  const [error, setError] = useState('')

  async function usePhoto() {
    try {
      onDone(await cropPhoto(imageUrl, area))
    } catch (cropError) {
      setError(t(cropError.message))
    }
  }

  return (
    <Dialog
      open
      onClose={onCancel}
      title={t('photo.cropTitle')}
      actions={
        <>
          <Button onClick={onCancel}>{t('action.cancel')}</Button>
          <Button variant="primary" onClick={usePhoto} disabled={!area}>
            {t('action.usePhoto')}
          </Button>
        </>
      }
    >
      <div className="relative h-72 overflow-hidden rounded-lg bg-ink">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, pixels) => setArea(pixels)}
        />
      </div>
      <label className="mt-4 block">
        <span className="text-sm font-semibold">{t('field.zoom')}</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(event) => setZoom(Number(event.target.value))}
          className="mt-1 w-full accent-accent"
        />
      </label>
      {error && (
        <p role="alert" className="mt-2 font-semibold">
          {error}
        </p>
      )}
    </Dialog>
  )
}
