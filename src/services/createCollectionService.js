import { getCollection, setCollection } from './storage.js'

// API simulada: se usa para cargar y consultar pacientes, especialistas e informes.
// Expone únicamente operaciones equivalentes a GET (consultar) y POST (cargar).

// Demora artificial para que la UI contemple estados de carga.
const SIMULATED_LATENCY_MS = 300

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class NotFoundError extends Error {
  constructor(collection, id) {
    super(`No se encontró el registro "${id}" en "${collection}".`)
    this.name = 'NotFoundError'
  }
}

export function createCollectionService(collection) {
  return {
    // GET /{collection}
    async getAll() {
      return delay(getCollection(collection))
    },

    // GET /{collection}/:id
    async getById(id) {
      const item = getCollection(collection).find((entry) => entry.id === id)
      if (!item) throw new NotFoundError(collection, id)
      return delay(item)
    },

    // POST /{collection}
    async create(data) {
      const item = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
      setCollection(collection, [...getCollection(collection), item])
      return delay(item)
    },
  }
}
