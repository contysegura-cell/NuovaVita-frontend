import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../../App.jsx'
import { newReportPath, patientDetailPath, PATHS, reportDetailPath } from '../../routes/paths.js'
import { reportService } from '../../services/index.js'
import { validateReport } from '../../utils/validation.js'

vi.mock('sweetalert2', () => ({ default: { fire: vi.fn() } }))

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('validateReport', () => {
  const today = new Date(2026, 9, 15)
  const valid = {
    patientId: 'pat-001',
    specialistId: 'spc-001',
    date: '2026-10-15',
    reason: 'Control',
    evaluation: 'Paciente estable, sin cambios.',
    nextControl: '',
  }

  it('acepta un informe completo', () => {
    expect(validateReport(valid, today)).toEqual({})
  })

  it('rechaza fecha futura, evaluación corta y próximo control anterior', () => {
    const errors = validateReport({ ...valid, date: '2026-10-16', evaluation: 'ok', nextControl: '2026-10-01' }, today)

    expect(Object.keys(errors)).toEqual(['date', 'evaluation', 'nextControl'])
  })
})

describe('carga de informe', () => {
  it('desde la ficha del paciente: abre con el paciente elegido, guarda (POST) y muestra el informe', async () => {
    const user = userEvent.setup()
    renderAt(patientDetailPath('pat-002'))

    await user.click(await screen.findByRole('button', { name: '+ Cargar informe' }))
    expect(await screen.findByLabelText('Paciente')).toHaveValue('pat-002')

    await user.selectOptions(screen.getByLabelText('Especialista'), 'spc-004')
    await user.type(screen.getByLabelText('Motivo de la consulta'), 'Evaluación del estado de ánimo')
    await user.type(screen.getByLabelText('Evaluación'), 'Ánimo estable.\nParticipa de las actividades grupales.')
    await user.click(screen.getByRole('button', { name: 'Guardar informe' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Informe de especialista' })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'Carlos Fernández' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lic. Diego Herrera' })).toBeInTheDocument()
    expect(screen.getByText(/Participa de las actividades grupales/)).toBeInTheDocument()

    const reports = await reportService.getAll()
    expect(reports).toHaveLength(4)
    expect(reports.at(-1)).toMatchObject({ patientId: 'pat-002', specialistId: 'spc-004' })
  })

  it('no guarda si faltan datos y enfoca el primer campo inválido', async () => {
    const user = userEvent.setup()
    renderAt(newReportPath())

    await user.click(await screen.findByRole('button', { name: 'Guardar informe' }))

    expect(screen.getByText('Seleccioná el paciente.')).toBeVisible()
    expect(screen.getByLabelText('Paciente')).toHaveFocus()
    expect(await reportService.getAll()).toHaveLength(3)
  })

  it('no ofrece pacientes inactivos', async () => {
    renderAt(newReportPath())

    const select = await screen.findByLabelText('Paciente')
    expect(within(select).queryByRole('option', { name: /Roberto Díaz/ })).not.toBeInTheDocument()
  })
})

describe('consulta de informes', () => {
  it('lista los informes del más reciente al más antiguo y filtra por especialidad', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.reports)

    const rows = within(await screen.findByRole('table')).getAllByRole('row').slice(1)
    expect(rows.map((row) => within(row).getAllByRole('cell')[0].textContent)).toEqual(['06/10/2026', '30/09/2026', '22/09/2026'])

    await user.selectOptions(screen.getByLabelText('Filtrar por especialidad'), 'Nutrición')
    expect(screen.getByText('1 informe encontrado')).toBeInTheDocument()
  })

  it('la ficha del paciente muestra solo sus informes', async () => {
    renderAt(patientDetailPath('pat-001'))

    const section = await screen.findByRole('region', { name: 'Informes de especialistas' })
    expect(await within(section).findAllByRole('link', { name: /Ver informe/ })).toHaveLength(2)
  })

  it('avisa si el informe no existe', async () => {
    renderAt(reportDetailPath('no-existe'))

    expect(await screen.findByText('No encontramos ese informe.')).toBeInTheDocument()
  })
})
