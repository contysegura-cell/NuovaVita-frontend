import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'

function Hero({ title, description, image, buttonText, buttonHref }) {
  return (
    <section className="py-5">
      <Container>
        <Row className="align-items-center g-5">
          <Col md={6} className="text-center text-md-start">
            <h1>{title}</h1>
            <p className="lead">{description}</p>
            <Button variant="secondary" href={buttonHref}>
              {buttonText}
            </Button>
          </Col>

          <Col md={6} className="order-first order-md-last text-center">
            <Image
              src={image}
              fluid
              width="480"
              height="360"
              alt="Ilustración de un hogar con un corazón, símbolo de cuidado"
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
