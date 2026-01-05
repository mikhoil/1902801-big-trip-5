import dayjs from 'dayjs';
import { TIME_SUFFIXES_LIST } from './data-types.js';

export function parseFormatDate(dateString) {
  return dayjs(dateString).format('MMM D');
}

export function parseFormatDuration(date_from, date_to) {
  const startTime = dayjs(date_from);
  const endTime = dayjs(date_to);
  const durationMinutes = endTime.diff(startTime, 'minute');

  const durationDays = Math.floor(durationMinutes / 1440);
  const remainingMinutes = durationMinutes % 1440;
  const durationHours = Math.floor(remainingMinutes / 60);
  const durationsMinutes = (remainingMinutes % 60) + 1;

  const durationElements = [durationDays, durationHours, durationsMinutes];
  const durationResult = [];

  for (let i = 0; i < durationElements.length; i++) {
    const value = durationElements[i];
    if (value > 0) {
      const suffix = TIME_SUFFIXES_LIST[i];
      const paddedValue = value < 10 ? `0${value}` : value;
      durationResult.push(`${paddedValue}${suffix}`);
    }
  }

  return durationResult.join(' ') || '00M';
}
export function isPointPast(point) {
  return dayjs(point.date_to).isBefore(dayjs());
}

export function isPointPresent(point) {
  return (
    dayjs(point.date_from).isBefore(dayjs()) &&
    dayjs(point.date_to).isAfter(dayjs())
  );
}

export function isPointFuture(point) {
  return dayjs(point.date_from).isAfter(dayjs());
}

export function sortByDay(pointFirst, pointSecond) {
  return new Date(pointFirst.date_from) - new Date(pointSecond.date_from);
}

export function sortByPrice(pointFirst, pointSecond) {
  return pointSecond.base_price - pointFirst.base_price;
}

export function sortByDuration(pointFirst, pointSecond) {
  return (
    dayjs(pointSecond.date_to).diff(dayjs(pointSecond.date_from)) -
    dayjs(pointFirst.date_to).diff(dayjs(pointFirst.date_from))
  );
}
