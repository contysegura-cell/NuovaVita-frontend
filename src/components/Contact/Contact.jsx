import { useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { isValidEmail } from '../../utils/validation.js'

const MIN_NAME_LENGTH = 3
const MIN_MESSAGE_LENGTH = 10
const MAX_MESSAGE_LENGTH = 300

function Contact({ title }) {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  })
  const [status, setStatus] = useState(null)

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)

  const validity = {
    name: fields.name.trim().length >= MIN_NAME_LENGTH,
    email: isValidEmail(fields.email),
    message:
      fields.message.trim().length >= MIN_MESSAGE_LENGTH &&
      fields.message.trim().length <= MAX_MESSAGE_LENGTH,
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFields((currentFields) => ({ ...currentFields, [name]: value }))
    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setTouched({ name: true, email: true, message: true })

    if (!validity.name || !validity.email || !validity.message) {
      setStatus({
        variant: 'danger',
        message: 'Revisá los campos marcados antes de enviar el mensaje.',
      })

      if (!validity.name) nameRef.current?.focus()
      else if (!validity.email) emailRef.current?.focus()
      else messageRef.current?.focus()

      return
    }

    const contactName = fields.name.trim()

    setStatus({
      variant: 'success',
      message: `Gracias, ${contactName}. Recibimos tu consulta y nos comunicaremos pronto.`,
    })
    setFields({ name: '', email: '', message: '' })
    setTouched({ name: false, email: false, message: false })
  }

  return (
    <section id="contacto" className="bg-light py-5">
      <Container>
        <h2 className="text-center mb-4">{title}</h2>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form
              noValidate
              aria-label="Formulario de contacto"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  ref={nameRef}
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  autoComplete="name"
                  minLength={MIN_NAME_LENGTH}
                  required
                  value={fields.name}
                  onChange={handleChange}
                  isValid={touched.name && validity.name}
                  isInvalid={touched.name && !validity.name}
                  aria-describedby="nombre-feedback"
                />
                <Form.Control.Feedback type="invalid" id="nombre-feedback">
                  Ingresá un nombre de al menos 3 caracteres.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                  value={fields.email}
                  onChange={handleChange}
                  isValid={touched.email && validity.email}
                  isInvalid={touched.email && !validity.email}
                  aria-describedby="contact-email-feedback"
                />
                <Form.Control.Feedback
                  type="invalid"
                  id="contact-email-feedback"
                >
                  Ingresá un correo electrónico válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="mensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  ref={messageRef}
                  as="textarea"
                  name="message"
                  rows={4}
                  placeholder="¿En qué te podemos ayudar?"
                  minLength={MIN_MESSAGE_LENGTH}
                  maxLength={MAX_MESSAGE_LENGTH}
                  required
                  value={fields.message}
                  onChange={handleChange}
                  isValid={touched.message && validity.message}
                  isInvalid={touched.message && !validity.message}
                  aria-describedby="mensaje-feedback mensaje-contador"
                />
                <Form.Control.Feedback type="invalid" id="mensaje-feedback">
                  El mensaje debe tener entre 10 y 300 caracteres.
                </Form.Control.Feedback>
                <small
                  id="mensaje-contador"
                  className={`d-block text-end mt-1 ${
                    fields.message.length >= MAX_MESSAGE_LENGTH
                      ? 'text-danger'
                      : 'text-body-secondary'
                  }`}
                >
                  {fields.message.length}/{MAX_MESSAGE_LENGTH}
                </small>
              </Form.Group>

              <Button type="submit" className="w-100">
                Enviar
              </Button>

              {status && (
                <Alert
                  variant={status.variant}
                  className="mt-3 mb-0"
                  role="status"
                  aria-live="polite"
                >
                  {status.message}
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
