import { render, remove } from '../framework/render';
import PointPresenter from './PointPresenter';
import FilterPresenter from './FilterPresenter';
import SortView from '../view/SortView';
import PointsListView from '../view/PointsListView';
import EmptyPointsListView from '../view/EmptyPointsListView';
import {
  SORT_TYPE_LIST,
  FILTER_TYPE_LIST,
  FILTER_LIST,
  UPDATE_TYPE_LIST,
  USER_ACTION,
} from '../utils/data-types';
import { sortByDay, sortByDuration, sortByPrice } from '../utils/date-time';
import PointModel from '../model/PointModel';
import OfferModel from '../model/OfferModel';
import DestinationModel from '../model/DestinationModel';
import FiltersModel from '../model/FiltersModel';
import NewPointPresenter from './NewPointPresenter';

export default class MainPresenter {
  #pointList = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #filterModel = null;
  #filterType = null;
  #tripEvents = null;
  #sortComponent = null;
  #filterComponent = null;
  #currentSortType = SORT_TYPE_LIST[0];

  #pointInitialList = [];
  #points = [];
  #filteredPoints = [];
  #offers = [];
  #destinations = [];

  #pointPresenterList = new Map();

  constructor() {
    this.#tripEvents = document.querySelector('.trip-events');
    this.#pointList = new PointsListView();
    this.#pointModel = new PointModel();
    this.#offerModel = new OfferModel();
    this.#destinationModel = new DestinationModel();
    this.#filterModel = new FiltersModel();

    this.#pointModel.addObserver(this.#handleModelEventChange);
    this.#filterModel.addObserver(this.#handleModelEventChange);
  }

  createPoint() {
    this.#currentSortType = SORT_TYPE_LIST[0];
    this.#filterModel.setFilter(
      UPDATE_TYPE_LIST.MAJOR,
      FILTER_TYPE_LIST.EVERYTHING
    );
    this.#renderNewPoint();
  }

  #renderNewPoint() {
    new NewPointPresenter(
      this.#destinations,
      this.#offers,
      this.#pointList.element,
      this.#handlePointDataChange
    ).init();
  }

  #renderPoint(point, offer, destination) {
    const pointPresenter = new PointPresenter(
      offer,
      destination,
      this.#destinations,
      this.#offers,
      this.#pointList.element,
      this.#handleModeChange,
      this.#handlePointDataChange
    );

    pointPresenter.init(point);
    this.#pointPresenterList.set(point.id, pointPresenter);
  }

  #renderFilterComponent() {
    this.#filterComponent = new FilterPresenter({
      filterModel: this.#filterModel,
      pointModel: this.#pointModel,
    });

    this.#filterComponent.init();
  }

  #render() {
    if (this.#pointInitialList.length > 0) {
      this.#renderFilterComponent();

      this.#sortComponent = new SortView({
        sortType: this.#currentSortType,
        onSortTypeChange: this.#handleSortTypeChange,
      });
      this.#sortWaypoints();
      render(this.#sortComponent, this.#tripEvents);
      render(this.#pointList, this.#tripEvents);

      for (let i = 0; i < this.#filteredPoints.length; i++) {
        this.#renderPoint(
          this.#filteredPoints[i],
          this.#offers[i],
          this.#destinations[i]
        );
      }
    } else {
      render(new EmptyPointsListView(), this.#tripEvents);
    }
  }

  #sortWaypoints() {
    this.#filterType = this.#filterModel.filter;
    this.#points = [...this.#pointModel.getPoints()];

    this.#filteredPoints = FILTER_LIST[this.#filterType](this.#points);

    switch (this.#currentSortType) {
      case SORT_TYPE_LIST[0]:
        this.#points.sort(sortByDay);
        this.#filteredPoints.sort(sortByDay);
        break;
      case SORT_TYPE_LIST[2]:
        this.#points.sort(sortByDuration);
        this.#filteredPoints.sort(sortByDuration);
        break;
      case SORT_TYPE_LIST[3]:
        this.#points.sort(sortByPrice);
        this.#filteredPoints.sort(sortByPrice);
        break;
      default:
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#sortWaypoints();
      this.#currentSortType = sortType;
      this.#clearListView();
      this.#render();
    }
  };

  #clearListView() {
    this.#pointPresenterList.forEach((pointPresenter) => {
      pointPresenter.remove();
    });
    this.#pointPresenterList.clear();
    remove(this.#sortComponent);
    remove(this.#pointList);
    this.#filterComponent.remove();
  }

  #handleModeChange = () => {
    this.#pointPresenterList.forEach((pointPresenter) =>
      pointPresenter.resetView()
    );
  };

  #handlePointDataChange = (actionType, updateType, updatedPoint) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, updatedPoint);
        break;
      case USER_ACTION.ADD_POINT:
        this.#pointModel.addPoint(updateType, updatedPoint);
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, updatedPoint);
        break;
    }
  };

  #handleModelEventChange = (updateType, updatedPoint) => {
    switch (updateType) {
      case UPDATE_TYPE_LIST.PATCH:
        this.#pointPresenterList.get(updatedPoint.id).init(updatedPoint);
        break;
      case UPDATE_TYPE_LIST.MINOR:
        this.#clearListView();
        this.init();
        break;
      case UPDATE_TYPE_LIST.MAJOR:
        this.#currentSortType = SORT_TYPE_LIST[0];
        this.#sortWaypoints();
        this.#clearListView();
        this.init();
        break;
    }
  };

  init() {
    this.#pointInitialList = [...this.#pointModel.getPoints()];
    this.#offers = [...this.#offerModel.getOffers()];
    this.#destinations = [...this.#destinationModel.getDestinations()];
    this.#render();
  }
}
