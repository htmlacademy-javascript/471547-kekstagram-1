import {renderGallery, debouncedRenderGallery} from './gallery.js';
import {initForm} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {getFilteredPictures, showFilters} from './sorting.js';

try {
  const data = await getData();
  showFilters(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
  initForm();
} catch (err) {
  showAlert(err.message);
}
