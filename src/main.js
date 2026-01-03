import { render } from './render';
import FilterView from './view/FilterView';
import MainPresenter from './presenters/MainPresenter';
import AddPointView from './view/AddPointView';

render(
  new FilterView(),
  document.querySelector('.trip-controls__filters'),
  'beforeend'
);

new MainPresenter().init();

document
  .querySelector('.trip-main__event-add-btn')
  .addEventListener('click', () => {
    render(
      new AddPointView(),
      document.querySelector('.trip-events__list'),
      'afterbegin'
    );
  });
