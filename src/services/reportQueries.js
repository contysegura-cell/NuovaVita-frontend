// Consultas que combinan varios GET: cada informe guarda solo los ids del
// paciente y del especialista, y la interfaz necesita sus nombres.
import { patientService, reportService, specialistService } from './index.js'

function byId(items) {
  return new Map(items.map((item) => [item.id, item]))
}

function withRelations(report, patients, specialists) {
  return {
    ...report,
    patient: patients.get(report.patientId) ?? null,
    specialist: specialists.get(report.specialistId) ?? null,
  }
}

// Informes ordenados del más reciente al más antiguo. Con `patientId`, solo
// los de ese paciente.
export async function getReportsWithRelations({ patientId } = {}) {
  const [reports, patients, specialists] = await Promise.all([
    reportService.getAll(),
    patientService.getAll(),
    specialistService.getAll(),
  ])
  const patientsById = byId(patients)
  const specialistsById = byId(specialists)

  return reports
    .filter((report) => !patientId || report.patientId === patientId)
    .toSorted((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
    .map((report) => withRelations(report, patientsById, specialistsById))
}

export async function getReportWithRelations(id) {
  const report = await reportService.getById(id)
  const [patients, specialists] = await Promise.all([patientService.getAll(), specialistService.getAll()])
  return withRelations(report, byId(patients), byId(specialists))
}
