import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import { PATHS } from '../../routes/paths.js'
import { resetDb } from '../../services/index.js'

const menuItems = [
  { label: 'Inicio', to: PATHS.dashboard, end: true },
  { label: 'Pacientes', to: PATHS.patients },
  { label: 'Historia Clínica', to: PATHS.clinicalHistory },
  { label: 'Informes de Especialistas', to: PATHS.reports },
  { label: 'Actividades Diarias', to: PATHS.activities },
  { label: 'Control de Asistencia', to: PATHS.attendance },
  { label: 'Configuración', to: PATHS.settings },
]

async function handleResetDemo() {
  // Import diferido: sweetalert2 solo se descarga cuando se usa.
  const { default: Swal } = await import('sweetalert2')
  const { isConfirmed } = await Swal.fire({
    title: '¿Restablecer los datos de la demo?',
    text: 'Se perderán todos los cambios cargados en este navegador.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Restablecer',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#c5714e',
  })

  if (!isConfirmed) return

  resetDb()
  // Recargar garantiza que todas las pantallas vuelvan a leer los datos.
  window.location.reload()
}

function Sidebar() {
  return (
    <aside className="col-12 col-md-3 col-xl-2 bg-dark text-light d-flex flex-column gap-4 p-4">
      <Link to={PATHS.home} className="d-flex align-items-center gap-2 text-white text-decoration-none">
        <img src={logo} alt="Logo de Nuova Vita" width="40" height="40" />
        <span className="fw-semibold fs-5">Nuova Vita</span>
      </Link>

      <Nav as="nav" variant="pills" className="sidebar-nav flex-column gap-1" aria-label="Menú del panel">
        {menuItems.map((item) => (
          <Nav.Link key={item.to} as={NavLink} to={item.to} end={item.end}>
            {item.label}
          </Nav.Link>
        ))}
      </Nav>

      <div className="mt-md-auto d-flex flex-column align-items-start gap-2">
        <Button variant="link" size="sm" className="p-0 text-light opacity-75" onClick={handleResetDemo}>
          Restablecer datos de la demo
        </Button>
        <Link to={PATHS.login} className="text-light">
          Cerrar sesión
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
