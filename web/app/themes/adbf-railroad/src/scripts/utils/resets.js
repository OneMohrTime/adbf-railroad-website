
// *****************************************************************************
// =============================================================================
// Utilities: Resets
// =============================================================================
// A collection of reset related functions
// *****************************************************************************

// Reset nav(s)
// =============================================================================
export function resetNavs(navsClass, navsOpenClass, scroll) {
    // Default scroll to false
    scroll = scroll || false;

    // Search for all navs and close them
    const navs = document.querySelectorAll('.'+navsClass);

    // Loop through all navs and reset
    navs.forEach(function (nav) {
        // Remove is open
        nav.classList.remove(navsOpenClass);

        // Scroll to top of window, if set to true
        if (scroll) {
            nav.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    });
}
