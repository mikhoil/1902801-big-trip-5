import AbstractView from '../framework/view/abstract-view.js';

function createSortPointViewTemplate(sortType) {}

export default class SortPointView extends AbstractView {
  #sortType = null;

  #onSortTypeChange = null;

  constructor({ sortType, onSortTypeChange }) {
    super();

    this.#sortType = sortType;
    this.#onSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#handleSortTypeChange);
  }

  #handleSortTypeChange = (e) => {
    e.preventDefault();
    this.#onSortTypeChange(e.target.dataset.sortType);
  };

  get template() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${['day', 'event', 'time', 'price', 'offers']
              .map(
                (type) =>
                  `<div class="trip-sort__item  trip-sort__item--${type}">
                      <input id="sort-${type}" class="trip-sort__input  visually-hidden" data-sort-type="${type}"
                      type="radio" name="trip-sort" value="sort-${type}" ${
                    type === this.#sortType ? 'checked' : ''
                  }
                      ${
                        type === 'event' || type === 'offers' ? 'disabled' : ''
                      }>
                      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
                    </div>`
              )
              .join('\n')}
          </form>`;
  }
}
