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
import { patientDetailPath, PATHS, specialistDetailPath } from '../../routes/paths.js'
import { NotFoundError } from '../../services/index.js'
import { getReportWithRelations } from '../../services/reportQueries.js'
import { formatDate } from '../../utils/date.js'

function TextSection({ title, text }) {
  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Body>
        <Card.Title as="h2" className="h5 mb-2">{title}</Card.Title>
        {text ? (
          <p className="mb-0 text-pre-line">{text}</p>
        ) : (
          <p className="mb-0 text-body-secondary">Sin datos.</p>
        )}
      </Card.Body>
    </Card>
  )
}

function ReportDetail({ report }) {
  return (
    <>
      <DetailCard title="Consulta">
        <DetailItem label="Fecha">{formatDate(report.date)}</DetailItem>
        <DetailItem label="Paciente">
          {report.patient ? (
            <Link to={patientDetailPath(report.patient.id)}>{report.patient.name}</Link>
          ) : (
            'Paciente desconocido'
          )}
        </DetailItem>
        <DetailItem label="Especialista">
          {report.specialist ? (
            <>
              <Link to={specialistDetailPath(report.specialist.id)}>{report.specialist.name}</Link>
              <div className="small text-body-secondary">
                {report.specialist.specialty} · {report.specialist.licenseNumber}
              </div>
            </>
          ) : (
            'Especialista desconocido'
          )}
        </DetailItem>
        <DetailItem label="Próximo control">
          {report.nextControl ? formatDate(report.nextControl) : 'No indicado'}
        </DetailItem>
      </DetailCard>

      <TextSection title="Motivo de la consulta" text={report.reason} />
      <TextSection title="Evaluación" text={report.evaluation} />
      <TextSection title="Diagnóstico" text={report.diagnosis} />
      <TextSection title="Indicaciones" text={report.indications} />
    </>
  )
}

function ReportDetailPage() {
  const { id } = useParams()
  const loadReport = useCallback(() => getReportWithRelations(id), [id])
  const { data: report, loading, error, reload } = useAsync(loadReport)

  usePageMeta({
    title: 'Informe de especialista | Nuova Vita',
    description: 'Detalle de un informe de especialista.',
    noindex: true,
  })

  const notFound = error instanceof NotFoundError

  return (
    <>
      <Link to={PATHS.reports} className="d-inline-block mb-3 text-secondary">← Volver a informes</Link>
      <DashboardHeader title="Informe de especialista" />

      {loading && <LoadingState message="Cargando el informe…" />}
      {notFound && (
        <Card className="border-0 shadow-sm">
          <Card.Body className="py-5 text-center">
            <p className="text-body-secondary">No encontramos ese informe.</p>
            <Button as={Link} to={PATHS.reports}>Ver todos los informes</Button>
          </Card.Body>
        </Card>
      )}
      {error && !notFound && <ErrorState onRetry={reload} />}
      {report && <ReportDetail report={report} />}
    </>
  )
}

export default ReportDetailPage
