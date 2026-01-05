import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TIME_FORMAT_LIST, POINTS_TYPE_LIST } from '../utils/data-types.js';
import { parseFormatDate } from '../utils/date-time.js';
import flatpickr from 'flatpickr';
import he from 'he';

export default class AddPointView extends AbstractStatefulView {
  #allDestinations = null;
  #allOffers = null;
  #formHandler = null;
  #deleteHandler = null;
  #datePickerStart = null;
  #datePickerEnd = null;

  constructor({ allDestinations, allOffers, onFormSubmit, onDeleteClick }) {
    super();
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this._setState({
      base_price: 0,
      date_from: '',
      date_to: '',
      destination: '',
      description: '',
      offers: [],
      type: 'flight',
    });
    this.#formHandler = onFormSubmit;
    this.#deleteHandler = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    const {
      date_from,
      date_to,
      base_price,
      type,
      offers,
      destination,
      description,
    } = this._state;

    const eventTypes = POINTS_TYPE_LIST.map(
      (event) =>
        `<div class="event__type-item">
          <input id="event-type-${event}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event}"
            ${event === type ? 'checked' : ''}>
          <label class="event__type-label  event__type-label--${event}" for="event-type-${event}-1">
            ${event.charAt(0).toUpperCase() + event.slice(1)}</label>
        </div>`
    ).join('');

    const offersList = offers
      .map((offerElement) => {
        const checked = offers.includes(offerElement.id) ? 'checked' : '';
        const offerName = offerElement.title.toLowerCase().split(' ').join('-');

        return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-${offerElement.id}" type="checkbox" name="event-offer-${offerName}" ${checked}>
        <label class="event__offer-label" for="event-offer-${offerName}-${offerElement.id}">
          <span class="event__offer-title">${offerElement.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offerElement.price}</span>
        </label>
      </div>`;
      })
      .join('');

    return `<li class="trip-events__item">
                <form class="event event--edit" action="#" method="post">
                  <header class="event__header">
                    <div class="event__type-wrapper">
                      <label class="event__type  event__type-btn" for="event-type-toggle-1">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src="img/icons/${
                          type || 'flight'
                        }.png" alt="Event type icon">
                      </label>
                      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
  
                      <div class="event__type-list">
                        <fieldset class="event__type-group">
                          <legend class="visually-hidden">Event type</legend>
                          ${eventTypes}
                        </fieldset>
                      </div>
                    </div>
  
                    <div class="event__field-group  event__field-group--destination">
                      <label class="event__label  event__type-output" for="event-destination-1">
                        ${type || 'flight'}
                      </label>
                      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
                        destination || ''
                      }" list="destination-list-1">
                      <datalist id="destination-list-1">
                        ${this.#allDestinations
                          .map(
                            (destination) =>
                              `<option value="${destination.name}">`
                          )
                          .join('')}
                      </datalist>
                    </div>
  
                    <div class="event__field-group  event__field-group--time">
                      <label class="visually-hidden" for="event-start-time-1">From</label>
                      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${
                        date_from
                          ? parseFormatDate(
                              date_from,
                              TIME_FORMAT_LIST['FULL_DATE']
                            )
                          : ''
                      }">
                      &mdash;
                      <label class="visually-hidden" for="event-end-time-1">To</label>
                      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${
                        date_to
                          ? parseFormatDate(
                              date_to,
                              TIME_FORMAT_LIST['FULL_DATE']
                            )
                          : ''
                      }">
                    </div>
  
                    <div class="event__field-group  event__field-group--price">
                      <label class="event__label" for="event-price-1">
                        <span class="visually-hidden">Price</span>
                        &euro;
                      </label>
                      <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${
                        base_price ? he.encode(base_price) : '0'
                      }" required>
                    </div>
  
                    <button class="event__save-btn  btn  btn--blue" type="submit" ${
                      base_price > 0 &&
                      date_from !== '' &&
                      date_to !== '' &&
                      destination !== ''
                        ? ''
                        : 'disabled'
                    }>Save</button>
                    <button class="event__reset-btn" type="reset">Delete</button>
                  </header>
                  <section class="event__details">
                    ${
                      offersList.length > 0
                        ? `<section class="event__section  event__section--offers">
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  
                      <div class="event__available-offers">
                        ${offersList}
                      </div>
                    </section>`
                        : ''
                    }
  
                    ${
                      description !== ''
                        ? `<section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${description}</p>
                    </section>`
                        : ''
                    }
                  </section>
                </form>
              </li>`;
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event')
      .addEventListener('submit', this.#formHandlerSubmit);
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteHandlerClick);
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#pointTypeHandlerChange);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationHandlerChange);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceHandlerChange);

    this.#setDatePickerStart();
    this.#setDatePickerEnd();
  }

  #pointTypeHandlerChange = (e) => {
    e.preventDefault();
    const targetType = e.target.value;
    const typeOffers = this.#allOffers.find(
      (offers) => offers.type === targetType
    );
    this.updateElement({
      offers: typeOffers.offers,
      type: targetType,
    });
  };

  #destinationHandlerChange = (e) => {
    e.preventDefault();
    const targetDestination = e.target.value;
    const newDestination = this.#allDestinations.find(
      (destination) => destination.name === targetDestination
    );

    if (!newDestination) {
      e.target.value = '';
      this.updateElement({
        destination: '',
        description: '',
      });
      return;
    }

    this.updateElement({
      destination: newDestination.name,
      description: newDestination.description,
    });
  };

  #priceHandlerChange = (e) => {
    e.preventDefault();
    const newPrice = e.target.value;

    if (isNaN(newPrice)) {
      e.target.value = '0';
      this.updateElement({
        base_price: '0',
      });
      return;
    }

    this.updateElement({
      base_price: newPrice,
    });
  };

  #dateFromHandlerChange = ([newDateFrom]) => {
    this.updateElement({
      date_from: newDateFrom,
    });
  };

  #dateToHandlerChange = ([newDateTo]) => {
    this.updateElement({
      date_to: newDateTo,
    });
  };

  #setDatePickerStart() {
    this.#datePickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        defaultDate: this._state.date_from,
        onChange: this.#dateFromHandlerChange,
        maxDate: this._state.date_to,
      }
    );
  }

  #setDatePickerEnd() {
    this.#datePickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        defaultDate: this._state.date_to,
        onChange: this.#dateToHandlerChange,
        minDate: this._state.date_from,
      }
    );
  }

  #formHandlerSubmit = (e) => {
    e.preventDefault();
    this.#formHandler(AddPointView.parseStateToPoint(this._state));
  };

  #deleteHandlerClick = (e) => {
    e.preventDefault();
    this.#deleteHandler(AddPointView.parseStateToPoint(this._state));
  };

  static parseStateToPoint(state) {
    const point = { ...state };

    if (!point.description) {
      point.description = null;
    }

    delete point.description;
    return point;
  }
}
