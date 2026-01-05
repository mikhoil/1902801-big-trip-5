import Observable from '../framework/observable.js';
import { FILTER_TYPE_LIST } from '../utils/data-types.js';

export default class FiltersModel extends Observable {
  #filter = FILTER_TYPE_LIST.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;

    this._notify(updateType, filter);
  }
}
