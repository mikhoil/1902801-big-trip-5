import SortView from '../view/SortView';
import EditPointView from '../view/EditPointView';
import { render, RenderPosition } from '../render';
import FilterView from '../view/FilterView';
import AddPointView from '../view/AddPointView';
import PointView from '../view/PointView';

export default class MainPresenter {
  constructor(model) {
    this.model = model;
  }

  renderFilters() {
    render(
      new FilterView(),
      document.querySelector('.trip-controls__filters'),
      RenderPosition.BEFOREEND
    );
  }

  renderSort() {
    render(
      new SortView(),
      document.querySelector('.trip-events'),
      RenderPosition.BEFOREEND
    );
  }

  renderEditForm() {
    const tripEventsList = document.querySelector('.trip-events__list');
    const points = this.model.getPoints();

    if (points.length > 0) {
      const point = points[0];
      const destination = this.model.getDestinationById(point.destination);
      const availableOffers = this.model.getOffersByType(point.type);
      const selectedOffersIds = point.offers || [];
      const allDestinations = this.model.getAllDestinations();

      const editPointView = new EditPointView(
        point,
        destination,
        availableOffers,
        selectedOffersIds,
        allDestinations
      );
      const listItem = document.createElement('li');
      listItem.className = 'trip-events__item';
      listItem.appendChild(editPointView.getElement());
      tripEventsList.insertBefore(listItem, tripEventsList.firstChild);
    }
  }

  renderPointsList() {
    const tripEventsList = document.querySelector('.trip-events__list');
    const points = this.model.getPoints();

    const pointsToRender = points.slice(0, 3);

    pointsToRender.forEach((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const selectedOffers = this.model.getSelectedOffers(point);

      const pointView = new PointView(point, destination, selectedOffers);
      const listItem = document.createElement('li');
      listItem.className = 'trip-events__item';
      listItem.appendChild(pointView.getElement());
      tripEventsList.appendChild(listItem);
    });
  }

  renderAddPoint() {
    const eventsList = document.querySelector('.trip-events__list');
    const defaultOfferList = this.model.getOffersByType('flight');
    const allDestinationList = this.model.getAllDestinations();
    const createPointView = new AddPointView(
      defaultOfferList,
      allDestinationList
    );
    const listItem = document.createElement('li');
    listItem.className = 'trip-events__item';
    listItem.appendChild(createPointView.getElement());
    eventsList.appendChild(listItem);
  }

  init() {
    this.renderFilters();
    this.renderSort();
    this.renderPointsList();
    this.renderEditForm();
    this.renderAddPoint();
  }
}
