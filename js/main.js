import {
  generateArr
} from './data.js';


const imgContainer = document.querySelector('.pictures');

function foo (parentElement) {
  const fragment = document.createDocumentFragment();
  const imgTemplate = document.querySelector('#picture');

  const arrOfValues = generateArr('img/logo-background-', 3);

  arrOfValues.forEach(({url, likes, comments}) => {
    const cloneTemplate = imgTemplate.content.cloneNode(true);
    cloneTemplate.querySelector('.picture__img').src = url;
    cloneTemplate.querySelector('.picture__comments').textContent = comments.length;
    cloneTemplate.querySelector('.picture__likes').textContent = likes;
    fragment.append(cloneTemplate);
  });

  parentElement.append(fragment);
}

foo(imgContainer);
