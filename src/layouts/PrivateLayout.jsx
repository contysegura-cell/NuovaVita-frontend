import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar.jsx'

// Estructura común de todas las pantallas del sistema de gestión.
function PrivateLayout() {
  return (
    <Container fluid>
      <Row className="min-vh-100">
        <Sidebar />

        <div className="col-12 col-md-9 col-xl-10 bg-light p-4 p-lg-5">
          <Outlet />
        </div>
      </Row>
    </Container>
  )
}

export default PrivateLayout
