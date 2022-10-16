
const mySwiper = new Swiper('.js-swiper', {
  loop: true,
  speed: 800,
  slidesPerView: 1,
  centeredSlides : true,
  spaceBetween: 16,

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 16
    },
    1080: {
      slidesPerView: 3,
      spaceBetween: 16
    }
  },

 
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
 
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
 
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

});