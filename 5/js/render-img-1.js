import {
  generateArr
} from './data.js';

const imgContainer = document.querySelector('.pictures');

const createImgTemplate = (fragment, template) => {
  const arrOfValues = generateArr('img/logo-background-', 3);

  arrOfValues.forEach(({
    url,
    likes,
    comments
  }) => {
    const cloneTemplate = template.content.cloneNode(true);
    cloneTemplate.querySelector('.picture__img').src = url;
    cloneTemplate.querySelector('.picture__comments').textContent = comments.length;
    cloneTemplate.querySelector('.picture__likes').textContent = likes;
    fragment.append(cloneTemplate);
  });

  return fragment;
};

const renderImages = (parentElement = null) => {
  if (!(parentElement instanceof HTMLElement)) {
    return;
  }
  const imgFragment = document.createDocumentFragment();
  const imgTemplate = document.querySelector('#picture');
  const generatedImg = createImgTemplate(imgFragment, imgTemplate);

  return parentElement.append(generatedImg);
};

renderImages(imgContainer);

export {
  renderImages
};
