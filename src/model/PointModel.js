import Observable from '/src/framework/observable.js';
import { UPDATE_TYPE_LIST } from '../utils/data-types.js';

export default class PointModel extends Observable {
  #points = null;
  #offers = null;
  #destinations = null;
  #apiPointService = null;

  constructor({ apiPointService }) {
    super();
    this.#apiPointService = apiPointService;
  }

  async init() {
    try {
      this.#points = await this.#apiPointService.points;
      this.#offers = await this.#apiPointService.offers;
      this.#destinations = await this.#apiPointService.destinations;
    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UPDATE_TYPE_LIST.INIT);
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
  }

  getPoints() {
    return this.#points;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cant update unexisting Point');
    }

    try {
      const updatedPoint = await this.#apiPointService.updatePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error("Can't update task");
    }
  }

  async addPoint(updateType, update) {
    try {
      const newPoint = await this.#apiPointService.addPoint(update);

      this.#points = [newPoint, ...this.#points];

      this._notify(updateType, newPoint);
    } catch (error) {
      throw new Error("Can't add task");
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cant update unexisting Point');
    }

    try {
      await this.#apiPointService.deletePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch (error) {
      throw new Error("Can't delete this point");
    }
  }
}
