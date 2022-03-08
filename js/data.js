import {getRandomInteger} from './util.js';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const names = ['Артем', 'Филипп', 'Яна', 'Анастасия'];


const makeComments = (number) => {
  const arr = [];
  for (let i = 1; i <= number; i++) {
    const randomComment = {
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
      name: names[getRandomInteger(0, names.length - 1)],
    };
    arr.push(randomComment);
  }

  return arr;
};

const generateArr = (imgUrl) => {
  const result = [];
  for (let i = 1; i <= 25; i++) {
    const randomObj = {
      id: i,
      url: `${imgUrl}${i}.jpg`,
      description: 'Случайное описание для фотографии',
      likes: getRandomInteger(15, 200),
      comments: makeComments(getRandomInteger(1, 15)),
    };

    result.push(randomObj);
  }

  return result;
};

generateArr('photos/');

export {generateArr};
