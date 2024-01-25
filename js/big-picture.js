const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentListElement = document.querySelector('.social__comments');
const bodyElement = document.querySelector('body');
const cancelButtonElement = document.querySelector('.big-picture__cancel');
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsLoaderElement = document.querySelector('.social__comments-loader');

const shownCommentsElement = document.querySelector('.shown-comments-count');
const commentCountElement = document.querySelector('.comments-count');

let commentsPublished = 0;
let comments = [];

const getCommentElement = (comment) => {
  const commentElement = commentTemplateElement.cloneNode(true);
  const commentAvatarElement = commentElement.querySelector('.social__picture');
  commentAvatarElement.src = comment.avatar;
  commentAvatarElement.alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const renderComments = () => {

  commentsPublished += COMMENTS_PER_PORTION;

  if (commentsPublished >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsPublished = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsPublished; i++) {
    const commentElement = getCommentElement(comments[i]);
    commentListElement.innerHTML = '';
    fragment.append(commentElement);
  }

  commentListElement.append(fragment);
  shownCommentsElement.textContent = commentsPublished;
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
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
  const imageElement = bigPictureElement.querySelector('.big-picture__img img');
  imageElement.src = url;
  imageElement.alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPictureDetails(picture);
  comments = picture.comments;
  commentCountElement.textContent = picture.comments.length;
  renderComments();
};

commentsLoaderElement.addEventListener('click', () => {
  renderComments();
});

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export {showBigPicture};
