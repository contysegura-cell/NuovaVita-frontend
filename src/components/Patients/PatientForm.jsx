import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { patientService } from '../../services/index.js'
import { toDateInputValue } from '../../utils/date.js'
import { validatePatient } from '../../utils/validation.js'

const INITIAL_FORM = {
  name: '',
  dni: '',
  birthDate: '',
  sex: '',
  healthInsurance: '',
  affiliateNumber: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  allergies: '',
  admissionDate: toDateInputValue(),
}

// Orden visual de los campos: al enviar con errores se enfoca el primero.
const FIELD_ORDER = Object.keys(INITIAL_FORM)

function toPatient(form) {
  return {
    name: form.name.trim(),
    dni: form.dni.trim(),
    birthDate: form.birthDate,
    sex: form.sex,
    healthInsurance: form.healthInsurance.trim(),
    affiliateNumber: form.affiliateNumber.trim(),
    emergencyContact: {
      name: form.emergencyName.trim(),
      relationship: form.emergencyRelationship.trim(),
      phone: form.emergencyPhone.trim(),
    },
    allergies: form.allergies
      .split(',')
      .map((allergy) => allergy.trim())
      .filter(Boolean),
    admissionDate: form.admissionDate,
    status: 'active',
  }
}

function PatientForm({ onCreated, onCancel }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [existingDnis, setExistingDnis] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Los errores se muestran recién después del primer intento de envío.
  const errors = submitted ? validatePatient(form, existingDnis) : {}

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    setSubmitted(true)
    setSaveError('')
    setSaving(true)

    try {
      // GET: DNIs registrados, para no duplicar pacientes.
      const patients = await patientService.getAll()
      const dnis = patients.map((patient) => patient.dni)
      setExistingDnis(dnis)

      const validationErrors = validatePatient(form, dnis)
      const firstInvalid = FIELD_ORDER.find((field) => validationErrors[field])
      if (firstInvalid) {
        setSaving(false)
        formElement.elements[firstInvalid]?.focus()
        return
      }

      // POST: alta del paciente.
      const created = await patientService.create(toPatient(form))
      onCreated(created)
    } catch {
      setSaving(false)
      setSaveError('No pudimos guardar el paciente. Intentá nuevamente.')
    }
  }

  const fieldProps = (name) => ({
    name,
    value: form[name],
    onChange: handleChange,
    isInvalid: Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const feedback = (name) => (
    <Form.Control.Feedback type="invalid" id={`${name}-error`}>
      {errors[name]}
    </Form.Control.Feedback>
  )

  return (
    <Form noValidate onSubmit={handleSubmit} aria-label="Alta de paciente">
      {saveError && <Alert variant="danger">{saveError}</Alert>}

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h5 mb-3">Datos personales</Card.Title>
          <Row className="g-3">
            <Form.Group as={Col} md={6} controlId="patient-name">
              <Form.Label>Nombre y apellido</Form.Label>
              <Form.Control autoComplete="off" {...fieldProps('name')} />
              {feedback('name')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="patient-dni">
              <Form.Label>DNI</Form.Label>
              <Form.Control inputMode="numeric" placeholder="Sin puntos" {...fieldProps('dni')} />
              {feedback('dni')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="patient-birth-date">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control type="date" max={toDateInputValue()} {...fieldProps('birthDate')} />
              {feedback('birthDate')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="patient-sex">
              <Form.Label>Sexo</Form.Label>
              <Form.Select {...fieldProps('sex')}>
                <option value="">Seleccioná una opción</option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
                <option value="X">Otro / No informa</option>
              </Form.Select>
              {feedback('sex')}
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h5 mb-3">Cobertura médica</Card.Title>
          <Row className="g-3">
            <Form.Group as={Col} md={6} controlId="patient-health-insurance">
              <Form.Label>Obra social</Form.Label>
              <Form.Control placeholder="Ej.: PAMI" {...fieldProps('healthInsurance')} />
              {feedback('healthInsurance')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="patient-affiliate-number">
              <Form.Label>Número de afiliado</Form.Label>
              <Form.Control {...fieldProps('affiliateNumber')} />
              {feedback('affiliateNumber')}
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h5 mb-3">Contacto de emergencia</Card.Title>
          <Row className="g-3">
            <Form.Group as={Col} md={4} controlId="patient-emergency-name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control {...fieldProps('emergencyName')} />
              {feedback('emergencyName')}
            </Form.Group>
            <Form.Group as={Col} md={4} controlId="patient-emergency-relationship">
              <Form.Label>Vínculo</Form.Label>
              <Form.Control placeholder="Ej.: Hija" {...fieldProps('emergencyRelationship')} />
              {feedback('emergencyRelationship')}
            </Form.Group>
            <Form.Group as={Col} md={4} controlId="patient-emergency-phone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="tel" autoComplete="off" {...fieldProps('emergencyPhone')} />
              {feedback('emergencyPhone')}
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h5 mb-3">Ingreso</Card.Title>
          <Row className="g-3">
            <Form.Group as={Col} md={8} controlId="patient-allergies">
              <Form.Label>Alergias</Form.Label>
              <Form.Control placeholder="Separadas por coma. Dejar vacío si no tiene." {...fieldProps('allergies')} />
            </Form.Group>
            <Form.Group as={Col} md={4} controlId="patient-admission-date">
              <Form.Label>Fecha de ingreso</Form.Label>
              <Form.Control type="date" max={toDateInputValue()} {...fieldProps('admissionDate')} />
              {feedback('admissionDate')}
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex flex-wrap gap-2 justify-content-end">
        <Button variant="outline-secondary" type="button" onClick={onCancel} disabled={saving}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" aria-hidden="true" />
              Guardando…
            </>
          ) : (
            'Guardar paciente'
          )}
        </Button>
      </div>
    </Form>
  )
}

export default PatientForm
