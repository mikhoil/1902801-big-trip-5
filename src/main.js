import MainPresenter from './presenters/MainPresenter';
import MainModel from './model/MainModel';

const newPointButton = document.querySelector('.trip-main__event-add-btn');

newPointButton.addEventListener('click', (e) => {
  e.preventDefault();
  presenter.createPoint();
  newPointButton.disabled = true;
});

const model = new MainModel();
const presenter = new MainPresenter(model);

document.addEventListener('DOMContentLoaded', () => presenter.init());
