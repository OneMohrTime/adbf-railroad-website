
// *****************************************************************************
// =============================================================================
// Modules: Nav Toggle
// =============================================================================
// Controls the opening and closing of our mobile menu system
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModule } from '../core/MightyModular/module';
import { html } from '../utils/environment';
import { resetNavs } from '../utils/resets';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends MightyModule {
    // Set initial values
    // =========================================================================
    constructor(m) {
        super(m);
    }

    // Init module
    // =========================================================================
    init() {
        // Add click event to our element
        this.el.addEventListener('click', () => {
            // If we're already open, close the menu
            if (html.classList.contains('-has-menu-open')) {
                // Remove open menu class
                html.classList.remove('-has-menu-open', '-has-sub-nav-open');

                // Reset nav(s)
                resetNavs('js-sub-nav', '-is-open', true);
            } else {
                html.classList.add('-has-menu-open');

                // If we're opening the menu, ensure search is closed
                html.classList.remove('-has-search-open');
            }

            // Always ensure that sub menus are closed
            html.classList.remove('-has-sub-nav-open');

            // Scroll to top of window
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
    }

    // Destroy module
    // =========================================================================
    destroy() {
        // Destroy click listener
        this.el.removeEventListener('click');

        // Remove class from html
        html.classList.remove('-has-menu-open');
    }
}
