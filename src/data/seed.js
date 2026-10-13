// Datos iniciales de la demo. Las fechas se generan relativas al momento de
// carga para que "hoy" y "hace 15 minutos" tengan sentido al restablecer.

function shiftFromNow({ days = 0, hours = 0, minutes = 0 }) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(date.getHours() + hours, date.getMinutes() + minutes)
  return date.toISOString()
}

function atTime(days, hour, minute = 0) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export function createSeed() {
  const users = [
    { id: 'usr-001', name: 'Dra. Laura Méndez', email: 'medico@nuovavita.com', password: 'demo1234', role: 'doctor' },
    { id: 'usr-002', name: 'Lic. Pablo Ruiz', email: 'especialista@nuovavita.com', password: 'demo1234', role: 'specialist', specialty: 'Kinesiología' },
    { id: 'usr-003', name: 'Enf. Sofía Torres', email: 'enfermeria@nuovavita.com', password: 'demo1234', role: 'nurse' },
    { id: 'usr-004', name: 'Martín Acosta', email: 'admin@nuovavita.com', password: 'demo1234', role: 'admin' },
  ]

  const patients = [
    {
      id: 'pat-001',
      name: 'Elena García',
      dni: '12345678',
      birthDate: '1941-03-14',
      sex: 'F',
      healthInsurance: 'PAMI',
      affiliateNumber: '150123456701',
      emergencyContact: { name: 'Lucía García', relationship: 'Hija', phone: '11 4567-8901' },
      doctorId: 'usr-001',
      allergies: ['Penicilina'],
      admissionDate: '2023-06-01',
      status: 'active',
    },
    {
      id: 'pat-002',
      name: 'Carlos Fernández',
      dni: '10987654',
      birthDate: '1938-11-02',
      sex: 'M',
      healthInsurance: 'OSDE',
      affiliateNumber: '61234567',
      emergencyContact: { name: 'Jorge Fernández', relationship: 'Hijo', phone: '11 5678-9012' },
      doctorId: 'usr-001',
      allergies: [],
      admissionDate: '2022-09-15',
      status: 'active',
    },
    {
      id: 'pat-003',
      name: 'Marta López',
      dni: '13456789',
      birthDate: '1944-07-21',
      sex: 'F',
      healthInsurance: 'PAMI',
      affiliateNumber: '150987654302',
      emergencyContact: { name: 'Ana López', relationship: 'Sobrina', phone: '11 6789-0123' },
      doctorId: 'usr-001',
      allergies: ['Ibuprofeno'],
      admissionDate: '2024-02-10',
      status: 'active',
    },
    {
      id: 'pat-004',
      name: 'Roberto Díaz',
      dni: '9876543',
      birthDate: '1935-01-30',
      sex: 'M',
      healthInsurance: 'Swiss Medical',
      affiliateNumber: '80012345',
      emergencyContact: { name: 'Silvia Díaz', relationship: 'Esposa', phone: '11 7890-1234' },
      doctorId: 'usr-001',
      allergies: [],
      admissionDate: '2021-04-05',
      status: 'inactive',
    },
    {
      id: 'pat-005',
      name: 'Teresa Gómez',
      dni: '11223344',
      birthDate: '1940-05-08',
      sex: 'F',
      healthInsurance: 'IOMA',
      affiliateNumber: '4455667788',
      emergencyContact: { name: 'Raúl Gómez', relationship: 'Hijo', phone: '11 8901-2345' },
      doctorId: 'usr-001',
      allergies: ['Sulfas', 'Látex'],
      admissionDate: '2023-11-20',
      status: 'active',
    },
  ]

  const reports = [
    { id: 'rep-001', patientId: 'pat-001', authorId: 'usr-002', specialty: 'Kinesiología', date: shiftFromNow({ days: -3 }), status: 'signed' },
    { id: 'rep-002', patientId: 'pat-003', authorId: 'usr-002', specialty: 'Kinesiología', date: shiftFromNow({ days: -1 }), status: 'draft' },
    { id: 'rep-003', patientId: 'pat-005', authorId: 'usr-002', specialty: 'Kinesiología', date: shiftFromNow({ hours: -5 }), status: 'draft' },
    { id: 'rep-004', patientId: 'pat-002', authorId: 'usr-001', specialty: 'Clínica médica', date: shiftFromNow({ days: -7 }), status: 'signed' },
  ]

  const appointments = [
    { id: 'apt-001', patientId: 'pat-001', professionalId: 'usr-002', date: atTime(0, 10, 30) },
    { id: 'apt-002', patientId: 'pat-003', professionalId: 'usr-001', date: atTime(0, 15) },
    { id: 'apt-003', patientId: 'pat-002', professionalId: 'usr-002', date: atTime(1, 9) },
  ]

  const alerts = [
    { id: 'alr-001', patientId: 'pat-005', message: 'Presión arterial elevada en el control matutino.', createdAt: shiftFromNow({ hours: -2 }), resolved: false },
    { id: 'alr-002', patientId: 'pat-002', message: 'Rechazo de almuerzo.', createdAt: shiftFromNow({ days: -1 }), resolved: true },
    { id: 'alr-003', patientId: 'pat-001', message: 'Caída leve sin lesiones aparentes.', createdAt: shiftFromNow({ hours: -6 }), resolved: false },
  ]

  const activities = [
    {
      id: 'act-001',
      patientId: 'pat-001',
      authorId: 'usr-001',
      type: 'Informe médico',
      description: 'Se registró un nuevo control clínico.',
      createdAt: shiftFromNow({ minutes: -15 }),
    },
    {
      id: 'act-002',
      patientId: 'pat-002',
      authorId: 'usr-003',
      type: 'Actividad diaria',
      description: 'Se actualizó el registro de medicación.',
      createdAt: shiftFromNow({ minutes: -45 }),
    },
    {
      id: 'act-003',
      patientId: 'pat-003',
      authorId: 'usr-002',
      type: 'Turno',
      description: 'Se confirmó una consulta de kinesiología.',
      createdAt: shiftFromNow({ hours: -2 }),
    },
  ]

  return { users, patients, reports, appointments, alerts, activities }
}
