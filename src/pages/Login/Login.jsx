import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import LoginForm from '../../components/LoginForm/LoginForm.jsx'
import usePageMeta from '../../hooks/usePageMeta.js'

function Login() {
  usePageMeta({
    title: 'Iniciar Sesión | Nuova Vita',
    description:
      'Accedé al sistema de gestión de Nuova Vita con tus credenciales para consultar historias clínicas, informes y asistencia.',
    noindex: true,
  })
  return (
    <main className="login-page d-flex align-items-center min-vh-100 py-4">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={9} xl={8}>
            <Card className="border-0 overflow-hidden shadow-lg">
              <Row className="g-0">
                <Col md={5} className="login-brand-panel d-flex flex-column justify-content-center p-4 p-lg-5 text-center text-md-start">
                  <Link to="/" className="d-inline-flex align-items-center gap-2 text-white text-decoration-none mb-4 mx-auto mx-md-0">
                    <img src={logo} alt="Logo de Nuova Vita" width="40" height="40" />
                    <span className="fw-semibold fs-5">Nuova Vita</span>
                  </Link>
                  <p className="h3 mb-3">Bienvenido de nuevo</p>
                  <p className="mb-0">Ingresá con tus credenciales para acceder al sistema de gestión.</p>
                </Col>

                <Col md={7} className="bg-white p-4 p-lg-5">
                  <LoginForm />
                  <Link to="/" className="d-inline-block mt-4 text-secondary">← Volver al inicio</Link>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Login
