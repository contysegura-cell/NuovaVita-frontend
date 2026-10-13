import { getCollection, setCollection } from './storage.js'

// Demora artificial para que la UI ya contemple estados de carga, como
// ocurrirá cuando los datos vengan de una API.
export const SIMULATED_LATENCY_MS = import.meta.env.MODE === 'test' ? 0 : 300

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class NotFoundError extends Error {
  constructor(collection, id) {
    super(`No se encontró el registro "${id}" en "${collection}".`)
    this.name = 'NotFoundError'
  }
}

// Crea un servicio CRUD asíncrono para una colección. La interfaz imita la
// que tendría un cliente HTTP, así se puede reemplazar por axios más adelante.
export function createCollectionService(collection) {
  return {
    async getAll() {
      return delay(getCollection(collection))
    },

    async getById(id) {
      const item = getCollection(collection).find((entry) => entry.id === id)
      if (!item) throw new NotFoundError(collection, id)
      return delay(item)
    },

    async create(data) {
      const item = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
      setCollection(collection, [...getCollection(collection), item])
      return delay(item)
    },

    async update(id, changes) {
      const items = getCollection(collection)
      const index = items.findIndex((entry) => entry.id === id)
      if (index === -1) throw new NotFoundError(collection, id)

      const updated = { ...items[index], ...changes, id, updatedAt: new Date().toISOString() }
      items[index] = updated
      setCollection(collection, items)
      return delay(updated)
    },
  }
}
