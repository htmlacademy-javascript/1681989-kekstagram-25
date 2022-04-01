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


// homework
const scaleControlImg = document.querySelector('.img-upload__preview img');
const scaleControl = document.querySelector('.scale__control--value');
const btnMinus = document.querySelector('.scale__control--smaller');
const btnPlus = document.querySelector('.scale__control--bigger');
const effectsPreview = document.querySelectorAll('.effects__preview');

const loadPicture = (e) => {
  if (e.target === uploadFile) {
    const files = e.target.files;
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const url = fileReader.result;
      scaleControlImg.src = url;
      effectsPreview.forEach((item) => {
        item.style.backgroundImage = `url(${url})`;
      });
    };

    fileReader.readAsDataURL(file);
  }
};

const incrementValue = (value) => {
  let counter = parseFloat(value);
  return () => {
    for (let i = 0; i < 25; i++) {
      if (counter >= 100) {
        btnPlus.setAttribute('disabled', '');
        return;
      }
      btnMinus.removeAttribute('disabled', '');
      ++counter;
      scaleControlImg.style.transform = `scale(${counter}%)`;
      scaleControl.setAttribute('value', `${counter}%`);
    }
  };
};

const decrementValue = (value) => {
  let counter = parseFloat(value);
  return () => {
    for (let i = 0; i < 25; i++) {
      if (counter <= 25) {
        btnMinus.setAttribute('disabled', '');
        return;
      }
      btnPlus.removeAttribute('disabled', '');
      --counter;
      scaleControlImg.style.transform = `scale(${counter}%)`;
      scaleControl.setAttribute('value', `${counter}%`);
    }
  };
};

btnPlus.addEventListener('click', () => {
  incrementValue(scaleControl.value)();
});

btnMinus.addEventListener('click', () => {
  decrementValue(scaleControl.value)();
});

uploadForm.addEventListener('change', loadPicture);

// homework

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

function checkValidationHandler(e) {
  if (!pristineForm.validate()) {
    e.preventDefault();
    document.querySelector('.pristine-error').style.display = 'block';
  }
}


export {
  loadPictureHandler,
  hideSettingsHandler,
  blurInputHandler,
  checkValidationHandler,
  uploadCloseBtn,
  uploadInputs,
  uploadForm
};
