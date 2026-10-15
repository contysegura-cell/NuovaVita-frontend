import { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { patientDetailPath, PATHS } from '../../routes/paths.js'
import { calculateAge } from '../../utils/date.js'
import { normalizeText } from '../../utils/text.js'

function Patients({ patients }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const normalizedSearch = normalizeText(search.trim())
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      normalizeText(patient.name).includes(normalizedSearch) || patient.dni.includes(search.trim())
    const matchesStatus = status === 'all' || patient.status === status

    return matchesSearch && matchesStatus
  })

  const resultText =
    filteredPatients.length === 1
      ? '1 paciente encontrado'
      : `${filteredPatients.length} pacientes encontrados`

  return (
    <Card id="patients-section" className="border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <Card.Title as="h2" className="h3 mb-1">
              Residentes
            </Card.Title>
            <Card.Text className="text-body-secondary mb-0">
              Consultá los residentes registrados en el sistema.
            </Card.Text>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2 align-items-sm-start">
            <Form.Group controlId="patient-search" className="search-field">
              <Form.Label visuallyHidden>Buscar paciente</Form.Label>
              <Form.Control
                type="search"
                placeholder="Nombre o DNI"
                autoComplete="off"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="patient-status-filter">
              <Form.Label visuallyHidden>Filtrar por estado</Form.Label>
              <Form.Select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </Form.Select>
            </Form.Group>

            <Button as={Link} to={PATHS.newPatient} className="text-nowrap">
              + Nuevo paciente
            </Button>
          </div>
        </div>

        <p className="small text-body-secondary" aria-live="polite">
          {resultText}
        </p>

        {filteredPatients.length > 0 ? (
          <Table responsive className="align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Paciente</th>
                <th scope="col">DNI</th>
                <th scope="col">Edad</th>
                <th scope="col">Obra social</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => {
                const isActive = patient.status === 'active'

                return (
                  <tr key={patient.id}>
                    <td>
                      <Link to={patientDetailPath(patient.id)}>{patient.name}</Link>
                    </td>
                    <td>{patient.dni}</td>
                    <td>{calculateAge(patient.birthDate)}</td>
                    <td>{patient.healthInsurance}</td>
                    <td>
                      <Badge bg={isActive ? 'success' : 'secondary'}>
                        {isActive ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        ) : (
          <p className="fst-italic text-body-secondary mb-0">
            No se encontraron pacientes con esos criterios.
          </p>
        )}
      </Card.Body>
    </Card>
  )
}

export default Patients
