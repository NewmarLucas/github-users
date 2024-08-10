const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function dateFormat(date?: string) {
  if (!date) return null
  const dateObj = new Date(date)
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const monthName = monthNames[monthIndex];
  const year = dateObj.getFullYear();

  return `${day} ${monthName} ${year}`;
}