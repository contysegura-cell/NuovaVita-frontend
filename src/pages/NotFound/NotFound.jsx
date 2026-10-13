import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { PATHS } from '../../routes/paths.js'

function NotFound() {
  return (
    <Container as="main" className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center gap-3">
      <title>Página no encontrada · Nuova Vita</title>
      <p className="display-1 fw-bold text-primary mb-0">404</p>
      <h1 className="h3">Página no encontrada</h1>
      <p className="text-body-secondary">La dirección que buscás no existe o fue movida.</p>
      <Button as={Link} to={PATHS.home}>
        Volver al inicio
      </Button>
    </Container>
  )
}

export default NotFound
