// *****************************************************************************
// =============================================================================
// Modules: LazySizes
// =============================================================================
// Lazyload images with lazysizes.js
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModule } from '../core/MightyModular/module';
import lazySizes from 'lazysizes';
// import 'lazysizes/plugins/blur-up/ls.blur-up';

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
      // Configuration settings for lazysizes
      lazySizes.cfg.lazyClass  = 'u-lazyload';
      // lazySizes.cfg.blurupMode = 'auto';
    }
}
