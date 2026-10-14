import { Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/Feedback/ErrorBoundary.jsx'
import PrivateLayout from './layouts/PrivateLayout.jsx'
import ComingSoon from './pages/ComingSoon/ComingSoon.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import PatientsPage from './pages/Patients/PatientsPage.jsx'
import { PATHS } from './routes/paths.js'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={PATHS.home} element={<Home />} />
        <Route path={PATHS.login} element={<Login />} />

        <Route path={PATHS.dashboard} element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
          <Route path={PATHS.patients} element={<PatientsPage />} />
          <Route path={PATHS.clinicalHistory} element={<ComingSoon title="Historia Clínica" />} />
          <Route path={PATHS.reports} element={<ComingSoon title="Informes de Especialistas" />} />
          <Route path={PATHS.activities} element={<ComingSoon title="Actividades Diarias" />} />
          <Route path={PATHS.attendance} element={<ComingSoon title="Control de Asistencia" />} />
          <Route path={PATHS.settings} element={<ComingSoon title="Configuración" />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App