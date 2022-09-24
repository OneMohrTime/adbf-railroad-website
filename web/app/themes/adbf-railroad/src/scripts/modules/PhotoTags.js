
// *****************************************************************************
// =============================================================================
// Modules: Photo Tags
// =============================================================================
// Controls the opening and closing of the photo tags component
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModule } from '../core/MightyModular/module';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends MightyModule {
    // Set initial values
    // =========================================================================
    constructor(m) {
        super(m);

        // Set defaults
        this.tags         = null;
        this.masterToggle = null;
    }

    // Init module
    // =========================================================================
    init() {
        // Query tags
        this.tags = this.el.querySelectorAll('[data-module-photo-tags-tag]');

        // If toggle is found, attach click event
        if (this.tags) {

            // Attach click event to 'all' toggle
            this.masterToggle = this.el.querySelector('[data-module-photo-tags-tag-toggle-all]');

            // If master toggle is found, attach click event
            if (this.masterToggle) {
                this.masterToggle.addEventListener('click', (e) => { this.toggleAll() });
            }

            // Tags, add click events to toggle(s)
            for (const tag of this.tags) {
                // Query tags
                var toggle = tag.querySelector('[data-module-photo-tags-tag-toggle]');

                // If tag found, attach click event
                if (toggle) {
                    toggle.addEventListener('click', (e) => { this.toggleTag(tag) });
                }
            }
        }
    }

    // Toggle all
    // =========================================================================
    toggleAll() {

        // If our toggle all is open, close it
        if (this.el.classList.contains('-is-showing-all')) {
            this.el.classList.remove('-is-showing-all');

            // If we have tags, close them all
            if (this.tags) {

                // Loop each tag, check for class and remove it's attached
                for (const tag of this.tags) {

                    if (tag.classList.contains('-is-showing')) {
                        tag.classList.remove('-is-showing');
                    }
                }
            }

        // If it's not open, open it
        } else {
            this.el.classList.add('-is-showing-all');

            // If we have tags, close them all
            if (this.tags) {

                // Loop each tag, check for class and remove it's attached
                for (const tag of this.tags) {
                    tag.classList.add('-is-showing');
                }
            }
        }
    }

    // Toggle tag
    // =========================================================================
    toggleTag(target) {

        // If our tag is open, close it
        if (target.classList.contains('-is-showing')) {
            target.classList.remove('-is-showing');

        // If it's not open, open it
        } else {
            target.classList.add('-is-showing');
        }
    }

    // Destroy module
    // =========================================================================
    destroy() {
        // Destroy click listener
        // this.el.removeEventListener('click');

        // Remove class from html
        // html.classList.remove('-has-menu-open');
    }
}
