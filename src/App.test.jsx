import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'
import { PATHS } from './routes/paths.js'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('rutas', () => {
  it('muestra el panel con estadísticas calculadas desde los datos', async () => {
    renderAt(PATHS.dashboard)

    expect(await screen.findByText('Pacientes activos')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Panel Principal' })).toBeInTheDocument()
    expect(screen.getByText(/Elena García/)).toBeInTheDocument()
  })

  it('muestra el listado de pacientes en su propia ruta', async () => {
    renderAt(PATHS.patients)

    expect(await screen.findByText('5 pacientes encontrados')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pacientes' })).toHaveClass('active')
  })

  it('muestra un marcador en las secciones no implementadas', () => {
    renderAt(PATHS.reports)

    expect(screen.getByText(/disponible próximamente/)).toBeInTheDocument()
  })

  it('muestra la página 404 en rutas desconocidas', () => {
    renderAt('/no-existe')

    expect(screen.getByRole('heading', { name: 'Página no encontrada' })).toBeInTheDocument()
  })
})
