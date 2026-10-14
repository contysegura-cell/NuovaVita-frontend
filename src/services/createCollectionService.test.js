import { describe, expect, it } from 'vitest'
import { createCollectionService, NotFoundError } from './createCollectionService.js'
import { patientService, specialistService } from './index.js'

const service = createCollectionService('patients')

describe('createCollectionService', () => {
  it('GET: lista y busca por id', async () => {
    const patients = await service.getAll()
    const patient = await service.getById(patients[0].id)

    expect(patient).toEqual(patients[0])
  })

  it('POST: crea con id y fecha de creación', async () => {
    const created = await service.create({ name: 'Nuevo Paciente', status: 'active' })

    expect(created.id).toEqual(expect.any(String))
    expect(created.createdAt).toEqual(expect.any(String))
    expect(await service.getById(created.id)).toEqual(created)
  })

  it('solo expone operaciones de consulta (GET) y carga (POST)', () => {
    expect(Object.keys(service).toSorted()).toEqual(['create', 'getAll', 'getById'])
  })

  it('lanza NotFoundError con un id inexistente', async () => {
    await expect(service.getById('nope')).rejects.toBeInstanceOf(NotFoundError)
  })
})

describe('servicios de la API simulada', () => {
  it('cubre pacientes y especialistas', async () => {
    expect(await patientService.getAll()).toHaveLength(5)
    expect(await specialistService.getAll()).toHaveLength(4)
  })
})
