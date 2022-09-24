// *****************************************************************************
// =============================================================================
// Globals
// =============================================================================
// Set and run functions globally throughout our app
// *****************************************************************************

// Import dependencies
// =============================================================================
import { breakEmailVsContainer } from "./globals/breakEmailVsContainer";

// Set default function
// =============================================================================
export default function() {
  breakEmailVsContainer(
    "#global-footer-email",
    "#global-footer-email-container"
  );
}
