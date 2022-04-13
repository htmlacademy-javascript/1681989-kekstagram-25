import {
  dataPictures
} from './data.js';

import { closeInfoKey } from './keydown-fn.js';

const bigPicture = document.querySelector('.big-picture');
const pictureClose = bigPicture.querySelector('.big-picture__cancel');
const pictureImg = bigPicture.querySelector('.big-picture__img img');
const pictureComments = bigPicture.querySelector('.social__comments');
const pictureCaption = bigPicture.querySelector('.social__caption');
const pictureLoad = bigPicture.querySelector('.social__comments-loader');
const pictureLikes = bigPicture.querySelector('.likes-count');

const createComment = ({
  avatar,
  name,
  message
} = {}) => `
  <li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;

const renderComments = ({
  comments
} = {}) => {
  pictureComments.innerHTML = '';
  const htmlComments = comments.reduce((acc, item) => acc + createComment(item), '');
  pictureComments.insertAdjacentHTML('afterbegin', htmlComments);
};

const checkCommentsCount = ({
  comments
} = {}) => {
  if (comments.length <= 5) {
    pictureLoad.classList.add('hidden');
    return comments.length;
  }

  return 5;
};

const setInfoComments = (obj) => {
  const commentsCount = document.querySelector('.social__comment-count');
  commentsCount.innerHTML = `<span class="comments-shown">
  ${checkCommentsCount(obj)}</span> из ${obj.comments.length} комментариев`;
};

const setImgSrc = ({
  url,
  description,
  likes
} = {}) => {
  pictureImg.src = url;
  pictureImg.alt = description;
  pictureCaption.textContent = description;
  pictureLikes.textContent = likes;
};

const closeImgInfoHandler = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pictureLoad.classList.remove('hidden');
  pictureComments.innerHTML = '';
  window.removeEventListener('keydown', closeInfoKey);
};

const openImgInfo = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideComments = (items) => {
  for (let i = 5; i < items.length; i++) {
    items[i].classList.add('hidden');
  }
};

const showComments = () => {
  let counter = 5;
  return () => {
    for (let i = 0; i < 5; i++) {
      const [...comms] = document.querySelectorAll('.social__comment');

      comms[counter++].classList.remove('hidden');
      document.querySelector('.comments-shown').textContent = counter;

      if (counter === comms.length) {
        document.querySelector('.social__comments-loader').classList.add('hidden');
        counter = 5;
        return;
      }
    }
  };
};

const onClickImgHandler = (e) => {
  if (e.target.classList.contains('picture__img')) {
    openImgInfo();
    const imgId = parseFloat(e.target.dataset.imgId);
    const currentObj = dataPictures[imgId];
    setImgSrc(currentObj);
    renderComments(currentObj);
    setInfoComments(currentObj);
    checkCommentsCount(currentObj);
    hideComments(document.querySelectorAll('.social__comment'));
    document.querySelector('.social__comments-loader').addEventListener('click', showComments());
    window.addEventListener('keydown', closeInfoKey);
  }
};

export {
  onClickImgHandler,
  closeImgInfoHandler,
  pictureClose,
  bigPicture
};
