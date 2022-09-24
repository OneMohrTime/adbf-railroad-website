
// *****************************************************************************
// =============================================================================
// Modules: Product Gallery
// =============================================================================
// Controls the opening and closing of the product gallery component
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModule } from '../core/MightyModular/module';
import { isNumeric } from '../utils/is';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends MightyModule {
    // Set initial values
    // =========================================================================
    constructor(m) {
        super(m);

        // Set defaults
        this.clickEvents      = null;
        this.images           = null;
        this.screenWidth      = null;
        this.scroller         = null;
        this.thumbnails       = null;
        this.currentPage      = 0;
        this.totalPages       = 0;
        this.scrollAmount     = 97;
        this.scrollerPrevious = null;
        this.scrollerNext     = null;
    }

    // Init module
    // =========================================================================
    init() {

        // Build out
        this.buildOut();

        // Initialize events
        this.initializeEvents();
    }

    // Build out
    // =========================================================================
    buildOut() {

        // Query for lick events
        this.clickEvents = this.el.querySelectorAll('[data-module-product-gallery-click]');

        // Query for images
        this.images = this.el.querySelectorAll('[data-module-product-gallery-image]');

        // Query for scroller
        this.scroller = this.el.querySelector('[data-module-product-gallery-scroller]');

        // Query for thumbnails
        this.thumbnails = this.el.querySelector('[data-module-product-gallery-thumbnails]');

        // Query for scroller previous
        this.scrollerPrevious = this.el.querySelector('[data-module-product-gallery-scroller-previous]');

        // Query for scroller next
        this.scrollerNext = this.el.querySelector('[data-module-product-gallery-scroller-next]');
    }

    // Initialize events
    // =========================================================================
    initializeEvents() {

        // Loop click events, add listeners
        for (const event of this.clickEvents) {
            event.addEventListener('click', (e) => { this.setPhoto(e) });
        }

        // Run initial resize
        this.checkResize();

        // Attach resize function to resize listener
        window.addEventListener('resize', this.checkResize.bind(this), false);

        // If we have scroller previous button
        if (this.scrollerPrevious) {
            this.scrollerPrevious.addEventListener('click', this.scrollPrevious.bind(this), false);
        }

        // If we have scroller next button
        if (this.scrollerNext) {
            this.scrollerNext.addEventListener('click', this.scrollNext.bind(this), false);
        }
    }

    // Scroll previous
    // =========================================================================
    scrollPrevious() {
        // Update current page
        this.currentPage--;

        // Update scroller
        this.updateScroller();
    }

    // Scroll next
    // =========================================================================
    scrollNext() {
        // Update current page
        this.currentPage++;

        // Update scroller
        this.updateScroller();
    }

    // Set photo
    // =========================================================================
    setPhoto(e) {

        // Get index
        var index = e.target.getAttribute('data-module-product-gallery-click');

        // If index exists and is numeric, change image
        if (isNumeric(index)) {

            // Loop click events, remove '-is-selected' class
            for (const event of this.clickEvents) {
                event.classList.remove('-is-selected');
            }

            // Add '-is-selected' class to click event element
            this.clickEvents[index].classList.add('-is-selected');

            // Loop images, remove '-is-selected' class
            for (const image of this.images) {
                image.classList.remove('-is-selected');
            }

            // Add '-is-selected' class to image
            this.images[index].classList.add('-is-selected');
        }
    }

    // Update scroller
    // =========================================================================
    updateScroller() {

        // Ensure no unders
        this.currentPage = this.currentPage < 0 ? 0 : this.currentPage;

        // Ensure no overs
        this.currentPage = this.currentPage > this.totalPages ? this.totalPages : this.currentPage;

        // Update screen width
        this.screenWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        // If tablet or larger, check scroller
        if (this.screenWidth >= 1024) {

            // If we've got pages, set them up
            if (this.thumbnails.offsetHeight > this.scroller.offsetHeight) {

                // Get total overflow
                var totalOverflow = this.thumbnails.offsetHeight - this.scroller.offsetHeight;

                // Update total pages
                this.totalPages = Math.ceil(totalOverflow / this.scrollAmount);

                // Show previous button
                if (this.totalPages > 0 && this.currentPage > 0) {
                    this.scroller.classList.add('-has-previous');

                // Hide previous button
                } else {
                    this.scroller.classList.remove('-has-previous');
                }

                // Show next button
                if (this.totalPages > 0 && this.currentPage != this.totalPages) {
                    this.scroller.classList.add('-has-next');

                // Hide next button
                } else {
                    this.scroller.classList.remove('-has-next');
                }

                this.thumbnails.style.transform = 'translate3d(0px, -' + Math.ceil(this.currentPage * this.scrollAmount) + 'px, 0px)';
            } else {

                // Reset values
                this.resetValues();
            }

        // Empty out and run as mobile
        } else {

            // Reset values
            this.resetValues();
        }
    }

    // Resize
    // =========================================================================
    checkResize() {

        // Update scroller
        this.updateScroller();
    }

    // Reset values
    // =========================================================================
    resetValues() {

        // Reset values
        this.currentPage = 0;
        this.totalPages = 0;

        // Hide buttons
        this.scroller.classList.remove('-has-previous', '-has-next');

        // Remove transform
        this.thumbnails.removeAttribute('style');
    }

    // Destroy module
    // =========================================================================
    destroy() {}
}
