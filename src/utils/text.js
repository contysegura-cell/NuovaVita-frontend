// Minúsculas y sin tildes, para búsquedas que ignoren acentos.
export function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}
