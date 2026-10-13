import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import RecentActivity from '../../components/Dashboard/RecentActivity.jsx'
import Statistics from '../../components/Dashboard/Statistics.jsx'
import ErrorState from '../../components/Feedback/ErrorState.jsx'
import LoadingState from '../../components/Feedback/LoadingState.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import {
  activityService,
  alertService,
  appointmentService,
  patientService,
  reportService,
} from '../../services/index.js'
import { formatRelativeTime, isToday } from '../../utils/date.js'

const RECENT_ACTIVITY_LIMIT = 5

async function loadDashboard() {
  const [patients, reports, appointments, alerts, activities] = await Promise.all([
    patientService.getAll(),
    reportService.getAll(),
    appointmentService.getAll(),
    alertService.getAll(),
    activityService.getAll(),
  ])

  const patientNames = new Map(patients.map((patient) => [patient.id, patient.name]))

  const statistics = [
    { label: 'Pacientes activos', value: patients.filter((patient) => patient.status === 'active').length },
    { label: 'Informes pendientes', value: reports.filter((report) => report.status === 'draft').length },
    { label: 'Turnos de hoy', value: appointments.filter((appointment) => isToday(appointment.date)).length },
    { label: 'Alertas', value: alerts.filter((alert) => !alert.resolved).length },
  ]

  const recentActivities = activities
    .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, RECENT_ACTIVITY_LIMIT)
    .map((activity) => ({
      ...activity,
      person: patientNames.get(activity.patientId) ?? 'Paciente desconocido',
      time: formatRelativeTime(activity.createdAt),
    }))

  return { statistics, recentActivities }
}

function Dashboard() {
  const { data, loading, error, reload } = useAsync(loadDashboard)

  return (
    <>
      <DashboardHeader title="Panel Principal" />

      {loading && <LoadingState message="Cargando el panel…" />}
      {error && <ErrorState onRetry={reload} />}
      {data && (
        <>
          <Statistics statistics={data.statistics} />
          <RecentActivity activities={data.recentActivities} />
        </>
      )}
    </>
  )
}

export default Dashboard
