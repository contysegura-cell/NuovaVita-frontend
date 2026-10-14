import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { clearMemoryCache } from '../services/storage.js'

// Los tests no dependen de internet: la API pública del equipo profesional
// (randomuser.me) se reemplaza por una respuesta fija.
vi.mock('axios', () => ({
  default: {
    get: vi.fn(async () => ({
      data: {
        results: [
          {
            login: { uuid: 'prof-1' },
            name: { first: 'Ana', last: 'Pérez' },
            email: 'ana.perez@example.com',
            phone: '11 1234-5678',
          },
        ],
      },
    })),
  },
}))

// Cada test arranca con la base de datos simulada recién sembrada.
beforeEach(() => {
  localStorage.clear()
  clearMemoryCache()
})

afterEach(() => {
  cleanup()
})
