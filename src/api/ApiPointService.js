import ApiService from '../framework/api-service.js';

export default class ApiPointService extends ApiService {
  get points() {
    return this._load({ url: 'points' }).then(
      async (response) => await response.json()
    );
  }

  get destinations() {
    return this._load({ url: 'destinations' }).then(
      async (response) => await response.json()
    );
  }

  get offers() {
    return this._load({ url: 'offers' }).then(
      async (response) => await response.json()
    );
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: 'PUT',
      body: JSON.stringify(point),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await response.json();
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: 'POST',
      body: JSON.stringify(point),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await response.json();
  }

  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: 'DELETE',
    });
  }
}
