// Única fuente de verdad para las URLs de la app.
export const PATHS = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  patients: '/dashboard/pacientes',
  newPatient: '/dashboard/pacientes/nuevo',
  patientDetail: '/dashboard/pacientes/:id',
  clinicalHistory: '/dashboard/historia-clinica',
  reports: '/dashboard/informes',
  activities: '/dashboard/actividades',
  attendance: '/dashboard/asistencia',
  settings: '/dashboard/configuracion',
}

export function patientDetailPath(id) {
  return PATHS.patientDetail.replace(':id', encodeURIComponent(id))
}
