import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import Swal from 'sweetalert2'

// La variable permite cambiar el proveedor por ambiente. El fallback evita que
// un build de producción quede inutilizable si Vercel no tiene la variable.
const API_URL = import.meta.env.VITE_API_URL || 'https://randomuser.me/api/'
const specialties = ['Medicina general', 'Enfermería', 'Kinesiología', 'Nutrición']

function ProfessionalAvatar() {
  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary flex-shrink-0"
      style={{ width: 64, height: 64 }}
      aria-hidden="true"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14Z" />
      </svg>
    </div>
  )
}

function ProfessionalTeam() {
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [requestNumber, setRequestNumber] = useState(0)

  useEffect(() => {
    let isActive = true

    async function loadProfessionals() {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(API_URL, {
          params: {
            results: 4,
            nat: 'es',
            seed: 'nuova-vita',
          },
        })

        if (isActive) setProfessionals(response.data.results)
      } catch (requestError) {
        if (!isActive) return

        console.error('No se pudo cargar el equipo profesional:', requestError)
        setError('No pudimos cargar el equipo profesional en este momento.')

        Swal.fire({
          icon: 'error',
          title: 'Error al cargar los datos',
          text: 'No pudimos obtener el equipo profesional. Intentá nuevamente.',
          confirmButtonText: 'Entendido',
        })
      } finally {
        if (isActive) setLoading(false)
      }
    }

    loadProfessionals()

    return () => {
      isActive = false
    }
  }, [requestNumber])

  return (
    <section id="professional-team" className="mt-4" aria-labelledby="professional-team-title">
      <div className="mb-3">
        <h2 id="professional-team-title" className="h3 mb-1">
          Equipo profesional
        </h2>
      </div>

      {loading && (
        <div className="d-flex align-items-center gap-2 py-4" role="status">
          <Spinner animation="border" size="sm" aria-hidden="true" />
          <span>Cargando profesionales…</span>
        </div>
      )}

      {!loading && error && (
        <Alert variant="danger">
          <Alert.Heading className="h5">No se pudieron cargar los datos</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => setRequestNumber((current) => current + 1)}>
            Reintentar
          </Button>
        </Alert>
      )}

      {!loading && !error && (
        <Row className="g-3">
          {professionals.map((professional, index) => (
            <Col sm={6} xl={3} key={professional.login.uuid}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <ProfessionalAvatar />
                    <div>
                      <Card.Title as="h3" className="h6 mb-1">
                        {professional.name.first} {professional.name.last}
                      </Card.Title>
                      <Card.Subtitle className="small text-primary">
                        {specialties[index % specialties.length]}
                      </Card.Subtitle>
                    </div>
                  </div>
                  <Card.Text className="small mb-1">
                    <strong>Correo:</strong> {professional.email}
                  </Card.Text>
                  <Card.Text className="small mb-0">
                    <strong>Teléfono:</strong> {professional.phone}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </section>
  )
}

export default ProfessionalTeam
