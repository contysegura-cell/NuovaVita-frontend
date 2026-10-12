import Card from 'react-bootstrap/Card'

function StatCard({ value, label }) {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="d-flex flex-column gap-2">
        <strong className="display-6 text-primary">{value}</strong>
        <span className="text-body-secondary">{label}</span>
      </Card.Body>
    </Card>
  )
}

export default StatCard
