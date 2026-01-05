import { POINT_LIST, DESTINATION_LIST, OFFERS_BY_TYPE } from '../mock-data';

export default class MainModel {
  constructor() {
    this.points = POINT_LIST;
    this.destinations = DESTINATION_LIST;
    this.offersByType = OFFERS_BY_TYPE;
  }

  getPoints() {
    return this.points;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  getOffersByType(type) {
    return this.offersByType[type] || [];
  }

  getSelectedOffers(point) {
    if (!point.offers || point.offers.length === 0) {
      return [];
    }
    const offers = this.getOffersByType(point.type);
    return offers.filter((offer) => point.offers.includes(offer.id));
  }

  getAllDestinations() {
    return this.destinations;
  }

  updatePoint(updatedPoint) {
    const index = this.points.findIndex(
      (point) => point.id === updatedPoint.id
    );
    if (index !== -1) {
      this.points = [
        ...this.points.slice(0, index),
        updatedPoint,
        ...this.points.slice(index + 1),
      ];
    }
  }
}
