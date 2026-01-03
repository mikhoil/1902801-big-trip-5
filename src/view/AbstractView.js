import { createElement } from '../render.js';

export default class AbstractView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  //   get template() {
  //     throw new Error('Abstract method not implemented');
  //   }

  getElement() {
    return this.element;
  }

  removeElement() {
    this.#element = null;
  }
}
