import { DESTINATION_LIST } from '../mock-data.js';

export default class DestinationModel {
  constructor() {
    this.destinations = [...DESTINATION_LIST];
  }

  getDestinations() {
    return this.destinations;
  }
}
