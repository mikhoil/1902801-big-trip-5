import { render, remove, RenderPosition } from '../framework/render.js';
import { USER_ACTION, UPDATE_TYPE_LIST } from '../utils/data-types.js';
import { nanoid } from 'nanoid';
import AddPointView from '../view/AddPointView.js';

export default class NewPointPresenter {
  #allDestinations = null;
  #allOffers = null;

  #pointEdit = null;
  #pointsListComponent = null;
  #newPointButtonComponent = null;

  #handleDataChange = null;

  #escKeyHandler = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.remove();
    }
  };

  constructor(allDestinations, allOffers, pointsListComponent, onDataChange) {
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#pointsListComponent = pointsListComponent;
    this.#handleDataChange = onDataChange;

    this.#newPointButtonComponent = document.querySelector(
      '.trip-main__event-add-btn'
    );
  }

  init() {
    if (this.#pointEdit === null) {
      this.#pointEdit = new AddPointView({
        allDestinations: this.#allDestinations,
        allOffers: this.#allOffers,
        onFormSubmit: (newPoint) => {
          this.#handleDataChange(
            USER_ACTION.ADD_POINT,
            UPDATE_TYPE_LIST.MINOR,
            {
              id: nanoid(),
              ...newPoint,
            }
          );
          this.#newPointButtonComponent.disabled = false;
        },
        onDeleteClick: () => {
          this.remove();
          this.#newPointButtonComponent.disabled = false;
        },
      });

      render(
        this.#pointEdit,
        this.#pointsListComponent,
        RenderPosition.AFTERBEGIN
      );

      document.addEventListener('keydown', this.#escKeyHandler);
    }
  }

  remove() {
    if (this.#pointEdit !== null) {
      remove(this.#pointEdit);
      this.#pointEdit = null;

      document.removeEventListener('keydown', this.#escKeyHandler);
    }
  }
}
