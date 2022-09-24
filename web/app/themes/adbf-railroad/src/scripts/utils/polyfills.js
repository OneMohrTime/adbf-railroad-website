
// *****************************************************************************
// =============================================================================
// Utilities: Polyfills
// =============================================================================
// Custom polyfills for support gaps left by http://polyfill.io
// *****************************************************************************

// This is a polyfill for nodeList.querySelector[All](), used in instances
// such as site seach. IE11 can't handle `nodeList.forEach()`, but ironically
// can handle `array.forEach()` – so we'll convert them
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
      }
  };
}

// This is a polyfill for the method `entries`
if (!Object.entries) {
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
  }
}
