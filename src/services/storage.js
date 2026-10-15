// Datos de la API simulada (pacientes, especialistas e informes) guardados en
// localStorage. Los componentes acceden a través de los servicios, nunca
// directamente a este módulo.
import { createSeed } from '../data/seed.js'

export const STORAGE_KEY = 'nuovaVita.db'

// Subir este número cuando cambie la forma de los datos: los datos guardados
// con otra versión se descartan y se vuelve a cargar la semilla.
export const DB_VERSION = 3

let memoryDb = null

function seedDb() {
  return { version: DB_VERSION, collections: createSeed() }
}

function persist(db) {
  memoryDb = db
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  } catch {
    // Sin acceso a localStorage (modo privado, cuota llena): la demo sigue
    // funcionando en memoria hasta recargar la página.
  }
}

function readDb() {
  if (memoryDb) return memoryDb

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (stored?.version === DB_VERSION && stored.collections) {
      memoryDb = stored
      return memoryDb
    }
  } catch {
    // JSON corrupto o storage inaccesible: se regenera la semilla.
  }

  const db = seedDb()
  persist(db)
  return db
}

export function getCollection(name) {
  const collection = readDb().collections[name]
  if (!collection) throw new Error(`La colección "${name}" no existe.`)
  return structuredClone(collection)
}

export function setCollection(name, items) {
  const db = readDb()
  persist({ ...db, collections: { ...db.collections, [name]: structuredClone(items) } })
}

export function resetDb() {
  persist(seedDb())
}

// Solo para tests: olvida la copia en memoria para forzar una relectura.
export function clearMemoryCache() {
  memoryDb = null
}
