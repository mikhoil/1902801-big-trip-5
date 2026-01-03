import DestinationModel from './model/DestinationModel';
import OfferModel from './model/OfferModel';
import PointModel from './model/PointModel';

export const DESTINATION_LIST = [
  new DestinationModel({
    id: 'amsterdam',
    name: 'Amsterdam',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: [
      { src: 'img/photos/1.jpg', description: 'Amsterdam landscape' },
      { src: 'img/photos/2.jpg', description: 'Amsterdam landscape' },
    ],
  }),
  new DestinationModel({
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
  }),
  new DestinationModel({
    id: 'geneva',
    name: 'Geneva',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: [
      { src: 'img/photos/1.jpg', description: 'Geneva landscape' },
      { src: 'img/photos/2.jpg', description: 'Geneva landscape' },
      { src: 'img/photos/3.jpg', description: 'Geneva landscape' },
    ],
  }),
];

export const OFFERS_BY_TYPE = {
  taxi: [
    new OfferModel({ id: 'taxi-1', title: 'Order Uber', price: 20 }),
    new OfferModel({ id: 'taxi-2', title: 'Add luggage', price: 30 }),
    new OfferModel({ id: 'taxi-3', title: 'Switch to comfort', price: 100 }),
  ],
  flight: [
    new OfferModel({ id: 'flight-1', title: 'Add luggage', price: 50 }),
    new OfferModel({ id: 'flight-2', title: 'Switch to comfort', price: 80 }),
    new OfferModel({ id: 'flight-3', title: 'Add meal', price: 15 }),
    new OfferModel({ id: 'flight-4', title: 'Choose seats', price: 5 }),
  ],
  drive: [
    new OfferModel({ id: 'drive-1', title: 'Rent a car', price: 200 }),
    new OfferModel({ id: 'drive-2', title: 'Add child seat', price: 10 }),
  ],
  'check-in': [
    new OfferModel({ id: 'check-in-1', title: 'Add breakfast', price: 50 }),
    new OfferModel({ id: 'check-in-2', title: 'Room upgrade', price: 100 }),
  ],
  sightseeing: [
    new OfferModel({ id: 'sightseeing-1', title: 'Book tickets', price: 40 }),
    new OfferModel({ id: 'sightseeing-2', title: 'Lunch in city', price: 30 }),
  ],
};

export const POINT_TYPE_LIST = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const POINT_LIST = [
  new PointModel({
    id: 'point-1',
    type: 'taxi',
    destination: 'amsterdam',
    base_price: 20,
    date_from: '2019-03-18T10:30:00.000Z',
    date_to: '2019-03-18T11:00:00.000Z',
    is_favorite: true,
    offers: ['taxi-1'],
  }),
  new PointModel({
    id: 'point-2',
    type: 'flight',
    destination: 'chamonix',
    base_price: 160,
    date_from: '2019-03-18T12:25:00.000Z',
    date_to: '2019-03-18T13:35:00.000Z',
    is_favorite: false,
    offers: ['flight-1', 'flight-2'],
  }),
  new PointModel({
    id: 'point-3',
    type: 'drive',
    destination: 'chamonix',
    base_price: 160,
    date_from: '2019-03-18T14:30:00.000Z',
    date_to: '2019-03-18T16:05:00.000Z',
    is_favorite: true,
    offers: ['drive-1'],
  }),
];
