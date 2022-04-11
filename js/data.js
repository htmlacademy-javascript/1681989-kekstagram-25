import { initFilter } from './filter.js';
import { renderImages } from './render.js';

let arrObjData;

const errorMessageTemplate = () => `
  <section class="error">
    <div class="error__inner">
      <h2 class="error__title">Ошибка загрузки</h2>
    </div>
  </section>
`;

const showErrorMessage = () => {
  document.body.insertAdjacentHTML('afterbegin', errorMessageTemplate());
};

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
