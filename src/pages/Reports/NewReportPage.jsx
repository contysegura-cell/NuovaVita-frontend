import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import ErrorState from '../../components/Feedback/ErrorState.jsx'
import LoadingState from '../../components/Feedback/LoadingState.jsx'
import ReportForm from '../../components/Reports/ReportForm.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import usePageMeta from '../../hooks/usePageMeta.js'
import { patientDetailPath, PATHS, reportDetailPath } from '../../routes/paths.js'
import { patientService, specialistService } from '../../services/index.js'

// GET de pacientes y especialistas para completar los selectores.
async function loadFormOptions() {
  const [patients, specialists] = await Promise.all([patientService.getAll(), specialistService.getAll()])
  return { patients, specialists }
}

function NewReportPage() {
  usePageMeta({
    title: 'Nuevo informe | Nuova Vita',
    description: 'Carga de un informe de especialista en Nuova Vita.',
    noindex: true,
  })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialPatientId = searchParams.get('paciente') ?? ''
  // Si se llegó desde la ficha de un paciente, se vuelve a ella.
  const backPath = initialPatientId ? patientDetailPath(initialPatientId) : PATHS.reports
  const backLabel = initialPatientId ? '← Volver a la ficha del paciente' : '← Volver a informes'

  const { data, loading, error, reload } = useAsync(loadFormOptions)

  const handleCreated = (report) => {
    Swal.fire({
      icon: 'success',
      title: 'Informe guardado',
      text: 'El informe se agregó a la historia del paciente.',
      confirmButtonText: 'Ver informe',
    })
    navigate(reportDetailPath(report.id))
  }

  return (
    <>
      <Link to={backPath} className="d-inline-block mb-3 text-secondary">{backLabel}</Link>
      <DashboardHeader title="Nuevo informe" />

      {loading && <LoadingState message="Cargando pacientes y especialistas…" />}
      {error && <ErrorState onRetry={reload} />}
      {data && (
        <ReportForm
          patients={data.patients}
          specialists={data.specialists}
          initialPatientId={initialPatientId}
          onCreated={handleCreated}
          onCancel={() => navigate(backPath)}
        />
      )}
    </>
  )
}

export default NewReportPage
