import { calculateAge, parseDateOnly } from './date.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DNI_REGEX = /^\d{7,8}$/
const PHONE_REGEX = /^[\d\s()+-]{8,20}$/
const MAX_AGE = 120

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim())
}

// Valida el formulario de alta de paciente. Devuelve un objeto con un
// mensaje por campo inválido; vacío si todo está bien.
// `existingDnis`: DNIs ya registrados, para detectar duplicados.
export function validatePatient(form, existingDnis = [], today = new Date()) {
  const errors = {}
  const required = (field, message) => {
    if (!String(form[field] ?? '').trim()) errors[field] = message
  }

  required('name', 'Ingresá el nombre y apellido.')
  required('sex', 'Seleccioná el sexo.')
  required('healthInsurance', 'Ingresá la obra social.')
  required('affiliateNumber', 'Ingresá el número de afiliado.')
  required('emergencyName', 'Ingresá el nombre del contacto de emergencia.')
  required('emergencyRelationship', 'Ingresá el vínculo con el paciente.')

  const dni = form.dni.trim()
  if (!DNI_REGEX.test(dni)) errors.dni = 'El DNI debe tener 7 u 8 números, sin puntos.'
  else if (existingDnis.includes(dni)) errors.dni = 'Ya existe un paciente con ese DNI.'

  if (!form.birthDate) errors.birthDate = 'Ingresá la fecha de nacimiento.'
  else if (parseDateOnly(form.birthDate) > today) errors.birthDate = 'La fecha de nacimiento no puede ser futura.'
  else if (calculateAge(form.birthDate, today) > MAX_AGE) errors.birthDate = 'Revisá la fecha de nacimiento.'

  if (!form.admissionDate) errors.admissionDate = 'Ingresá la fecha de ingreso.'
  else if (parseDateOnly(form.admissionDate) > today) errors.admissionDate = 'La fecha de ingreso no puede ser futura.'
  else if (form.birthDate && form.admissionDate < form.birthDate) {
    errors.admissionDate = 'La fecha de ingreso no puede ser anterior al nacimiento.'
  }

  if (!PHONE_REGEX.test(form.emergencyPhone.trim())) {
    errors.emergencyPhone = 'Ingresá un teléfono válido (solo números, espacios, guiones o paréntesis).'
  }

  return errors
}
