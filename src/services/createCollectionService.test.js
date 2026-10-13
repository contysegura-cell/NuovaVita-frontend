import { describe, expect, it } from 'vitest'
import { createCollectionService, NotFoundError } from './createCollectionService.js'

const service = createCollectionService('patients')

describe('createCollectionService', () => {
  it('lista y busca por id', async () => {
    const patients = await service.getAll()
    const patient = await service.getById(patients[0].id)

    expect(patient).toEqual(patients[0])
  })

  it('crea con id y fecha de creación', async () => {
    const created = await service.create({ name: 'Nuevo Paciente', status: 'active' })

    expect(created.id).toEqual(expect.any(String))
    expect(created.createdAt).toEqual(expect.any(String))
    expect(await service.getById(created.id)).toEqual(created)
  })

  it('actualiza solo los campos indicados y conserva el id', async () => {
    const updated = await service.update('pat-001', { status: 'inactive', id: 'otro' })

    expect(updated).toMatchObject({ id: 'pat-001', name: 'Elena García', status: 'inactive' })
    expect(updated.updatedAt).toEqual(expect.any(String))
  })

  it('lanza NotFoundError con un id inexistente', async () => {
    await expect(service.getById('nope')).rejects.toBeInstanceOf(NotFoundError)
    await expect(service.update('nope', {})).rejects.toBeInstanceOf(NotFoundError)
  })
})
