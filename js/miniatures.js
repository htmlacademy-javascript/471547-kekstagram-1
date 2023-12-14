import {images} from './data.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

images.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('#picture').content.querySelector('.picture__img').src.alt = url.alt;
  pictureElement.querySelector('#picture').content.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('#picture').content.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.append(pictureElement);
});

picturesContainer.append(picturesFragment);
