import { createCollectionService } from './createCollectionService.js'

// No hay método delete a propósito: en un sistema clínico los registros se
// dan de baja lógicamente (status) y nunca se borran.
export const patientService = createCollectionService('patients')
export const reportService = createCollectionService('reports')
export const appointmentService = createCollectionService('appointments')
export const alertService = createCollectionService('alerts')
export const activityService = createCollectionService('activities')

export { NotFoundError } from './createCollectionService.js'
export { resetDb } from './storage.js'
