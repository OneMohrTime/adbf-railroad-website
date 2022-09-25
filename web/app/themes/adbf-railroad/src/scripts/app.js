
// *****************************************************************************
// =============================================================================
// App
// =============================================================================
// This file is the centerpiece of the javascript front end and kicks it all of
// on load.
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModular } from './core/MightyModular';
import * as modules from './modules';
import globals from './globals';
import { html } from './utils/environment';

// Run a new instance of 'Mighty Modules'
// =============================================================================
// Mighty Modular watches for modules coming and going within the frontend and
// deploys the process of init or destroy as they're moving in and out
const app = new MightyModular({
    // Set to the modules imported above
    modules: modules
});

// Init our app
// =========================================================================
// Take the above 'Mighty Modular' instance, place it into our apps init and
// start up our app!
app.init(app);

// Run global functions
// =========================================================================
globals();

// Set frontend as no longer 'loading'
// =========================================================================
html.classList.add('-has-js');

// Set frontend as 'ready'
// =========================================================================
//html.classList.add('-is-ready');
