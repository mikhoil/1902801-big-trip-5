import { render, remove, RenderPosition } from '../framework/render.js';
import { sortByDay, sortByPrice, sortByDuration } from '../utils/date-time.js';
import {
  UPDATE_TYPE_LIST,
  USER_ACTION,
  FILTER_LIST,
  FILTER_TYPE_LIST,
  TIME_LIMIT,
} from '../utils/data-types.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/SortView.js';
import PointsListView from '../view/PointsListView.js';
import EmptyPointsListView from '../view/EmptyPointsListView.js';
import LoadingView from '../view/LoaderView.js';
import FiltersModel from '../model/FiltersModel.js';
import PointPresenter from './PointPresenter.js';
import FilterPresenter from './FilterPresenter.js';
import NewPointPresenter from './NewPointPresenter.js';

export default class MainPresenter {
  #pointList = null;
  #pointModel = null;
  #filterModel = null;
  #filterType = null;
  #tripEvents = null;
  #sortComponent = null;
  #filterComponent = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TIME_LIMIT.LOWER_LIMIT,
    upperLimit: TIME_LIMIT.UPPER_LIMIT,
  });

  #currentSortType = 'day';

  #pointInitialList = [];
  #points = [];
  #filteredPoints = [];
  #offers = [];
  #destinations = [];

  #loadingComponent = new LoadingView();
  #pointPresenterList = new Map();
  #filterPresenter = null;

  constructor({ pointModel }) {
    this.#tripEvents = document.querySelector('.trip-events');
    this.#pointList = new PointsListView();
    this.#pointModel = pointModel;
    this.#filterModel = new FiltersModel();

    this.#pointModel.addObserver(this.#handleModelEventChange);
    this.#filterModel.addObserver(this.#handleModelEventChange);

    this.#filterPresenter = new FilterPresenter({
      filterModel: this.#filterModel,
      pointModel: this.#pointModel,
    });
  }

  startInit() {
    this.#render();
  }

  init() {
    this.#pointInitialList = [...this.#pointModel.getPoints()];
    this.#offers = [...this.#pointModel.getOffers()];
    this.#destinations = [...this.#pointModel.getDestinations()];

    this.#render();
  }

  createPoint() {
    this.#currentSortType = 'day';
    this.#filterModel.setFilter(
      UPDATE_TYPE_LIST.MAJOR,
      FILTER_TYPE_LIST.EVERYTHING
    );
    this.#renderNewPoint();
  }

  #renderNewPoint() {
    const newPointComponent = new NewPointPresenter(
      this.#destinations,
      this.#offers,
      this.#pointList.element,
      this.#handlePointDataChange
    );

    newPointComponent.init();
  }

  #renderPointTask(point) {
    const pointPresenter = new PointPresenter(
      this.#destinations,
      this.#offers,
      this.#pointList.element,
      this.#handleModeChange,
      this.#handlePointDataChange
    );

    pointPresenter.init(point);
    this.#pointPresenterList.set(point.id, pointPresenter);
  }

  // #renderFilterComponent() {
  //   this.#filterComponent = new FilterPresenter({
  //     filterModel: this.#filterModel,
  //     pointModel: this.#pointModel,
  //   });

  //   this.#filterComponent.init();
  // }

  #initFilterComponent() {
    this.#filterPresenter.init();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEvents, RenderPosition.AFTERBEGIN);
  }

  #render() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#pointInitialList.length > 0) {
      // this.#renderFilterComponent();
      this.#initFilterComponent();

      this.#sortComponent = new SortView({
        sortType: this.#currentSortType,
        onSortTypeChange: this.#handleSortTypeChange,
      });
      this.#sort();
      render(this.#sortComponent, this.#tripEvents);
      render(this.#pointList, this.#tripEvents);

      for (let i = 0; i < this.#filteredPoints.length; i++) {
        this.#renderPointTask(this.#filteredPoints[i]);
      }
    } else {
      render(new EmptyPointsListView(), this.#tripEvents);
    }
  }

  #sort() {
    this.#filterType = this.#filterModel.filter;
    this.#points = [...this.#pointModel.getPoints()];

    this.#filteredPoints = FILTER_LIST[this.#filterType](this.#points);

    switch (this.#currentSortType) {
      case 'day':
        this.#filteredPoints.sort(sortByDay);
        break;
      case 'time':
        this.#filteredPoints.sort(sortByDuration);
        break;
      case 'price':
        this.#filteredPoints.sort(sortByPrice);
        break;
      default:
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#sort();
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
    remove(this.#loadingComponent);
    remove(this.#pointList);

    // this.#currentSortType = 'day';
  }

  #handleModeChange = () => {
    this.#pointPresenterList.forEach((pointPresenter) =>
      pointPresenter.resetView()
    );
  };

  #handlePointDataChange = async (actionType, updateType, updatedPoint) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointPresenterList.get(updatedPoint.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, updatedPoint);
        } catch (error) {
          this.#pointPresenterList.get(updatedPoint.id).setAborting();
        }
        break;
      case USER_ACTION.ADD_POINT:
        this.#pointModel.addPoint(updateType, updatedPoint);
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointPresenterList.get(updatedPoint.id).setDeleting();
        this.#pointPresenterList.get(updatedPoint.id).setSaving();
        try {
          await this.#pointModel.deletePoint(updateType, updatedPoint);
        } catch (err) {
          this.#pointPresenterList.get(updatedPoint.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
        // this.#currentSortType = 'day';
        this.#sort();
        this.#clearListView();
        this.init();
        break;
      case UPDATE_TYPE_LIST.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.init();
        break;
    }
  };
}
