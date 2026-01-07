import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/PointView.js';
import EditPointView from '../view/EditPointView.js';
import { MODE, USER_ACTION, UPDATE_TYPE_LIST } from '../utils/data-types.js';

export default class PointPresenter {
  #point = null;
  #offer = null;
  #destination = null;
  #allDestinations = null;
  #allOffers = null;
  #mode = MODE.DEFAULT;

  #pointTask = null;
  #pointEdit = null;
  #pointList = null;

  #handleModeChange = null;
  #handleDataChange = null;
  #tripInfoPresenter = null;

  #escKeyHandler = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.#pointEdit.reset();
      this.#replaceEditToTask();
      document.removeEventListener('keydown', this.#escKeyHandler);
      if (this.#tripInfoPresenter) {
        this.#tripInfoPresenter.init();
      }
    }
  };

  constructor(
    allDestinations,
    allOffers,
    pointList,
    onModeChange,
    onDataChange,
    tripInfoPresenter
  ) {
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#pointList = pointList;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
    this.#tripInfoPresenter = tripInfoPresenter;
  }

  init(point) {
    this.#point = point;
    this.#offer = this.#allOffers.find((offer) => offer.type === point.type);
    this.#destination = this.#allDestinations.find(
      (destination) => destination.id === point.destination
    );

    const prevPointComponent = this.#pointTask;
    const prevEditFormComponent = this.#pointEdit;

    this.#pointTask = new PointView({
      point: this.#point,
      offer: this.#offer,
      destination: this.#destination,
      onEditClick: () => {
        this.#replaceTaskToEdit();
        document.addEventListener('keydown', this.#escKeyHandler);
      },
      onFavoriteClick: () => {
        this.#addPointToFavorite();
      },
    });

    this.#pointEdit = new EditPointView({
      point: this.#point,
      offer: this.#offer,
      destination: this.#destination,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onRollupClick: () => {
        this.#pointEdit.reset();
        this.#replaceEditToTask();
        document.removeEventListener('keydown', this.#escKeyHandler);
        if (this.#tripInfoPresenter) {
          this.#tripInfoPresenter.init();
        }
      },
      onFormSubmit: (newPoint) => {
        this.#handleDataChange(
          USER_ACTION.UPDATE_POINT,
          UPDATE_TYPE_LIST.PATCH,
          { ...newPoint }
        );
      },
      onDeleteClick: (currentPoint) => {
        this.#handleDataChange(
          USER_ACTION.DELETE_POINT,
          UPDATE_TYPE_LIST.MINOR,
          { ...currentPoint }
        );
      },
      onOffersChange: (updatedPoint) => {
        if (this.#tripInfoPresenter) {
          this.#tripInfoPresenter.init(updatedPoint);
        }
      },
    });

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this.#pointTask, this.#pointList);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointTask, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#pointTask, prevEditFormComponent);
      this.#mode = MODE.DEFAULT;
      document.removeEventListener('keydown', this.#escKeyHandler);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  remove() {
    remove(this.#pointTask);
    remove(this.#pointEdit);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceEditToTask();
    }
  }

  setSaving() {
    if (this.#mode === MODE.EDITING) {
      this.#pointEdit.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === MODE.EDITING) {
      this.#pointEdit.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === MODE.DEFAULT) {
      this.#pointTask.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEdit.updateElement({
        isDisabled: false,
        isDeleting: false,
        isSaving: false,
      });
    };

    this.#pointEdit.shake(resetFormState);
  }

  #replaceTaskToEdit() {
    replace(this.#pointEdit, this.#pointTask);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  }

  #replaceEditToTask() {
    replace(this.#pointTask, this.#pointEdit);
    this.#mode = MODE.DEFAULT;
  }

  #addPointToFavorite = () => {
    this.#handleDataChange(USER_ACTION.UPDATE_POINT, UPDATE_TYPE_LIST.PATCH, {
      ...this.#point,
      is_favorite: !this.#point.is_favorite,
    });
  };
}
