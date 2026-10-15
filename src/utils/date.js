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

// Las fechas de calendario se guardan como 'AAAA-MM-DD'. Se leen como fecha
// local: new Date('2024-02-10') sería medianoche UTC y en Argentina mostraría
// el día anterior.
export function parseDateOnly(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function toDateInputValue(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function calculateAge(birthDate, now = new Date()) {
  const birth = parseDateOnly(birthDate)
  let age = now.getFullYear() - birth.getFullYear()
  const hadBirthdayThisYear =
    now.getMonth() > birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate())
  if (!hadBirthdayThisYear) age -= 1
  return age
}

const dateFormatter = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })

// '2024-02-10' → '10/02/2024'
export function formatDate(value) {
  return dateFormatter.format(parseDateOnly(value))
}
