import {
  hideErrorKey,
  hideSettingsKey,
  hideSuccessKey
} from './keydown-fn.js';
import { btnMinus, btnPlus } from './slider-effects.js';

import {
  checkStringLength
} from './util.js';

const regExp = new RegExp(/^#(?=.*[^0-9])[a-zа-яё0-9]{1,19}$/i);

const uploadForm = document.querySelector('.img-upload__form');
const uploadHashTags = uploadForm.querySelector('.text__hashtags');
const uploadTextArea = uploadForm.querySelector('.text__description');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadCloseBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadInputs = [uploadHashTags, uploadTextArea];

const uploadConfig = {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
};

const pristineForm = new Pristine(uploadForm, uploadConfig);

const validateHashTags = (value) => {
  const arrHashTags = value.split(' ').map((item) => item.toLowerCase());
  const wrongValues = arrHashTags.filter((item, index, array) => array.indexOf(item) !== index || !regExp.test(item));
  const moreThanFive = arrHashTags.length > 5;

  if (value === '') {
    return true;
  }

  if (moreThanFive || wrongValues.length) {
    return false;
  }

  return true;
};

const validateComment = (value) => {
  if (!checkStringLength(value, 140)) {
    return false;
  }

  return true;
};

const detectFileExtention = (value) => {
  let extention = '';
  for (let i = value.length; i--;) {
    if (value[i] === '.') {
      break;
    }

    extention += value[i];
  }

  return extention.split('').reverse().join('');
};

const validateContentFile = (value) => {
  const fileExtention = detectFileExtention(value);
  const correctValues = ['svg', 'jpg', 'png', 'webp'];
  return correctValues.some((ext) => (fileExtention).toLowerCase() === ext.toLowerCase());
};

const hideSettingsHandler = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  uploadForm.reset();
  btnMinus.removeAttribute('disabled');
  btnPlus.removeAttribute('disabled');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  document.querySelector('.img-upload__preview img').style = '';
  window.removeEventListener('keydown', hideSettingsKey);
};

const showPictureSettings = () => {
  document.querySelector('.img-upload__submit').removeAttribute('disabled', '');
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', hideSettingsKey);
};

const loadPictureHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  showPictureSettings();
};

const blurInputHandler = (item) => {
  item.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      e.stopPropagation();
    }
  });
};

pristineForm.addValidator(uploadHashTags, validateHashTags, 'некорректный хэштэг', 2, false);
pristineForm.addValidator(uploadTextArea, validateComment, 'слишком длинный комментарий', 2, false);
pristineForm.addValidator(uploadFile, validateContentFile, 'выбран некорректный файл', 2, false);

const successMessageTemplate = () => `
    <section class="success hidden success--form">
      <div class="success__inner">
        <h2 class="success__title">Изображение успешно загружено</h2>
        <button type="button" class="success__button">Круто!</button>
      </div>
    </section>
`;

const errorMessageTemplate = () => `
    <section class="error hidden error--form">
      <div class="error__inner">
        <h2 class="error__title">Ошибка загрузки файла</h2>
        <button type="button" class="error__button">Загрузить другой файл</button>
      </div>
    </section>
`;

document.body.insertAdjacentHTML('beforeend', successMessageTemplate());
document.body.insertAdjacentHTML('beforeend', errorMessageTemplate());

const successWrapper = document.querySelector('.success--form');
const errorWrapper = document.querySelector('.error--form');

const showSucessMessageForm = () => {
  successWrapper.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', hideSuccessKey);
};

const showErrorMessageForm = () => {
  errorWrapper.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', hideErrorKey);
};

const hideSuccessMessageClick = (e) => {
  if (e.target.classList.contains('success') || e.target.classList.contains('success__button')) {
    successWrapper.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const hideErrorMessageClick = (e) => {
  if (e.target.classList.contains('error') || e.target.classList.contains('error__button')) {
    errorWrapper.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const hideSuccessMessage = () => {
  successWrapper.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const hideErrorMessage = () => {
  errorWrapper.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const checkValidationHandler = (e) => {
  e.preventDefault();
  if (!pristineForm.validate()) {
    return false;
  } else {
    const formData = new FormData(uploadForm);

    fetch('https://25.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          document.querySelector('.img-upload__submit').setAttribute('disabled', '');
          hideSettingsHandler();
          showSucessMessageForm();
        } else {
          hideSettingsHandler();
          showErrorMessageForm();
        }
      });
  }
};

export {
  loadPictureHandler,
  hideSettingsHandler,
  blurInputHandler,
  checkValidationHandler,
  hideSuccessMessageClick,
  hideErrorMessageClick,
  hideSuccessMessage,
  hideErrorMessage,
  uploadCloseBtn,
  uploadInputs,
  uploadForm,
  uploadFile,
  uploadOverlay,
  successWrapper,
  errorWrapper
};
