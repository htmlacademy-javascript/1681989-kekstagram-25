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

export {
  showErrorMessage,
};
