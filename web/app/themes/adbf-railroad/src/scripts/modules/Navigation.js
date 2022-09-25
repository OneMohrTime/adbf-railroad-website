// =============================================================================
// Modules: Example
// =============================================================================
// ...

// Import dependencies
// =============================================================================
import { module as mightyModule } from 'modujs';
import { html } from '../utils/environment';
import { fadeOut, fadeIn, slideToggle } from '../utils/jquery';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends mightyModule {
  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Vars
    this.menu      = null;
    this.menuItems = [];
    this.trigger   = null;
    this.close     = null;
    this.overlay   = null;
    this.caret     = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.menu      = html.querySelector('.js-menu');
    this.menuItems = this.menu.querySelectorAll('.c-navigation__item');
    this.menuItems = Array.from(this.menuItems);
    this.menuLinks = this.menu.querySelectorAll('.c-link');
    this.trigger   = html.querySelector('.js-nav-trigger');
    this.close     = html.querySelector('.js-nav-close');
    this.overlay   = html.querySelector('.js-nav-overlay');

    // When trigger is clicked
    this.trigger.addEventListener('click', () => {
      // Activate menu state
      this.menu.classList.remove('-not-active');
      this.menu.classList.add('-is-active');
      this.menu.classList.remove('js-nav-trigger');
      this.menu.classList.add('js-nav-close');
      // Activate overlay state
      this.overlay.classList.remove('-not-active');
      this.overlay.classList.add('-is-active');
      // Show menu
      fadeIn(this.menu);
    });

    // When "close" is clicked
    this.close.addEventListener('click', () => {
      // Remove menu state
      this.menu.classList.remove('-is-active');
      this.menu.classList.add('-not-active');
      this.menu.classList.remove('js-nav-close');
      this.menu.classList.add('js-nav-trigger');
      // Remove overlay state
      this.overlay.classList.remove('-is-active');
      this.overlay.classList.add('-not-active');
      // Hide menu
      fadeOut(this.menu);
    });

  }

  // Destroy
  // =========================================================================
  destroy() {}
}