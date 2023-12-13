import {images} from './data.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesCollection = images;

const picturesFragment = document.createDocumentFragment();

picturesCollection.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  document.querySelector('#picture').content.querySelector('.picture__img').src = url;
  document.querySelector('#picture').content.querySelector('.picture__likes').textContent = likes;
  document.querySelector('#picture').content.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.append(pictureElement);
});

picturesContainer.append(picturesFragment);
