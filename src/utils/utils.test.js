import { describe, expect, it } from 'vitest'
import { formatRelativeTime, isToday } from './date.js'
import { normalizeText } from './text.js'

describe('normalizeText', () => {
  it('quita tildes y pasa a minúsculas', () => {
    expect(normalizeText('Fernández ÁNGEL')).toBe('fernandez angel')
  })
})

describe('isToday', () => {
  const now = new Date(2026, 9, 13, 12)

  it('reconoce fechas del mismo día', () => {
    expect(isToday(new Date(2026, 9, 13, 23, 59), now)).toBe(true)
  })

  it('rechaza otros días', () => {
    expect(isToday(new Date(2026, 9, 14, 0, 0), now)).toBe(false)
  })
})

describe('formatRelativeTime', () => {
  const now = new Date(2026, 9, 13, 12)

  it('formatea minutos, horas y días', () => {
    expect(formatRelativeTime(new Date(2026, 9, 13, 11, 45), now)).toBe('hace 15 minutos')
    expect(formatRelativeTime(new Date(2026, 9, 13, 10), now)).toBe('hace 2 horas')
    expect(formatRelativeTime(new Date(2026, 9, 12, 12), now)).toBe('ayer')
  })

  it('devuelve "recién" para menos de un minuto', () => {
    expect(formatRelativeTime(new Date(2026, 9, 13, 11, 59, 40), now)).toBe('recién')
  })
})
