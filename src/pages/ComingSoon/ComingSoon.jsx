import Card from 'react-bootstrap/Card'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import usePageMeta from '../../hooks/usePageMeta.js'

// Marcador para las secciones del menú que todavía no están implementadas.
function ComingSoon({ title }) {
  usePageMeta({
    title: `${title} | Nuova Vita`,
    description: `Sección ${title} de Nuova Vita, disponible próximamente.`,
    noindex: true,
  })

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
