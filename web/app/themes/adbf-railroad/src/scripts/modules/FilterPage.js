
// *****************************************************************************
// =============================================================================
// Modules: Filter Page
// =============================================================================
// Triggers filtering fields
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
    }

    // Init module
    // =========================================================================
    init() {
        // Add click event to our element
        this.el.addEventListener('change', () => {
            // Force form submit
            this.el.submit();
        });
    }

    // Destroy module
    // =========================================================================
    destroy() {
        // Destroy click listener
        this.el.removeEventListener('change');
    }
}
