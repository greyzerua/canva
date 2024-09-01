
const workGalleryItems = [{
    img: './images/example-summer.jpg',
    alt: 'Summer'
  }, {
    img: './images/example-season.jpg',
    alt: 'Season'
  }, {
    img: './images/example-new-product.jpg',
    alt: 'New product'
  }, {
    img: './images/example-healing-cream.png',
    alt: 'Healing Cream',
    video: './videos/example-healing-cream.mp4'
  },{
    img: './images/example-speakers.png',
    alt: 'Speakers',
    video: './videos/example-speakers.mp4'
  }, {
    img: './images/example-model.png',
    alt: 'Model',
    video: './videos/example-model.mp4'
  }, {
    img: './images/example-black.jpg',
    alt: 'Black',
    video: './videos/black.mp4'
  }];

  const DESKTOP_COUNT = 3;
  const MOBILE_COUNT = 4;
  const MOBILE_BREAKPOINT = 680;
  
let shownCount = 0;
  
  const openModal = (content) => {
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
  
  const onGalleryItemClick = (item) => {
    if (item.video) {
      openModal(`<video class="video-modal__player" controls autoplay>
        <source src="${item.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>`);
    } else if (item.img) {
      openModal(`<img src="${item.img}" alt="${item.alt}" class="video-modal__player">`);
    }
  };
  
  const renderGallery = () => {
    const shownContainer = document.getElementById('gallery-shown');
    const hiddenContainer = document.getElementById('gallery-hidden');
    const shownItems = workGalleryItems.slice(0, shownCount);  
    const hiddenItems = workGalleryItems.slice(shownCount);

    shownContainer.innerHTML = '';
    hiddenContainer.innerHTML = '';
  
    const renderItem = (item) => {
        const {video, img, alt} = item;
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('work-examples__image-container');
      if (video) {
        itemContainer.dataset.video = video;
      }
      itemContainer.innerHTML = `
        <img src="${img}" alt="${alt}" class="work-examples__image" width="340" height="340">
        ${video ? '<div class="work-examples__play-button"></div>' :''}
      `;
      itemContainer.onclick = () => onGalleryItemClick(item);
      return itemContainer;
    }
  
    shownItems.forEach(item => {
      shownContainer.appendChild(renderItem(item));
    });
    hiddenItems.forEach(item => {
      hiddenContainer.appendChild(renderItem(item));
    });
  };

  const toggleShowMore = () => {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const shownGallery = document.getElementById('gallery-shown');
    const hiddenGallery = document.getElementById('gallery-hidden');

    hiddenGallery.classList.toggle('work-examples__gallery--visible');
    shownGallery.classList.toggle('work-examples__gallery--shown');
      
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
  };

  const closeModal = () => {
    const videoModal = document.getElementById('videoModal');
    videoModal.style.display = 'none';
    const modalContent = videoModal.querySelector('.video-modal__content');
    modalContent.innerHTML = '';
  }

  const updateShownCount = () => {
    const clientWidth = window.innerWidth;
    
    let count;
    if (clientWidth <= MOBILE_BREAKPOINT) {
        count = MOBILE_COUNT;
    } else {
        count = DESKTOP_COUNT;
    }
    if (count !== shownCount) {
        shownCount = count;
    }
  };

  export const onLoad = () => {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const videoModal = document.getElementById('videoModal');

    updateShownCount();

    renderGallery();

    window,addEventListener("resize", () => {
        updateShownCount();

        renderGallery();
    });
  
    showMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      toggleShowMore();
    });
  
    videoModal.addEventListener('click', function(e) {
      if (e.target === videoModal || e.target.classList.contains('video-modal__close')) {
        closeModal();
      }
    });
  };
