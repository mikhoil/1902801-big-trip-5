import AbstractView from '../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #filterTypeHandler = null;
  #filterTypeHandlerInput = null;

  constructor({ filters, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#filterTypeHandler = onFilterTypeChange;

    this.element
      .querySelectorAll('.trip-filters__filter-input')
      .forEach((element) => {
        element.addEventListener(
          'input',
          (this.#filterTypeHandlerInput = (evt) => {
            evt.preventDefault();
            this.#filterTypeHandler(element.value);
          })
        );
      });
  }

  get template() {
    const filterList = this.#filters
      .map(({ type, points }) => {
        const count = points.length;

        return `<div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio"
                  name="trip-filter" value="${type}" ${
          count === 0 ? 'disabled' : ''
        }>
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>`;
      })
      .join('');

    return `<form class="trip-filters" action="#" method="get">
                ${filterList}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
  }
}
