import { showErrorMessage } from './error-http.js';
import { initFilter } from './filter.js';
import { renderImages } from './render.js';

let arrObjData;

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((users) => {
    arrObjData = users;
    initFilter();
    renderImages(arrObjData);
  })
  .catch((error) => {
    showErrorMessage(error);
  });


export {
  arrObjData
};
