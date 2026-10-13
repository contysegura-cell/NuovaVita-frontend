import { useEffect, useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate } from 'react-router-dom'
import { isValidEmail } from '../../utils/validation.js'

const EMAIL_STORAGE_KEY = 'nuovaVita.rememberedEmail'
const MIN_PASSWORD_LENGTH = 6

function LoginForm() {
  const navigate = useNavigate()
  const [rememberedEmail] = useState(() => localStorage.getItem(EMAIL_STORAGE_KEY) ?? '')
  const [email, setEmail] = useState(rememberedEmail)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(Boolean(rememberedEmail))
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })
  const [recoveryOpen, setRecoveryOpen] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [recoveryTouched, setRecoveryTouched] = useState(false)
  const [recoveryStatus, setRecoveryStatus] = useState(null)

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const recoveryEmailRef = useRef(null)

  useEffect(() => {
    const field = rememberedEmail ? passwordRef : emailRef
    field.current?.focus()
  }, [rememberedEmail])

  useEffect(() => {
    if (recoveryOpen) recoveryEmailRef.current?.focus()
  }, [recoveryOpen])

  useEffect(() => {
    if (!recoveryStatus) return undefined

    const timerId = setTimeout(() => setRecoveryStatus(null), 6000)
    return () => clearTimeout(timerId)
  }, [recoveryStatus])

  const emailIsValid = isValidEmail(email)
  const passwordIsValid = password.trim().length >= MIN_PASSWORD_LENGTH
  const recoveryEmailIsValid = isValidEmail(recoveryEmail)

  const handleLogin = (event) => {
    event.preventDefault()
    setTouched({ email: true, password: true })

    if (!emailIsValid || !passwordIsValid) {
      if (!emailIsValid) emailRef.current?.focus()
      else passwordRef.current?.focus()
      return
    }

    if (remember) localStorage.setItem(EMAIL_STORAGE_KEY, email.trim())
    else localStorage.removeItem(EMAIL_STORAGE_KEY)

    setPassword('')
    setTouched({ email: false, password: false })
    navigate('/dashboard')
  }

  const toggleRecovery = () => {
    const willOpen = !recoveryOpen
    setRecoveryOpen(willOpen)
    setRecoveryStatus(null)

    if (willOpen && emailIsValid) setRecoveryEmail(email.trim())
  }

  const handleRecovery = (event) => {
    event.preventDefault()
    setRecoveryTouched(true)

    if (!recoveryEmailIsValid) {
      setRecoveryStatus({ variant: 'danger', message: 'Revisá el correo electrónico ingresado.' })
      recoveryEmailRef.current?.focus()
      return
    }

    setRecoveryStatus({
      variant: 'success',
      message: 'Si existe una cuenta asociada, recibirás instrucciones para recuperar el acceso.',
    })
    setRecoveryEmail('')
    setRecoveryTouched(false)
  }

  return (
    <>
      <Form noValidate aria-label="Formulario de inicio de sesión" onSubmit={handleLogin}>
        <h1 className="h3 mb-4">Iniciar Sesión</h1>

        <Form.Group className="mb-3" controlId="login-email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            name="email"
            placeholder="nombre@nuovavita.com"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setTouched((current) => ({ ...current, email: true }))
            }}
            isValid={touched.email && emailIsValid}
            isInvalid={touched.email && !emailIsValid}
          />
          <Form.Control.Feedback type="invalid">
            Ingresá un correo electrónico válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="login-password">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="********"
              autoComplete="current-password"
              minLength={MIN_PASSWORD_LENGTH}
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setTouched((current) => ({ ...current, password: true }))
              }}
              isValid={touched.password && passwordIsValid}
              isInvalid={touched.password && !passwordIsValid}
            />
            <Button
              variant="outline-secondary"
              type="button"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Button>
            <Form.Control.Feedback type="invalid">
              La contraseña debe tener al menos 6 caracteres.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <Form.Check id="recordar" label="Recordarme" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
          <Button variant="link" type="button" className="small p-0 text-secondary" aria-expanded={recoveryOpen} aria-controls="recovery-panel" onClick={toggleRecovery}>
            ¿Olvidaste tu contraseña?
          </Button>
        </div>

        <Button type="submit" className="w-100">Ingresar</Button>
      </Form>

      {recoveryOpen && (
        <section id="recovery-panel" className="mt-4 pt-4 border-top">
          <h2 className="h5">Recuperar acceso</h2>
          <p className="small text-body-secondary">Ingresá tu correo y te enviaremos instrucciones para recuperar el acceso.</p>
          <Form noValidate aria-label="Formulario de recuperación de acceso" onSubmit={handleRecovery}>
            <Form.Group className="mb-3" controlId="recovery-email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                ref={recoveryEmailRef}
                type="email"
                name="recovery-email"
                autoComplete="email"
                required
                value={recoveryEmail}
                onChange={(event) => {
                  setRecoveryEmail(event.target.value)
                  setRecoveryTouched(true)
                }}
                isValid={recoveryTouched && recoveryEmailIsValid}
                isInvalid={recoveryTouched && !recoveryEmailIsValid}
              />
              <Form.Control.Feedback type="invalid">Ingresá un correo electrónico válido.</Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" type="submit" className="w-100">Enviar instrucciones</Button>
            {recoveryStatus && <Alert variant={recoveryStatus.variant} className="mt-3 mb-0" role="status" aria-live="polite">{recoveryStatus.message}</Alert>}
          </Form>
        </section>
      )}
    </>
  )
}

export default LoginForm
