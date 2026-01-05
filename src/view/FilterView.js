import AbstractView from '../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #filterTypeHandler = null;
  #filterTypeHandlerInput = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#filterTypeHandler = onFilterTypeChange;
    this.#currentFilterType = currentFilterType;

    this.element
      .querySelectorAll('.trip-filters__filter-input')
      .forEach((element) => {
        element.addEventListener(
          'input',
          (this.#filterTypeHandlerInput = (e) => {
            e.preventDefault();
            this.#filterTypeHandler(element.value);
          })
        );
      });
  }

  get template() {
    return `<form class="trip-filters" action="#" method="get">
                ${this.#filters
                  .map(
                    ({ type, points }) => `<div class="trip-filters__filter">
                              <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio"
                              name="trip-filter" value="${type}" ${
                      type === this.#currentFilterType ? 'checked' : ''
                    } ${points.length === 0 ? 'disabled' : ''}>
                              <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                            </div>`
                  )
                  .join('')}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
  }
}
