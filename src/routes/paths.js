// Única fuente de verdad para las URLs de la app.
export const PATHS = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  patients: '/dashboard/pacientes',
  newPatient: '/dashboard/pacientes/nuevo',
  patientDetail: '/dashboard/pacientes/:id',
  specialists: '/dashboard/especialistas',
  newSpecialist: '/dashboard/especialistas/nuevo',
  specialistDetail: '/dashboard/especialistas/:id',
  clinicalHistory: '/dashboard/historia-clinica',
  reports: '/dashboard/informes',
  newReport: '/dashboard/informes/nuevo',
  reportDetail: '/dashboard/informes/:id',
  activities: '/dashboard/actividades',
  attendance: '/dashboard/asistencia',
  settings: '/dashboard/configuracion',
}

export function patientDetailPath(id) {
  return PATHS.patientDetail.replace(':id', encodeURIComponent(id))
}

export function specialistDetailPath(id) {
  return PATHS.specialistDetail.replace(':id', encodeURIComponent(id))
}

export function reportDetailPath(id) {
  return PATHS.reportDetail.replace(':id', encodeURIComponent(id))
}

// Con `patientId`, el formulario abre con ese paciente ya seleccionado.
export function newReportPath(patientId) {
  return patientId ? `${PATHS.newReport}?paciente=${encodeURIComponent(patientId)}` : PATHS.newReport
}
