// Datos estáticos de ejemplo para el panel principal. No pasan por la API
// simulada, que se reserva para pacientes y especialistas. Las fechas se
// calculan al cargar la página para que "hoy" y "hace 15 minutos" tengan sentido.

function minutesAgo(minutes) {
  return new Date(Date.now() - minutes * 60_000).toISOString()
}

function atTime(daysFromToday, hour, minute = 0) {
  const date = new Date()
  date.setDate(date.getDate() + daysFromToday)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export const reports = [
  { id: 'rep-001', status: 'signed' },
  { id: 'rep-002', status: 'draft' },
  { id: 'rep-003', status: 'draft' },
  { id: 'rep-004', status: 'signed' },
]

export const appointments = [
  { id: 'apt-001', date: atTime(0, 10, 30) },
  { id: 'apt-002', date: atTime(0, 15) },
  { id: 'apt-003', date: atTime(1, 9) },
]

export const alerts = [
  { id: 'alr-001', resolved: false },
  { id: 'alr-002', resolved: true },
  { id: 'alr-003', resolved: false },
]

export const activities = [
  { id: 'act-001', type: 'Informe médico', description: 'Se registró un nuevo control clínico.', person: 'Elena García', createdAt: minutesAgo(15) },
  { id: 'act-002', type: 'Actividad diaria', description: 'Se actualizó el registro de medicación.', person: 'Carlos Fernández', createdAt: minutesAgo(45) },
  { id: 'act-003', type: 'Turno', description: 'Se confirmó una consulta de kinesiología.', person: 'Marta López', createdAt: minutesAgo(120) },
]
