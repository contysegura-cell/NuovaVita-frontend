import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import StatCard from './StatCard.jsx'

function Statistics({ statistics }) {
  return (
    <Row xs={1} sm={2} xl={4} className="g-4 mb-5" aria-label="Estadísticas del centro">
      {statistics.map((statistic) => (
        <Col key={statistic.label}>
          <StatCard {...statistic} />
        </Col>
      ))}
    </Row>
  )
}

export default Statistics
