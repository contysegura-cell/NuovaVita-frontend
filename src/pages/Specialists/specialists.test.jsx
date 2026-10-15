import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../../App.jsx'
import { PATHS, specialistDetailPath } from '../../routes/paths.js'
import { specialistService } from '../../services/index.js'

vi.mock('sweetalert2', () => ({ default: { fire: vi.fn() } }))

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

async function fillValidForm(user, overrides = {}) {
  const values = {
    name: 'Lic. Sofía Paz',
    license: 'mp 54321',
    email: 'SPAZ@nuovavita.com',
    phone: '11 4000-2000',
    ...overrides,
  }
  await user.type(screen.getByLabelText('Nombre y apellido'), values.name)
  await user.selectOptions(screen.getByLabelText('Especialidad'), 'Fonoaudiología')
  await user.type(screen.getByLabelText('Matrícula'), values.license)
  await user.type(screen.getByLabelText('Correo electrónico'), values.email)
  await user.type(screen.getByLabelText('Teléfono'), values.phone)
}

describe('alta de especialista', () => {
  it('guarda el especialista (POST) normalizando matrícula y correo', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.newSpecialist)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Guardar especialista' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Lic. Sofía Paz' })).toBeInTheDocument()
    expect(screen.getByText('MP 54321')).toBeInTheDocument()

    const specialists = await specialistService.getAll()
    expect(specialists).toHaveLength(5)
    expect(specialists.at(-1)).toMatchObject({ specialty: 'Fonoaudiología', licenseNumber: 'MP 54321', email: 'spaz@nuovavita.com' })
  })

  it('rechaza matrícula y correo ya registrados', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.newSpecialist)

    await fillValidForm(user, { license: 'MN 223344', email: 'pruiz@nuovavita.com' })
    await user.click(screen.getByRole('button', { name: 'Guardar especialista' }))

    expect(await screen.findByText('Ya existe un especialista con esa matrícula.')).toBeVisible()
    expect(screen.getByText('Ya existe un especialista con ese correo.')).toBeVisible()
    expect(screen.getByLabelText('Matrícula')).toHaveFocus()
    expect(await specialistService.getAll()).toHaveLength(4)
  })

  it('valida el formato de la matrícula', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.newSpecialist)

    await fillValidForm(user, { license: '123' })
    await user.click(screen.getByRole('button', { name: 'Guardar especialista' }))

    expect(await screen.findByText(/MN o MP seguido de 4 a 6 números/)).toBeVisible()
  })
})

describe('listado y ficha de especialistas', () => {
  it('filtra por especialidad y enlaza con la ficha', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.specialists)

    await user.selectOptions(await screen.findByLabelText('Filtrar por especialidad'), 'Nutrición')

    expect(screen.getByText('1 especialista encontrado')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lic. Carolina Vega' })).toHaveAttribute('href', specialistDetailPath('spc-003'))
  })

  it('busca por matrícula', async () => {
    const user = userEvent.setup()
    renderAt(PATHS.specialists)

    await user.type(await screen.findByLabelText('Buscar especialista'), '445566')

    expect(screen.getByRole('link', { name: 'Lic. Diego Herrera' })).toBeInTheDocument()
    expect(screen.getByText('1 especialista encontrado')).toBeInTheDocument()
  })

  it('muestra la ficha (GET) y marca la sección en el menú', async () => {
    renderAt(specialistDetailPath('spc-002'))

    expect(await screen.findByRole('heading', { level: 1, name: 'Lic. Pablo Ruiz' })).toBeInTheDocument()
    expect(screen.getByText('MN 223344')).toBeInTheDocument()
    const menu = within(screen.getByRole('navigation', { name: 'Menú del panel' }))
    expect(menu.getByRole('link', { name: 'Especialistas' })).toHaveClass('active')
  })

  it('avisa si el especialista no existe', async () => {
    renderAt(specialistDetailPath('no-existe'))

    expect(await screen.findByText('No encontramos ese especialista.')).toBeInTheDocument()
  })
})
