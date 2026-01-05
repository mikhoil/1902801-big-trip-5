import { getRandomValue } from './utils/utils.js';

export const DESTINATION_LIST = [
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: [
      { src: 'img/photos/1.jpg', description: 'Amsterdam landscape' },
      { src: 'img/photos/2.jpg', description: 'Amsterdam landscape' },
    ],
  },
  {
    id: 'chamonix',
    name: 'Chamonix',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: [
      { src: 'img/photos/1.jpg', description: 'Chamonix landscape' },
      { src: 'img/photos/2.jpg', description: 'Chamonix landscape' },
      { src: 'img/photos/3.jpg', description: 'Chamonix landscape' },
      { src: 'img/photos/4.jpg', description: 'Chamonix landscape' },
      { src: 'img/photos/5.jpg', description: 'Chamonix landscape' },
    ],
  },
  {
    id: 'geneva',
    name: 'Geneva',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: [
      { src: 'img/photos/1.jpg', description: 'Geneva landscape' },
      { src: 'img/photos/2.jpg', description: 'Geneva landscape' },
      { src: 'img/photos/3.jpg', description: 'Geneva landscape' },
    ],
  },
];

export const OFFERS_BY_TYPE = {
  taxi: [
    { id: 'taxi-1', title: 'Order Uber', price: 20 },
    { id: 'taxi-2', title: 'Add luggage', price: 30 },
    { id: 'taxi-3', title: 'Switch to comfort', price: 100 },
  ],
  flight: [
    { id: 'flight-1', title: 'Add luggage', price: 50 },
    { id: 'flight-2', title: 'Switch to comfort', price: 80 },
    { id: 'flight-3', title: 'Add meal', price: 15 },
    { id: 'flight-4', title: 'Choose seats', price: 5 },
  ],
  drive: [
    { id: 'drive-1', title: 'Rent a car', price: 200 },
    { id: 'drive-2', title: 'Add child seat', price: 10 },
  ],
  'check-in': [
    { id: 'check-in-1', title: 'Add breakfast', price: 50 },
    { id: 'check-in-2', title: 'Room upgrade', price: 100 },
  ],
  sightseeing: [
    { id: 'sightseeing-1', title: 'Book tickets', price: 40 },
    { id: 'sightseeing-2', title: 'Lunch in city', price: 30 },
  ],
};

export const POINT_LIST = [
  {
    id: 'point-1',
    type: 'taxi',
    destination: 'Amsterdam',
    base_price: 20,
    date_from: '2019-03-18T10:30:00.000Z',
    date_to: '2019-03-18T11:00:00.000Z',
    is_favorite: true,
    offers: ['taxi-1'],
  },
  {
    id: 'point-2',
    type: 'flight',
    destination: 'Chamonix',
    base_price: 160,
    date_from: '2019-03-18T12:25:00.000Z',
    date_to: '2019-03-18T13:35:00.000Z',
    is_favorite: false,
    offers: ['flight-1', 'flight-2'],
  },
  {
    id: 'point-3',
    type: 'drive',
    destination: 'Chamonix',
    base_price: 160,
    date_from: '2019-03-18T14:30:00.000Z',
    date_to: '2019-03-18T16:05:00.000Z',
    is_favorite: true,
    offers: ['drive-1'],
  },
];

const MIN_PRICE = 1000;
const MAX_PRICE = 10000;

export const offerList = [
  {
    type: 'taxi',
    offers: [
      {
        id: '1',
        title: 'Drive faster!',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '2',
        title: 'Drive a little bit slowly.',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '3',
        title: 'Choose the radio station.',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '4',
        title: 'Open the door before and after.',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: '1',
        title: 'Priority seating selection',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '2',
        title: 'Air conditioning guaranteed',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '3',
        title: 'Extra luggage space',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: '1',
        title: 'First class compartment',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '2',
        title: 'Dining car access',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '3',
        title: 'Private cabin upgrade',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: '1',
        title: 'Cabin with ocean view',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '2',
        title: 'VIP deck access',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '3',
        title: 'Fishing equipment rental',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: '1',
        title: 'Car insurance included',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '2',
        title: 'GPS navigation system',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '3',
        title: 'Child seat rental',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
    ],
  },
  {
    type: 'flight',
    offers: [],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '1',
        title: 'Choose the time of check-in.',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '2',
        title: 'Choose the time of check-out.',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '3',
        title: 'Add breakfast.',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '1',
        title: 'Modern sights mostly.',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '2',
        title: 'A way without lots of people.',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '1',
        title: 'Window table reservation',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '2',
        title: "Chef's special menu",
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
      {
        id: '3',
        title: 'Wine pairing selection',
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
      },
    ],
  },
];
