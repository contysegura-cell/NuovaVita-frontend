import { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function Patients({ patients }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const normalizedSearch = normalizeText(search.trim())
  const filteredPatients = patients.filter((patient) => {
    const matchesName = normalizeText(patient.name).includes(normalizedSearch)
    const matchesStatus = status === 'all' || patient.status === status

    return matchesName && matchesStatus
  })

  const resultText =
    filteredPatients.length === 1
      ? '1 paciente encontrado'
      : `${filteredPatients.length} pacientes encontrados`

  return (
    <Card id="patients-section" className="border-0 shadow-sm mt-4">
      <Card.Body>
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <Card.Title as="h2" className="h3 mb-1">
              Pacientes
            </Card.Title>
            <Card.Text className="text-body-secondary mb-0">
              Consultá los residentes registrados en el sistema.
            </Card.Text>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2">
            <Form.Group controlId="patient-search">
              <Form.Label visuallyHidden>Buscar paciente</Form.Label>
              <Form.Control
                type="search"
                placeholder="Buscar por nombre"
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
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => {
                const isActive = patient.status === 'active'

                return (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
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
