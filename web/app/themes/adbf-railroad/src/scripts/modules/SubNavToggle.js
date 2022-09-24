
// *****************************************************************************
// =============================================================================
// Modules: Sub Nav Toggle
// =============================================================================
// Controls the opening and closing of our sub nav(s)
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
        this.el.addEventListener('click', (e) => {
            // Prevent page load on navigation link click
            e.preventDefault();

            // Set sub nav
            this.setSubNav(this.el.getAttribute('data-menu-target'));
        });
    }

    // Set sub nav
    // =========================================================================
    setSubNav(_target) {
        // Search for sub nav target
        const target = document.querySelector('#'+_target+'SubNav');

        // If we found our target, set targets as open
        if (target != null) {
            // If our target is already open, run complete reset
            if (target.classList.contains('-is-open')) {
                // No target found, let's remove any classes that may have been added
                html.classList.remove('-has-sub-nav-open');

                // Reset nav(s)
                resetNavs('js-sub-nav', '-is-open');
            } else {
                // Reset nav(s)
                resetNavs('js-sub-nav', '-is-open');

                // Open menu
                this.el.classList.add('-is-open');

                // Open menu
                target.classList.add('-is-open');

                // Set html as 'sub nav open'
                html.classList.add('-has-sub-nav-open');

                // Ensure search is closed
                html.classList.remove('-has-search-open');

                // Scroll to top of window
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }
        } else {
            // No target found, let's remove any classes that may have been added
            html.classList.remove('-has-sub-nav-open');

            // Reset nav(s)
            resetNavs('js-sub-nav', '-is-open');
        }
    }

    // Destroy module
    // =========================================================================
    destroy() {
        // Destroy click listener
        this.el.removeEventListener('click');

        // Remove class from html
        html.classList.remove('-has-sub-nav-open');
    }
}
