import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { reportDetailPath } from '../../routes/paths.js'
import { formatDate } from '../../utils/date.js'

// Informes con su paciente y especialista (ver getReportsWithRelations).
// `showPatient` se apaga dentro de la ficha de un paciente.
function ReportTable({ reports, showPatient = true }) {
  return (
    <Table responsive className="align-middle mb-0">
      <thead>
        <tr>
          <th scope="col">Fecha</th>
          {showPatient && <th scope="col">Paciente</th>}
          <th scope="col">Especialista</th>
          <th scope="col">Motivo</th>
          <th scope="col"><span className="visually-hidden">Acciones</span></th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report.id}>
            <td className="text-nowrap">{formatDate(report.date)}</td>
            {showPatient && <td>{report.patient?.name ?? 'Paciente desconocido'}</td>}
            <td>
              {report.specialist?.name ?? 'Especialista desconocido'}
              {report.specialist && <div className="small text-body-secondary">{report.specialist.specialty}</div>}
            </td>
            <td>{report.reason}</td>
            <td className="text-end">
              <Link to={reportDetailPath(report.id)} className="text-nowrap">
                Ver informe<span className="visually-hidden"> del {formatDate(report.date)}</span>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ReportTable
