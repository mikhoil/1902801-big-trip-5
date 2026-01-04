import AbstractView from '../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  constructor({ hasPast = true, hasFuture = true, hasPresent = true }) {
    super();
    this.hasPast = hasPast;
    this.hasFuture = hasFuture;
    this.hasPresent = hasPresent;
  }

  get template() {
    return `<form class="trip-filters" action="#" method="get">
                <div class="trip-filters__filter">
                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${
                    !this.hasFuture ? 'disabled' : ''
                  }>
                  <label class="trip-filters__filter-label" for="filter-future">Future</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present" ${
                    !this.hasPresent ? 'disabled' : ''
                  }>
                  <label class="trip-filters__filter-label" for="filter-present">Present</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${
                    !this.hasPast ? 'disabled' : ''
                  }>
                  <label class="trip-filters__filter-label" for="filter-past">Past</label>
                </div>

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
  }
}
