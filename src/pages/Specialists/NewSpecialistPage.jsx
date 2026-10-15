import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import SpecialistForm from '../../components/Specialists/SpecialistForm.jsx'
import usePageMeta from '../../hooks/usePageMeta.js'
import { PATHS, specialistDetailPath } from '../../routes/paths.js'

function NewSpecialistPage() {
  usePageMeta({
    title: 'Nuevo especialista | Nuova Vita',
    description: 'Alta de un nuevo especialista en Nuova Vita.',
    noindex: true,
  })

  const navigate = useNavigate()

  const handleCreated = (specialist) => {
    Swal.fire({
      icon: 'success',
      title: 'Especialista registrado',
      text: `${specialist.name} se dio de alta correctamente.`,
      confirmButtonText: 'Ver ficha',
    })
    navigate(specialistDetailPath(specialist.id))
  }

  return (
    <>
      <Link to={PATHS.specialists} className="d-inline-block mb-3 text-secondary">
        ← Volver a especialistas
      </Link>
      <DashboardHeader title="Nuevo especialista" />
      <SpecialistForm onCreated={handleCreated} onCancel={() => navigate(PATHS.specialists)} />
    </>
  )
}

export default NewSpecialistPage
