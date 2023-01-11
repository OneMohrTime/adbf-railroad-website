// =============================================================================
// Modules: Zoom
// =============================================================================
// Zoom in on images using GLightbox

// Import dependencies
// =============================================================================
import { module as adbfModule } from 'modujs';
import GLightbox from 'glightbox';
import { html } from '../utils/environment';

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

    // const customLightboxHTML = `<div id="glightbox-body" class="c-modal__container">
    //   <div class="c-modal__slider visible"></div>
    //   <div class="c-modal__overlay"></div>
    //   <div class="c-modal">
    //     <div id="glightbox-slider" class="c-modal__slider"></div>
    //     <button class="gnext c-button" tabindex="0" aria-label="Next" data-customattribute="example">{nextSVG}</button>
    //     <button class="gprev c-button" tabindex="1" aria-label="Previous">{prevSVG}</button>
    //     <button class="gclose c-button" tabindex="2" aria-label="Close">{closeSVG}</button>
    //   </div>
    // </div>`;

    // let customSlideHTML = `<div class="gslide">
    //   <div class="gslide-inner-content">
    //     <div class="ginner-container">
    //       <div class="gslide-media"></div>
    //       <div class="gslide-description">
    //         <div class="gdesc-inner">
    //           <h4 class="gslide-title"></h4>
    //           <div class="gslide-desc"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>`;

    // Vars
    const lightbox = GLightbox({
      selector: '.js-zoom',
      // lightboxHTML: customLightboxHTML,
      // slideHTML: customSlideHTML,
      // skin: 'supercool',
      autoplayVideos: false,
      autofocusVideos: true,
      descPosition: 'bottom',
      draggable: false,
      loop: true,
      preload: false,
      touchNavigation: true,
      zoomable: false,
    });

  }

  // Destroy
  // =========================================================================
  destroy() {}
}
