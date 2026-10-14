import { useCallback, useEffect, useState } from 'react'

// Ejecuta una función asíncrona al montar y expone su estado de carga.
// `asyncFn` debe ser estable (definida fuera del componente o con useCallback).
export function useAsync(asyncFn) {
  const [state, setState] = useState({ data: null, error: null, loading: true })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    asyncFn().then(
      (data) => !cancelled && setState({ data, error: null, loading: false }),
      (error) => !cancelled && setState({ data: null, error, loading: false }),
    )

    return () => {
      cancelled = true
    }
  }, [asyncFn, attempt])

  const reload = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }))
    setAttempt((current) => current + 1)
  }, [])

  return { ...state, reload }
}
