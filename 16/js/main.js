import {renderGallery} from './gallery.js';
import {initForm} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {initFilters} from './sorting.js';

try {
  const data = await getData();
  initFilters(data);
  renderGallery(data);
  initForm();
} catch (err) {
  showAlert(err.message);
}
