import {
  render,
  replace,
  remove,
  RenderPosition,
} from '../framework/render.js';
import TripInfoView from '../view/TripInfoView.js';

export default class TripInfoPresenter {
  #container = null;
  #pointModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init(temporaryPoint = null) {
    let points = this.#pointModel.getPoints();
    const destinations = this.#pointModel.getDestinations();
    const offers = this.#pointModel.getOffers();

    if (temporaryPoint) {
      points = points.map((point) =>
        point.id === temporaryPoint.id ? temporaryPoint : point
      );
    }

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      points,
      destinations,
      offers,
    });

    if (prevTripInfoComponent === null) {
      render(
        this.#tripInfoComponent,
        this.#container,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  destroy() {
    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;
    }
  }
}
