const sliderElems = document.querySelectorAll('.wp-block-anx-my-slider .swiper-container');
 
for ( let element of sliderElems ) {
  let elementSpeed = element.getAttribute('data-speed'),
      elementDirection = element.getAttribute('data-direction'),
      elementAutoPlay = element.getAttribute('data-autoplay'),
      elementLoop = element.getAttribute('data-loop'),
      elementEffect = element.getAttribute('data-effect'),
      elementSlidesPerView = element.getAttribute('data-slidesPerView'),
      elementCenteredSlides = element.getAttribute('data-centeredSlides');
 
  if (!elementSpeed) {
    elementSpeed = 300;
  }
  if (!elementDirection) {
    elementDirection = 'horizontal';
  }
  if (elementAutoPlay) {
    elementAutoPlay = parseInt(elementAutoPlay);
  } else {
    elementAutoPlay = 999999999;
  }
  if (elementLoop == 'true') {
    elementLoop = true;
  } else {
    elementLoop = false;
  }
  if (!elementEffect) {
    elementEffect = 'slide';
  }
  if (!elementSlidesPerView) {
    elementSlidesPerView = 1;
  }
  if (elementCenteredSlides == 'true') {
    elementCenteredSlides = true;
  } else {
    elementCenteredSlides = false;
  }
  
  let swiperSlider = new Swiper(element, {
    direction: elementDirection,
    speed: parseInt(elementSpeed),
    autoplay: {
      delay: elementAutoPlay
    },
    loop: elementLoop,
    effect: elementEffect,
    slidesPerView: parseInt(elementSlidesPerView),
    centeredSlides: elementCenteredSlides,
    pagination: {
      el: '.swiper-pagination', 
      type: 'bullets', 
      clickable: true, 
    },
    navigation: {
      nextEl: '.swiper-button-next', 
      prevEl: '.swiper-button-prev', 
    },
    scrollbar: {
      el: '.swiper-scrollbar', 
    },
  });
}