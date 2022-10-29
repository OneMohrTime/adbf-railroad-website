// =============================================================================
// Modules: Example
// =============================================================================
// ...

// Import dependencies
// =============================================================================
import { module as mightyModule } from 'modujs';
import { html } from '../utils/environment';
import { fadeOut, fadeIn, fadeToggle, slideUp, slideDown, slideToggle } from '../utils/jquery';

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
    this.menuLinks = [];
    this.subNavs   = [];
    this.trigger   = null;
    this.overlay   = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.menu      = html.querySelector('.js-menu');
    this.menuItems = this.menu.querySelectorAll('.c-navigation__item');
    this.menuItems = Array.from(this.menuItems);
    this.menuLinks = this.menu.querySelectorAll('.c-link');
    this.subNavs   = this.menu.querySelectorAll('.js-dropdown');
    this.trigger   = html.querySelector('.js-nav-trigger');
    this.overlay   = html.querySelector('.js-nav-overlay');

    // Slide up dropdowns
    this.subNavs.forEach(dropdown => {
      let caret  = dropdown.parentElement.querySelector('.js-caret');
      let subnav = dropdown.parentElement.querySelector('.js-dropdown');
      // Hide subnavs by default
      slideUp(dropdown);
      // When caret is clicked
      caret.addEventListener('click', () => {
        // Show only this subnav
        slideToggle(subnav);
        // Rotate caret
        caret.classList.toggle('-is-open');
      });
    });

    // When trigger is clicked
    this.trigger.addEventListener('click', () => {
      // Activate menu state
      this.menu.classList.remove('-not-active');
      this.menu.classList.add('-is-active');
      // Toggle caret
      this.trigger.classList.toggle('-not-active');
      this.trigger.classList.toggle('-is-active');
      // Activate overlay state
      this.overlay.classList.toggle('-not-active');
      this.overlay.classList.toggle('-is-active');
      // Show menu
      slideToggle(this.menu);
    });

    // When "overlay" is clicked
    this.overlay.addEventListener('click', () => {
      // Remove menu state
      this.menu.classList.remove('-is-active');
      this.menu.classList.add('-not-active');
      // Toggle caret
      this.trigger.classList.toggle('-not-active');
      this.trigger.classList.toggle('-is-active');
      // Remove overlay state
      this.overlay.classList.remove('-is-active');
      this.overlay.classList.add('-not-active');
      // Hide menu (it should already be visible)
      slideToggle(this.menu);
    });
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
