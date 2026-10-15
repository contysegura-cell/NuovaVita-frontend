import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx'
import ErrorState from '../../components/Feedback/ErrorState.jsx'
import LoadingState from '../../components/Feedback/LoadingState.jsx'
import ReportTable from '../../components/Reports/ReportTable.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import usePageMeta from '../../hooks/usePageMeta.js'
import { newReportPath } from '../../routes/paths.js'
import { getReportsWithRelations } from '../../services/reportQueries.js'
import { normalizeText } from '../../utils/text.js'

function ReportList({ reports }) {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('all')

  const specialties = [...new Set(reports.map((report) => report.specialist?.specialty).filter(Boolean))].toSorted()

  const normalizedSearch = normalizeText(search.trim())
  const filteredReports = reports.filter((report) => {
    const searchable = normalizeText(
      [report.patient?.name, report.specialist?.name, report.reason].filter(Boolean).join(' '),
    )
    const matchesSpecialty = specialty === 'all' || report.specialist?.specialty === specialty

    return searchable.includes(normalizedSearch) && matchesSpecialty
  })

  const resultText =
    filteredReports.length === 1 ? '1 informe encontrado' : `${filteredReports.length} informes encontrados`

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <Card.Title as="h2" className="h3 mb-1">Informes cargados</Card.Title>
            <Card.Text className="text-body-secondary mb-0">
              Consultá los informes de los especialistas, del más reciente al más antiguo.
            </Card.Text>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2 align-items-sm-start">
            <Form.Group controlId="report-search" className="search-field">
              <Form.Label visuallyHidden>Buscar informe</Form.Label>
              <Form.Control
                type="search"
                placeholder="Buscar informe"
                autoComplete="off"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="report-specialty-filter" className="filter-field">
              <Form.Label visuallyHidden>Filtrar por especialidad</Form.Label>
              <Form.Select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
                <option value="all">Todas las especialidades</option>
                {specialties.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button as={Link} to={newReportPath()} className="text-nowrap">
              + Nuevo informe
            </Button>
          </div>
        </div>

        <p className="small text-body-secondary" aria-live="polite">{resultText}</p>

        {filteredReports.length > 0 ? (
          <ReportTable reports={filteredReports} />
        ) : (
          <p className="fst-italic text-body-secondary mb-0">No se encontraron informes con esos criterios.</p>
        )}
      </Card.Body>
    </Card>
  )
}

function ReportsPage() {
  usePageMeta({
    title: 'Informes de Especialistas | Nuova Vita',
    description: 'Listado de informes de especialistas de Nuova Vita con búsqueda y filtro por especialidad.',
    noindex: true,
  })

  const { data: reports, loading, error, reload } = useAsync(getReportsWithRelations)

  return (
    <>
      <DashboardHeader title="Informes de Especialistas" />

      {loading && <LoadingState message="Cargando informes…" />}
      {error && <ErrorState onRetry={reload} />}
      {reports && <ReportList reports={reports} />}
    </>
  )
}

export default ReportsPage
