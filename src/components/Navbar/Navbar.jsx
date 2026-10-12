import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import BootstrapNavbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

function Navbar({ links }) {
  return (
    <BootstrapNavbar
      expand="lg"
      sticky="top"
      bg="light"
      data-bs-theme="light"
      aria-label="Navegación principal"
    >
      <Container>
        <BootstrapNavbar.Brand
          href="#inicio"
          className="d-flex align-items-center gap-2 fw-semibold"
        >
          <img
            src={logo}
            width="48"
            height="48"
            alt="Logo de Nuova Vita"
          />
          <span>Nuova Vita</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="menu-principal" />

        <BootstrapNavbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-lg-center gap-lg-3 py-3 py-lg-0">
            {links.map((link) => (
              <Nav.Link key={link.href} href={link.href}>
                {link.label}
              </Nav.Link>
            ))}

            <Button as={Link} to="/login" className="ms-lg-2">
              Iniciar sesión
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar
