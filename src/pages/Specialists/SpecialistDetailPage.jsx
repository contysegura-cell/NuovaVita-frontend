import { useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useParams } from 'react-router-dom'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import { DetailCard, DetailItem } from '../../components/Details/DetailCard.jsx'
import ErrorState from '../../components/Feedback/ErrorState.jsx'
import LoadingState from '../../components/Feedback/LoadingState.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import usePageMeta from '../../hooks/usePageMeta.js'
import { PATHS } from '../../routes/paths.js'
import { NotFoundError, specialistService } from '../../services/index.js'

function SpecialistDetail({ specialist }) {
  return (
    <>
      <DetailCard title="Datos profesionales">
        <DetailItem label="Especialidad">{specialist.specialty}</DetailItem>
        <DetailItem label="Matrícula">{specialist.licenseNumber}</DetailItem>
      </DetailCard>

      <DetailCard title="Contacto">
        <DetailItem label="Correo electrónico">
          <a href={`mailto:${specialist.email}`}>{specialist.email}</a>
        </DetailItem>
        <DetailItem label="Teléfono">{specialist.phone}</DetailItem>
      </DetailCard>
    </>
  )
}

function SpecialistDetailPage() {
  const { id } = useParams()
  // GET del especialista; se vuelve a pedir si cambia el id de la URL.
  const loadSpecialist = useCallback(() => specialistService.getById(id), [id])
  const { data: specialist, loading, error, reload } = useAsync(loadSpecialist)

  usePageMeta({
    title: `${specialist?.name ?? 'Ficha del especialista'} | Nuova Vita`,
    description: 'Ficha con la especialidad, la matrícula y los datos de contacto del especialista.',
    noindex: true,
  })

  const notFound = error instanceof NotFoundError

  return (
    <>
      <Link to={PATHS.specialists} className="d-inline-block mb-3 text-secondary">
        ← Volver a especialistas
      </Link>
      <DashboardHeader title={specialist?.name ?? 'Ficha del especialista'} />

      {loading && <LoadingState message="Cargando la ficha…" />}
      {notFound && (
        <Card className="border-0 shadow-sm">
          <Card.Body className="py-5 text-center">
            <p className="text-body-secondary">No encontramos ese especialista.</p>
            <Button as={Link} to={PATHS.specialists}>Ver todos los especialistas</Button>
          </Card.Body>
        </Card>
      )}
      {error && !notFound && <ErrorState onRetry={reload} />}
      {specialist && <SpecialistDetail specialist={specialist} />}
    </>
  )
}

export default SpecialistDetailPage
