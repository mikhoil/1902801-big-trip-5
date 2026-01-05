import SortView from '../view/SortView';
import { render, RenderPosition, replace } from '../framework/render';
import FilterView from '../view/FilterView';
import AddPointView from '../view/AddPointView';
import EmptyPointsListView from '../view/EmptyPointsListView';
import PointPresenter from './PointPresenter';
import PointView from '../view/PointView';
import { SortType } from '../view/SortView';

export default class MainPresenter {
  constructor(model) {
    this.model = model;
    this.pointPresenters = [];
    this.currentSortType = SortType.DAY;
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
    this.sortView = new SortView(this.currentSortType);
    this.sortView.setSortTypeChangeHandler((sortType) =>
      this.handleSortTypeChange(sortType)
    );
    render(
      this.sortView,
      document.querySelector('.trip-events'),
      RenderPosition.AFTERBEGIN
    );
  }

  handleSortTypeChange(sortType) {
    if (this.currentSortType === sortType) {
      return;
    }
    this.currentSortType = sortType;
    this.clearPoints();
    this.renderPointsList();
  }

  getSortedPoints() {
    const points = this.model.getPoints().slice(0, 3);

    if (this.currentSortType === SortType.TIME) {
      return points.sort(
        (a, b) =>
          new Date(b.date_to) -
          new Date(b.date_from) -
          (new Date(a.date_to) - new Date(a.date_from))
      );
    }

    if (this.currentSortType === SortType.PRICE) {
      return points.sort((a, b) => b.base_price - a.base_price);
    }

    return points.sort((a, b) => new Date(a.date_from) - new Date(b.date_from));
  }

  clearPoints() {
    this.pointPresenters.forEach((p) => p.remove());
    this.pointPresenters = [];
    const eventsList = document.querySelector('.trip-events__list');
    if (eventsList) {
      eventsList.innerHTML = '';
    }
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

    const pointsToRender = this.getSortedPoints();

    this.pointPresenters = pointsToRender.map((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const selectedOffers = this.model.getSelectedOffers(point);
      const listItem = document.createElement('li');
      listItem.className = 'trip-events__item';
      tripEventsList.appendChild(listItem);

      const pointPresenter = new PointPresenter({
        container: listItem,
        point,
        destination,
        selectedOffers,
        offersByType: this.model.getOffersByType(point.type),
        allDestinations: this.model.getAllDestinations(),
        onModelChange: () => this.resetAllPointViews(),
        onDataChange: (updatedPoint) => this.updatePoint(updatedPoint),
        getOffersByType: this.model.getOffersByType,
      });

      pointPresenter.init();
      return pointPresenter;
    });
  }

  resetAllPointViews() {
    this.pointPresenters.forEach((presenter) => presenter.resetView());
  }

  updatePoint(updatedPoint) {
    this.model.updatePoint(updatedPoint);

    const pointPresenter = this.pointPresenters.find(
      (presenter) => presenter.point.id === updatedPoint.id
    );

    if (pointPresenter) {
      const oldPointView = pointPresenter.pointView;

      pointPresenter.point = updatedPoint;
      pointPresenter.selectedOffers =
        this.model.getSelectedOffers(updatedPoint);
      pointPresenter.offersByType = this.model.getOffersByType(
        updatedPoint.type
      );

      const newPointView = new PointView(
        updatedPoint,
        pointPresenter.destination,
        pointPresenter.selectedOffers
      );

      newPointView.setRollupHandler(() => {
        this.resetAllPointViews();
        const editPointView = pointPresenter.editPointView;
        replace(editPointView, newPointView);
        pointPresenter.mode = 'EDITING';
      });

      newPointView.setFavoriteClickHandler(() => {
        this.updatePoint({
          ...updatedPoint,
          is_favorite: !updatedPoint.is_favorite,
        });
      });

      replace(newPointView, oldPointView);

      pointPresenter.pointView = newPointView;
    }
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
