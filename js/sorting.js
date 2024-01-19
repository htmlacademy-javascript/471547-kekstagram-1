import {debouncedRenderPictures} from './miniatures.js';

const PICTURES_COUNT = 10;

const filterElement = document.querySelector('.img-filters');

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureOne, pictureTwo) =>
  pictureTwo.comments.length - pictureOne.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setFiltersListener = () => {

  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;

    if (clickedButton.id === currentFilter) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');

    clickedButton.classList.add('img-filters__button--active');

    currentFilter = clickedButton.id;

    debouncedRenderPictures(getFilteredPictures());
  });
};

const initFilters = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setFiltersListener(callback);
};

export {getFilteredPictures, initFilters};
