// =============================================================================
// Modules: Scroll
// =============================================================================
// Handles all page load and page transition aspects throughout the project via
// the 'Mighty Load' module and gives to ability to call from with any other
// module within the project

// Import dependencies
// =============================================================================
import { module as adbfModule } from 'modujs';
import modularLoad from 'modularload';
import { html } from '../utils/environment';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends adbfModule {
  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.load = {};
  }

  // Init module
  // =========================================================================
  init() {
    // Defaults
    this.load = new modularLoad({
      enterDelay: 300,
      exitDelay: 300,
      loadDelay: 300,
      loadingClass: 'is-loading',
      loadedClass: 'is-loaded',
      readyClass: 'is-ready',
      transitions: {
        slideOut: {}
      }
    });

    this.load.on('loading', () => {
      console.log('loading');
      // Ensure current scroll module is destroyed to better control the
      // user experience during the transition of a page
      this.call('destroy', 'scroll', 'Scroll');

      // // If we have our menu open, ensure it's closed
      // if (html.classList.contains('has-menu-open')) {
      //   html.classList.remove('has-menu-open');
      // }
    });

    this.load.on('loaded', (transition, oldContainer, newContainer) => {
      console.log('loaded');
      // Destroy our old container
      this.call('destroy', oldContainer, 'app');

      // Update our new container
      this.call('update', newContainer, 'app');
    });
  }

  // Go to
  // =========================================================================
  // goTo(arg) {
  //   this.load.goTo(arg);
  // }

  // Destroy
  // =========================================================================
  destroy() {}
}
