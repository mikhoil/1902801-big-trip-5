export default class PointModel {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.date_from = data.date_from;
    this.date_to = data.date_to;
    this.is_favorite = data.is_favorite;
    this.base_price = data.base_price;
    this.offers = data.offers;
    this.destination = data.destination;
  }
}
