import { createCollectionService } from './createCollectionService.js'

export const patientService = createCollectionService('patients')
export const specialistService = createCollectionService('specialists')

export { NotFoundError } from './createCollectionService.js'
export { resetDb } from './storage.js'
