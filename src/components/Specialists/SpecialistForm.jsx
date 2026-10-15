import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { SPECIALTIES } from '../../data/specialties.js'
import { specialistService } from '../../services/index.js'
import { normalizeLicenseNumber, validateSpecialist } from '../../utils/validation.js'

const INITIAL_FORM = {
  name: '',
  specialty: '',
  licenseNumber: '',
  email: '',
  phone: '',
}

// Orden visual de los campos: al enviar con errores se enfoca el primero.
const FIELD_ORDER = Object.keys(INITIAL_FORM)

function toSpecialist(form) {
  return {
    name: form.name.trim(),
    specialty: form.specialty,
    licenseNumber: normalizeLicenseNumber(form.licenseNumber),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
  }
}

function SpecialistForm({ onCreated, onCancel }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [existing, setExisting] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Los errores se muestran recién después del primer intento de envío.
  const errors = submitted ? validateSpecialist(form, existing) : {}

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
      // GET: especialistas registrados, para no repetir matrícula ni correo.
      const specialists = await specialistService.getAll()
      setExisting(specialists)

      const validationErrors = validateSpecialist(form, specialists)
      const firstInvalid = FIELD_ORDER.find((field) => validationErrors[field])
      if (firstInvalid) {
        setSaving(false)
        formElement.elements[firstInvalid]?.focus()
        return
      }

      // POST: alta del especialista.
      const created = await specialistService.create(toSpecialist(form))
      onCreated(created)
    } catch {
      setSaving(false)
      setSaveError('No pudimos guardar el especialista. Intentá nuevamente.')
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
    <Form noValidate onSubmit={handleSubmit} aria-label="Alta de especialista">
      {saveError && <Alert variant="danger">{saveError}</Alert>}

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h5 mb-3">Datos profesionales</Card.Title>
          <Row className="g-3">
            <Form.Group as={Col} md={6} controlId="specialist-name">
              <Form.Label>Nombre y apellido</Form.Label>
              <Form.Control autoComplete="off" placeholder="Ej.: Lic. Carolina Vega" {...fieldProps('name')} />
              {feedback('name')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="specialist-specialty">
              <Form.Label>Especialidad</Form.Label>
              <Form.Select {...fieldProps('specialty')}>
                <option value="">Seleccioná una especialidad</option>
                {SPECIALTIES.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </Form.Select>
              {feedback('specialty')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="specialist-license">
              <Form.Label>Matrícula</Form.Label>
              <Form.Control autoComplete="off" placeholder="Ej.: MN 123456" {...fieldProps('licenseNumber')} />
              {feedback('licenseNumber')}
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h5 mb-3">Contacto</Card.Title>
          <Row className="g-3">
            <Form.Group as={Col} md={6} controlId="specialist-email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" autoComplete="off" {...fieldProps('email')} />
              {feedback('email')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="specialist-phone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="tel" autoComplete="off" {...fieldProps('phone')} />
              {feedback('phone')}
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
            'Guardar especialista'
          )}
        </Button>
      </div>
    </Form>
  )
}

export default SpecialistForm
