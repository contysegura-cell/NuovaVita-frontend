export const patients = [
  { id: 1, name: 'Elena García', status: 'active' },
  { id: 2, name: 'Carlos Fernández', status: 'active' },
  { id: 3, name: 'Marta López', status: 'active' },
  { id: 4, name: 'Roberto Díaz', status: 'inactive' },
  { id: 5, name: 'Teresa Gómez', status: 'active' },
]

export const reports = [
  { id: 1, status: 'completed' },
  { id: 2, status: 'pending' },
  { id: 3, status: 'pending' },
  { id: 4, status: 'completed' },
]

export const appointments = [
  { id: 1, date: 'today' },
  { id: 2, date: 'today' },
  { id: 3, date: 'tomorrow' },
]

export const alerts = [
  { id: 1, resolved: false },
  { id: 2, resolved: true },
  { id: 3, resolved: false },
]

export const recentActivities = [
  {
    id: 1,
    type: 'Informe médico',
    description: 'Se registró un nuevo control clínico.',
    person: 'Elena García',
    time: 'Hace 15 minutos',
  },
  {
    id: 2,
    type: 'Actividad diaria',
    description: 'Se actualizó el registro de medicación.',
    person: 'Carlos Fernández',
    time: 'Hace 45 minutos',
  },
  {
    id: 3,
    type: 'Turno',
    description: 'Se confirmó una consulta de kinesiología.',
    person: 'Marta López',
    time: 'Hace 2 horas',
  },
]
