import { arrObjData } from './data.js';
import { renderImages } from './render.js';
import { getUniqueIntegers } from './unique-data.js';

const DELAY = 500;

const filterCategories = (category) => {
  const categoryList = {
    'filter-random': function () {
      const randomIndexes = getUniqueIntegers(arrObjData);
      const randomPictures = [];
      for (let i = 0; i < randomIndexes.length; i++) {
        randomPictures.push(arrObjData[randomIndexes[i]]);
      }

      renderImages(randomPictures);
    },

    'filter-discussed': function () {
      const dataClone = arrObjData.slice(0);
      const dataDiscussed = dataClone.sort((prev, next) => prev.comments.length - next.comments.length);
      renderImages(dataDiscussed);
    },

    'filter-default': function () {
      renderImages(arrObjData);
    },
  };

  return categoryList[category];
};

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const addActiveClass = (button) => {
  document.querySelectorAll('.img-filters__button')
    .forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
};

const filterHandler = (e) => {
  if (e.target.classList.contains('img-filters__button')) {
    const filterFn = filterCategories(e.target.getAttribute('id'));
    debounce(filterFn, DELAY)();
    addActiveClass(e.target);
  }
};

const addActiveClassHandler = (e) => {
  if (e.target.classList.contains('img-filters__button')) {
    addActiveClass(e.target);
  }
};

const initFilter = () => {
  const filterElem = document.querySelector('.img-filters');
  filterElem.classList.remove('img-filters--inactive');
  filterElem.addEventListener('click', debounce((e)=> filterHandler(e)));
  filterElem.addEventListener('click', addActiveClassHandler);
};

export {
  initFilter,
};
