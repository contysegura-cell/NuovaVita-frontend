import { describe, expect, it } from 'vitest'
import { calculateAge, formatDate } from './date.js'
import { validatePatient } from './validation.js'

const today = new Date(2026, 9, 15)

const validForm = {
  name: 'Juana Pérez',
  dni: '12345679',
  birthDate: '1940-01-20',
  sex: 'F',
  healthInsurance: 'PAMI',
  affiliateNumber: '123',
  emergencyName: 'Luis Pérez',
  emergencyRelationship: 'Hijo',
  emergencyPhone: '11 4444-5555',
  allergies: '',
  admissionDate: '2026-10-01',
}

describe('validatePatient', () => {
  it('acepta un formulario completo', () => {
    expect(validatePatient(validForm, [], today)).toEqual({})
  })

  it('exige los campos obligatorios', () => {
    const errors = validatePatient({ ...validForm, name: '  ', sex: '', healthInsurance: '' }, [], today)

    expect(Object.keys(errors)).toEqual(['name', 'sex', 'healthInsurance'])
  })

  it('valida el formato del DNI y los duplicados', () => {
    expect(validatePatient({ ...validForm, dni: '12.345.678' }, [], today).dni).toMatch('7 u 8 números')
    expect(validatePatient(validForm, ['12345679'], today).dni).toMatch('Ya existe')
  })

  it('rechaza fechas futuras o incoherentes', () => {
    expect(validatePatient({ ...validForm, birthDate: '2027-01-01' }, [], today).birthDate).toMatch('futura')
    expect(validatePatient({ ...validForm, birthDate: '1890-01-01' }, [], today).birthDate).toMatch('Revisá')
    expect(validatePatient({ ...validForm, admissionDate: '2026-12-01' }, [], today).admissionDate).toMatch('futura')
    expect(validatePatient({ ...validForm, admissionDate: '1930-01-01' }, [], today).admissionDate).toMatch('anterior')
  })

  it('valida el teléfono', () => {
    expect(validatePatient({ ...validForm, emergencyPhone: 'llamar' }, [], today).emergencyPhone).toBeDefined()
  })
})

describe('fechas de calendario', () => {
  it('calcula la edad según si ya cumplió años', () => {
    expect(calculateAge('1940-10-15', today)).toBe(86)
    expect(calculateAge('1940-10-16', today)).toBe(85)
  })

  it('formatea sin correrse un día por la zona horaria', () => {
    expect(formatDate('2024-02-10')).toBe('10/02/2024')
  })
})
