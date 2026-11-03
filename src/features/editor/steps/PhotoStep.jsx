// Step 2: photo, name in Khmer and English letters, and the job wanted.
import { useDocument } from '../../../app/documentContext.js'
import { useI18n } from '../../../shared/i18n.js'
import { TextField } from '../../../shared/ui/Field.jsx'
import { PhotoPicker } from '../../photo/PhotoPicker.jsx'
import { useGuide } from '../useGuide.js'

export function PhotoStep() {
  const { t } = useI18n()
  const { document, dispatch } = useDocument()
  const guide = useGuide()
  const { personal } = document.cv
  const setPersonal = (field) => (value) => dispatch({ type: 'setPersonal', field, value })

  return (
    <div className="space-y-6">
      <PhotoPicker />
      <TextField
        label={t('field.nameKm')}
        {...guide('nameKm')}
        value={personal.nameKm}
        onChange={setPersonal('nameKm')}
        lang="km"
      />
      <TextField
        label={t('field.nameLatin')}
        {...guide('nameLatin')}
        value={personal.nameLatin}
        onChange={setPersonal('nameLatin')}
        autoComplete="name"
      />
      <TextField
        label={t('field.headline')}
        {...guide('headline')}
        value={personal.headline}
        onChange={setPersonal('headline')}
      />
    </div>
  )
}
