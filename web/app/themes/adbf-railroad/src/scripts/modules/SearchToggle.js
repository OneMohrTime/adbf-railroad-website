
// *****************************************************************************
// =============================================================================
// Modules: Search Toggle
// =============================================================================
// Controls the opening and closing of our search system
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModule } from '../core/MightyModular/module';
import { html } from '../utils/environment';
import { resetNavs } from '../utils/resets';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends MightyModule {
    // Set initial values
    // =========================================================================
    constructor(m) {
        super(m);

        // Defaults
        this.searchField = null;
    }

    // Init module
    // =========================================================================
    init() {
        // Defaults
        this.searchField = html.querySelector('.c-header__search-field');

        // Add click event to our element
        this.el.addEventListener('click', () => {
            // If we're already open, close the search
            if (html.classList.contains('-has-search-open')) {
                html.classList.remove('-has-search-open');
            } else {
                html.classList.add('-has-search-open');

                // If we're opening search, ensure all menus are closed
                html.classList.remove('-has-menu-open', '-has-sub-nav-open');

                // Activate search bar immediately
                this.searchField.focus()

                // Reset nav(s)
                resetNavs('js-sub-nav', '-is-open', true);
            }

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
        html.classList.remove('-has-search-open');
    }
}
