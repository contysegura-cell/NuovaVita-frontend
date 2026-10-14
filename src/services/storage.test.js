import { describe, expect, it } from 'vitest'
import { clearMemoryCache, DB_VERSION, getCollection, resetDb, setCollection, STORAGE_KEY } from './storage.js'

describe('storage', () => {
  it('siembra los datos iniciales cuando el storage está vacío', () => {
    expect(getCollection('patients')).toHaveLength(5)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).version).toBe(DB_VERSION)
  })

  it('persiste los cambios entre lecturas', () => {
    setCollection('patients', [{ id: 'x', name: 'Test' }])
    clearMemoryCache()

    expect(getCollection('patients')).toEqual([{ id: 'x', name: 'Test' }])
  })

  it('descarta datos guardados con otra versión', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: DB_VERSION - 1, collections: { patients: [] } }))

    expect(getCollection('patients')).toHaveLength(5)
  })

  it('se recupera de un JSON corrupto', () => {
    localStorage.setItem(STORAGE_KEY, '{no es json')

    expect(getCollection('patients')).toHaveLength(5)
  })

  it('devuelve copias para que nadie modifique el estado interno', () => {
    getCollection('patients')[0].name = 'Modificado'

    expect(getCollection('patients')[0].name).not.toBe('Modificado')
  })

  it('resetDb vuelve a la semilla', () => {
    setCollection('patients', [])
    resetDb()

    expect(getCollection('patients')).toHaveLength(5)
  })

  it('falla con una colección inexistente', () => {
    expect(() => getCollection('inexistente')).toThrow('no existe')
  })
})
