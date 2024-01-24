import {debounce} from './util.js';

const TIMEOUT_DELAY = 500;

const picturesContainerElement = document.querySelector('.pictures');
const pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((element) => element.remove());
  const picturesFragment = document.createDocumentFragment();
  pictures.forEach(({url, description, likes, comments, id}) => {
    const pictureElement = pictureElementTemplate.cloneNode(true);
    const image = pictureElement.querySelector('.picture__img');
    image.src = url;
    image.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.pictureId = id;
    picturesFragment.append(pictureElement);
  });
  picturesContainerElement.append(picturesFragment);
};

const debouncedRenderPictures = debounce(renderPictures, TIMEOUT_DELAY);

export {renderPictures, debouncedRenderPictures};
