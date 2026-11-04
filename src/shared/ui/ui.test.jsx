import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axe from 'axe-core'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { Button, IconButton } from './Button.jsx'
import { CheckboxField, MonthYearField, SelectField, TextAreaField, TextField } from './Field.jsx'
import { StepProgress } from './StepProgress.jsx'

function Demo() {
  const [name, setName] = useState('')
  const [month, setMonth] = useState('')
  const [gender, setGender] = useState('')
  const [checked, setChecked] = useState(false)
  return (
    <main>
      <h1>Kit</h1>
      <StepProgress current={2} total={9} />
      <TextField label="Name" tip="Your full name." example="Sample Name" value={name} onChange={setName} />
      <TextAreaField label="Summary" value="" onChange={() => {}} />
      <SelectField label="Gender" value={gender} onChange={setGender} options={[{ value: 'male', label: 'Male' }]} />
      <MonthYearField label="Start" value={month} onChange={setMonth} />
      <CheckboxField label="I work here now" checked={checked} onChange={setChecked} />
      <Button variant="primary">Next</Button>
      <IconButton icon="trash" label="Remove" />
      <output data-testid="month">{month}</output>
    </main>
  )
}

describe('UI kit', () => {
  it('connects labels, tips and examples to the field', async () => {
    render(<Demo />)
    const input = screen.getByLabelText('Name')
    expect(input.getAttribute('aria-describedby')).toBeTruthy()
    const hint = document.getElementById(input.getAttribute('aria-describedby'))
    expect(hint.textContent).toContain('Your full name.')
    expect(hint.textContent).toContain('Example: Sample Name')

    await userEvent.type(input, 'Sam')
    expect(input.value).toBe('Sam')
  })

  it('stores a month as YYYY-MM only when month and year are chosen', async () => {
    render(<Demo />)
    await userEvent.selectOptions(screen.getByLabelText('Start: Year'), '2020')
    expect(screen.getByTestId('month').textContent).toBe('2020')
    await userEvent.selectOptions(screen.getByLabelText('Start: Month'), '03')
    expect(screen.getByTestId('month').textContent).toBe('2020-03')
  })

  it('has no accessibility problems that axe can find', async () => {
    const { container } = render(<Demo />)
    const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })
    expect(results.violations.map((violation) => violation.id)).toEqual([])
  })
})
