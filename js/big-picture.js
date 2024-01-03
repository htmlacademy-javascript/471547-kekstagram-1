const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');
const body = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsLoader = document.querySelector('.social__comments-loader');
const commentsCount = document.querySelector('.social__comment-count');
const shownCommentsCount = document.querySelector('.shown-comments-count');

let commentsPublished = 0;
let comments = [];

const getCommentElement = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAvatar = commentElement.querySelector('.social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
};

const renderComments = () => {
  commentsPublished += COMMENTS_PER_PORTION;

  if (commentsPublished >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsPublished; i++) {
    const commentElement = getCommentElement(comments[i]);
    fragment.append(commentElement);
  }
  commentList.append(fragment);
  commentsCount.textContent = `${commentsPublished} из ${comments.length} комментариев`;
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsPublished = 0;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({url, likes, description}) => {
  const image = bigPicture.querySelector('.big-picture__img img');
  image.src = url;
  image.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPictureDetails(picture);
  comments = picture.comments;
  commentsCount.textContent = picture.comments.length;
  renderComments();
};

commentsLoader.addEventListener('click', () => {
  renderComments();
});

cancelButton.addEventListener('click', onCancelButtonClick);

export {showBigPicture};
