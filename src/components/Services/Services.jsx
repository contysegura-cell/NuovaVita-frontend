import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ServiceCard from './ServiceCard.jsx'

function Services({ title, services }) {
  return (
    <section id="servicios" className="bg-light py-5">
      <Container>
        <h2 className="text-center mb-5">{title}</h2>

        <Row xs={1} md={2} lg={4} className="g-4">
          {services.map((service) => (
            <Col key={service.title}>
              <ServiceCard {...service} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Services
