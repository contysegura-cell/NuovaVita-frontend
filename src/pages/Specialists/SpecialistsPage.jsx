import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import ErrorState from '../../components/Feedback/ErrorState.jsx'
import LoadingState from '../../components/Feedback/LoadingState.jsx'
import SpecialistList from '../../components/Specialists/SpecialistList.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import usePageMeta from '../../hooks/usePageMeta.js'
import { specialistService } from '../../services/index.js'

function SpecialistsPage() {
  usePageMeta({
    title: 'Especialistas | Nuova Vita',
    description: 'Listado de especialistas de Nuova Vita con búsqueda por nombre o matrícula y filtro por especialidad.',
    noindex: true,
  })

  const { data: specialists, loading, error, reload } = useAsync(specialistService.getAll)

  return (
    <>
      <DashboardHeader title="Especialistas" />

      {loading && <LoadingState message="Cargando especialistas…" />}
      {error && <ErrorState onRetry={reload} />}
      {specialists && <SpecialistList specialists={specialists} />}
    </>
  )
}

export default SpecialistsPage
