
// *****************************************************************************
// =============================================================================
// Modules: Resource Group
// =============================================================================
// Controls the opening and closing of the resource group component
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModule } from '../core/MightyModular/module';
import { html } from '../utils/environment';

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
        // Query for our toggle
        var toggle = this.el.querySelector('[data-module-resource-group-click]');

        // If toggle is found, attach click event
        if (toggle) {
            toggle.addEventListener('click', () => { this.toggleClass() });
        }
    }

    // Toggle class
    // =========================================================================
    toggleClass() {

        // If our resource group is open, close it
        if (this.el.classList.contains('-is-open')) {
            this.el.classList.remove('-is-open');

        // If it's not open, open it
        } else {
            this.el.classList.add('-is-open');
        }
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
