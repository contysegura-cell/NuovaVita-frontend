import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

const menuItems = [
  { label: 'Inicio', href: '#dashboard-home', active: true },
  { label: 'Pacientes', href: '#patients-section' },
  { label: 'Historia Clínica', disabled: true },
  { label: 'Informes de Especialistas', disabled: true },
  { label: 'Actividades Diarias', href: '#recent-activity-section' },
  { label: 'Control de Asistencia', disabled: true },
  { label: 'Configuración', disabled: true },
]

function Sidebar() {
  return (
    <aside className="col-12 col-md-3 col-xl-2 bg-dark text-light d-flex flex-column gap-4 p-4">
      <Link to="/" className="d-flex align-items-center gap-2 text-white text-decoration-none">
        <img src={logo} alt="Logo de Nuova Vita" width="40" height="40" />
        <span className="fw-semibold fs-5">Nuova Vita</span>
      </Link>

      <Nav variant="pills" className="flex-column gap-1" aria-label="Menú del panel">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.label}
            href={item.href}
            active={item.active}
            disabled={item.disabled}
            className={item.active ? undefined : 'text-light'}
            title={item.disabled ? 'Funcionalidad disponible próximamente' : undefined}
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>

      <Link to="/login" className="mt-md-auto text-light">
        Cerrar sesión
      </Link>
    </aside>
  )
}

export default Sidebar
