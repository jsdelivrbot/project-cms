/* */ 
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Combine multiple reducers into a single, with optional scoping
	 *
	 * Example:

	      combineReducers(userReducer, followersReducer)

	      // Scoped to key 10
	      item10Reducer = combineReducers({
	        10: itemReducer
	      })

	      // Compose 'em up
	      basketItem10Reducer = combineReducers({
	        basket: item10Reducer
	      })

	 * Returns a reducing function.
	 */
	'use strict';

	var _Object$keys = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var combineReducers = function combineReducers() {
	  for (var _len = arguments.length, rawReducers = Array(_len), _key = 0; _key < _len; _key++) {
	    rawReducers[_key] = arguments[_key];
	  }

	  var reducers = rawReducers.reduce(function (rs, reducer) {
	    // Keep the plain 'ol functions
	    if (typeof reducer === 'function') {
	      return rs.concat(reducer);
	    }

	    // Scope the reducers by their keys, if keyed they are
	    if (typeof reducer === 'object' && !Array.isArray(reducer)) {
	      return _Object$keys(reducer).reduce(function (rs, k) {
	        // Value is a function, so we can make it into a reducer!
	        if (typeof reducer[k] === 'function') {
	          return rs.concat(createReducer([k], reducer[k]));
	        }

	        // Ignore it
	        return rs;
	      }, rs);
	    }

	    // Otherwise, ignore this one
	    return rs;
	  }, []);

	  // Return a function that iterates over the reducers and reduces from some initial state,
	  // with an action as input. Easy now.
	  return function (initialState, action) {
	    return reducers.reduce(function (state, reducer) {
	      return reducer(state, action);
	    }, initialState);
	  };
	};

	/**
	 * Create a reducer scoped to the specified keys.
	 *
	 * Example:

	      createReducer(['user', 'followers'], (state, action) => {
	        if (action.type === 'FOLLOW') {
	          return state + 1;
	        }
	        return state;
	      })

	 * Returns a reducing function.
	 */
	var createReducer = function createReducer(path, reducer) {
	  return function (initialState, action) {
	    var globalState = arguments.length <= 2 || arguments[2] === undefined ? initialState : arguments[2];
	    return (function () {
	      return initialState.updateIn(path, function (v) {
	        return reducer(v, action, globalState);
	      });
	    })();
	  };
	};

	exports['default'] = {
	  combineReducers: combineReducers,
	  createReducer: createReducer
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	module.exports = __webpack_require__(1).Object.keys;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(1)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(4)
	    , fn   = (__webpack_require__(1).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(6)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(5);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(9);

	__webpack_require__(8)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ }
/******/ ]);