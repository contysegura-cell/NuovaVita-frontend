import { useCallback, useEffect, useState } from 'react'

// Ejecuta una función asíncrona al montar y expone su estado de carga.
// `asyncFn` debe ser estable (definida fuera del componente o con useCallback);
// si cambia (por ejemplo, otro id en la URL), se vuelve a ejecutar.
export function useAsync(asyncFn) {
  const [state, setState] = useState({ data: null, error: null, loading: true, source: asyncFn })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    asyncFn().then(
      (data) => !cancelled && setState({ data, error: null, loading: false, source: asyncFn }),
      (error) => !cancelled && setState({ data: null, error, loading: false, source: asyncFn }),
    )

    return () => {
      cancelled = true
    }
  }, [asyncFn, attempt])

  const reload = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }))
    setAttempt((current) => current + 1)
  }, [])

  // Resultado de una función anterior: todavía se está cargando la nueva.
  if (state.source !== asyncFn) return { data: null, error: null, loading: true, reload }

  return { data: state.data, error: state.error, loading: state.loading, reload }
}
