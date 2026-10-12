import heroImage from '../../assets/images/hero.svg'
import About from '../../components/About/About.jsx'
import Contact from '../../components/Contact/Contact.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Roles from '../../components/Roles/Roles.jsx'
import Services from '../../components/Services/Services.jsx'

const navigationLinks = [
  { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#roles', label: 'Roles' },
  { href: '#contacto', label: 'Contacto' },
]

const services = [
  { icon: 'clinicalHistory', title: 'Historia Clínica Digital', description: 'Registro cronológico y foliado de informes, indicaciones médicas y actividades diarias de cada paciente.' },
  { icon: 'attendance', title: 'Control de Asistencia', description: 'Integración con reloj biométrico para el registro de marcados de entrada y salida del personal.' },
  { icon: 'reports', title: 'Informes de Especialistas', description: 'Carga y consulta de informes por especialidad, con trazabilidad de quién registró cada dato.' },
  { icon: 'security', title: 'Seguridad y Confidencialidad', description: 'Accesos por rol, registro de auditoría y cumplimiento de la normativa vigente de datos de salud.' },
]

const roles = [
  { title: 'Médico de Cabecera', description: 'Accede a la historia clínica completa de sus pacientes asignados, en el centro o de forma remota.' },
  { title: 'Especialista', description: 'Carga y consulta sus propios informes (kinesiología, nutrición, entre otras) para cualquier paciente.' },
  { title: 'Enfermería', description: 'Registra las actividades diarias: rutina, medicación, alimentación e incidencias.' },
  { title: 'Administración', description: 'Gestiona usuarios e infraestructura del sistema, sin acceso al contenido clínico.' },
]

function Home() {
  return (
    <>
      <Navbar links={navigationLinks} />
      <main id="inicio">
        <Hero title="Cuidado integral, gestión digital" description="Un sistema pensado para centralizar la historia clínica, los informes de especialistas y el control de asistencia del personal de Nuova Vita." image={heroImage} buttonText="Conocer más" buttonHref="#servicios" />
        <About title="¿Qué es Nuova Vita?" description="Nuova Vita es un centro de descanso para adultos mayores que combina atención profesional con un enfoque humano. Este sistema acompaña esa tarea centralizando la información clínica y administrativa en un solo lugar, con acceso seguro para cada rol del equipo." />
        <Services title="Funcionalidades principales" services={services} />
        <Roles title="Roles del sistema" roles={roles} />
        <Contact title="Contacto" />
      </main>
      <Footer year={2026} brand="Nuova Vita" />
    </>
  )
}

export default Home
