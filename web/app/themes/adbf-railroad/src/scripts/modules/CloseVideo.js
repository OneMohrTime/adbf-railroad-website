
// *****************************************************************************
// =============================================================================
// Modules: Close Video
// =============================================================================
// Controls closing of videos from our close video button(s)
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

        // Set defaults
        this.embedTarget = null;
    }

    // Init module
    // =========================================================================
    init() {
        // Set embed target
        this.embedTarget = html.querySelector('[data-module-video-embed]');

        // Attach click event to button
        this.el.addEventListener('click', (e) => { this.closeVideo(e) });
    }

    // Close video
    // =========================================================================
    closeVideo(e) {
        // Stop default click through
        e.preventDefault();

        // Start process only if video is NOT currently playing
        if (html.classList.contains('-has-video-playing')) {

            // Remove video
            this.embedTarget.innerHTML = '';

            // Attach html class
            html.classList.remove('-has-video-playing');
        }
    }

    // Destroy module
    // =========================================================================
    destroy() {}
}
