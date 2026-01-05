import MainPresenter from './presenters/MainPresenter';
import PointModel from './model/PointModel';
import ApiPointService from './api/ApiPointService';
import { END_POINT, AUTHORIZATION } from './utils/data-types';

const pointModel = new PointModel({
  apiPointService: new ApiPointService(END_POINT, AUTHORIZATION),
});
const presenter = new MainPresenter({ pointModel });

const newPointButton = document.querySelector('.trip-main__event-add-btn');
newPointButton.addEventListener('click', (e) => {
  e.preventDefault();
  presenter.createPoint();
  newPointButton.disabled = true;
});

document.addEventListener('DOMContentLoaded', () => {
  presenter.startInit();
  pointModel.init();
});
