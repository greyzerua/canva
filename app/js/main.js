import './countdown-timer.js';
import {onLoad as onGalleryLoad} from './gallery.js';

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.dropdown').forEach(function(dropdown) {
    dropdown.addEventListener('click', function() {
      const content = this.querySelector('.dropdown-content');
      const icon = this.querySelector('.icon');

      content.classList.toggle('open');
      icon.classList.toggle('open');
      this.classList.toggle('open');

      icon.textContent = content.classList.contains('open') ? '−' : '+';
    });
  });

  onGalleryLoad();
});
