import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

function RecentActivity({ activities }) {
  return (
    <Card id="recent-activity-section" className="border-0 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="h3">Actividad reciente</Card.Title>
        <Card.Text className="text-body-secondary">
          Últimos informes y actividades registrados en el sistema.
        </Card.Text>

        {activities.length > 0 ? (
          <ListGroup variant="flush" className="mt-3" aria-live="polite">
            {activities.map((activity) => (
              <ListGroup.Item key={activity.id} className="d-flex flex-column flex-md-row justify-content-between gap-2 px-0 py-3">
                <div>
                  <h3 className="h6 mb-1">{activity.type} — {activity.person}</h3>
                  <p className="mb-0 text-body-secondary">{activity.description}</p>
                </div>
                <small className="text-body-secondary text-nowrap">{activity.time}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="fst-italic text-body-secondary mt-3 mb-0">
            No hay actividades recientes para mostrar.
          </p>
        )}
      </Card.Body>
    </Card>
  )
}

export default RecentActivity
