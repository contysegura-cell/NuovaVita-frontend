import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import usePageMeta from '../../hooks/usePageMeta.js'

function NotFound() {
  usePageMeta({
    title: 'Página no encontrada | Nuova Vita',
    description: 'La página que buscás no existe o fue movida de lugar.',
    noindex: true,
  })

  return (
    <main className="d-flex align-items-center min-vh-100 py-5">
      <Container className="text-center">
        <p className="display-1 fw-bold text-primary mb-0">404</p>
        <h1 className="h3 mb-3">Página no encontrada</h1>
        <p className="text-body-secondary mb-4">
          La página que buscás no existe o fue movida de lugar.
        </p>
        <Button as={Link} to="/">
          Volver al inicio
        </Button>
      </Container>
    </main>
  )
}

export default NotFound