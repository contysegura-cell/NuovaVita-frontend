import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import RoleCard from './RoleCard.jsx'

function Roles({ title, roles }) {
  return (
    <section id="roles" className="py-5">
      <Container>
        <h2 className="text-center mb-5">{title}</h2>

        <Row xs={1} md={2} lg={4} className="g-4">
          {roles.map((role) => (
            <Col key={role.title}>
              <RoleCard {...role} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Roles
