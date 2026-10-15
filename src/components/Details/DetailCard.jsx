import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Tarjeta de ficha con pares etiqueta/valor (pacientes, especialistas…).
export function DetailCard({ title, children }) {
  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Body>
        <Card.Title as="h2" className="h5 mb-3">{title}</Card.Title>
        <Row as="dl" className="g-3 mb-0">{children}</Row>
      </Card.Body>
    </Card>
  )
}

export function DetailItem({ label, children }) {
  return (
    <Col sm={6} lg={4}>
      <dt className="small text-body-secondary fw-normal">{label}</dt>
      <dd className="mb-0">{children}</dd>
    </Col>
  )
}
