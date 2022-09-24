
// *****************************************************************************
// =============================================================================
// Modules: Example
// =============================================================================
// This is just an example of the base of a custom module that you would create
// within the project. After you create a module, be sure to add it to the
// 'modules.js' file, add the related tag to your front end
// (data-module-{moduleName}) and watch it come to life. Init functions are
// automatically ran when a module is on a page, no need to call init within
// here to start your module, as it's already running :)
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
        // Console log the module
        console.log('Example module initiated');

        // Console log the element the module is attached to
        console.log(this.el);
    }
}
