import { useCallback } from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useParams } from 'react-router-dom'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import { DetailCard, DetailItem } from '../../components/Details/DetailCard.jsx'
import ErrorState from '../../components/Feedback/ErrorState.jsx'
import LoadingState from '../../components/Feedback/LoadingState.jsx'
import ReportTable from '../../components/Reports/ReportTable.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import usePageMeta from '../../hooks/usePageMeta.js'
import { newReportPath, PATHS } from '../../routes/paths.js'
import { NotFoundError, patientService } from '../../services/index.js'
import { getReportsWithRelations } from '../../services/reportQueries.js'
import { calculateAge, formatDate } from '../../utils/date.js'

const SEX_LABELS = { F: 'Femenino', M: 'Masculino', X: 'Otro / No informa' }

function PatientDetail({ patient }) {
  const isActive = patient.status === 'active'

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <Badge bg={isActive ? 'success' : 'secondary'}>{isActive ? 'Activo' : 'Inactivo'}</Badge>
        <span className="text-body-secondary">
          {calculateAge(patient.birthDate)} años · DNI {patient.dni}
        </span>
      </div>

      <DetailCard title="Datos personales">
        <DetailItem label="Fecha de nacimiento">{formatDate(patient.birthDate)}</DetailItem>
        <DetailItem label="Sexo">{SEX_LABELS[patient.sex] ?? '—'}</DetailItem>
        <DetailItem label="Fecha de ingreso">{formatDate(patient.admissionDate)}</DetailItem>
      </DetailCard>

      <DetailCard title="Cobertura médica">
        <DetailItem label="Obra social">{patient.healthInsurance}</DetailItem>
        <DetailItem label="Número de afiliado">{patient.affiliateNumber}</DetailItem>
      </DetailCard>

      <DetailCard title="Contacto de emergencia">
        <DetailItem label="Nombre">{patient.emergencyContact.name}</DetailItem>
        <DetailItem label="Vínculo">{patient.emergencyContact.relationship}</DetailItem>
        <DetailItem label="Teléfono">{patient.emergencyContact.phone}</DetailItem>
      </DetailCard>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h5 mb-3">Alergias</Card.Title>
          {patient.allergies.length > 0 ? (
            <ul className="list-inline mb-0">
              {patient.allergies.map((allergy) => (
                <li key={allergy} className="list-inline-item">
                  <Badge bg="danger-subtle" text="danger-emphasis" className="fs-6 fw-normal">{allergy}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body-secondary mb-0">Sin alergias registradas.</p>
          )}
        </Card.Body>
      </Card>

      <PatientReports patientId={patient.id} />
    </>
  )
}

function PatientReports({ patientId }) {
  // GET de los informes de este paciente, del más reciente al más antiguo.
  const loadReports = useCallback(() => getReportsWithRelations({ patientId }), [patientId])
  const { data: reports, loading, error, reload } = useAsync(loadReports)

  return (
    <Card as="section" className="border-0 shadow-sm mb-4" aria-labelledby="patient-reports-title">
      <Card.Body>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <Card.Title as="h2" id="patient-reports-title" className="h5 mb-0">Informes de especialistas</Card.Title>
          <Button as={Link} to={newReportPath(patientId)} size="sm">+ Cargar informe</Button>
        </div>

        {loading && <LoadingState message="Cargando informes…" />}
        {error && <ErrorState onRetry={reload} />}
        {reports && reports.length > 0 && <ReportTable reports={reports} showPatient={false} />}
        {reports && reports.length === 0 && (
          <p className="text-body-secondary mb-0">Todavía no hay informes cargados para este paciente.</p>
        )}
      </Card.Body>
    </Card>
  )
}

function PatientDetailPage() {
  const { id } = useParams()
  // GET del paciente; se vuelve a pedir si cambia el id de la URL.
  const loadPatient = useCallback(() => patientService.getById(id), [id])
  const { data: patient, loading, error, reload } = useAsync(loadPatient)

  usePageMeta({
    title: `${patient?.name ?? 'Ficha del paciente'} | Nuova Vita`,
    description: 'Ficha con los datos personales, la cobertura, el contacto de emergencia y los informes del paciente.',
    noindex: true,
  })

  const notFound = error instanceof NotFoundError

  return (
    <>
      <Link to={PATHS.patients} className="d-inline-block mb-3 text-secondary">
        ← Volver a pacientes
      </Link>
      <DashboardHeader title={patient?.name ?? 'Ficha del paciente'} />

      {loading && <LoadingState message="Cargando la ficha…" />}
      {notFound && (
        <Card className="border-0 shadow-sm">
          <Card.Body className="py-5 text-center">
            <p className="text-body-secondary">No encontramos ese paciente.</p>
            <Button as={Link} to={PATHS.patients}>Ver todos los pacientes</Button>
          </Card.Body>
        </Card>
      )}
      {error && !notFound && <ErrorState onRetry={reload} />}
      {patient && <PatientDetail patient={patient} />}
    </>
  )
}

export default PatientDetailPage
