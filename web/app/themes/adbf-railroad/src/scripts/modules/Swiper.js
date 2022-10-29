// =============================================================================
// Modules: Swiper
// =============================================================================
// Initiates swiper.js on HTML elements
// @link: https://swiperjs.com/swiper-api

// Import dependencies
// =============================================================================
import { module as adbfModule } from 'modujs';
import { html } from '../utils/environment';
// core version + navigation, pagination modules:
import Swiper, { A11y, FreeMode, Navigation, Pagination, Scrollbar } from 'swiper';
// import Swiper and modules styles
import 'swiper/scss';
import 'swiper/scss/a11y';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends adbfModule {
  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
  }

  // Init module
  // =========================================================================
  init() {
    // Defaults

    const swiper = new Swiper( this.el, {
      // configure Swiper to use modules
      modules: [A11y, FreeMode, Navigation, Pagination, Scrollbar],

      // Options
      preloadImages: false,
      rewind: true,
      slidesPerView: 1.5,
      spaceBetween: 24,

      // Accessibility
      a11y: {
        enabled: true
      },

      // Free mode
      freeMode: {
        enabled: true,
        sticky: true,
      },

      // Pagination dots
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        snapOnRelease: true,
      },

      // Media queries
      breakpoints: {
        600: {
          slidesPerView: 2.5
        },
        900: {
          slidesPerView: 3.5
        },
        1200: {
          slidesPerView: 4.5
        },
      }
    });
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
