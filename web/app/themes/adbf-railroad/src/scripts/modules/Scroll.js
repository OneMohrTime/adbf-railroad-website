// =============================================================================
// Modules: Scroll
// =============================================================================
// Handles all page load and page transition aspects throughout the project via
// the 'Mighty Load' module and gives to ability to call from with any other
// module within the project

// Import dependencies
// =============================================================================
import { module as adbfModule } from 'modujs';
import LocomotiveScroll from 'locomotive-scroll';
import { html } from '../utils/environment';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends adbfModule {
  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.scroll = null;
    this.offset = [];
  }

  // Init module
  // =========================================================================
  init() {
    // Defaults
    this.offset = [80, 80];
    this.scroll = new LocomotiveScroll({
      el: this.el,
      offset: this.offset,
      class: '-in-viewport'
    });
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
