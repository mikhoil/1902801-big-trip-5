import MainPresenter from './presenters/MainPresenter';
import MainModel from './model/MainModel';

const model = new MainModel();
const presenter = new MainPresenter(model);

document.addEventListener('DOMContentLoaded', () => presenter.init());
