import {renderPictures} from './miniatures.js';
import {showBigPicture} from './big-picture.js';

const containerElement = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  containerElement.addEventListener('click', (evt) => {
    const image = evt.target.closest('[data-picture-id]');
    if (!image) {
      return;
    }

    evt.preventDefault();

    const picture = pictures.find(
      (item) => item.id === +image.dataset.pictureId
    );
    showBigPicture(picture);
  });

  renderPictures(pictures, containerElement);
};

export {renderGallery};
