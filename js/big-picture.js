const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const createComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsFragment.append(commentElement);
  });
  commentList.append(commentsFragment);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
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
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(picture);
  createComments(picture.comments);
};

cancelButton.addEventListener('click', onCancelButtonClick);

export {showBigPicture};
