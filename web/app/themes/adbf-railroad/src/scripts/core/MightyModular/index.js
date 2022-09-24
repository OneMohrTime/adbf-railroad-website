
// *****************************************************************************
// =============================================================================
// Mighty Modular
// =============================================================================
// Provides modular loading of javascript modules as they come and go from the UI
// *****************************************************************************

// Set default function
// =============================================================================
export default class {
    // Set initial values
    // =========================================================================
    // @param {Array} options - override default options
    constructor(options) {
        // Set defaults
        this.app;
        this.modules = options.modules;
        this.currentModules = {};
        this.activeModules = {};
        this.newModules = {};
        this.moduleId = 0;
    }

    // Init
    // =========================================================================
    // @param {String} app   - app to bind to
    // @param {String} scope - target to init
    init(app, scope) {
        // Set container
        const container = scope || document;

        // Query elements
        const elements = container.querySelectorAll('*');

        // If we have an app set and this.app is null
        if (app && !this.app) {
            // Set this.app with provided app data
            this.app = app;
        }

        // Add app to our active modules
        this.activeModules['app'] = { 'app': this.app };

        // Loop each element and find our javascript modules
        elements.forEach((el) => {
            // Loop each element's attributes and search for modules
            Array.from(el.attributes).forEach((i) => {
                // If attribute starts with 'data-module', run checks and init
                if (i.name.startsWith('data-module')) {
                    // Set module exists as false
                    let moduleExists = false;

                    // Remove dashes from module name
                    let dataName = i.name.split('-').splice(2);

                    // Format module name as camel case
                    let moduleName = this.toCamel(dataName);

                    // If this module exists already, set to true
                    if (this.modules[moduleName]) {
                        // Set module exists
                        moduleExists = true;
                    // Check again for module name with upper case, and set to true
                    // if it already exists
                    } else if (this.modules[this.toUpper(moduleName)]) {
                        // Set module name to upper case
                        moduleName = this.toUpper(moduleName);

                        // Set module exists
                        moduleExists = true;
                    }

                    // If our module exists
                    if (moduleExists) {
                        // Set module options
                        const options = {
                            el: el,
                            name: moduleName,
                            dataName: dataName.join('-')
                        };

                        // Create new module with our name and options
                        const module = new this.modules[moduleName](options);

                        // Set id
                        let id = i.value;

                        // If id is null
                        if (!id) {
                            // Increment ids
                            this.moduleId++;

                            // Set id
                            id = 'm' + this.moduleId;

                            // Set id attribute
                            el.setAttribute(i.name, id);
                        }

                        // Add this module to our active modules
                        this.addActiveModule(moduleName, id, module);

                        // Set module id
                        const moduleId = moduleName + '-' + id;

                        // If this process is scoped
                        if (scope) {
                            // Add our module to new modules
                            this.newModules[moduleId] = module;
                        // If this process is not scoped
                        } else {
                            // Add our module to current modules
                            this.currentModules[moduleId] = module;
                        }
                    }
                }
            })
        })

        // Loop each of our current modules
        Object.entries(this.currentModules).forEach(([id, module]) => {
            // If process is scoped
            if (scope) {
                // Split our id
                const split = id.split('-');

                // Get module name from split
                const moduleName = split.shift();

                // Get module id from split
                const moduleId = split.pop();

                // Add this module to our active modules
                this.addActiveModule(moduleName, moduleId, module);

            // If process is not scoped
            } else {
                // Init module
                this.initModule(module);
            }
        });
    }

    // Init module
    // =========================================================================
    // @param {Object} module - target module
    initModule(module) {
        // Init our module within active modules
        module.mInit(this.activeModules);

        // Init module
        module.init();
    }

    // Add active module
    // =========================================================================
    // @param {String} name   - module name
    // @param {Number} id     - module id
    // @param {Object} module - module object
    addActiveModule(name, id, module) {
        // If this module is already in our active modules
        if (this.activeModules[name]) {
            // Add this module to active modules, but ensure it is assigned a
            // unique id against those like it already in the fold
            Object.assign(this.activeModules[name], { [id]: module });
        // If this module is not already in our active modules
        } else {
            // Add this module to active modules, but ensure it is assigned a
            // unique id against those like it already in the fold
            this.activeModules[name] = { [id]: module };
        }
    }

    // Update
    // =========================================================================
    // @param {String} scope - scope target
    update(scope) {
        // Init app with scope
        this.init(this.app, scope);

        // Loop through each of our current modules
        Object.entries(this.currentModules).forEach(([id, module]) => {
            // Update module state
            module.mUpdate(this.activeModules);
        });

        // Loop through each of our new modules
        Object.entries(this.newModules).forEach(([id, module]) => {
            // Initiate module
            this.initModule(module);
        });

        // Add new modules to current modules
        Object.assign(this.currentModules, this.newModules);
    }

    // Destroy
    // =========================================================================
    // @param {String} scope - scope target
    destroy(scope) {
        // If process is scoped
        if (scope) {
            // Destroy scoped module
            this.destroyScope(scope);

        // If process is not scoped
        } else {
            // Destroy all modules
            this.destroyModules();
        }
    }

    // Destroy scope
    // =========================================================================
    // @param {String} scope - scope target
    destroyScope(scope) {
        // Query all elements within the scope
        const elements = scope.querySelectorAll('*');

        // Loop over each element found
        elements.forEach((el) => {
            // Loop over each attribute found on each element
            Array.from(el.attributes).forEach((i) => {

                // If attribute found with our required module data-attribute,
                // keep running forward with scope destroy
                if (i.name.startsWith('data-module')) {
                    // Set id
                    const id = i.value;

                    // Reformat module name
                    const dataName = i.name.split('-').splice(2);

                    // Set module name to camel case
                    let moduleName = this.toCamel(dataName) + '-' + id;

                    // Set module exists as false
                    let moduleExists = false;

                    // If module found within current modules
                    if (this.currentModules[moduleName]) {
                        // Set exists as true
                        moduleExists = true;

                    // If module found within current modules with upper case
                    } else if (this.currentModules[this.toUpper(moduleName)]) {
                        // Set module name to upper case
                        moduleName = this.toUpper(moduleName);

                        // Set exists as true
                        moduleExists = true;
                    }

                    // If module exists
                    if (moduleExists) {
                        // Destroy this module
                        this.destroyModule(this.currentModules[moduleName]);

                        // Delete this modules scope
                        delete this.currentModules[moduleName];
                    }
                }

            })
        })

        this.activeModules = {};
        this.newModules = {};
    }

    // Destroy modules
    // =========================================================================
    destroyModules() {
        // Loop over each module currently running
        Object.entries(this.currentModules).forEach(([id, module]) => {
            // Destroy this module
            this.destroyModule(module);
        });

        // Empty out our current modules array
        this.currentModules = [];
    }

    // Destroy module
    // =========================================================================
    // @param {Object} module - target module
    destroyModule(module) {
        // Destroy module within our stack
        module.mDestroy();

        // Destroy module within modular
        module.destroy();
    }

    // To camel
    // =========================================================================
    // @param  {Array} arr - values to camel case
    // @return {Array}     - array updated with camel case applied
    toCamel(arr) {
        return arr.reduce((a, b) => a + this.toUpper(b));
    }

    // To upper
    // =========================================================================
    // @param  {String} str - value to upper case
    // @return {String}     - updated value with upper case applied
    toUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
