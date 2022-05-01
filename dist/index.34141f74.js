// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"cBtlC":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "a2a8bd3034141f74";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ('reload' in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === 'undefined' ? typeof browser === 'undefined' ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1WKjS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
// import Component from "./Component";
var _index = require("../index");
var _indexDefault = parcelHelpers.interopDefault(_index);
// class Subcomponent extends Component {
//   count = 0;
//   mount({ val }) {
//     val.textContent = this.count;
//   }
//   substractClick(e, { val }) {
//     val.textContent = --this.count;
//   }
//   addClick(e, { val }) {
//     val.textContent = ++this.count;
//   }
// }
// class Subcomponent extends Component {
//   count = 0;
//   mount({ val }) {
//     this.on("change", (newCount) => {
//       this.count = newCount;
//       val.textContent = this.count;
//     });
//     this.emit("change", this.count);
//   }
//   substractClick() {
//     this.emit("change", --this.count);
//   }
//   addClick() {
//     this.emit("change", ++this.count);
//   }
// }
class Subcomponent extends _indexDefault.default {
    count = 0;
    mount({ val  }) {
        // this.on("change", (newCount) => {
        //   this.count = newCount;
        //   val.textContent = this.count;
        // });
        this.emit("change", this.count);
    }
    substractClick() {
        this.emit("change", --this.count);
    }
    addClick() {
        this.emit("change", ++this.count);
    }
    change(newCount, { val  }) {
        this.count = newCount;
        val.textContent = this.count;
    }
}
class FromClass extends _indexDefault.default {
    mount({ root , intVal , input , output , subcomponent , subcomponentValue  }) {
        root.classList.add("active");
        let count = 0;
        this.intId = setInterval(()=>intVal.textContent = ++count
        , 1000);
        output.textContent = input.value;
        if (subcomponent) {
            const sub = _indexDefault.default.get(subcomponent[0]);
            sub.on("change", (newValue)=>{
                subcomponentValue.textContent = newValue;
            });
        }
    }
    unmount({ root  }) {
        root.classList.remove("active");
        this.intId && clearInterval(this.intId);
    }
    addClick() {
        console.log("clicked add");
    }
    click() {
        console.log("clicked");
    }
    btnClick() {
        console.log("button click");
    }
    anchorClick(e) {
        e.preventDefault();
        console.log("anchor click");
    }
    inputInput(e, { output  }) {
        output.textContent = e.target.value;
    }
}
const FromObject = {
    mount ({ root , intVal , input , output  }) {
        root.classList.add("active");
        let count = 0;
        this.intId = setInterval(()=>intVal.textContent = ++count
        , 1000);
        output.textContent = input.value;
    },
    unmount ({ root  }) {
        root.classList.remove("active");
        this.intId && clearInterval(this.intId);
    },
    click () {
        console.log("clicked");
    },
    btnClick () {
        console.log("button click");
    },
    anchorClick (e) {
        e.preventDefault();
        console.log("anchor click");
    },
    inputInput (e, { output  }) {
        output.textContent = e.target.value;
    }
};
const FromFunction = function({ root , intVal , input , output  }) {
    root.classList.add("active");
    let count = 0;
    const intId = setInterval(()=>intVal.textContent = ++count
    , 1000);
    output.textContent = input.value;
    this.click = ()=>{
        console.log("clicked");
    };
    this.btnClick = ()=>console.log("button click")
    ;
    this.anchorClick = (e)=>{
        e.preventDefault();
        console.log("anchor click");
    };
    this.inputInput = function(e) {
        output.textContent = e.target.value;
    };
    return ()=>{
        root.classList.remove("active");
        intId && clearInterval(intId);
    };
};
const FromArrowFunction = ({ root , intVal , btn , input , output , anchor  })=>{
    root.classList.add("active");
    let count = 0;
    const intId = setInterval(()=>intVal.textContent = ++count
    , 1000);
    output.textContent = input.value;
    const click = ()=>{
        console.log("clicked");
    };
    const btnClick = (e)=>{
        console.log("button click");
    };
    const anchorClick = (e)=>{
        e.preventDefault();
        console.log("anchor click");
    };
    const inputInput = function(e) {
        output.textContent = e.target.value;
    };
    root.addEventListener("click", click);
    btn.addEventListener("click", btnClick);
    anchor.addEventListener("click", anchorClick);
    input.addEventListener("input", inputInput);
    // this.btnClick =
    return ()=>{
        root.classList.remove("active");
        intId && clearInterval(intId);
        root.removeEventListener("click", click);
        btn.removeEventListener("click", btnClick);
        anchor.addEventListener("click", anchorClick);
        input.removeEventListener("input", inputInput);
    };
};
_indexDefault.default.register({
    //
    FromClass,
    FromObject,
    FromFunction,
    FromArrowFunction,
    //
    Subcomponent
});
_indexDefault.default.mount();
const firstComponent = document.getElementById("component");
const mountBtn = document.getElementById("mount");
const unmountBtn = document.getElementById("unmount");
const mountOneBtn = document.getElementById("mountOne");
const unmountOneBtn = document.getElementById("unmountOne");
mountBtn.addEventListener("click", ()=>{
    _indexDefault.default.mount();
    const firstComp = _indexDefault.default.get(firstComponent);
    console.log(_indexDefault.default.get(firstComponent));
    firstComp.on("btn.click", ()=>console.log("First component")
    );
});
unmountBtn.addEventListener("click", ()=>{
    _indexDefault.default.unmount();
});
mountOneBtn.addEventListener("click", ()=>{
    _indexDefault.default.mount(firstComponent);
});
unmountOneBtn.addEventListener("click", ()=>{
    _indexDefault.default.unmount(firstComponent);
});

},{"../index":"bB7Pu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bB7Pu":[function(require,module,exports) {
(function(root1, document, Object) {
    /**
   * Converts any String to camelCase format
   * @param {string} str - String to be converted
   * @returns {string} String in camelCase format
   */ const camalize = (str)=>str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr)=>chr.toUpperCase()
        )
    ;
    /**
   * Shorthand for checking is a value is defined and of type function
   * @param {any} val Any value to be checked
   * @returns {boolean} True if the value is a function
   */ const isFunction = (val)=>typeof val == "function"
    ;
    /**
   * Find all children elements that are candidates to become a component, including root itself.
   * @param {HTMLElement|string} root An html element (or a css selector to found it) to search for candidates
   * @param {string} selector A css selector to find component candidates
   * @returns {HTMLElement[]} An array containing all found elements that are candidates
   */ const selectComponents = (root, selector = "[data-component]")=>// If root is string, select the root element
        (root = typeof root === "string" ? document.querySelector(root) : root) ? [
            // return all elements that matches selector
            ...root.querySelectorAll(selector),
            // if root matches selector, include it
            ...root.matches(selector) ? [
                root
            ] : [], 
        ] : []
    ;
    /** @type string[] */ const DOM_EVENTS = [];
    for(let attr in document)attr.startsWith("on") && DOM_EVENTS.push(attr.replace("on", ""));
    /** @type { [key: string]: typeof Component | {} | Function } */ let creators = {};
    /** @type {Map<HTMLElement,Component>} */ const instances = new Map();
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
   */ const proxyHandler = {
        get (target, property) {
            // If property exists on array or array is empty, return default value
            if (property in target || !target[0]) return isFunction(target[property]) ? target[property].bind(target) : target[property];
            // If property is not in array itself, but the array is not empty, use children
            return isFunction(target[0][property]) ? (...args)=>target.map((el)=>el[property](...args)
                )
             : target[0][property];
        },
        set (target, property, value) {
            // If property exists on original array, set value to parent, else, set value on heach child
            if (property in target) target[property] = value;
            else target.map((el)=>el[property] = value
            );
            // The value is always set, therefore it always returns true
            return true;
        }
    };
    /**
   * Inits a lazy component when reaches viewport
   */ const observer = new IntersectionObserver((entriries)=>entriries.map((e)=>// if intersecting, unobserve current target to prevent future observations and emit "init" on it
            e.isIntersecting && unobserveAndEmit(e.target, "init")
        )
    , {
        threshold: 0.5
    });
    /**
   * Helper method to unobserve element and raise event on it.
   * @param {HTMLElement} el element to be unobserved and raised event
   * @param {string} event Event name to be emitted
   * @returns {void}
   */ const unobserveAndEmit = (el, event)=>{
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
     */ static register(components) {
            creators = {
                ...creators,
                ...components
            };
        }
        /**
     * Mount all components that are children of the element passed as a root (including root itself)
     * @param {HTMLElement|string} [root] The element containing the components
     */ static mount(root = document.body) {
            // Grab all elements marked as component
            const elements = selectComponents(root);
            // Create a Component instance for eash element
            elements.map((element)=>{
                // Grab component key and lazy flag from the element
                const { component , lazy  } = element.dataset;
                // Pick associated creator with the specified key in the element
                const creator = creators[component];
                // If the component already has an instance, do nothing
                if (instances.has(element)) return;
                // Create a new instance for the component
                const instance = Component.isPrototypeOf(creator) ? new creator(element) : Object.assign(// Create simple Component instance
                new Component(element), // Check if creator is a function
                isFunction(creator) ? {
                    mount: (...args)=>instance.unmount = creator.call(instance, ...args)
                } : creator);
                // Add instace to instances map
                instances.set(element, instance);
                // if is a lazy component, add to the observer, if not, emit "init" immediately.
                typeof lazy !== "undefined" ? observer.observe(element) : setTimeout(()=>instance.emit("init")
                );
            });
        }
        /**
     * Unmount all components that are children of the element passed as a root (including root itself)
     * @param {HTMLElement|string} [root] The element containing the components
     */ static unmount(root = document.body) {
            // Grab all elements marked as component
            const elements = selectComponents(root);
            // Destroy instances associated to each element
            elements.map((element)=>{
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
     */ constructor(root){
            /**
       * @public
       * @type {HTMLElement[]}
       */ this.refs = {
                root
            };
            /** @private */ this._ = {};
            /**
       * @private
       * @type {()=>{}[]}
       */ let unbinds = [];
            // Add init listener (lazy components call init later)
            this.on("init", ()=>{
                // Grab all references inside the component
                root.querySelectorAll("[data-ref]").forEach((element)=>{
                    // Ensure that key is a valid property/method name
                    const ref = camalize(element.dataset.ref);
                    // Add each element to the corresponding wrapper in associated key
                    (this.refs[ref] = this.refs[ref] || new Proxy([], proxyHandler)).push(element);
                });
                // Emit mount event to allow subscribers to do they work
                this.emit("mount");
                // For each reference, check if there is any function that serves as a listener
                Object.entries(this.refs).map(([ref, elements])=>{
                    DOM_EVENTS.forEach((event)=>{
                        // If the reference is not to the root element, prefix listener with reference key
                        const listener = elements == root ? event : ref + "." + event;
                        // Check if a function with that name exists
                        if (isFunction(this[camalize(listener)])) {
                            // Create a proxy listener that emits a custom event
                            const handler = (e)=>this.emit(listener, e)
                            ;
                            // Bind proxy listener to all elements in reference
                            elements.addEventListener(event, handler);
                            // Save unbind function for later
                            unbinds.push(()=>elements.removeEventListener(event, handler)
                            );
                        }
                    });
                });
                // Listen to a destroy event
                this.on("destroy", ()=>{
                    // Emit unmount event to allow subscribers to do they work
                    this.emit("unmount");
                    // Unbind all binded events and clear unbinds variable
                    unbinds.forEach((unbind)=>unbind()
                    );
                    unbinds = null;
                    // clear all events and references
                    this._ = this.refs = {};
                });
            });
        }
        /**
     * @param {string} event The name of the event to be emitted
     * @param {any[]} args Extra arguments to be passed to the listeners
     */ emit(event, ...args) {
            // Add references as an extra last param
            args.push(this.refs);
            // Check if the event exists and execute all handlers
            (this._[event] || []).forEach((i)=>i(...args)
            );
            // Check if exists a function that serves as a listener and call it
            const listener = this[camalize(event)];
            isFunction(listener) && listener.apply(this, args);
        }
        /**
     * Subscribes a handler for an event
     * @param {string} event The name of the event to be listened
     * @param {function(any): boolean|void} cb The handler to be added
     */ on(event, cb) {
            // Register the event if not registered and add handler to it
            (this._[event] = this._[event] || []).push(cb);
        }
        /**
     * Unsubscribes a handler for an event
     * @param {string} event The name of the event to be unlistened
     * @param {function(any): boolean|void} cb The handler to be removed
     */ off(event, cb) {
            // Remove handler from a subscribed event
            this._[event] = (this._[event] || []).filter((i)=>i !== cb
            );
        }
    }
    // Component.constructors = constructors;
    // Component.instances = instances;
    // Add an static method "get" which allows to retrieve an instance from an element
    Component.get = (el)=>instances.get(el)
    ;
    // UMD
    if (typeof define === "function" && define.amd) // AMD. Register as an anonymous module.
    define([
        "b"
    ], factory);
    else if (module.exports) // Node.
    module.exports = Component;
    else // Browser globals (root is window)
    root1.Component = Component;
})(typeof self !== "undefined" ? self : this, document, Object);

},{}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["cBtlC","1WKjS"], "1WKjS", "parcelRequirec010")

//# sourceMappingURL=index.34141f74.js.map
