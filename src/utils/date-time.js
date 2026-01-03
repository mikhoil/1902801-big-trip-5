const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function parseFormatDate(dateString) {
  const dateObj = new Date(dateString);
  const month = MONTHS[dateObj.getMonth()];
  const day = dateObj.getDate();
  return `${month} ${day}`;
}

export function parseFormatTime(dateString) {
  const dateObj = new Date(dateString);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function parseFormatDateForInput(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function calculateDuration(dateFromString, dateToString) {
  const fromDate = new Date(dateFromString);
  const toDate = new Date(dateToString);
  const duration = toDate.getTime() - fromDate.getTime();
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}H ${minutes}M`;
}
