import {debounce} from './util.js';

const TIMEOUT_DELAY = 500;

const picturesContainerElements = document.querySelector('.pictures');
const pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures) => {
  picturesContainerElements.querySelectorAll('.picture').forEach((element) => element.remove());
  const picturesFragment = document.createDocumentFragment();
  pictures.forEach(({url, description, likes, comments, id}) => {
    const pictureElement = pictureElementTemplate.cloneNode(true);
    const imageElement = pictureElement.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.pictureId = id;
    picturesFragment.append(pictureElement);
  });
  picturesContainerElements.append(picturesFragment);
};

const debouncedRenderPictures = debounce(renderPictures, TIMEOUT_DELAY);

export {renderPictures, debouncedRenderPictures};
