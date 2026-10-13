import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import { clearMemoryCache } from '../services/storage.js'

// Cada test arranca con la base de datos simulada recién sembrada.
beforeEach(() => {
  localStorage.clear()
  clearMemoryCache()
})

afterEach(() => {
  cleanup()
})
