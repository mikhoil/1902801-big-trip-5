import { offerList } from '../mock-data.js';

export default class OfferModel {
  constructor() {
    this.offers = [...offerList];
  }

  getOffers() {
    return this.offers;
  }
}
