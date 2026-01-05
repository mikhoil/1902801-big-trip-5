import { replace, render } from '../framework/render';
import PointView from '../view/PointView';
import EditPointView from '../view/EditPointView';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  constructor({
    container,
    point,
    destination,
    selectedOffers,
    offersByType,
    allDestinations,
    onModelChange,
    onDataChange,
  }) {
    this.container = container;
    this.point = point;
    this.destination = destination;
    this.selectedOffers = selectedOffers;
    this.offersByType = offersByType;
    this.allDestinations = allDestinations;
    this.onModelChange = onModelChange;
    this.onDataChange = onDataChange;

    this.mode = Mode.DEFAULT;
    this.pointView = null;
    this.editPointView = null;
  }

  resetView() {
    if (this.mode !== Mode.DEFAULT) {
      this.#replacePoint();
    }
  }

  #replaceEdit() {
    replace(this.editPointView, this.pointView);
    this.mode = Mode.EDITING;
    document.addEventListener('keydown', this.#handleEscKeyDown);
  }

  #replacePoint() {
    replace(this.pointView, this.editPointView);
    this.mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }

  #handleEscKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      this.#replacePoint();
    }
  };

  #handleOpenEdit = () => {
    this.onModelChange?.();
    this.#replaceEdit();
  };

  #handleCloseEdit = () => {
    this.#replacePoint();
  };

  #handleFormSubmit = () => {
    this.#replacePoint();
  };

  #handleFavoriteClick = () => {
    this.onDataChange?.({
      ...this.point,
      is_favorite: !this.point.is_favorite,
    });
  };

  init() {
    this.pointView = new PointView(
      this.point,
      this.destination,
      this.selectedOffers
    );

    this.pointView.setRollupHandler(this.#handleOpenEdit);
    this.pointView.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.editPointView = new EditPointView(
      this.point,
      this.destination,
      this.offersByType,
      this.point.offers || [],
      this.allDestinations
    );

    this.editPointView.setSubmitHandler(this.#handleFormSubmit);
    this.editPointView.setRollupHandler(this.#handleCloseEdit);

    render(this.pointView, this.container);
  }
}
