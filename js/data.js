import {
  getRandomPositiveInteger
} from './util.js';

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

const createCommentTemplate = (iterator) => ({
  id: iterator,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
});

const createArrComments = (counter) => {
  const arrComments = [];

  for (let i = 1; i <= counter; i++) {
    arrComments.push(createCommentTemplate(i));
  }

  return arrComments;
};

const createObjTemplate = (iterator) => ({
  id: iterator,
  url: `photos/${iterator}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomPositiveInteger(15, 200),
  comments: createArrComments(getRandomPositiveInteger(1, 20)),
});

const createArrObj = (counter) => {
  const arrOfObj = [];
  for (let i = 1; i <= counter; i++) {
    arrOfObj.push(createObjTemplate(i));
  }

  return arrOfObj;
};

const arrObjData = createArrObj(25);

export {
  arrObjData
};
