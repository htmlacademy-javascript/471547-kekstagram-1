import {renderPictures} from './miniatures.js';
import {showBigPicture} from './big-picture.js';
import {debounce} from './util.js';

const container = document.querySelector('.pictures');
let pictures = [];

const onContainerClick = (evt) => {
  const image = evt.target.closest('[data-picture-id]');
  if (!image) {
    return;
  }
  evt.preventDefault();
  const picture = pictures.find(
    (item) => item.id === +image.dataset.pictureId
  );
  showBigPicture(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderPictures(pictures, container);
  container.addEventListener('click', onContainerClick);
};

const debouncedRenderGallery = debounce(renderGallery);

export {renderGallery, debouncedRenderGallery};
