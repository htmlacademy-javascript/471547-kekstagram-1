const NAMES = [
  'Иван',
  'Дмитрий',
  'Мария',
  'Александр',
  'Артём',
  'Виктория',
  'Ольга',
  'Алина',
  'Алексей',
  'Яна',
  'Юрий',
  'Никита',
  'Мария',
  'Юлия',
  'Борис',
  'Артур',
  'Максим',
  'Алёна',
  'Милана',
  'Рудольф',
  'Эдуард',
  'Антон',
  'Григорий',
  'Ульяна',
  'Ирина'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Это я здесь.',
  'Это я там',
  'Это моё самое крутое фото',
  'Красиво, правда?',
  'Без комментариев',
  'Фото на миллион лайков',
  'Кекс бы оценил...'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: getRandomInteger(0, 1000),
  avatar: `img/avatar- ${getRandomInteger(0, 7)} + .svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const randomComment = Array.from({length: 1}, createComment);

const createImageDescription = () => ({
  id: getRandomInteger(0, 26),
  url: `photos/ + ${getRandomInteger(0, 26)} + .jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 201),
  comments: randomComment
});

const imagesDescriptions = Array.from({length: 25}, createImageDescription);

console.log(imagesDescriptions);
