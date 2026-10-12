import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

function Footer({ year, brand }) {
  return (
    <footer className="bg-dark text-light py-4">
      <Container className="d-flex flex-column flex-sm-row flex-wrap justify-content-between align-items-center gap-3 text-center text-sm-start">
        <p className="mb-0">
          © {year} {brand}. Todos los derechos reservados.
        </p>

        <Nav aria-label="Enlaces del pie">
          <Nav.Link href="#sobre-nosotros" className="text-light">
            Sobre Nosotros
          </Nav.Link>
          <Nav.Link href="#contacto" className="text-light">
            Contacto
          </Nav.Link>
        </Nav>
      </Container>
    </footer>
  )
}

export default Footer
