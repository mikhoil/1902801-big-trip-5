import AbstractView from '../framework/view/abstract-view.js';
import { TIME_FORMAT_LIST } from '../utils/data-types.js';
import { parseFormatDate, parseFormatDuration } from '../utils/date-time.js';

export default class PointView extends AbstractView {
  #point = null;
  #offer = null;
  #destination = null;
  #editHandler = null;
  #favoriteHandler = null;

  constructor({ point, offer, destination, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#offer = offer;
    this.#destination = destination;
    this.#editHandler = onEditClick;
    this.#favoriteHandler = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editHandlerClick);
    this.element
      .querySelector('.event__favorite-icon')
      .addEventListener('click', this.#favoriteHandlerClick);
  }

  get template() {
    const { name } = this.#destination;
    const { type, offers } = this.#offer;
    const {
      date_from: dateFrom,
      date_to: dateTo,
      base_price: base_price,
      is_favorite: isFavorite,
    } = this.#point;

    const offerList = offers
      .map((offerElement) => {
        const offerPrice = offerElement.price;
        const offerTitle = offerElement.title
          .toLowerCase()
          .split(' ')
          .join('-');

        return `<li class="event__offer">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerPrice}</span>
    </li>`;
      })
      .join('');

    const favoriteCheck = isFavorite ? '--active' : '';

    return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${parseFormatDate(
                  dateFrom,
                  TIME_FORMAT_LIST['TIME_TAG_VALUE']
                )}">${parseFormatDate(dateFrom, TIME_FORMAT_LIST['DAY'])}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${parseFormatDate(
      dateFrom,
      TIME_FORMAT_LIST['TIME']
    )}</time>
                    &mdash;
                    <time class="event__end-time" datetime=""${dateTo}">${parseFormatDate(
      dateTo,
      TIME_FORMAT_LIST['TIME']
    )}</time>
                  </p>
                  <p class="event__duration">${parseFormatDuration(
                    dateFrom,
                    dateTo
                  )}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${base_price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offerList}
                </ul>
                <button class="event__favorite-btn  event__favorite-btn${favoriteCheck}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
  }

  #editHandlerClick = (e) => {
    e.preventDefault();
    this.#editHandler();
  };

  #favoriteHandlerClick = (e) => {
    e.preventDefault();
    this.#favoriteHandler();
  };
}
