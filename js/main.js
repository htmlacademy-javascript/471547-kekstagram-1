import './data.js';
import './util.js';
import './miniatures.js';

import {images} from './data.js';
import {getPicturesCollection} from './miniatures.js';

getPicturesCollection(images);

// eslint-disable-next-line no-console
console.log(images);
