import AbstractView from '../framework/view/abstract-view.js';
import { parseFormatDate } from '../utils/date-time.js';

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({ points, destinations, offers }) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    if (!this.#points || this.#points.length === 0) {
      return '<section class="trip-main__trip-info  trip-info"></section>';
    }

    const title = this.#getTripTitle();
    const dates = this.#getTripDates();
    const cost = this.#getTripCost();

    return `<section class="trip-main__trip-info  trip-info">
              <div class="trip-info__main">
                <h1 class="trip-info__title">${title}</h1>
                <p class="trip-info__dates">${dates}</p>
              </div>
              <p class="trip-info__cost">
                Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
              </p>
            </section>`;
  }

  #getTripTitle() {
    const destinationNames = this.#points.map((point) => {
      const destination = this.#destinations.find(
        (dest) => dest.id === point.destination
      );
      return destination ? destination.name : '';
    });

    const uniqueDestinations = destinationNames.filter(
      (name, index, array) => index === 0 || name !== array[index - 1]
    );

    if (uniqueDestinations.length === 0) {
      return '';
    }

    if (uniqueDestinations.length <= 3) {
      return uniqueDestinations.join(' &mdash; ');
    }

    return `${uniqueDestinations[0]} &mdash; ... &mdash; ${
      uniqueDestinations[uniqueDestinations.length - 1]
    }`;
  }

  #getTripDates() {
    if (this.#points.length === 0) {
      return '';
    }

    const sortedPoints = [...this.#points].sort(
      (a, b) => new Date(a.date_from) - new Date(b.date_from)
    );

    const startDate = new Date(sortedPoints[0].date_from);
    const endDate = new Date(sortedPoints[sortedPoints.length - 1].date_to);

    const startMonth = parseFormatDate(startDate, 'MMM');
    const endMonth = parseFormatDate(endDate, 'MMM');
    const startDay = parseFormatDate(startDate, 'D');
    const endDay = parseFormatDate(endDate, 'D');

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${endDay}`;
    }

    return `${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${endMonth} ${endDay}`;
  }

  #getTripCost() {
    let totalCost = 0;

    this.#points.forEach((point) => {
      totalCost += point.base_price || 0;

      if (
        point.offers &&
        Array.isArray(point.offers) &&
        point.offers.length > 0
      ) {
        const pointTypeOffers = this.#offers.find(
          (offer) => offer.type === point.type
        );
        if (pointTypeOffers && pointTypeOffers.offers) {
          point.offers.forEach((offerId) => {
            const offer = pointTypeOffers.offers.find((o) => o.id === offerId);
            if (offer && typeof offer.price === 'number') {
              totalCost += offer.price;
            }
          });
        }
      }
    });

    return totalCost;
  }
}
