const getRandomInteger = (min = 0, max = 1) => {
  min = +min;
  max = +max;
  const isWrongRange = min >= max || min < 0 || max < 0 || isNaN(min) || isNaN(max);
  const randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
  return isWrongRange ? 'Неверно передан диапазон значений' : randomInteger;
};

getRandomInteger(0, 3);

const checkStrLength = (string = '', maxLength = 10) => {
  string = string.toString();
  const isLongLength = string.length <= maxLength;
  return isLongLength;
};

checkStrLength('some value', 11);

// // task
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

const generateArr = () => {
  const result = [];
  for (let i = 1; i <= 25; i++) {
    const randomObj = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Случайное описание для фотографии',
      likes: getRandomInteger(15, 200),
      comments: makeComments(getRandomInteger(1, 15)),
    };

    result.push(randomObj);
  }

  return result;
};

const resul =  generateArr();
console.log(resul);
