import { showErrorMessage } from './error-http.js';
import { initFilter } from './filter.js';
import { renderImages } from './render.js';
import { hideErrorMessage } from './validate-form.js';

const arrObjData = [];

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((users) => {
    for (let i = 0; i < users.length; i++) {
      arrObjData.push(users[i]);
    }

    initFilter();
    renderImages(arrObjData);
  })
  .catch(() => {
    showErrorMessage();
    setTimeout(hideErrorMessage, 2000);
  });

export {
  arrObjData
};
