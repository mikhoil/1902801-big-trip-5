import SortView from '../view/SortView';
import EditPointView from '../view/EditPointView';
import { render } from '../render';
import PointsListView from '../view/PointsListView';
import TripView from '../view/TripView';

export default class MainPresenter {
  init() {
    const tripEventsSection = document.querySelector('.trip-events');

    render(
      new TripView(),
      document.querySelector('.trip-main__trip-controls'),
      'beforebegin'
    );
    render(new SortView(), tripEventsSection, 'beforeend');
    render(new EditPointView(), tripEventsSection, 'beforeend');
    render(new PointsListView(), tripEventsSection, 'beforeend');
  }
}
