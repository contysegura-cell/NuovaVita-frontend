import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import Patients from '../../components/Dashboard/Patients.jsx'
import ProfessionalTeam from '../../components/Dashboard/ProfessionalTeam.jsx'
import RecentActivity from '../../components/Dashboard/RecentActivity.jsx'
import Sidebar from '../../components/Dashboard/Sidebar.jsx'
import Statistics from '../../components/Dashboard/Statistics.jsx'
import {
  alerts,
  appointments,
  patients,
  recentActivities,
  reports,
} from '../../data/dashboardData.js'

import usePageMeta from '../../hooks/usePageMeta.js'

const statistics = [
  {
    label: 'Pacientes activos',
    value: patients.filter((patient) => patient.status === 'active').length,
  },
  {
    label: 'Informes pendientes',
    value: reports.filter((report) => report.status === 'pending').length,
  },
  {
    label: 'Turnos de hoy',
    value: appointments.filter((appointment) => appointment.date === 'today').length,
  },
  {
    label: 'Alertas',
    value: alerts.filter((alert) => !alert.resolved).length,
  },
]

function Dashboard() {
    usePageMeta({
    title: 'Panel Principal | Nuova Vita',
    description:
      'Panel interno de Nuova Vita: estadísticas, actividad reciente y listado de pacientes.',
    noindex: true,
  })
  return (
    <Container fluid>
      <Row className="min-vh-100">
        <Sidebar />

        <div className="col-12 col-md-9 col-xl-10 bg-light p-4 p-lg-5">
          <DashboardHeader
            title="Panel Principal"
            userName="Dr. Nombre Apellido"
          />

          <main id="dashboard-home">
            <Statistics statistics={statistics} />
            <RecentActivity activities={recentActivities} />
            <Patients patients={patients} />
            <ProfessionalTeam />
          </main>
        </div>
      </Row>
    </Container>
  )
}

export default Dashboard
