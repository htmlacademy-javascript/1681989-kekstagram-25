import { generateArr } from './data.js';

const imgContainer = document.querySelector('.pictures');

const createImgTemplate = (dataList) => {
  const imgItemTemplate = document.querySelector('#picture');
  const fragment = document.createDocumentFragment();
  dataList.forEach(({ url, likes, comments, id }) => {
    const cloneImgTemplate = imgItemTemplate.content.cloneNode(true);
    const pictureImg = cloneImgTemplate.querySelector('.picture__img');
    pictureImg.src = url;
    pictureImg.parentElement.setAttribute('data-pic-id', id);
    cloneImgTemplate.querySelector('.picture__comments').textContent = comments.length;
    cloneImgTemplate.querySelector('.picture__likes').textContent = likes;
    fragment.append(cloneImgTemplate);
  });

  return fragment;
};

const renderImages = (dataList) => {
  if (!dataList.length) {
    return;
  }

  const generatedImgTemplate = createImgTemplate(dataList);
  imgContainer.append(generatedImgTemplate);
};

const generatedImgData = generateArr(25);
renderImages(generatedImgData);


export { imgContainer, generatedImgData };
