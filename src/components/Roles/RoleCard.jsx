import Card from 'react-bootstrap/Card'

function RoleCard({ title, description }) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title as="h3" className="h5">
          {title}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default RoleCard
