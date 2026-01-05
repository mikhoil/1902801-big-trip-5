import dayjs from 'dayjs';

export function parseFormatDate(dateString) {
  return dayjs(dateString).format('MMM D');
}

export function parseFormatTime(dateString) {
  return dayjs(dateString).format('HH:mm');
}

export function parseFormatDateForInput(dateString) {
  return dayjs(dateString).format('DD/MM/YY HH:mm');
}

export function calculateDuration(dateFromString, dateToString) {
  const from = dayjs(dateFromString);
  const to = dayjs(dateToString);
  const diffMins = Math.max(0, to.diff(from, 'minute'));

  if (diffMins < 60) {
    return `${diffMins}M`;
  }

  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;

  if (minutes === 0) {
    return `${hours}H`;
  }

  return `${hours}H ${minutes}M`;
}
