import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { PATHS, specialistDetailPath } from '../../routes/paths.js'
import { normalizeText } from '../../utils/text.js'

function SpecialistList({ specialists }) {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('all')

  // Solo se ofrecen en el filtro las especialidades que tienen alguien cargado.
  const specialties = [...new Set(specialists.map((specialist) => specialist.specialty))].toSorted()

  const normalizedSearch = normalizeText(search.trim())
  const filteredSpecialists = specialists.filter((specialist) => {
    const matchesSearch =
      normalizeText(specialist.name).includes(normalizedSearch) ||
      normalizeText(specialist.licenseNumber).includes(normalizedSearch)
    const matchesSpecialty = specialty === 'all' || specialist.specialty === specialty

    return matchesSearch && matchesSpecialty
  })

  const resultText =
    filteredSpecialists.length === 1
      ? '1 especialista encontrado'
      : `${filteredSpecialists.length} especialistas encontrados`

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <Card.Title as="h2" className="h3 mb-1">
              Profesionales
            </Card.Title>
            <Card.Text className="text-body-secondary mb-0">
              Consultá los especialistas que atienden en el centro.
            </Card.Text>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2 align-items-sm-start">
            <Form.Group controlId="specialist-search" className="search-field">
              <Form.Label visuallyHidden>Buscar especialista</Form.Label>
              <Form.Control
                type="search"
                placeholder="Nombre o matrícula"
                autoComplete="off"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="specialist-specialty-filter" className="filter-field">
              <Form.Label visuallyHidden>Filtrar por especialidad</Form.Label>
              <Form.Select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
                <option value="all">Todas las especialidades</option>
                {specialties.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button as={Link} to={PATHS.newSpecialist} className="text-nowrap">
              + Nuevo especialista
            </Button>
          </div>
        </div>

        <p className="small text-body-secondary" aria-live="polite">
          {resultText}
        </p>

        {filteredSpecialists.length > 0 ? (
          <Table responsive className="align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Especialista</th>
                <th scope="col">Especialidad</th>
                <th scope="col">Matrícula</th>
                <th scope="col">Correo</th>
                <th scope="col">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpecialists.map((specialist) => (
                <tr key={specialist.id}>
                  <td>
                    <Link to={specialistDetailPath(specialist.id)}>{specialist.name}</Link>
                  </td>
                  <td>{specialist.specialty}</td>
                  <td className="text-nowrap">{specialist.licenseNumber}</td>
                  <td>{specialist.email}</td>
                  <td className="text-nowrap">{specialist.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="fst-italic text-body-secondary mb-0">
            No se encontraron especialistas con esos criterios.
          </p>
        )}
      </Card.Body>
    </Card>
  )
}

export default SpecialistList
