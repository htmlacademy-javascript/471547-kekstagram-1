import {renderPictures} from './miniatures.js';
import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const image = evt.target.closest('[data-picture-id]');
    if (!image) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +image.dataset.pictureId
    );
    showBigPicture(picture);
  });

  renderPictures(pictures, container);
};

export {renderGallery};
