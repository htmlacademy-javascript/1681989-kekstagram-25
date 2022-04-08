const picturesContainer = document.querySelector('.pictures');

const createImgTemplate = ({
  id,
  url,
  description,
  likes,
  comments
}) => {
  const imgTemplate = document.querySelector('#picture');
  const imgTemplateContent = imgTemplate.content.cloneNode(true);
  imgTemplateContent.querySelector('.picture').href = '#!';
  imgTemplateContent.querySelector('.picture__img').src = url;
  imgTemplateContent.querySelector('.picture__img').setAttribute('data-img-id', id);
  imgTemplateContent.querySelector('.picture__img').alt = description;
  imgTemplateContent.querySelector('.picture__comments').textContent = comments.length;
  imgTemplateContent.querySelector('.picture__likes').textContent = likes;

  return imgTemplateContent;
};

const renderImages = (data) => {
  const imagesFragment = document.createDocumentFragment();
  data.forEach((obj) => imagesFragment.append(createImgTemplate(obj)));
  picturesContainer.append(imagesFragment);
};

export {
  renderImages,
  picturesContainer
};
