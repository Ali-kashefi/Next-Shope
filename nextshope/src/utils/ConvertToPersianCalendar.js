export function ConvertToPersianCalendar(date) {
      return new Date(date).toLocaleDateString("fa-IR")
}