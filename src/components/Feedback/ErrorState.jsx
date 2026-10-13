import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function ErrorState({ message = 'No pudimos cargar la información.', onRetry }) {
  return (
    <Alert variant="danger" className="d-flex flex-wrap justify-content-between align-items-center gap-3">
      <span>{message}</span>
      {onRetry && (
        <Button variant="outline-danger" size="sm" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </Alert>
  )
}

export default ErrorState
