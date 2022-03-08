import {
  generateArr
} from './data.js';


function foo () {
  const fragment = document.createDocumentFragment();
  const imgTemplate = document.querySelector('#picture');

  const arrOfValues = generateArr('img/logo-background-', 3);

  for (let i = 1; i <= 3; i++) {
    const cloneTemplate = imgTemplate.content.cloneNode(true);
    cloneTemplate.querySelector('.picture__img').src = `img/logo-background-${i}.jpg`;
    cloneTemplate.querySelector('.picture__comments').textContent = i;
    cloneTemplate.querySelector('.picture__likes').textContent = i;
    fragment.append(cloneTemplate);
  }

  console.log(fragment);
}

foo();
