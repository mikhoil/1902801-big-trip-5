import EditPointView from './EditPointView';

export default class AddPointView extends EditPointView {
  constructor(availableOffers = [], allDestinations = []) {
    super(null, null, availableOffers, [], allDestinations);
  }
}
