import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { reportService } from '../../services/index.js'
import { toDateInputValue } from '../../utils/date.js'
import { validateReport } from '../../utils/validation.js'

const FIELD_ORDER = ['patientId', 'specialistId', 'date', 'reason', 'evaluation', 'diagnosis', 'indications', 'nextControl']

function toReport(form) {
  return {
    patientId: form.patientId,
    specialistId: form.specialistId,
    date: form.date,
    reason: form.reason.trim(),
    evaluation: form.evaluation.trim(),
    diagnosis: form.diagnosis.trim(),
    indications: form.indications.trim(),
    nextControl: form.nextControl,
  }
}

// `patients` y `specialists` llegan cargados desde la página.
function ReportForm({ patients, specialists, initialPatientId = '', onCreated, onCancel }) {
  const [form, setForm] = useState({
    patientId: patients.some((patient) => patient.id === initialPatientId) ? initialPatientId : '',
    specialistId: '',
    date: toDateInputValue(),
    reason: '',
    evaluation: '',
    diagnosis: '',
    indications: '',
    nextControl: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Los errores se muestran recién después del primer intento de envío.
  const errors = submitted ? validateReport(form) : {}

  // Pacientes activos, más el preseleccionado aunque esté inactivo.
  const patientOptions = patients
    .filter((patient) => patient.status === 'active' || patient.id === form.patientId)
    .toSorted((a, b) => a.name.localeCompare(b.name))
  const specialistOptions = specialists.toSorted((a, b) => a.name.localeCompare(b.name))

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setSaveError('')

    const firstInvalid = FIELD_ORDER.find((field) => validateReport(form)[field])
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid]?.focus()
      return
    }

    setSaving(true)
    try {
      // POST: alta del informe. Una vez guardado no se modifica.
      const created = await reportService.create(toReport(form))
      onCreated(created)
    } catch {
      setSaving(false)
      setSaveError('No pudimos guardar el informe. Intentá nuevamente.')
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
    <Form noValidate onSubmit={handleSubmit} aria-label="Carga de informe">
      {saveError && <Alert variant="danger">{saveError}</Alert>}

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h5 mb-3">Consulta</Card.Title>
          <Row className="g-3">
            <Form.Group as={Col} md={6} controlId="report-patient">
              <Form.Label>Paciente</Form.Label>
              <Form.Select {...fieldProps('patientId')}>
                <option value="">Seleccioná un paciente</option>
                {patientOptions.map((patient) => (
                  <option key={patient.id} value={patient.id}>{patient.name} — DNI {patient.dni}</option>
                ))}
              </Form.Select>
              {feedback('patientId')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="report-specialist">
              <Form.Label>Especialista</Form.Label>
              <Form.Select {...fieldProps('specialistId')}>
                <option value="">Seleccioná un especialista</option>
                {specialistOptions.map((specialist) => (
                  <option key={specialist.id} value={specialist.id}>{specialist.name} — {specialist.specialty}</option>
                ))}
              </Form.Select>
              {feedback('specialistId')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="report-date">
              <Form.Label>Fecha de la consulta</Form.Label>
              <Form.Control type="date" max={toDateInputValue()} {...fieldProps('date')} />
              {feedback('date')}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="report-next-control">
              <Form.Label>Próximo control <span className="text-body-secondary">(opcional)</span></Form.Label>
              <Form.Control type="date" min={form.date || undefined} {...fieldProps('nextControl')} />
              {feedback('nextControl')}
            </Form.Group>
            <Form.Group as={Col} xs={12} controlId="report-reason">
              <Form.Label>Motivo de la consulta</Form.Label>
              <Form.Control {...fieldProps('reason')} />
              {feedback('reason')}
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h5 mb-3">Informe</Card.Title>
          <Row className="g-3">
            <Form.Group as={Col} xs={12} controlId="report-evaluation">
              <Form.Label>Evaluación</Form.Label>
              <Form.Control as="textarea" rows={4} {...fieldProps('evaluation')} />
              {feedback('evaluation')}
            </Form.Group>
            <Form.Group as={Col} xs={12} controlId="report-diagnosis">
              <Form.Label>Diagnóstico <span className="text-body-secondary">(opcional)</span></Form.Label>
              <Form.Control {...fieldProps('diagnosis')} />
            </Form.Group>
            <Form.Group as={Col} xs={12} controlId="report-indications">
              <Form.Label>Indicaciones <span className="text-body-secondary">(opcional)</span></Form.Label>
              <Form.Control as="textarea" rows={3} {...fieldProps('indications')} />
            </Form.Group>
          </Row>
        </Card.Body>
      </Card>

      <Alert variant="light" className="border small">
        Una vez guardado, el informe queda en la historia del paciente y no puede modificarse.
      </Alert>

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
            'Guardar informe'
          )}
        </Button>
      </div>
    </Form>
  )
}

export default ReportForm
