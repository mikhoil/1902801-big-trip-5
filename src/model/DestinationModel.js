import Observable from '/src/framework/observable.js';

export default class DestinationModel extends Observable {
  #destinations = null;
  #apiPointService = null;

  constructor({ apiPointService }) {
    super();
    this.#apiPointService = apiPointService;
  }

  getDestinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#apiPointService.destinations;
    } catch (error) {
      this.#destinations = [];
    }
  }
}
