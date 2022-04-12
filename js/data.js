import { showErrorMessage } from './error-http.js';
import { initFilter } from './filter.js';
import { renderImages } from './render.js';
import { hideErrorMessage } from './validate-form.js';

const ERRORDELAY = 2000;

const dataPictures = [];


fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((users) => {
    for (let i = 0; i < users.length; i++) {
      dataPictures.push(users[i]);
    }

    initFilter();
    renderImages(dataPictures);
  })
  .catch(() => {
    showErrorMessage();
    setTimeout(hideErrorMessage, ERRORDELAY);
  });

export {
  dataPictures
};
