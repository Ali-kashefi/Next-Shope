// The input date is in Persian and only the date, month, year, day are included and returned.
export function ConvertToPersianCalendar(date) {
      return new Date(date).toLocaleDateString("fa-IR")
}