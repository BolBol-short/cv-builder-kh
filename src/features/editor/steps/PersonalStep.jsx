// Step 3: contact details and the personal facts Cambodian CVs usually show.
import { useId } from 'react'
import { useDocument } from '../../../app/documentContext.js'
import { useI18n } from '../../../shared/i18n.js'
import { SelectField, TextField } from '../../../shared/ui/Field.jsx'
import { TextList } from '../fields/TextList.jsx'
import { GENDERS, MARITAL_STATUSES, NATIONALITY_OPTIONS } from '../options.js'
import { useGuide } from '../useGuide.js'

export function PersonalStep() {
  const { t } = useI18n()
  const { document, dispatch } = useDocument()
  const guide = useGuide()
  const nationalityListId = useId()
  const { personal } = document.cv
  const setPersonal = (field) => (value) => dispatch({ type: 'setPersonal', field, value })
  const optionsFor = (group, codes) => codes.map((code) => ({ value: code, label: t(`${group}.${code}`) }))

  return (
    <div className="space-y-6">
      <TextField
        label={t('field.phone')}
        {...guide('phone')}
        value={personal.phone}
        onChange={setPersonal('phone')}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
      />
      <TextField
        label={t('field.email')}
        {...guide('email')}
        value={personal.email}
        onChange={setPersonal('email')}
        type="email"
        inputMode="email"
        autoComplete="email"
      />
      <TextField
        label={t('field.address')}
        {...guide('address')}
        value={personal.address}
        onChange={setPersonal('address')}
        autoComplete="street-address"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label={t('field.gender')}
          options={optionsFor('gender', GENDERS)}
          value={personal.gender}
          onChange={setPersonal('gender')}
        />
        <SelectField
          label={t('field.maritalStatus')}
          options={optionsFor('marital', MARITAL_STATUSES)}
          value={personal.maritalStatus}
          onChange={setPersonal('maritalStatus')}
        />
        <TextField
          label={t('field.dateOfBirth')}
          type="date"
          value={personal.dateOfBirth}
          onChange={setPersonal('dateOfBirth')}
          autoComplete="bday"
        />
        <TextField
          label={t('field.placeOfBirth')}
          {...guide('placeOfBirth')}
          value={personal.placeOfBirth}
          onChange={setPersonal('placeOfBirth')}
        />
      </div>

      <TextField
        label={t('field.nationality')}
        {...guide('nationality')}
        value={personal.nationality}
        onChange={setPersonal('nationality')}
        list={nationalityListId}
      />
      <datalist id={nationalityListId}>
        {NATIONALITY_OPTIONS[document.settings.cvLang].map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>

      <TextField
        label={t('field.salaryExpectation')}
        {...guide('salaryExpectation')}
        value={personal.salaryExpectation}
        onChange={setPersonal('salaryExpectation')}
      />

      <TextList list="links" label={t('field.links')} {...guide('links')} inputMode="url" />
    </div>
  )
}
