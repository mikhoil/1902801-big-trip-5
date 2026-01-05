import Observable from '/src/framework/observable.js';

export default class OfferModel extends Observable {
  #offers = [];
  #apiPointService = null;

  constructor({ apiPointService }) {
    super();
    this.#apiPointService = apiPointService;
  }

  getOffers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#apiPointService.offers;
    } catch (err) {
      this.#offers = [];
    }
  }
}
