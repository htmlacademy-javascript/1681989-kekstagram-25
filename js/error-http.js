const createErrorMessageTemplate = () => `
  <section class="error hidden">
    <div class="error__inner">
      <h2 class="error__title">Ошибка загрузки</h2>
    </div>
  </section>
`;

const initErrorMessage = () => {
  document.body.insertAdjacentHTML('afterbegin', createErrorMessageTemplate());
};

initErrorMessage();

const showErrorMessage = () => {
  document.querySelector('.error').classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideErrorMessage = () => {
  document.querySelector('.error').classList.add('hidden');
  document.body.classList.remove('modal-open');
};

export {
  showErrorMessage,
  hideErrorMessage,
};
