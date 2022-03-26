function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}

// generatedData

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Игорь',
  'Филипп',
  'Артем',
  'Михаил',
];

function createCommentTemplate (iterator) {
  return {
    id: iterator,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
    name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
  };
}

function createArrComments (counter) {
  const arrComments = [];

  for (let i = 1; i <= counter; i++) {
    arrComments.push(createCommentTemplate(i));
  }

  return arrComments;
}

function createObjTemplate (iterator) {
  return {
    id: iterator,
    url: `photos/${iterator}.jpg`,
    description: 'Описание фотографии',
    likes: getRandomPositiveInteger(15, 200),
    comments: createArrComments(getRandomPositiveInteger(10, 20)),
  };
}

function createArrObj (counter) {
  const arrOfObj = [];
  for (let i = 1; i <= counter; i++) {
    arrOfObj.push(createObjTemplate(i));
  }

  return arrOfObj;
}

const arrObjData = createArrObj(25);

// renderImages
const picturesContainer = document.querySelector('.pictures');

function createImgTemplate ({id, url, description, likes, comments}) {
  const imgTemplate = document.querySelector('#picture');
  const imgTemplateContent = imgTemplate.content.cloneNode(true);
  imgTemplateContent.querySelector('.picture').href = '#!';
  imgTemplateContent.querySelector('.picture__img').src = url;
  imgTemplateContent.querySelector('.picture__img').setAttribute('data-img-id', id);
  imgTemplateContent.querySelector('.picture__img').alt = description;
  imgTemplateContent.querySelector('.picture__comments').textContent = comments.length;
  imgTemplateContent.querySelector('.picture__likes').textContent = likes;

  return imgTemplateContent;
}

function renderImages (data) {
  const imagesFragment = document.createDocumentFragment();
  data.forEach((obj) => imagesFragment.append(createImgTemplate(obj)));
  picturesContainer.append(imagesFragment);
}

renderImages(arrObjData);

// validateForm
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

function validateHashTags (value) {
  const arrHashTags = value.split(' ').map((item) => item.toLowerCase());
  const wrongValues = arrHashTags.filter((item) => !regExp.test(item));
  const doubleValues = arrHashTags.filter((item, index, array) => array.indexOf(item) !== index);
  const moreThanFive = arrHashTags.length > 5;

  if (value === '') {
    return true;
  }

  if (wrongValues.length || moreThanFive || doubleValues.length) {
    return false;
  }

  return true;
}

function validateComment (value) {
  if (!checkStringLength(value, 140)) {
    return false;
  }

  return true;
}

function detectFileExtention (value) {
  let extention = '';
  for (let i = value.length; i--;) {
    if (value[i] === '.') {
      break;
    }

    extention += value[i];
  }

  return extention.split('').reverse().join('');
}

function validateContentFile (value) {
  const fileExtention = detectFileExtention(value);
  const correctValues = ['svg', 'jpg', 'png', 'webp'];
  return correctValues.some((ext) => (fileExtention).toLowerCase() === ext.toLowerCase());
}

function showPictureSettings () {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function loadPictureHandler (e) {
  e.preventDefault();
  showPictureSettings();
}

function hideSettingsHandler () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
}

function blurInputHandler (item) {
  item.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      e.stopPropagation();
      item.blur();
    }
  });
}

pristineForm.addValidator(uploadHashTags, validateHashTags, 'некорректный хэштэг', 2, false);
pristineForm.addValidator(uploadTextArea, validateComment, 'слишком длинный комментарий', 2, false);
pristineForm.addValidator(uploadFile, validateContentFile, 'выбран некорректный файл', 2, false);

function checkValidationHandler (e) {
  if (!pristineForm.validate()) {
    e.preventDefault();
    document.querySelector('.pristine-error').style.display = 'block';
  }
}

// openInfoImg
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureComments = document.querySelector('.social__comments');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const bigPictureCaption = document.querySelector('.social__caption');
const bigPictureLoad = document.querySelector('.social__comments-loader');

function addNewFiveComments ([...arr]) {
  let counter = 5;
  return function () {
    for (let i = 5; i < 10; i++) {
      const arrOfHiddenItems = arr.filter((item) => item.classList.contains('hidden'));
      const arrOfShownItems = arr.filter((item) => !item.classList.contains('hidden'));
      if (!arrOfHiddenItems.length) {
        return;
      }

      bigPictureCommentsCount.innerHTML = `
      ${arrOfShownItems.length + 1} из <span class="comments-count">${arr.length}</span> комментариев
    `;

      arr[counter++].classList.remove('hidden');
    }
  };
}

function createComment (comment) {
  return `
  <li class="social__comment">
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>
  `;
}

function renderComments (obj) {
  const fragment = obj.comments.reduce((acc, comment) => acc + createComment(comment), '');
  bigPictureComments.insertAdjacentHTML('afterbegin', fragment);
}

function renderContentImg ({ url, description }) {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureCaption.textContent = description;
}

function hideComments (arr) {
  for (let i = 5; i < arr.length; i++) {
    arr[i].classList.add('hidden');
  }
}

function uploadCommentsCountHandler () {
  const shownItems = [...document.querySelectorAll('.social__comment')]
    .filter((item) => !item.classList.contains('hidden'));
  const allComments = [...document.querySelectorAll('.social__comment')];
  bigPictureCommentsCount.innerHTML = `
    ${shownItems.length} из <span class="comments-count">${allComments.length}</span> комментариев
  `;
}

function getInfoHandler (e) {
  const imgId = e.target.dataset.imgId;
  const currentObj = arrObjData[imgId - 1];
  if (e.target.classList.contains('picture__img')) {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    renderContentImg(currentObj);
    renderComments(currentObj);
    hideComments(document.querySelectorAll('.social__comment'));
    const addNewCommentsHandler = addNewFiveComments(document.querySelectorAll('.social__comment'));
    bigPictureLoad.addEventListener('click', addNewCommentsHandler);
    uploadCommentsCountHandler();
  }
}

function closeInfoHandler () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelectorAll('.social__comment').forEach((item) => item.remove());
}

picturesContainer.addEventListener('click', getInfoHandler);
bigPictureClose.addEventListener('click', closeInfoHandler);
uploadForm.addEventListener('change', loadPictureHandler);
uploadInputs.forEach((item) => blurInputHandler(item));
uploadForm.addEventListener('submit', checkValidationHandler);
uploadCloseBtn.addEventListener('click', hideSettingsHandler);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeInfoHandler();
    hideSettingsHandler();
  }
});
