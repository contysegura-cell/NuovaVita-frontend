export function isSameDay(dateA, dateB) {
  const a = new Date(dateA)
  const b = new Date(dateB)
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function isToday(date, now = new Date()) {
  return isSameDay(date, now)
}

const relativeFormatter = new Intl.RelativeTimeFormat('es-AR', { numeric: 'auto' })

const UNITS = [
  { unit: 'day', seconds: 86400 },
  { unit: 'hour', seconds: 3600 },
  { unit: 'minute', seconds: 60 },
]

// "hace 15 minutos", "hace 2 horas", "ayer"...
export function formatRelativeTime(date, now = new Date()) {
  const diffSeconds = Math.round((new Date(date) - now) / 1000)

  for (const { unit, seconds } of UNITS) {
    if (Math.abs(diffSeconds) >= seconds) {
      return relativeFormatter.format(Math.round(diffSeconds / seconds), unit)
    }
  }
  return 'recién'
}
