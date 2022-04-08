import {
  checkStringLength
} from './util.js';

import {
  sliderInput
} from './slider-effects.js';

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

const showPictureSettings = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const loadPictureHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
  showPictureSettings();
};

const hideSettingsHandler = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
};

const blurInputHandler = (item) => {
  item.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      e.stopPropagation();
      item.blur();
    }
  });
};

pristineForm.addValidator(uploadHashTags, validateHashTags, 'некорректный хэштэг', 2, false);
pristineForm.addValidator(uploadTextArea, validateComment, 'слишком длинный комментарий', 2, false);
pristineForm.addValidator(uploadFile, validateContentFile, 'выбран некорректный файл', 2, false);

const successMessageTemplate = () => `
    <section class="success hidden">
      <div class="success__inner">
        <h2 class="success__title">Изображение успешно загружено</h2>
        <button type="button" class="success__button">Круто!</button>
      </div>
    </section>
`;

const showSucessMessage = () => {
  document.querySelector('.success').classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const createSuccessMessage = () => {
  document.body.insertAdjacentHTML('beforeend', successMessageTemplate());
};

createSuccessMessage();


const checkValidationHandler = (e) => {
  e.preventDefault();
  if (!pristineForm.validate()) {
    return false;
  } else {
    const formData = new FormData(uploadForm);
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });


    fetch('https://25.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          hideSettingsHandler();
          showSucessMessage();
        }
      });
  }
};

export {
  loadPictureHandler,
  hideSettingsHandler,
  blurInputHandler,
  checkValidationHandler,
  uploadCloseBtn,
  uploadInputs,
  uploadForm,
  uploadFile
};

