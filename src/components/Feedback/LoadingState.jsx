import Spinner from 'react-bootstrap/Spinner'

function LoadingState({ message = 'Cargando…' }) {
  return (
    <div className="d-flex align-items-center gap-3 py-5 justify-content-center text-body-secondary" role="status">
      <Spinner animation="border" size="sm" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}

export default LoadingState
