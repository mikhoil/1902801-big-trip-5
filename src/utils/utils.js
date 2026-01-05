import dayjs from 'dayjs';

export const getRandomValue = (minPrice, maxPrice) =>
  Math.round(Math.random() * (maxPrice - minPrice) + minPrice);

export const getOffersFromTypes = (eventType, offerElements) => {
  let offerList = [];

  offerElements.forEach((offersElement) => {
    const { type, offers } = offersElement;

    if (type === eventType) {
      offerList = offers;
    }
  });

  return offerList;
};

export const getDestinationFromId = (idNumber, destinationElements) => {
  let destinationName = '';

  destinationElements.forEach((destinations) => {
    const { id, name } = destinations;

    if (id === idNumber) {
      destinationName = name;
    }
  });

  return destinationName;
};
