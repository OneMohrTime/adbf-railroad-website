// =============================================================================
// App
// =============================================================================
// This file is the centerpiece of the javascript front end and kicks it all of
// on load.

// Import dependencies
// =============================================================================
import modular from 'modujs';
import * as modules from './modules';
import globals from './globals';
import { html } from './utils/environment';

// Run a new modular instance
// =============================================================================
const app = new modular({
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

// Set frontend
// =========================================================================
html.classList.add('-is-loaded');
html.classList.add('-is-ready');
html.classList.remove('-is-loading');
html.classList.remove('-no-js');
html.classList.add('-has-js');
