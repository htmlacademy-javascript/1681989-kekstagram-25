import { renderImages } from './render.js';

let arrObjData;

const errorMessageTemplate = (error) => `
  <section class="error">
    <div class="error__inner">
      <h2 class="error__title">${error}</h2>
    </div>
  </section>
`;

function showErrorMessage (error) {
  document.body.insertAdjacentHTML('afterbegin', errorMessageTemplate(error));
}

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((users) => {
    arrObjData = users;
    renderImages(arrObjData);
  })
  .catch((error) => {
    showErrorMessage(error);
  });


export {
  arrObjData
};
