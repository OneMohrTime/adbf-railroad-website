
// *****************************************************************************
// =============================================================================
// Modules: Play Video
// =============================================================================
// Controls playing of videos from our play video button(s)
// *****************************************************************************

// Import dependencies
// =============================================================================
import { default as MightyModule } from '../core/MightyModular/module';
import { html } from '../utils/environment';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends MightyModule {
    // Set initial values
    // =========================================================================
    constructor(m) {
        super(m);

        // Set defaults
        this.validVideo  = false;
        this.embedCode   = null;
        this.embedTarget = null;
    }

    // Init module
    // =========================================================================
    init() {

        // If we have a link
        if (this.el.href !== null) {

            // Set embed target
            this.embedTarget = html.querySelector('[data-module-video-embed]');

            // Validate video
            this.validateVideo();

            // Attach click event
            this.el.addEventListener('click', (e) => { this.playVideo(e) });
        }
    }

    // Play video
    // =========================================================================
    playVideo(e) {
        // Stop default click through
        e.preventDefault();

        // Start process only if video is NOT currently playing AND it's a valid video
        if (this.validVideo !== null && this.embedCode !== null && this.embedTarget !== null && !html.classList.contains('-has-video-playing')) {

            // Render embed code
            this.embedTarget.innerHTML = this.embedCode;

            // Attach html class
            html.classList.add('-has-video-playing');
        }
    }

    // Play video
    // =========================================================================
    validateVideo() {

          this.el.href.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

          if (RegExp.$3.indexOf('youtu') > -1) {

              // Set video valid
              this.validVideo = true;

              // Set embed code
              this.embedCode = '<iframe width="420" height="345" src="//www.youtube.com/embed/'+RegExp.$6+'" frameborder="0" allowfullscreen></iframe>';
          } else if (RegExp.$3.indexOf('vimeo') > -1) {

              // Set video valid
              this.validVideo = true;

              // Set embed code
              this.embedCode = '<iframe width="420" height="345" src="//player.vimeo.com/video/'+RegExp.$6+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
          }
    }

    // Destroy module
    // =========================================================================
    destroy() {}
}
