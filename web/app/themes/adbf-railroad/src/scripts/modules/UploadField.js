
// *****************************************************************************
// =============================================================================
// Modules: Nav Toggle
// =============================================================================
// Controls the opening and closing of our mobile menu system
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModule } from '../core/MightyModular/module';
import { formatBytes } from '../utils/maths';

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
        // Retrieve UI element(s)
        const choose = this.el.querySelector('.js-choose');
        const input = this.el.querySelector('.js-input');
        const filename = this.el.querySelector('.js-filename');
        const remove = this.el.querySelector('.js-remove');

        // Add click event to our custom 'choose' button
        if (choose) {
            choose.addEventListener('click', (e) => {
                // Prevent default functionality
                e.preventDefault();

                // Force click of actual input
                input.click();
            });
        }

        // Listen for changes on our input
        if (input) {
            input.addEventListener('change', (e) => {
                // Conditionally style our input state
                if (input.files.length) {
                    // Set upload field to '-has-file'
                    this.el.classList.add('-has-file');
                } else {
                    // Set upload field to not '-has-file'
                    this.el.classList.remove('-has-file');
                }

                filename.innerHTML = '<b>'+input.files[0].name+'</b> ('+(formatBytes(input.files[0].size))+')';
            });
        }

        // Add click event to our custom 'remove' button
        if (remove) {
            remove.addEventListener('click', (e) => {
                // Prevent default functionality
                e.preventDefault();

                // Set input value to empty
                input.value = '';

                // Set upload field to not '-has-file'
                this.el.classList.remove('-has-file');
            });
        }
    }

    // Destroy module
    // =========================================================================
    destroy() {
        // Destroy listener(s)
        this.choose.removeEventListener('click');

        // Remove classes
        this.el.remove('-has-file');
    }
}
