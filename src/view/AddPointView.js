import EditPointView from './EditPointView';

export default class AddPointView extends EditPointView {
  constructor(
    availableOffers = [],
    allDestinations = [],
    getOffersByType = null
  ) {
    super(null, null, availableOffers, [], allDestinations, getOffersByType);
  }
}
