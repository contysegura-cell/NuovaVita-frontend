import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import RecentActivity from '../../components/Dashboard/RecentActivity.jsx'
import Statistics from '../../components/Dashboard/Statistics.jsx'
import ErrorState from '../../components/Feedback/ErrorState.jsx'
import LoadingState from '../../components/Feedback/LoadingState.jsx'
import { activities, alerts, appointments, reports } from '../../data/dashboardData.js'
import { useAsync } from '../../hooks/useAsync.js'
import { patientService } from '../../services/index.js'
import { formatRelativeTime, isToday } from '../../utils/date.js'

const RECENT_ACTIVITY_LIMIT = 5

const recentActivities = activities
  .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, RECENT_ACTIVITY_LIMIT)
  .map((activity) => ({ ...activity, time: formatRelativeTime(activity.createdAt) }))

function buildStatistics(patients) {
  return [
    { label: 'Pacientes activos', value: patients.filter((patient) => patient.status === 'active').length },
    { label: 'Informes pendientes', value: reports.filter((report) => report.status === 'draft').length },
    { label: 'Turnos de hoy', value: appointments.filter((appointment) => isToday(appointment.date)).length },
    { label: 'Alertas', value: alerts.filter((alert) => !alert.resolved).length },
  ]
}

function Dashboard() {
  const { data: patients, loading, error, reload } = useAsync(patientService.getAll)

  return (
    <>
      <DashboardHeader title="Panel Principal" />

      {loading && <LoadingState message="Cargando el panel…" />}
      {error && <ErrorState onRetry={reload} />}
      {patients && <Statistics statistics={buildStatistics(patients)} />}

      <RecentActivity activities={recentActivities} />
    </>
  )
}

export default Dashboard
