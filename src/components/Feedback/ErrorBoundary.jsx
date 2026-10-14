import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

// Evita la pantalla en blanco si un componente falla al renderizar.
class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Error no controlado en la interfaz:', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <Container as="main" className="py-5 text-center">
        <h1 className="h3">Algo salió mal</h1>
        <p className="text-body-secondary">Ocurrió un error inesperado. Probá recargar la página.</p>
        <Button onClick={() => window.location.reload()}>Recargar</Button>
      </Container>
    )
  }
}

export default ErrorBoundary
