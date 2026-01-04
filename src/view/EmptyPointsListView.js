import AbstractView from '../framework/view/abstract-view.js';

export default class EmptyPointsListView extends AbstractView {
  constructor(
    message = 'No points found. Click New Event to create your first point'
  ) {
    super();
    this.message = message;
  }

  get template() {
    return `
            <p class="trip-events__msg">${this.message}</p>
        `;
  }
}
