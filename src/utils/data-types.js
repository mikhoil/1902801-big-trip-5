import { isPointPresent, isPointPast, isPointFuture } from './date-time.js';

export const POINTS_TYPE_LIST = [
  'taxi',
  'sightseeing',
  'check-in',
  'flight',
  'bus',
  'train',
  'ship',
  'drive',
  'restaurant',
];

export const TIME_FORMAT_LIST = {
  TIME: 'HH:mm',
  DAY: 'MMM D',
  FULL_DATE: 'D/MM/YY HH:mm',
  TIME_TAG_VALUE: 'YYYY-MM-DD',
};

export const TIME_SUFFIXES_LIST = ['D', 'H', 'M'];

export const FILTER_TYPE_LIST = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const FILTER_LIST = {
  [FILTER_TYPE_LIST.EVERYTHING]: (points) => [...points],
  [FILTER_TYPE_LIST.FUTURE]: (points) =>
    points.filter((point) => isPointFuture(point)),
  [FILTER_TYPE_LIST.PRESENT]: (points) =>
    points.filter((point) => isPointPresent(point)),
  [FILTER_TYPE_LIST.PAST]: (points) =>
    points.filter((point) => isPointPast(point)),
};

export const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const UPDATE_TYPE_LIST = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const AUTHORIZATION = 'Basic YTph';

export const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

export const TIME_LIMIT = {
  LOWER_LIMIT: 200,
  UPPER_LIMIT: 500,
};
