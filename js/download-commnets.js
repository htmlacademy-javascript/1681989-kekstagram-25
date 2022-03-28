import {
  arrObjData
} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureComments = document.querySelector('.social__comments');
const bigPictureCaption = document.querySelector('.social__caption');
const bigPictureLoad = document.querySelector('.social__comments-loader');
const bigPictureLikes = document.querySelector('.likes-count');

const createComment = (comment) => `
  <li class="social__comment">
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>
`;

const renderComments = (obj) => {
  const commentsFragment = obj.comments.reduce((acc, item) => acc + createComment(item), '');
  bigPictureComments.insertAdjacentHTML('afterbegin', commentsFragment);
};

const checkCommentsCount = (obj) => {
  if (obj.comments.length <= 5) {
    bigPictureLoad.classList.add('hidden');
    return obj.comments.length;
  }

  return 5;
};

const setInfoComments = (obj) => {
  const commentsCount = document.querySelector('.social__comment-count');
  commentsCount.innerHTML = `${checkCommentsCount(obj)} из ${obj.comments.length} комментариев`;
};

const setImgSrc = (obj) => {
  bigPictureImg.src = obj.url;
  bigPictureImg.alt = obj.description;
  bigPictureCaption.textContent = obj.description;
  bigPictureLikes.textContent = obj.likes;
};

const closeImgInfoHandler = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureLoad.classList.remove('hidden');
  bigPictureComments.innerHTML = '';
};

const openImgInfo = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideComments = (items) => {
  items.forEach((item) => item.classList.add('hidden'));
};


const showComments = () => {
  let counter = 0;
  return () => {
    for (let i = 0; i < 5; i++) {
      const [...items] = document.querySelectorAll('.social__comment');

      if (counter === items.length) {
        document.querySelector('.social__comments-loader').classList.add('hidden');
        counter = 0;
        return;
      }

      items[counter++].classList.remove('hidden');
    }
  };
};

const onClickImgHandler = (e) => {
  if (e.target.classList.contains('picture__img')) {
    openImgInfo();
    const imgId = parseFloat(e.target.dataset.imgId);
    const currentObj = arrObjData[imgId - 1];
    setImgSrc(currentObj);
    renderComments(currentObj);
    setInfoComments(currentObj);
    checkCommentsCount(currentObj);
    hideComments(document.querySelectorAll('.social__comment'));
    document.querySelector('.social__comments-loader').addEventListener('click', showComments());
  }
};


export {
  onClickImgHandler,
  closeImgInfoHandler,
  bigPictureClose
};
