import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import Patients from '../../components/Dashboard/Patients.jsx'
import ErrorState from '../../components/Feedback/ErrorState.jsx'
import LoadingState from '../../components/Feedback/LoadingState.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import usePageMeta from '../../hooks/usePageMeta.js'
import { patientService } from '../../services/index.js'

function PatientsPage() {
  usePageMeta({
    title: 'Pacientes | Nuova Vita',
    description: 'Listado de pacientes de Nuova Vita con búsqueda por nombre y filtro por estado.',
    noindex: true,
  })

  const { data: patients, loading, error, reload } = useAsync(patientService.getAll)

  return (
    <>
      <DashboardHeader title="Pacientes" />

      {loading && <LoadingState message="Cargando pacientes…" />}
      {error && <ErrorState onRetry={reload} />}
      {patients && <Patients patients={patients} />}
    </>
  )
}

export default PatientsPage
