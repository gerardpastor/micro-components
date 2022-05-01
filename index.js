(function (root, document, Object) {
  /**
   * Converts any String to camelCase format
   * @param {string} str - String to be converted
   * @returns {string} String in camelCase format
   */
  const camalize = (str) => str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

  /**
   * Shorthand for checking is a value is defined and of type function
   * @param {any} val Any value to be checked
   * @returns {boolean} True if the value is a function
   */
  const isFunction = (val) => typeof val == "function";

  /**
   * Find all children elements that are candidates to become a component, including root itself.
   * @param {HTMLElement|string} root An html element (or a css selector to found it) to search for candidates
   * @param {string} selector A css selector to find component candidates
   * @returns {HTMLElement[]} An array containing all found elements that are candidates
   */
  const selectComponents = (root, selector = "[data-component]") =>
    // If root is string, select the root element
    (root = typeof root === "string" ? document.querySelector(root) : root)
      ? // if root
        [
          // return all elements that matches selector
          ...root.querySelectorAll(selector),
          // if root matches selector, include it
          ...(root.matches && root.matches(selector) ? [root] : []),
        ]
      : // if root is undefined, return an empty array
        [];

  /** @type string[] */
  const DOM_EVENTS = [];
  for (let attr in document) attr.startsWith("on") && DOM_EVENTS.push(attr.replace("on", ""));

  /** @type { [key: string]: typeof Component | {} | Function } */
  let creators = {};

  /** @type {Map<HTMLElement,Component>} */
  const instances = new Map();

  /**
   * Proxy handler that allows create an array of html elements and traverse those elements throw the array itself
   *
   * Example:
   *
   * cont el1 = document.querySelector('#el1')
   * cont el2 = document.querySelector('#el2')
   * const wrap = new Proxy([], handler)
   * wrap.push(el1);
   * wrap.push(el2);
   *
   * wrap.textContent = "foo";
   * console.log(el1.textContent) // logs "foo"
   * console.log(el2.textContent) // logs "foo"
   *
   * wrap[0].textContent = "var";
   * console.log(el1.textContent) // logs "var"
   * console.log(el2.textContent) // logs "foo"
   *
   */
  const proxyHandler = {
    get(target, property) {
      // If property exists on array or array is empty, return default value
      if (property in target || !target[0]) {
        return isFunction(target[property])
          ? // if property is a function (ex: "push"), bind to original array
            target[property].bind(target)
          : // if is a getter (ex: "length"), return original value (or undefined)
            target[property];
      }

      // If property is not in array itself, but the array is not empty, use children
      return isFunction(target[0][property])
        ? // if property is a function (ex: 'addEventListener'), call it on each child
          (...args) => target.map((el) => el[property](...args))
        : // if is a getter (ex: 'textContent'), return value from the first child
          target[0][property];
    },

    set(target, property, value) {
      // If property exists on original array, set value to parent, else, set value on heach child
      if (property in target) {
        target[property] = value;
      } else {
        target.map((el) => (el[property] = value));
      }

      // The value is always set, therefore it always returns true
      return true;
    },
  };

  /**
   * Inits a lazy component when reaches viewport
   */
  const observer = new IntersectionObserver(
    (entriries) =>
      entriries.map(
        (e) =>
          // if intersecting, unobserve current target to prevent future observations and emit "init" on it
          e.isIntersecting && unobserveAndEmit(e.target, "init")
      ),

    {
      threshold: 0.5,
    }
  );

  /**
   * Helper method to unobserve element and raise event on it.
   * @param {HTMLElement} el element to be unobserved and raised event
   * @param {string} event Event name to be emitted
   * @returns {void}
   */
  const unobserveAndEmit = (el, event) => {
    // unobserve current target to prevent future observations
    observer.unobserve(el);

    // If an instance is associated with the target element, emit event on it.
    const instance = instances.get(el);
    instance.emit(event);
  };

  class Component {
    /**
     * Register component creators.
     * Creators can be:
     * - A class extending Component
     * - A function that is called when component is mounted, and returns a function that is called when component is unmounted
     * - An object to extend a component
     *
     * @param {{ [key: string]: typeof Component | {} | Function }} components Pair of key and component creator
     */
    static register(components) {
      creators = { ...creators, ...components };
    }

    /**
     * Mount all components that are children of the element passed as a root (including root itself)
     * @param {HTMLElement|string} [root] The element containing the components
     */
    static mount(root = document.body) {
      // Grab all elements marked as component
      const elements = selectComponents(root);

      // Create a Component instance for eash element
      elements.map((element) => {
        // Grab component key and lazy flag from the element
        const { component, lazy } = element.dataset;

        // Pick associated creator with the specified key in the element
        const creator = creators[component];

        // If the component already has an instance, do nothing
        if (instances.has(element)) return;

        // Create a new instance for the component
        const instance = Component.isPrototypeOf(creator)
          ? // if creator is inherited from Component, create directly
            new creator(element)
          : // if creator is not inherited from Component, Create simple Component instance and extend
            Object.assign(
              // Create simple Component instance
              new Component(element),

              // Check if creator is a function
              isFunction(creator)
                ? // creator is a function, call it on component mount and bind the returned function to the component unmount
                  { mount: (...args) => (instance.unmount = creator.call(instance, ...args)) }
                : // creator is an object, asign members directly
                  creator
            );

        // Add instace to instances map
        instances.set(element, instance);

        // if is a lazy component, add to the observer, if not, emit "init" immediately.
        typeof lazy !== "undefined" ? observer.observe(element) : setTimeout(() => instance.emit("init"));
      });
    }

    /**
     * Unmount all components that are children of the element passed as a root (including root itself)
     * @param {HTMLElement|string} [root] The element containing the components
     */
    static unmount(root = document.body) {
      // Grab all elements marked as component
      const elements = selectComponents(root);

      // Destroy instances associated to each element
      elements.map((element) => {
        // force unobserve element, otherwise, lazy components not already mounted still in observer
        // unobserve element and destroy init
        unobserveAndEmit(element, "destroy");

        // Remove element from instance map
        instances.delete(element);
      });
    }

    //----------------------------------------------------------------
    // Instance methods
    //----------------------------------------------------------------

    /**
     * @param {HTMLElement} root The main element wrapping all component
     */
    constructor(root) {
      /**
       * @public
       * @type {HTMLElement[]}
       */
      this.refs = { root };

      /** @private */
      this._ = {};

      /**
       * @private
       * @type {()=>{}[]}
       */
      let unbinds = [];

      // Add init listener (lazy components call init later)
      this.on("init", () => {
        // Grab all references inside the component
        root.querySelectorAll("[data-ref]").forEach((element) => {
          // Ensure that key is a valid property/method name
          const ref = camalize(element.dataset.ref);

          // Add each element to the corresponding wrapper in associated key
          (this.refs[ref] = this.refs[ref] || new Proxy([], proxyHandler)).push(element);
        });

        // Emit mount event to allow subscribers to do they work
        this.emit("mount");

        // For each reference, check if there is any function that serves as a listener
        Object.entries(this.refs).map(([ref, elements]) => {
          DOM_EVENTS.forEach((event) => {
            // If the reference is not to the root element, prefix listener with reference key
            const listener = elements == root ? event : ref + "." + event;

            // Check if a function with that name exists
            if (isFunction(this[camalize(listener)])) {
              // Create a proxy listener that emits a custom event
              const handler = (e) => this.emit(listener, e);

              // Bind proxy listener to all elements in reference
              elements.addEventListener(event, handler);

              // Save unbind function for later
              unbinds.push(() => elements.removeEventListener(event, handler));
            }
          });
        });

        // Listen to a destroy event
        this.on("destroy", () => {
          // Emit unmount event to allow subscribers to do they work
          this.emit("unmount");

          // Unbind all binded events and clear unbinds variable
          unbinds.forEach((unbind) => unbind());
          unbinds = null;

          // clear all events and references
          this._ = this.refs = {};
        });
      });
    }

    /**
     * @param {string} event The name of the event to be emitted
     * @param {any[]} args Extra arguments to be passed to the listeners
     */
    emit(event, ...args) {
      // Add references as an extra last param
      args.push(this.refs);

      // Check if the event exists and execute all handlers
      (this._[event] || []).forEach((i) => i(...args));

      // Check if exists a function that serves as a listener and call it
      const listener = this[camalize(event)];
      isFunction(listener) && listener.apply(this, args);
    }

    /**
     * Subscribes a handler for an event
     * @param {string} event The name of the event to be listened
     * @param {function(any): boolean|void} cb The handler to be added
     */
    on(event, cb) {
      // Register the event if not registered and add handler to it
      (this._[event] = this._[event] || []).push(cb);
    }

    /**
     * Unsubscribes a handler for an event
     * @param {string} event The name of the event to be unlistened
     * @param {function(any): boolean|void} cb The handler to be removed
     */
    off(event, cb) {
      // Remove handler from a subscribed event
      this._[event] = (this._[event] || []).filter((i) => i !== cb);
    }

    /**
     * @callback mount
     * @param {string} data
     * @param {number} [index]
     * @returns {boolean}
     */
  }

  // Component.constructors = constructors;
  // Component.instances = instances;

  // Add an static method "get" which allows to retrieve an instance from an element
  Component.get = (el) => instances.get(el);

  // UMD
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["b"], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node.
    module.exports = Component;
  } else {
    // Browser globals (root is window)
    root.Component = Component;
  }
})(typeof self !== "undefined" ? self : this, document, Object);
