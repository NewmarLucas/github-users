export function dateFormat(date?: string) {
  if (!date) return null
  const dateString = new Date(date).toUTCString()
  const matches = dateString.match(/(\d{2}) ([A-Za-z]{3}) (\d{4})/)
  if (matches) return matches[0];
  return null
}