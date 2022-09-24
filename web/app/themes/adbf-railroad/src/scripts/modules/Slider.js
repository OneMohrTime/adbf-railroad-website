
// *****************************************************************************
// =============================================================================
// Modules: Slider
// =============================================================================
// Controls the slider component
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModule } from '../core/MightyModular/module';
import { isNumeric } from '../utils/is';
import { transform } from '../utils/transform';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends MightyModule {
    // Set initial values
    // =========================================================================
    constructor(m) {
        super(m);

        // Set defaults
        this.animating      = false;
        this.clickEvents    = null;
        this.slidesOrig     = null;
        this.slidesAll      = null;
        this.slideIndex     = 0;
        this.slideOffset    = 0;
        this.sliderTrack    = null;
        this.sliderTotal    = null;
        this.sliderControls = null;
        this.sliderDots     = null;
        this.sliderCounter  = null;
        this.windowWidth    = 0;
        this.windowDelay    = null;
        this.adaptiveHeight = null;
        this.currentLeft    = null;
    }

    // Init module
    // =========================================================================
    init() {
        // Run build out
        this.buildOut();

        // Initialize events
        this.initializeEvents();

        // Update dots
        this.updateDots();

        // Update counter
        this.updateCounter();
    }

    // Animate height
    // =========================================================================
    animateHeight() {

        // If slideshow is adaptiveHeight, resize
        if (this.adaptiveHeight) {
            this.sliderTrack.style.height = this.slidesOrig[this.slideIndex].offsetHeight+'px';
        }
    }

    // Animate slide
    // =========================================================================
    animateSlide(targetLeft, callback) {

        var animProps = {},
            _ = this;

        this.applyTransition();

        this.animateHeight();

        targetLeft = Math.ceil(targetLeft);

        // Position track
        this.sliderTrack.style.transform = 'translate3d(' + targetLeft + 'px, 0px, 0px)';

        if (callback) {

            this.sliderTrack.addEventListener('transitionend', () => {
                this.disableTransition();

                this.sliderTrack.removeEventListener('transitionend', this.animateSlide);

                callback.call();
            });
        }
    }

    // Apply transition
    // =========================================================================
    applyTransition() {
        this.sliderTrack.classList.add('-is-animating');
    }

    // Build out
    // =========================================================================
    buildOut() {
        // Query for adaptiveHeight
        this.adaptiveHeight = this.el.getAttribute('data-module-slider-adaptive-height');

        // Query slides
        this.slidesOrig = this.el.querySelectorAll('[data-module-slider-slide]:not(.-is-clone)');

        // Set total slides
        this.sliderTotal = this.slidesOrig.length;

        // Loop slide and attach index value
        this.slidesOrig.forEach(function (slide, index) {
            slide.setAttribute('data-module-slider-slide-index', index);
        });

        // Query for controls
        this.sliderControls = this.el.querySelector('[data-module-slider-controls]');

        // Set track
        this.sliderTrack = this.el.querySelector('[data-module-slider-track]');

        // Query click events
        this.clickEvents = this.el.querySelectorAll('[data-module-slider-click]');

        // Query dots
        this.sliderDots = this.el.querySelectorAll('[data-module-slider-dot]');

        // Query counter
        this.sliderCounter = this.el.querySelector('[data-module-slider-counter]');

        // Setup infinite
        this.setupInfinite();

        // Query for 'all' slides, original(s) + clone(s)
        this.slidesAll = this.el.querySelectorAll('[data-module-slider-slide]');

        // Update dots
        this.updateDots();

        // Update counter
        this.updateCounter();

        // Set slide classes
        this.setSlideClasses(typeof this.slideIndex === 'number' ? this.slideIndex : 0);
    }

    // Change slide
    // =========================================================================
    changeSlide(e, dontAnimate) {
        // Set dontAnimate
        dontAnimate = dontAnimate | false;

        // Set initial values
        var unevenOffset = (this.sliderTotal % 1 !== 0),
            indexOffset = unevenOffset ? 0 : (this.sliderTotal - this.slideIndex) % 1,
            slideOffset,
            process = e.target.getAttribute('data-module-slider-click');

        // Process numeric, setting an index
        if (isNumeric(process)) {

            // Set index
            this.slideHandler(this.checkNavigable(process), dontAnimate);

        // Process is not numeric, setting a direction
        } else {

            // Set slide previous
            if (process === '<') {
                // Set slideOffset
                slideOffset = indexOffset === 0 ? 1 : 1 - indexOffset;

                // Continue running if we have more than one slide
                if (this.sliderTotal > 1) {

                    // Call slideHandler
                    this.slideHandler(this.slideIndex - slideOffset, dontAnimate);
                }


            // Set slide next
            } else if (process === '>') {
                // Set slideOffset
                slideOffset = indexOffset === 0 ? 1 : indexOffset;

                // Continue running if we have more than one slide
                if (this.sliderTotal > 1) {
                    this.slideHandler(this.slideIndex + slideOffset, dontAnimate);
                }

            // Process 404, return false
            } else {
                return false;
            }
        }
    }

    // Slide handler
    // =========================================================================
    checkNavigable(index) {

        // Set initials
        var  navigables = this.getNavigableIndexes(),
             prevNavigable = 0;

        // If index is greater than number of available slides
        if (index > navigables[navigables.length - 1]) {

            // Set index to max
            index = navigables[navigables.length - 1];
        } else {

            // Loop through avaiable indexes and check current index
            for (var n in navigables) {

                // If index is less than our current item
                if (index < navigables[n]) {

                    // Index is one less than current
                    index = prevNavigable;
                    break;
                }

                // Set previous to current
                prevNavigable = navigables[n];
            }
        }

        // Return index
        return index;
    }

    // Get navigable indexes
    // =========================================================================
    getNavigableIndexes() {

        // Set initials
        var indexes = [],
            breakPoint = 1 * -1,
            counter = 1 * -1,
            max = this.sliderTotal * 2;

        // Loop and set indexes, breakpoints, and counter
        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + 1;
            counter += 1;
        }

        // Return indexes
        return indexes;
    }

    // Disable transition
    // =========================================================================
    disableTransition() {
        this.sliderTrack.classList.remove('-is-animating');
    }

    // Get left
    // =========================================================================
    getLeft(slideIndex) {

        var _ = this, targetLeft, targetSlide;

        this.slideOffset = 0;

        if (this.sliderTotal > 1) {
            this.slideOffset = (null * 1) * -1;
        }

        if (this.sliderTotal <= 1) {
            this.slideOffset = 0;
        }

        this.slideOffset += Math.floor(1 / 2);

        if (this.sliderTotal <= 1) {
            targetSlide = this.slidesAll[slideIndex];
        } else {
            targetSlide = this.slidesAll[slideIndex + 2];
        }

        targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;

        targetLeft += (this.el.offsetWidth - targetSlide.offsetWidth) / 2;

        return targetLeft;
    }

    // Initialize events
    // =========================================================================
    initializeEvents() {

        // Loop click events, add listeners
        for (const event of this.clickEvents) {
            event.addEventListener('click', (e) => { this.changeSlide(e) });
        }

        // Establish resize listener
        window.addEventListener('resize', this.checkResize.bind(this), false);

        // Establish load listener
        window.addEventListener('load', this.setPosition.bind(this), false);
    }

    // Post slide
    // =========================================================================
    postSlide() {

        this.animating = false;

        if (this.sliderTotal > 1) {
            this.setPosition();
        }
    }

    // Slide handler
    // =========================================================================
    slideHandler(index, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null;

        // If we're already animating, disable
        if (this.animating) {
            return;
        }

        targetSlide = index;
        targetLeft = this.getLeft(targetSlide);
        slideLeft = this.getLeft(this.slideIndex);

        this.currentLeft = slideLeft;

        if (targetSlide < 0) {
            if (this.sliderTotal % 1 !== 0) {
                animSlide = this.sliderTotal - (this.sliderTotal % 1);
            } else {
                animSlide = this.sliderTotal + targetSlide;
            }
        } else if (targetSlide >= this.sliderTotal) {
            if (this.sliderTotal % 1 !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - this.sliderTotal;
            }
        } else {
            animSlide = targetSlide;
        }

        this.animating = true;

        oldSlide = this.slideIndex;
        this.slideIndex = animSlide;

        this.setSlideClasses(this.slideIndex);

        // Update dots
        this.updateDots();

        // Update counter
        this.updateCounter();

        if (dontAnimate !== true && this.sliderTotal > 1) {
            this.animateSlide(targetLeft, () => {
                this.postSlide(animSlide);
            });
        } else {
            this.postSlide(animSlide);
        }

    }

    // Update dots
    // =========================================================================
    updateDots() {

        // Only run if we have controls
        if (this.sliderControls) {
          
            // Loop dots, remove selected class
            for (const dot of this.sliderDots) {
                dot.classList.remove('-is-selected');
            }

            // Set current dot
            this.sliderDots[this.slideIndex].classList.add('-is-selected');
        }
    }

    // Update counter
    // =========================================================================
    updateCounter() {

      // Only run if we have controls
      if (this.sliderControls) {

          // Set current dot
          this.sliderCounter.textContent = (this.slideIndex+1)+'/'+this.sliderTotal;
      }
    }

    // Set position
    // =========================================================================
    setPosition() {
        // Save new width
        this.windowWidth = window.innerWidth;

        // If slideshow is adaptiveHeight, resize
        if (this.adaptiveHeight) {
            this.sliderTrack.style.height = this.slidesOrig[this.slideIndex].offsetHeight+'px';
        }

        // Position track
        this.sliderTrack.style.transform = 'translate3d(' + Math.ceil(this.getLeft(this.slideIndex)) + 'px, 0px, 0px)';
    }

    // Set slide classes
    // =========================================================================
    setSlideClasses(index) {

        // Set variables
        var i;

        // Clear all slides of classes
        for (i = 0; i < this.slidesAll.length; i++) {
            this.slidesAll[i].classList.remove('-is-selected');
        }

        // Set current slide
        this.slidesOrig[index].classList.add('-is-selected');
    }

    // Setup infinite
    // =========================================================================
    setupInfinite() {

        var i, slideIndex = null, infiniteCount;

        // Only move forward with slides
        if (this.sliderTotal > 1) {
            // Set infinite count for infinite carousel view
            infiniteCount = 1 + 1;

            // Clone our initial set of slides, and place before
            for (i = this.sliderTotal; i > (this.sliderTotal - infiniteCount); i -= 1) {

                // Set slide index
                slideIndex = i - 1;

                // Clone our parent version of this slide
                var clone = this.slidesOrig[slideIndex].cloneNode(true);

                // Give clone it's own unique index
                clone.setAttribute('data-module-slider-slide-index', slideIndex - this.sliderTotal);

                // Add clone class to clone
                clone.classList.add('-is-clone');

                // Prepend to track, repeat
                this.sliderTrack.prepend(clone);
            }

            // Clone our initial set of slides, and place after
            for (i = 0; i < this.sliderTotal; i += 1) {

                // Set slide index
                slideIndex = i;

                // Clone our parent version of this slide
                var clone = this.slidesOrig[slideIndex].cloneNode(true);

                // Give clone it's own unique index
                clone.setAttribute('data-module-slider-slide-index', slideIndex + this.sliderTotal);

                // Add clone class to clone
                clone.classList.add('-is-clone');

                // Append to track, repeat
                this.sliderTrack.append(clone);
            }
        }
    }

    // Check resize
    // =========================================================================
    checkResize() {

        // If there's been a change in our width
        if (window.innerWidth !== this.windowWidth) {

            // Clear previous timeout
            clearTimeout(this.windowDelay);

            // Set new timeout
            this.windowDelay = window.setTimeout(() => {
                // Save new width
                this.windowWidth = window.innerWidth;

                // Set position
                this.setPosition();
            }, 50);
        }
    }

    // Reset animation
    // =========================================================================
    resetAnimation() {
        // Remove css transition
        this.sliderTrack.classList.remove('-is-animating');

        // Stop animating
        this.animating = false;
    }

    // Destroy module
    // =========================================================================
    destroy() {}
}
