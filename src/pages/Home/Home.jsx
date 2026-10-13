import heroImage from '../../assets/images/hero.svg'
import About from '../../components/About/About.jsx'
import Contact from '../../components/Contact/Contact.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Roles from '../../components/Roles/Roles.jsx'
import Services from '../../components/Services/Services.jsx'
import { navigationLinks, roles, services } from '../../data/homeData.js'
import usePageMeta from '../../hooks/usePageMeta.js'

function Home() {
  usePageMeta({
    title: 'Nuova Vita | Centro de Cuidado para Adultos Mayores',
    description:
      'Nuova Vita es un centro de cuidado para adultos mayores con gestión digital de historias clínicas, informes de especialistas y control de asistencia.',
  })

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