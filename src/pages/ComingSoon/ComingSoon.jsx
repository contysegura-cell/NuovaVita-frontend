import Card from 'react-bootstrap/Card'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'

// Marcador para las secciones del menú que todavía no están implementadas.
function ComingSoon({ title }) {
  return (
    <>
      <DashboardHeader title={title} />
      <Card className="border-0 shadow-sm">
        <Card.Body className="py-5 text-center text-body-secondary">
          Esta sección estará disponible próximamente.
        </Card.Body>
      </Card>
    </>
  )
}

export default ComingSoon
