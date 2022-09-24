
// *****************************************************************************
// =============================================================================
// Mighty Module
// =============================================================================
// This is the base module with built in classes to extend custom modules off of.
// This is the heartbeat of the modular platform and provides our custom modules
// with a lot of functionality right out of the box
// *****************************************************************************

// Set default function
// =============================================================================
export default class {
    // Set initial values
    // =========================================================================
    // @param {Array} options - override default options
    constructor(options) {
        // Set defaults
        this.mAttr = 'data-' + options.dataName;
        this.mCaptureEvents = ['mouseenter', 'mouseleave'];
        this.el = options.el;
    }

    // Modules init
    // =========================================================================
    // @param {Array} modules - set of modules
    mInit(modules) {
        // Set modules
        this.modules = modules;

        // Bind module check event target
        this.mCheckEventTarget = this.mCheckEventTarget.bind(this);

        // If there are events attached
        if (this.events) {
            // Add each event via module add event
            Object.keys(this.events).forEach((event) => this.mAddEvent(event));
        }
    }

    // Modules update
    // =========================================================================
    // @param {Array} modules - set of modules
    mUpdate(modules) {
        // Set modules
        this.modules = modules;
    }

    // Modules destroy
    // =========================================================================
    mDestroy() {
        // If there are events attached
        if (this.events) {
            // Remove each event one by one
            Object.keys(this.events).forEach((event) => this.mRemoveEvent(event));
        }
    }

    // Modules add event
    // =========================================================================
    // @param {Mixed} event - event to add
    mAddEvent(event) {
        // Ensure we've got an event to capture
        const capture = this.mCaptureEvents.includes(event) ? true : false;

        // Add event to listener
        this.el.addEventListener(event, this.mCheckEventTarget, capture);
    }

    // Modules remove event
    // =========================================================================
    // @param {Mixed} event - event to remove
    mRemoveEvent(event) {
        // Ensure we've got an event to capture
        const capture = this.mCaptureEvents.includes(event) ? true : false;

        // Remove event from listener
        this.el.removeEventListener(event, this.mCheckEventTarget, capture);
    }

    // Modules check event target
    // =========================================================================
    // @param {Mixed} e - event to check for target
    mCheckEventTarget(e) {
        // Set event type
        const event = this.events[e.type];

        // If event is a string
        if (typeof event === "string") {
            this[event](e);

        // If event is anything other than a string
        } else {
            // Set data
            const data = '['+this.mAttr+']';

            // Set target
            let target = e.target;

            // If capture events has this event target type
            if (this.mCaptureEvents.includes(e.type)) {
                // If target matches data
                if(target.matches(data)) {
                    // Call this event method
                    this.mCallEventMethod(e, event, target);
                }

            // If capture events does not have this event target type
            } else {
                // Loop events while they exists and are not the document
                while (target && target !== document) {
                    // If target matches data
                    if (target.matches(data)) {
                        // If call event methood is not undefined
                        if(this.mCallEventMethod(e, event, target) != 'undefined') {
                            // Kill function
                            break;
                        }
                    }

                    // Set target as parent
                    target = target.parentNode;
                }
            }
        }
    }

    // Modules call event method
    // =========================================================================
    // @param {Mixed}  e      - event to call
    // @param {Mixed}  event  - event to call
    // @param {Object} target - target element
    mCallEventMethod(e, event, target) {
        // Get name from target's attribute
        const name = target.getAttribute(this.mAttr);

        // If event has name property, keep going
        if (event.hasOwnProperty(name)) {
            // Set method
            const method = event[name];

            // Define property target
            Object.defineProperty(e, 'currentTarget', {value: target});
            Object.defineProperty(e, 'curTarget', {value: target}); // For IE 11

            // Call method
            this[method](e);
        }
    }

    // Scoped query selector
    // =========================================================================
    // @param {Mixed} query   - value to query for
    // @param {Mixed} context - context of the query
    // @param {Array}         - elements based on query results
    $(query, context) {
        // Set indexes for all types
        const classIndex = query.indexOf('.');
        const idIndex = query.indexOf('#');
        const attrIndex = query.indexOf('[');

        // Query all index types from above
        const indexes = [classIndex, idIndex, attrIndex].filter(index => index != -1);

        // Set defaults
        let index = false;
        let name = query;
        let more = '';
        let parent = this.el;

        // If we have indexes
        if (indexes.length) {
            index = Math.min(...indexes);
            name = query.slice(0, index);
            more = query.slice(index);
        }

        // If context is an object
        if (typeof context == 'object') {
            // Set parent as context
            parent = context;
        }

        // Return elements
        return parent.querySelectorAll('[' + this.mAttr + '=' + name + ']' + more);
    }

    // Scoped parent selector
    // =========================================================================
    // @param  {Mixed} query   - value to query for
    // @param  {Mixed} context - context of the query
    // @return {Object}        - parent element
    parent(query, context) {
        // Set data
        const data = '[' + this.mAttr + '=' + query + ']';

        // Set parent as context
        let parent = context;

        // Loop while we have a parent and it's not the document
        while (parent && parent !== document) {
            // If parent matches our data
            if (parent.matches(data)) {
                // Return parent
                return parent;
            }

            // Set parent as parent
            parent = parent.parentNode;
        }
    }

    // Scoped data attribute selector
    // =========================================================================
    // @param  {String} name    - attribute name
    // @param  {Mixed}  context - context of the query
    // @return {String}         - attribute value
    data(name, context) {
        // Set target
        const target = context || this.el;

        // Return attribute value
        return target.getAttribute(this.mAttr + '-' + name);
    }

    // Call another modules function
    // =========================================================================
    // @param  {Function} func - function to call
    // @param  {Array}    args - args to pass to function
    // @return {Object}   mod  - module target
    // @return {Object}   id   - module id
    call(func, args, mod, id) {
        // If 3 values come across, restructure values
        if (args && !mod) {
            // Set module target to be args value
            mod = args;

            // Set args to false
            args = false;
        }

        // If this module is found within our modules
        if (this.modules[mod]) {
            // If an id has been supplied
            if (id) {
                // If this module with exact id are within our modules
                if (this.modules[mod][id]) {
                    // Call this modules function
                    this.modules[mod][id][func](args);
                }
            // If an id has not been supplied
            } else {
                // For each matching modules, call the requested function
                Object.keys(this.modules[mod]).forEach((id) => {
                    // Call this modules function
                    this.modules[mod][id][func](args);
                });
            }
        }
    }

    // Init module
    // =========================================================================
    init() {

    }

    // Destroy module
    // =========================================================================
    destroy() {

    }
}
