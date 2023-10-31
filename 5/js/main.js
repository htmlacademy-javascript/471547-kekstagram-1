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

const CommentId = {
  MIN: 1,
  MAX: 1000
};

const AvatarNumber = {
  MIN: 1,
  MAX: 6
};

const LikesAmount = {
  MIN: 15,
  MAX: 200
};

const CommentsAmount = {
  MIN: 1,
  MAX: 20
};

const imagesAmount = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: getRandomInteger(CommentId.MIN, CommentId.MAX),
  avatar: `img/avatar-${getRandomInteger(AvatarNumber.MIN, AvatarNumber.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createImage = (_, index) => {
  const id = index + 1;
  const commentsAmount = getRandomInteger(CommentsAmount.MIN, CommentsAmount.MAX);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LikesAmount.MIN, LikesAmount.MAX),
    comments: Array.from({length: commentsAmount}, createComment)
  };
};

const imagesDescriptions = Array.from({length: imagesAmount}, createImage);

// eslint-disable-next-line no-console
console.log(imagesDescriptions);
