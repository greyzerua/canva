import './countdown-timer.js';

document.addEventListener('DOMContentLoaded', function() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenGallery = document.querySelector('.work-examples__gallery--hidden');
  const videoModal = document.getElementById('videoModal');

  showMoreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    hiddenGallery.classList.toggle('work-examples__gallery--visible');
    
    if (hiddenGallery.classList.contains('work-examples__gallery--visible')) {
      showMoreBtn.textContent = 'Сховати';
      
      setTimeout(() => {
        const bottomOfHiddenGallery = hiddenGallery.getBoundingClientRect().bottom;
        const scrollPosition = window.scrollY + bottomOfHiddenGallery - window.innerHeight + 150;
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }, 500);
    } else {
      showMoreBtn.textContent = 'Показати ще';
      showMoreBtn.style.transform = 'translateY(0)';
    }
  });

  function openModal(content) {
    const modalContent = videoModal.querySelector('.video-modal__content');
    modalContent.innerHTML = `
      <span class="video-modal__close">&times;</span>
      ${content}
    `;
    videoModal.style.display = 'block';

    const video = modalContent.querySelector('video');
    if (video) {
      video.play();
    }
  }

  document.querySelector('.work-examples').addEventListener('click', function(e) {
    const target = e.target;
    const container = target.closest('.work-examples__image-container');
    
    if (container) {
      if (container.dataset.video) {
        openModal(`<video class="video-modal__player" controls autoplay>
          <source src="${container.dataset.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>`);
      } else if (target.classList.contains('work-examples__image')) {
        openModal(`<img src="${target.src}" alt="${target.alt}" class="video-modal__player">`);
      }
    }
  });

  videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal || e.target.classList.contains('video-modal__close')) {
      closeModal();
    }
  });

  function closeModal() {
    videoModal.style.display = 'none';
    const modalContent = videoModal.querySelector('.video-modal__content');
    modalContent.innerHTML = '';
  }
});
