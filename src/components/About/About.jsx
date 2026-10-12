import Container from 'react-bootstrap/Container'

function About({ title, description }) {
  return (
    <section id="sobre-nosotros" className="py-5">
      <Container>
        <h2 className="text-center mb-4">{title}</h2>
        <p className="lead text-center mx-auto">{description}</p>
      </Container>
    </section>
  )
}

export default About
