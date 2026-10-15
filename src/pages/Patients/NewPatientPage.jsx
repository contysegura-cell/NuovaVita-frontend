import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import PatientForm from '../../components/Patients/PatientForm.jsx'
import usePageMeta from '../../hooks/usePageMeta.js'
import { patientDetailPath, PATHS } from '../../routes/paths.js'

function NewPatientPage() {
  usePageMeta({
    title: 'Nuevo paciente | Nuova Vita',
    description: 'Alta de un nuevo paciente en Nuova Vita.',
    noindex: true,
  })

  const navigate = useNavigate()

  const handleCreated = (patient) => {
    Swal.fire({
      icon: 'success',
      title: 'Paciente registrado',
      text: `${patient.name} se dio de alta correctamente.`,
      confirmButtonText: 'Ver ficha',
      confirmButtonColor: '#c5714e',
    })
    navigate(patientDetailPath(patient.id))
  }

  return (
    <>
      <Link to={PATHS.patients} className="d-inline-block mb-3 text-secondary">
        ← Volver a pacientes
      </Link>
      <DashboardHeader title="Nuevo paciente" />
      <PatientForm onCreated={handleCreated} onCancel={() => navigate(PATHS.patients)} />
    </>
  )
}

export default NewPatientPage
