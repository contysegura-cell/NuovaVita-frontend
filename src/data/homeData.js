export const navigationLinks = [
  { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#roles', label: 'Roles' },
  { href: '#contacto', label: 'Contacto' },
]

export const services = [
  { icon: 'clinicalHistory', title: 'Historia Clínica Digital', description: 'Registro cronológico y foliado de informes, indicaciones médicas y actividades diarias de cada paciente.' },
  { icon: 'attendance', title: 'Control de Asistencia', description: 'Integración con reloj biométrico para el registro de marcados de entrada y salida del personal.' },
  { icon: 'reports', title: 'Informes de Especialistas', description: 'Carga y consulta de informes por especialidad, con trazabilidad de quién registró cada dato.' },
  { icon: 'security', title: 'Seguridad y Confidencialidad', description: 'Accesos por rol, registro de auditoría y cumplimiento de la normativa vigente de datos de salud.' },
]

export const roles = [
  { title: 'Médico de Cabecera', description: 'Accede a la historia clínica completa de sus pacientes asignados, en el centro o de forma remota.' },
  { title: 'Especialista', description: 'Carga y consulta sus propios informes (kinesiología, nutrición, entre otras) para cualquier paciente.' },
  { title: 'Enfermería', description: 'Registra las actividades diarias: rutina, medicación, alimentación e incidencias.' },
  { title: 'Administración', description: 'Gestiona usuarios e infraestructura del sistema, sin acceso al contenido clínico.' },
]