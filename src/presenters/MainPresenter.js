import SortView from '../view/SortView';
import EditPointView from '../view/EditPointView';
import { render, RenderPosition, replace } from '../framework/render';
import FilterView from '../view/FilterView';
import AddPointView from '../view/AddPointView';
import PointView from '../view/PointView';
import EmptyPointsListView from '../view/EmptyPointsListView';

export default class MainPresenter {
  constructor(model) {
    this.model = model;
  }

  renderFilters() {
    render(
      new FilterView({
        hasPast: this.model
          .getPoints()
          .some((point) => new Date(point.date_from) < new Date()),
        hasFuture: this.model
          .getPoints()
          .some((point) => new Date(point.date_to) > new Date()),
        hasPresent: this.model
          .getPoints()
          .some(
            (point) =>
              new Date(point.date_from) <= new Date() &&
              new Date(point.date_to) >= new Date()
          ),
      }),
      document.querySelector('.trip-controls__filters'),
      RenderPosition.BEFOREEND
    );
  }

  renderSort() {
    render(
      new SortView(),
      document.querySelector('.trip-events'),
      RenderPosition.AFTERBEGIN
    );
  }

  renderPointsList() {
    const tripEventsList = document.querySelector('.trip-events__list');
    const points = this.model.getPoints();
    if (points.length === 0) {
      render(
        new EmptyPointsListView(),
        tripEventsList,
        RenderPosition.BEFOREEND
      );
      return;
    }

    const pointsToRender = points.slice(0, 3);

    pointsToRender.forEach((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const selectedOffers = this.model.getSelectedOffers(point);

      const pointView = new PointView(point, destination, selectedOffers);
      const listItem = document.createElement('li');
      listItem.className = 'trip-events__item';
      listItem.appendChild(pointView.element);
      tripEventsList.appendChild(listItem);

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

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          replace(pointView, editPointView);
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      pointView.setRollupHandler(() => {
        replace(editPointView, pointView);
        document.addEventListener('keydown', onEscKeyDown);
      });

      editPointView.setSubmitHandler(() => {
        replace(pointView, editPointView);
        document.removeEventListener('keydown', onEscKeyDown);
      });

      editPointView.setRollupHandler(() => {
        replace(pointView, editPointView);
        document.removeEventListener('keydown', onEscKeyDown);
      });
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
    listItem.appendChild(createPointView.element);
    eventsList.appendChild(listItem);
  }

  init() {
    this.renderFilters();
    this.renderSort();
    this.renderPointsList();
    this.renderAddPoint();
  }
}
