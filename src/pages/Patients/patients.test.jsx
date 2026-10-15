import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../../App.jsx'
import { patientDetailPath, PATHS } from '../../routes/paths.js'
import { patientService } from '../../services/index.js'

vi.mock('sweetalert2', () => ({ default: { fire: vi.fn() } }))

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

async function fillValidForm(user) {
  await user.type(screen.getByLabelText('Nombre y apellido'), 'Juana Pérez')
  await user.type(screen.getByLabelText('DNI'), '12345679')
  await user.type(screen.getByLabelText('Fecha de nacimiento'), '1940-01-20')
  await user.selectOptions(screen.getByLabelText('Sexo'), 'F')
  await user.type(screen.getByLabelText('Obra social'), 'PAMI')
  await user.type(screen.getByLabelText('Número de afiliado'), '150111')
  await user.type(screen.getByLabelText('Nombre'), 'Luis Pérez')
  await user.type(screen.getByLabelText('Vínculo'), 'Hijo')
  await user.type(screen.getByLabelText('Teléfono'), '11 4444-5555')
  await user.type(screen.getByLabelText('Alergias'), 'Penicilina, Polen')
}

describe('alta de paciente', () => {
  it('guarda el paciente (POST) y muestra su ficha', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.newPatient)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Guardar paciente' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Juana Pérez' })).toBeInTheDocument()
    expect(screen.getByText('Polen')).toBeInTheDocument()

    const patients = await patientService.getAll()
    expect(patients).toHaveLength(6)
    expect(patients.at(-1)).toMatchObject({ dni: '12345679', allergies: ['Penicilina', 'Polen'], status: 'active' })
  })

  it('no guarda si hay errores y enfoca el primer campo inválido', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.newPatient)

    await user.click(screen.getByRole('button', { name: 'Guardar paciente' }))

    expect(await screen.findByText('Ingresá el nombre y apellido.')).toBeVisible()
    expect(screen.getByLabelText('Nombre y apellido')).toHaveFocus()
    expect(await patientService.getAll()).toHaveLength(5)
  })

  it('rechaza un DNI ya registrado', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.newPatient)

    await fillValidForm(user)
    await user.clear(screen.getByLabelText('DNI'))
    await user.type(screen.getByLabelText('DNI'), '12345678')
    await user.click(screen.getByRole('button', { name: 'Guardar paciente' }))

    expect(await screen.findByText('Ya existe un paciente con ese DNI.')).toBeVisible()
    expect(screen.getByLabelText('DNI')).toHaveFocus()
  })
})

describe('ficha y listado', () => {
  it('muestra la ficha completa de un paciente (GET)', async () => {
    renderAt(patientDetailPath('pat-005'))

    expect(await screen.findByRole('heading', { level: 1, name: 'Teresa Gómez' })).toBeInTheDocument()
    expect(screen.getByText('IOMA')).toBeInTheDocument()
    expect(screen.getByText('Látex')).toBeInTheDocument()
    expect(screen.getByText('Raúl Gómez')).toBeInTheDocument()
  })

  it('avisa si el paciente no existe', async () => {
    renderAt(patientDetailPath('no-existe'))

    expect(await screen.findByText('No encontramos ese paciente.')).toBeInTheDocument()
  })

  it('busca por DNI y enlaza cada paciente con su ficha', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.patients)

    await user.type(await screen.findByLabelText('Buscar paciente'), '10987654')

    expect(screen.getByText('1 paciente encontrado')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Carlos Fernández' })).toHaveAttribute('href', patientDetailPath('pat-002'))
  })
})
