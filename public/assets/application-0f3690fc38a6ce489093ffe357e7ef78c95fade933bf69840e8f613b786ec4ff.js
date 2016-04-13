/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
function buildPrivatePub(doc) {
  var self = {
    connecting: false,
    fayeClient: null,
    fayeCallbacks: [],
    subscriptions: {},
    subscriptionCallbacks: {},

    faye: function(callback) {
      if (self.fayeClient) {
        callback(self.fayeClient);
      } else {
        self.fayeCallbacks.push(callback);
        if (self.subscriptions.server && !self.connecting) {
          self.connecting = true;
          var script = doc.createElement("script");
          script.type = "text/javascript";
          script.src = self.subscriptions.server + ".js";
          script.onload = self.connectToFaye;
          doc.documentElement.appendChild(script);
        }
      }
    },

    connectToFaye: function() {
      self.fayeClient = new Faye.Client(self.subscriptions.server);
      self.fayeClient.addExtension(self.fayeExtension);
      for (var i=0; i < self.fayeCallbacks.length; i++) {
        self.fayeCallbacks[i](self.fayeClient);
      };
    },

    fayeExtension: {
      outgoing: function(message, callback) {
        if (message.channel == "/meta/subscribe") {
          // Attach the signature and timestamp to subscription messages
          var subscription = self.subscriptions[message.subscription];
          if (!message.ext) message.ext = {};
          message.ext.private_pub_signature = subscription.signature;
          message.ext.private_pub_timestamp = subscription.timestamp;
        }
        callback(message);
      }
    },

    sign: function(options) {
      if (!self.subscriptions.server) {
        self.subscriptions.server = options.server;
      }
      self.subscriptions[options.channel] = options;
      self.faye(function(faye) {
        faye.subscribe(options.channel, self.handleResponse);
      });
    },

    handleResponse: function(message) {
      if (message.eval) {
        eval(message.eval);
      }
      if (callback = self.subscriptionCallbacks[message.channel]) {
        callback(message.data, message.channel);
      }
    },

    subscribe: function(channel, callback) {
      self.subscriptionCallbacks[channel] = callback;
    }
  };
  return self;
}

var PrivatePub = buildPrivatePub(document);
function validateRequired() {
 
   if( document.input.name.value == "" )
   {
     document.input.name.focus() ;
	 $(document.input.name).css('border-color', 'red');
     $("span.namebox").html("<div>Please enter a username</div>");
     return false;
   } else {
    $("span.namebox").html("");
    $(document.input.name).css('border-color', '#aacfe4');
   }
   if( document.input.password.value == "" )
   {
     document.input.password.focus() ;
	 $(document.input.password).css('border-color', 'red');
	 $("span.passwordbox").html("<div>Please enter a password</div>");
     return false;
   } else {
    $("span.passwordbox").html("");
    $(document.input.password).css('border-color', '#aacfe4');
   }
   if ( document.input.password.value != document.input.cpassword.value )
   { 
	document.input.cpassword.focus();
	$(document.input.cpassword).css('border-color', 'red');
   	$("span.cpasswordbox").html("<div>Passwords don't match!</div>");  	
     return false; 
   } else {
    $("span.cpasswordbox").html("");
    $(document.input.cpassword).css('border-color', '#aacfe4');
   }
   if( document.input.email.value == "" )
   {
     document.input.email.focus() ;
	 $(document.input.email).css('border-color', 'red');
     $("span.emailbox").html("<div>Please enter your email</div>");
     return false;
	 }
	 else
	 {
     var ret = validateEmail();
     if( ret == false )
     {
     return false;
     }
	 }
   return( true );
}


function validateEmail() {
 
   var emailID = document.input.email.value;
   atpos = emailID.indexOf("@");
   dotpos = emailID.lastIndexOf(".");
   if (atpos < 1 || ( dotpos - atpos < 2 )) 
   {
       document.input.email.focus() ;
	$("span.emailbox").html("<div>Please enter a valid email</div>");
       return false;
   } else {
    $("span.emailbox").html("");
    $(document.input.email).css('border-color', '#aacfe4');
   }
   if ( document.input.email.value != document.input.cemail.value )
   { 
	document.input.cemail.focus();
	$(document.input.cemail).css('border-color', 'red');
   	$("span.cemailbox").html("<div>Email doesn't match!</div>");  	
     return false; 
   } else {
    $("span.cemailbox").html("");
    $(document.input.cemail).css('border-color', '#aacfe4');
   }
   return( true );
}

;
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
/*! jQuery-Impromptu - v5.2.4 - 2014-05-26
* http://trentrichardson.com/Impromptu
* Copyright (c) 2014 Trent Richardson; Licensed MIT */

(function(t){"use strict";t.prompt=function(e,o){void 0!==o&&void 0!==o.classes&&"string"==typeof o.classes&&(o={box:o.classes}),t.prompt.options=t.extend({},t.prompt.defaults,o),t.prompt.currentPrefix=t.prompt.options.prefix,t.prompt.timeout&&clearTimeout(t.prompt.timeout),t.prompt.timeout=!1;var p=t.prompt.options,r=t(document.body),i=t(window),n='<div class="'+t.prompt.options.prefix+"box "+p.classes.box+'">';n+=p.useiframe&&t("object, applet").length>0?'<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="'+p.prefix+"fade "+p.classes.fade+'"></iframe>':'<div class="'+p.prefix+"fade "+p.classes.fade+'"></div>',n+='<div class="'+p.prefix+" "+p.classes.prompt+'">'+'<form action="javascript:false;" onsubmit="return false;" class="'+p.prefix+"form "+p.classes.form+'">'+'<div class="'+p.prefix+"close "+p.classes.close+'">'+p.closeText+"</div>"+'<div class="'+p.prefix+'states"></div>'+"</form>"+"</div>"+"</div>",t.prompt.jqib=t(n).appendTo(r),t.prompt.jqi=t.prompt.jqib.children("."+p.prefix),t.prompt.jqif=t.prompt.jqib.children("."+p.prefix+"fade"),e.constructor===String&&(e={state0:{title:p.title,html:e,buttons:p.buttons,position:p.position,focus:p.focus,defaultButton:p.defaultButton,submit:p.submit}}),t.prompt.options.states={};var s,a;for(s in e)a=t.extend({},t.prompt.defaults.state,{name:s},e[s]),t.prompt.addState(a.name,a),""===t.prompt.currentStateName&&(t.prompt.currentStateName=a.name);t.prompt.jqi.on("click","."+p.prefix+"buttons button",function(){var e=t(this),o=e.parents("."+p.prefix+"state"),r=t.prompt.options.states[o.data("jqi-name")],i=o.children("."+p.prefix+"message"),n=r.buttons[e.text()]||r.buttons[e.html()],s={};if(void 0===n)for(var a in r.buttons)(r.buttons[a].title===e.text()||r.buttons[a].title===e.html())&&(n=r.buttons[a].value);t.each(t.prompt.jqi.children("form").serializeArray(),function(t,e){void 0===s[e.name]?s[e.name]=e.value:typeof s[e.name]===Array||"object"==typeof s[e.name]?s[e.name].push(e.value):s[e.name]=[s[e.name],e.value]});var m=new t.Event("impromptu:submit");m.stateName=r.name,m.state=o,o.trigger(m,[n,i,s]),m.isDefaultPrevented()||t.prompt.close(!0,n,i,s)});var m=function(){if(p.persistent){var e=(""+p.top).indexOf("%")>=0?i.height()*(parseInt(p.top,10)/100):parseInt(p.top,10),o=parseInt(t.prompt.jqi.css("top").replace("px",""),10)-e;t("html,body").animate({scrollTop:o},"fast",function(){var e=0;t.prompt.jqib.addClass(p.prefix+"warning");var o=setInterval(function(){t.prompt.jqib.toggleClass(p.prefix+"warning"),e++>1&&(clearInterval(o),t.prompt.jqib.removeClass(p.prefix+"warning"))},100)})}else t.prompt.close(!0)},u=function(e){var o=window.event?event.keyCode:e.keyCode;if(27===o&&m(),13===o){var r=t.prompt.getCurrentState().find("."+p.prefix+"defaultbutton"),i=t(e.target);i.is("textarea,."+p.prefix+"button")===!1&&r.length>0&&(e.preventDefault(),r.click())}if(9===o){var n=t("input,select,textarea,button",t.prompt.getCurrentState()),s=!e.shiftKey&&e.target===n[n.length-1],a=e.shiftKey&&e.target===n[0];if(s||a)return setTimeout(function(){if(n){var t=n[a===!0?n.length-1:0];t&&t.focus()}},10),!1}};return t.prompt.position(),t.prompt.style(),t.prompt.jqif.click(m),i.resize({animate:!1},t.prompt.position),t.prompt.jqi.find("."+p.prefix+"close").click(t.prompt.close),t.prompt.jqib.on("keydown",u).on("impromptu:loaded",p.loaded).on("impromptu:close",p.close).on("impromptu:statechanging",p.statechanging).on("impromptu:statechanged",p.statechanged),t.prompt.jqif[p.show](p.overlayspeed),t.prompt.jqi[p.show](p.promptspeed,function(){var e=t.prompt.jqi.find("."+p.prefix+"states ."+p.prefix+"state").eq(0);t.prompt.goToState(e.data("jqi-name")),t.prompt.jqib.trigger("impromptu:loaded")}),p.timeout>0&&(t.prompt.timeout=setTimeout(function(){t.prompt.close(!0)},p.timeout)),t.prompt.jqib},t.prompt.defaults={prefix:"jqi",classes:{box:"",fade:"",prompt:"",form:"",close:"",title:"",message:"",buttons:"",button:"",defaultButton:""},title:"",closeText:"&times;",buttons:{Ok:!0},loaded:function(){},submit:function(){},close:function(){},statechanging:function(){},statechanged:function(){},opacity:.6,zIndex:999,overlayspeed:"slow",promptspeed:"fast",show:"fadeIn",focus:0,defaultButton:0,useiframe:!1,top:"15%",position:{container:null,x:null,y:null,arrow:null,width:null},persistent:!0,timeout:0,states:{},state:{name:null,title:"",html:"",buttons:{Ok:!0},focus:0,defaultButton:0,position:{container:null,x:null,y:null,arrow:null,width:null},submit:function(){return!0}}},t.prompt.currentPrefix=t.prompt.defaults.prefix,t.prompt.currentStateName="",t.prompt.setDefaults=function(e){t.prompt.defaults=t.extend({},t.prompt.defaults,e)},t.prompt.setStateDefaults=function(e){t.prompt.defaults.state=t.extend({},t.prompt.defaults.state,e)},t.prompt.position=function(e){var o=t.fx.off,p=t.prompt.getCurrentState(),r=t.prompt.options.states[p.data("jqi-name")],i=r?r.position:void 0,n=t(window),s=document.body.scrollHeight,a=t(window).height(),m=(t(document).height(),s>a?s:a),u=parseInt(n.scrollTop(),10)+((""+t.prompt.options.top).indexOf("%")>=0?a*(parseInt(t.prompt.options.top,10)/100):parseInt(t.prompt.options.top,10));if(void 0!==e&&e.data.animate===!1&&(t.fx.off=!0),t.prompt.jqib.css({position:"absolute",height:m,width:"100%",top:0,left:0,right:0,bottom:0}),t.prompt.jqif.css({position:"fixed",height:m,width:"100%",top:0,left:0,right:0,bottom:0}),i&&i.container){var l=t(i.container).offset();t.isPlainObject(l)&&void 0!==l.top&&(t.prompt.jqi.css({position:"absolute"}),t.prompt.jqi.animate({top:l.top+i.y,left:l.left+i.x,marginLeft:0,width:void 0!==i.width?i.width:null}),u=l.top+i.y-((""+t.prompt.options.top).indexOf("%")>=0?a*(parseInt(t.prompt.options.top,10)/100):parseInt(t.prompt.options.top,10)),t("html,body").animate({scrollTop:u},"slow","swing",function(){}))}else i&&i.width?(t.prompt.jqi.css({position:"absolute",left:"50%"}),t.prompt.jqi.animate({top:i.y||u,left:i.x||"50%",marginLeft:-1*(i.width/2),width:i.width})):t.prompt.jqi.css({position:"absolute",top:u,left:"50%",marginLeft:-1*(t.prompt.jqi.outerWidth(!1)/2)});void 0!==e&&e.data.animate===!1&&(t.fx.off=o)},t.prompt.style=function(){t.prompt.jqif.css({zIndex:t.prompt.options.zIndex,display:"none",opacity:t.prompt.options.opacity}),t.prompt.jqi.css({zIndex:t.prompt.options.zIndex+1,display:"none"}),t.prompt.jqib.css({zIndex:t.prompt.options.zIndex})},t.prompt.get=function(){return t("."+t.prompt.currentPrefix)},t.prompt.addState=function(e,o,p){var r,i,n,s="",a=null,m="",u="",l=t.prompt.options,f=t("."+t.prompt.currentPrefix+"states"),c=0;o=t.extend({},t.prompt.defaults.state,{name:e},o),null!==o.position.arrow&&(m='<div class="'+l.prefix+"arrow "+l.prefix+"arrow"+o.position.arrow+'"></div>'),o.title&&""!==o.title&&(u='<div class="lead '+l.prefix+"title "+l.classes.title+'">'+o.title+"</div>"),s+='<div id="'+l.prefix+"state_"+e+'" class="'+l.prefix+'state" data-jqi-name="'+e+'" style="display:none;">'+m+u+'<div class="'+l.prefix+"message "+l.classes.message+'">'+o.html+"</div>"+'<div class="'+l.prefix+"buttons "+l.classes.buttons+'"'+(t.isEmptyObject(o.buttons)?'style="display:none;"':"")+">";for(i in o.buttons)n=o.buttons[i],r=o.focus===c||isNaN(o.focus)&&o.defaultButton===c?t.prompt.currentPrefix+"defaultbutton "+l.classes.defaultButton:"","object"==typeof n?(s+='<button class="'+l.classes.button+" "+t.prompt.currentPrefix+"button "+r,n.classes!==void 0&&(s+=" "+(t.isArray(n.classes)?n.classes.join(" "):n.classes)+" "),s+='" name="'+l.prefix+"_"+e+"_button"+n.title.replace(/[^a-z0-9]+/gi,"")+'" id="'+l.prefix+"_"+e+"_button"+n.title.replace(/[^a-z0-9]+/gi,"")+'" value="'+n.value+'">'+n.title+"</button>"):s+='<button class="'+t.prompt.currentPrefix+"button "+l.classes.button+" "+r+'" name="'+l.prefix+"_"+e+"_button"+i.replace(/[^a-z0-9]+/gi,"")+'" id="'+l.prefix+"_"+e+"_button"+i.replace(/[^a-z0-9]+/gi,"")+'" value="'+n+'">'+i+"</button>",c++;return s+="</div></div>",a=t(s),a.on("impromptu:submit",o.submit),void 0!==p?f.find("#"+t.prompt.currentPrefix+"state_"+p).after(a):f.append(a),t.prompt.options.states[e]=o,a},t.prompt.removeState=function(e,o){var p=t.prompt.getState(e),r=function(){p.remove()};return 0===p.length?!1:("none"!==p.css("display")?void 0!==o&&t.prompt.getState(o).length>0?t.prompt.goToState(o,!1,r):p.next().length>0?t.prompt.nextState(r):p.prev().length>0?t.prompt.prevState(r):t.prompt.close():p.slideUp("slow",r),!0)},t.prompt.getState=function(e){return t("#"+t.prompt.currentPrefix+"state_"+e)},t.prompt.getStateContent=function(e){return t.prompt.getState(e)},t.prompt.getCurrentState=function(){return t.prompt.getState(t.prompt.getCurrentStateName())},t.prompt.getCurrentStateName=function(){return t.prompt.currentStateName},t.prompt.goToState=function(e,o,p){var r=(t.prompt.get(),t.prompt.options),i=t.prompt.getState(e),n=r.states[i.data("jqi-name")],s=new t.Event("impromptu:statechanging");return"function"==typeof o&&(p=o,o=!1),t.prompt.jqib.trigger(s,[t.prompt.getCurrentStateName(),e]),!s.isDefaultPrevented()&&i.length>0&&(t.prompt.jqi.find("."+t.prompt.currentPrefix+"parentstate").removeClass(t.prompt.currentPrefix+"parentstate"),o?(t.prompt.jqi.find("."+t.prompt.currentPrefix+"substate").not(i).slideUp(r.promptspeed).removeClass("."+t.prompt.currentPrefix+"substate").find("."+t.prompt.currentPrefix+"arrow").hide(),t.prompt.jqi.find("."+t.prompt.currentPrefix+"state:visible").addClass(t.prompt.currentPrefix+"parentstate"),i.addClass(t.prompt.currentPrefix+"substate")):t.prompt.jqi.find("."+t.prompt.currentPrefix+"state").not(i).slideUp(r.promptspeed).find("."+t.prompt.currentPrefix+"arrow").hide(),t.prompt.currentStateName=n.name,i.slideDown(r.promptspeed,function(){var o=t(this);"string"==typeof n.focus?o.find(n.focus).eq(0).focus():o.find("."+t.prompt.currentPrefix+"defaultbutton").focus(),o.find("."+t.prompt.currentPrefix+"arrow").show(r.promptspeed),"function"==typeof p&&t.prompt.jqib.on("impromptu:statechanged",p),t.prompt.jqib.trigger("impromptu:statechanged",[e]),"function"==typeof p&&t.prompt.jqib.off("impromptu:statechanged",p)}),o||t.prompt.position()),i},t.prompt.nextState=function(e){var o=t("#"+t.prompt.currentPrefix+"state_"+t.prompt.getCurrentStateName()).next();return o.length>0&&t.prompt.goToState(o.attr("id").replace(t.prompt.currentPrefix+"state_",""),e),o},t.prompt.prevState=function(e){var o=t("#"+t.prompt.currentPrefix+"state_"+t.prompt.getCurrentStateName()).prev();return o.length>0&&t.prompt.goToState(o.attr("id").replace(t.prompt.currentPrefix+"state_",""),e),o},t.prompt.close=function(e,o,p,r){t.prompt.timeout&&(clearTimeout(t.prompt.timeout),t.prompt.timeout=!1),t.prompt.jqib&&t.prompt.jqib.fadeOut("fast",function(){t.prompt.jqib.trigger("impromptu:close",[o,p,r]),t.prompt.jqib.remove(),t(window).off("resize",t.prompt.position)}),t.prompt.currentStateName=""},t.fn.prompt=function(e){void 0===e&&(e={}),void 0===e.withDataAndEvents&&(e.withDataAndEvents=!1),t.prompt(t(this).clone(e.withDataAndEvents).html(),e)}})(jQuery);
(function() {


}).call(this);
(function() {


}).call(this);
/*
Copyright (c) 2008-2011, www.redips.net All rights reserved.
Code licensed under the BSD License: http://www.redips.net/license/
http://www.redips.net/javascript/drag-and-drop-table-content/
Version 5.0.8
Jun 28, 2013.
*/

var REDIPS=REDIPS||{};
REDIPS.drag=function(){var q,B,J,za,La,Ma,ba,ca,ha,Aa,Ba,U,ia,Ca,Q,ja,X,Da,C,u,K,ka,la,ma,Ea,na,Fa,E,x,Ga,da,ea,oa,Na,Oa,Ha,pa,qa,ra,fa,Ia,Pa,sa,Qa,o=null,F=0,G=0,ta=null,ua=null,L=[],s=null,M=0,N=0,O=0,P=0,R=0,S=0,Y,f=[],Z,va,p,H=[],n=[],y=null,D=null,V=0,W=0,Ra=0,Sa=0,ga=!1,Ja=!1,$=!1,wa=[],xa,j=null,t=null,z=null,h=null,v=null,I=null,k=null,A=null,T=null,i=!1,m=!1,r="cell",ya={div:[],cname:"only",other:"deny"},Ta={action:"deny",cname:"mark",exception:[]},l={},Ua={keyDiv:!1,keyRow:!1,sendBack:!1,
drop:!1};J=function(){return!1};q=function(a){var b,c,d,e,g;f.length=0;e=void 0===a?y.getElementsByTagName("table"):document.querySelectorAll(a);for(b=a=0;a<e.length;a++)if(!("redips_clone"===e[a].parentNode.id||-1<e[a].className.indexOf("nolayout"))){c=e[a].parentNode;d=0;do"TD"===c.nodeName&&d++,c=c.parentNode;while(c&&c!==y);f[b]=e[a];f[b].redips||(f[b].redips={});f[b].redips.container=y;f[b].redips.nestedLevel=d;f[b].redips.idx=b;wa[b]=0;d=f[b].getElementsByTagName("td");c=0;for(g=!1;c<d.length;c++)if(1<
d[c].rowSpan){g=!0;break}f[b].redips.rowspan=g;b++}a=0;for(e=Z=1;a<f.length;a++)if(0===f[a].redips.nestedLevel){f[a].redips.nestedGroup=e;f[a].redips.sort=100*Z;c=f[a].getElementsByTagName("table");for(b=0;b<c.length;b++)-1<c[b].className.indexOf("nolayout")||(c[b].redips.nestedGroup=e,c[b].redips.sort=100*Z+c[b].redips.nestedLevel);e++;Z++}};za=function(a){var b=a||window.event,c,d;if(!0===this.redips.animated)return!0;b.cancelBubble=!0;b.stopPropagation&&b.stopPropagation();Ja=b.shiftKey;a=b.which?
b.which:b.button;if(Fa(b)||!b.touches&&1!==a)return!0;if(window.getSelection)window.getSelection().removeAllRanges();else if(document.selection&&"Text"===document.selection.type)try{document.selection.empty()}catch(e){}b.touches?(a=V=b.touches[0].clientX,d=W=b.touches[0].clientY):(a=V=b.clientX,d=W=b.clientY);Ra=a;Sa=d;ga=!1;REDIPS.drag.objOld=m=i||this;REDIPS.drag.obj=i=this;$=-1<i.className.indexOf("clone")?!0:!1;REDIPS.drag.tableSort&&Ma(i);y!==i.redips.container&&(y=i.redips.container,q());-1===
i.className.indexOf("row")?REDIPS.drag.mode=r="cell":(REDIPS.drag.mode=r="row",REDIPS.drag.obj=i=fa(i));u();!$&&"cell"===r&&(i.style.zIndex=999);j=h=k=null;Q();z=t=j;I=v=h;T=A=k;REDIPS.drag.td.source=l.source=x("TD",i);REDIPS.drag.td.current=l.current=l.source;REDIPS.drag.td.previous=l.previous=l.source;"cell"===r?REDIPS.drag.event.clicked(l.current):REDIPS.drag.event.rowClicked(l.current);if(null===j||null===h||null===k)if(Q(),z=t=j,I=v=h,T=A=k,null===j||null===h||null===k)return!0;va=p=!1;REDIPS.event.add(document,
"mousemove",ca);REDIPS.event.add(document,"touchmove",ca);REDIPS.event.add(document,"mouseup",ba);REDIPS.event.add(document,"touchend",ba);i.setCapture&&i.setCapture();null!==j&&(null!==h&&null!==k)&&(Y=Da(j,h,k));c=E(f[z],"position");"fixed"!==c&&(c=E(f[z].parentNode,"position"));c=C(i,c);o=[d-c[0],c[1]-a,c[2]-d,a-c[3]];y.onselectstart=function(a){b=a||window.event;if(!Fa(b)){b.shiftKey&&document.selection.clear();return false}};return!1};La=function(){REDIPS.drag.event.dblClicked()};Ma=function(a){var b;
b=x("TABLE",a).redips.nestedGroup;for(a=0;a<f.length;a++)f[a].redips.nestedGroup===b&&(f[a].redips.sort=100*Z+f[a].redips.nestedLevel);f.sort(function(a,b){return b.redips.sort-a.redips.sort});Z++};fa=function(a,b){var c,d,e,g,f,w;if("DIV"===a.nodeName)return g=a,a=x("TR",a),void 0===a.redips&&(a.redips={}),a.redips.div=g,a;d=a;void 0===d.redips&&(d.redips={});a=x("TABLE",a);$&&p&&(g=d.redips.div,g.className=sa(g.className.replace("clone","")));c=a.cloneNode(!0);$&&p&&(g.className+=" clone");e=c.rows.length-
1;g="animated"===b?0===e?!0:!1:!0;for(f=e;0<=f;f--)if(f!==d.rowIndex){if(!0===g&&void 0===b){e=c.rows[f];for(w=0;w<e.cells.length;w++)if(-1<e.cells[w].className.indexOf("rowhandler")){g=!1;break}}c.deleteRow(f)}p||(d.redips.emptyRow=g);c.redips={};c.redips.container=a.redips.container;c.redips.sourceRow=d;Pa(d,c.rows[0]);Ea(d,c.rows[0]);document.getElementById("redips_clone").appendChild(c);d=C(d,"fixed");c.style.position="fixed";c.style.top=d[0]+"px";c.style.left=d[3]+"px";c.style.width=d[1]-d[3]+
"px";return c};Ia=function(a,b,c){var d=!1,e,g,Ka,w,h,k,aa,n;n=function(a){var b;void 0===a.redips||!a.redips.emptyRow?(b=x("TABLE",a),b.deleteRow(a.rowIndex)):ra(a,"empty",REDIPS.drag.style.rowEmptyColor)};void 0===c?c=i:d=!0;e=c.redips.sourceRow;g=e.rowIndex;Ka=x("TABLE",e);w=e.parentNode;a=f[a];b>a.rows.length-1&&(b=a.rows.length-1);h=a.rows[b];k=b;aa=h.parentNode;b=c.getElementsByTagName("tr")[0];c.parentNode.removeChild(c);!1!==REDIPS.drag.event.rowDroppedBefore(Ka,g)&&(!d&&-1<l.target.className.indexOf(REDIPS.drag.trash.className)?
p?REDIPS.drag.event.rowDeleted():REDIPS.drag.trash.questionRow?confirm(REDIPS.drag.trash.questionRow)?(n(e),REDIPS.drag.event.rowDeleted()):(delete m.redips.emptyRow,REDIPS.drag.event.rowUndeleted()):(n(e),REDIPS.drag.event.rowDeleted()):(k<a.rows.length?j===z?g>k?aa.insertBefore(b,h):aa.insertBefore(b,h.nextSibling):"after"===REDIPS.drag.rowDropMode?aa.insertBefore(b,h.nextSibling):aa.insertBefore(b,h):(aa.appendChild(b),h=a.rows[0]),h&&h.redips&&h.redips.emptyRow?a.deleteRow(h.rowIndex):"overwrite"===
REDIPS.drag.rowDropMode?n(h):"switch"===REDIPS.drag.rowDropMode&&!p&&(w.insertBefore(h,e),void 0!==e.redips&&delete e.redips.emptyRow),(d||!p)&&n(e),delete b.redips.emptyRow,d||REDIPS.drag.event.rowDropped(b,Ka,g)),0<b.getElementsByTagName("table").length&&q())};Pa=function(a,b){var c,d,e,g=[],f=[];g[0]=a.getElementsByTagName("input");g[1]=a.getElementsByTagName("textarea");g[2]=a.getElementsByTagName("select");f[0]=b.getElementsByTagName("input");f[1]=b.getElementsByTagName("textarea");f[2]=b.getElementsByTagName("select");
for(c=0;c<g.length;c++)for(d=0;d<g[c].length;d++)switch(e=g[c][d].type,e){case "text":case "textarea":case "password":f[c][d].value=g[c][d].value;break;case "radio":case "checkbox":f[c][d].checked=g[c][d].checked;break;case "select-one":f[c][d].selectedIndex=g[c][d].selectedIndex;break;case "select-multiple":for(e=0;e<g[c][d].options.length;e++)f[c][d].options[e].selected=g[c][d].options[e].selected}};ba=function(a){var b=a||window.event,c,d,e,a=b.clientX;e=b.clientY;R=S=0;i.releaseCapture&&i.releaseCapture();
REDIPS.event.remove(document,"mousemove",ca);REDIPS.event.remove(document,"touchmove",ca);REDIPS.event.remove(document,"mouseup",ba);REDIPS.event.remove(document,"touchend",ba);y.onselectstart=null;Ba(i);ta=document.documentElement.scrollWidth;ua=document.documentElement.scrollHeight;R=S=0;if(p&&"cell"===r&&(null===j||null===h||null===k))i.parentNode.removeChild(i),H[m.id]-=1,REDIPS.drag.event.notCloned();else if(null===j||null===h||null===k)REDIPS.drag.event.notMoved();else{j<f.length?(b=f[j],REDIPS.drag.td.target=
l.target=b.rows[h].cells[k],X(j,h,k,Y),c=j,d=h):null===t||null===v||null===A?(b=f[z],REDIPS.drag.td.target=l.target=b.rows[I].cells[T],X(z,I,T,Y),c=z,d=I):(b=f[t],REDIPS.drag.td.target=l.target=b.rows[v].cells[A],X(t,v,A,Y),c=t,d=v);if("row"===r)if(va)if(z===c&&I===d){b=i.getElementsByTagName("tr")[0];m.style.backgroundColor=b.style.backgroundColor;for(a=0;a<b.cells.length;a++)m.cells[a].style.backgroundColor=b.cells[a].style.backgroundColor;i.parentNode.removeChild(i);delete m.redips.emptyRow;p?
REDIPS.drag.event.rowNotCloned():REDIPS.drag.event.rowDroppedSource(l.target)}else Ia(c,d);else REDIPS.drag.event.rowNotMoved();else if(!p&&!ga)REDIPS.drag.event.notMoved();else if(p&&z===j&&I===h&&T===k)i.parentNode.removeChild(i),H[m.id]-=1,REDIPS.drag.event.notCloned();else if(p&&!1===REDIPS.drag.clone.drop&&(a<b.redips.offset[3]||a>b.redips.offset[1]||e<b.redips.offset[0]||e>b.redips.offset[2]))i.parentNode.removeChild(i),H[m.id]-=1,REDIPS.drag.event.notCloned();else if(-1<l.target.className.indexOf(REDIPS.drag.trash.className))i.parentNode.removeChild(i),
REDIPS.drag.trash.question?setTimeout(function(){if(confirm(REDIPS.drag.trash.question))Aa();else{if(!p){f[z].rows[I].cells[T].appendChild(i);u()}REDIPS.drag.event.undeleted()}},20):Aa();else if("switch"===REDIPS.drag.dropMode)if(a=REDIPS.drag.event.droppedBefore(l.target),!1===a)ha(!1);else{i.parentNode.removeChild(i);b=l.target.getElementsByTagName("div");c=b.length;for(a=0;a<c;a++)void 0!==b[0]&&(REDIPS.drag.objOld=m=b[0],l.source.appendChild(m),U(m));ha();c&&REDIPS.drag.event.switched()}else"overwrite"===
REDIPS.drag.dropMode?(a=REDIPS.drag.event.droppedBefore(l.target),!1!==a&&ea(l.target)):a=REDIPS.drag.event.droppedBefore(l.target),ha(a);"cell"===r&&0<i.getElementsByTagName("table").length&&q();u();REDIPS.drag.event.finish()}t=v=A=null};ha=function(a){var b=null,c;if(!1!==a){if(!0===Ua.sendBack){a=l.target.getElementsByTagName("DIV");for(c=0;c<a.length;c++)if(i!==a[c]&&0===i.id.indexOf(a[c].id)){b=a[c];break}if(b){na(b,1);i.parentNode.removeChild(i);return}}"shift"===REDIPS.drag.dropMode&&(Qa(l.target)||
"always"===REDIPS.drag.shift.after)&&oa(l.source,l.target);"top"===REDIPS.drag.multipleDrop&&l.target.hasChildNodes()?l.target.insertBefore(i,l.target.firstChild):l.target.appendChild(i);U(i);REDIPS.drag.event.dropped(l.target);p&&(REDIPS.drag.event.clonedDropped(l.target),na(m,-1))}else p&&i.parentNode&&i.parentNode.removeChild(i)};U=function(a,b){!1===b?(a.onmousedown=null,a.ontouchstart=null,a.ondblclick=null):(a.onmousedown=za,a.ontouchstart=za,a.ondblclick=La)};Ba=function(a){a.style.top="";
a.style.left="";a.style.position="";a.style.zIndex=""};Aa=function(){var a;p&&na(m,-1);if("shift"===REDIPS.drag.dropMode&&("delete"===REDIPS.drag.shift.after||"always"===REDIPS.drag.shift.after)){switch(REDIPS.drag.shift.mode){case "vertical2":a="lastInColumn";break;case "horizontal2":a="lastInRow";break;default:a="last"}oa(l.source,Ga(a,l.source)[2])}REDIPS.drag.event.deleted(p)};ca=function(a){var a=a||window.event,b=REDIPS.drag.scroll.bound,c,d,e,g;a.touches?(d=V=a.touches[0].clientX,e=W=a.touches[0].clientY):
(d=V=a.clientX,e=W=a.clientY);c=Math.abs(Ra-d);g=Math.abs(Sa-e);if(!va){if("cell"===r&&($||!0===REDIPS.drag.clone.keyDiv&&Ja))REDIPS.drag.objOld=m=i,REDIPS.drag.obj=i=ma(i,!0),p=!0,REDIPS.drag.event.cloned();else{if("row"===r){if($||!0===REDIPS.drag.clone.keyRow&&Ja)p=!0;REDIPS.drag.objOld=m=i;REDIPS.drag.obj=i=fa(i);i.style.zIndex=999}i.setCapture&&i.setCapture();i.style.position="fixed";u();Q();"row"===r&&(p?REDIPS.drag.event.rowCloned():REDIPS.drag.event.rowMoved())}ja();d>F-o[1]&&(i.style.left=
F-(o[1]+o[3])+"px");e>G-o[2]&&(i.style.top=G-(o[0]+o[2])+"px")}va=!0;if("cell"===r&&(7<c||7<g)&&!ga)ga=!0,ja(),REDIPS.drag.event.moved(p);d>o[3]&&d<F-o[1]&&(i.style.left=d-o[3]+"px");e>o[0]&&e<G-o[2]&&(i.style.top=e-o[0]+"px");if(d<D[1]&&d>D[3]&&e<D[2]&&e>D[0]&&0===R&&0===S&&(n.containTable||d<n[3]||d>n[1]||e<n[0]||e>n[2]))Q(),ia();if(REDIPS.drag.scroll.enable){M=b-(F/2>d?d-o[3]:F-d-o[1]);if(0<M){if(M>b&&(M=b),c=K()[0],M*=d<F/2?-1:1,!(0>M&&0>=c||0<M&&c>=ta-F)&&0===R++)REDIPS.event.remove(window,"scroll",
u),ka(window)}else M=0;N=b-(G/2>e?e-o[0]:G-e-o[2]);if(0<N){if(N>b&&(N=b),c=K()[1],N*=e<G/2?-1:1,!(0>N&&0>=c||0<N&&c>=ua-G)&&0===S++)REDIPS.event.remove(window,"scroll",u),la(window)}else N=0;for(g=0;g<L.length;g++)if(c=L[g],c.autoscroll&&d<c.offset[1]&&d>c.offset[3]&&e<c.offset[2]&&e>c.offset[0]){O=b-(c.midstX>d?d-o[3]-c.offset[3]:c.offset[1]-d-o[1]);0<O?(O>b&&(O=b),O*=d<c.midstX?-1:1,0===R++&&(REDIPS.event.remove(c.div,"scroll",u),ka(c.div))):O=0;P=b-(c.midstY>e?e-o[0]-c.offset[0]:c.offset[2]-e-
o[2]);0<P?(P>b&&(P=b),P*=e<c.midstY?-1:1,0===S++&&(REDIPS.event.remove(c.div,"scroll",u),la(c.div))):P=0;break}else O=P=0}a.cancelBubble=!0;a.stopPropagation&&a.stopPropagation()};ia=function(){if(j<f.length&&(j!==t||h!==v||k!==A))null!==t&&(null!==v&&null!==A)&&(X(t,v,A,Y),REDIPS.drag.td.previous=l.previous=f[t].rows[v].cells[A],REDIPS.drag.td.current=l.current=f[j].rows[h].cells[k],"switching"===REDIPS.drag.dropMode&&"cell"===r&&(da(l.current,l.previous),u(),Q()),"cell"===r?REDIPS.drag.event.changed(l.current):
"row"===r&&(j!==t||h!==v)&&REDIPS.drag.event.rowChanged(l.current)),ja()};Ca=function(){if("number"===typeof window.innerWidth)F=window.innerWidth,G=window.innerHeight;else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight))F=document.documentElement.clientWidth,G=document.documentElement.clientHeight;else if(document.body&&(document.body.clientWidth||document.body.clientHeight))F=document.body.clientWidth,G=document.body.clientHeight;ta=document.documentElement.scrollWidth;
ua=document.documentElement.scrollHeight;u()};Q=function(){var a,b,c,d,e,g;c=[];a=function(){null!==t&&(null!==v&&null!==A)&&(j=t,h=v,k=A)};b=V;g=W;for(j=0;j<f.length;j++)if(!1!==f[j].redips.enabled&&(c[0]=f[j].redips.offset[0],c[1]=f[j].redips.offset[1],c[2]=f[j].redips.offset[2],c[3]=f[j].redips.offset[3],void 0!==f[j].sca&&(c[0]=c[0]>f[j].sca.offset[0]?c[0]:f[j].sca.offset[0],c[1]=c[1]<f[j].sca.offset[1]?c[1]:f[j].sca.offset[1],c[2]=c[2]<f[j].sca.offset[2]?c[2]:f[j].sca.offset[2],c[3]=c[3]>f[j].sca.offset[3]?
c[3]:f[j].sca.offset[3]),c[3]<b&&b<c[1]&&c[0]<g&&g<c[2])){c=f[j].redips.row_offset;for(h=0;h<c.length-1;h++)if(void 0!==c[h]){n[0]=c[h][0];if(void 0!==c[h+1])n[2]=c[h+1][0];else for(d=h+2;d<c.length;d++)if(void 0!==c[d]){n[2]=c[d][0];break}if(g<=n[2])break}d=h;h===c.length-1&&(n[0]=c[h][0],n[2]=f[j].redips.offset[2]);do for(k=e=f[j].rows[h].cells.length-1;0<=k&&!(n[3]=c[h][3]+f[j].rows[h].cells[k].offsetLeft,n[1]=n[3]+f[j].rows[h].cells[k].offsetWidth,n[3]<=b&&b<=n[1]);k--);while(f[j].redips.rowspan&&
-1===k&&0<h--);0>h||0>k?a():h!==d&&(n[0]=c[h][0],n[2]=n[0]+f[j].rows[h].cells[k].offsetHeight,(g<n[0]||g>n[2])&&a());b=f[j].rows[h].cells[k];n.containTable=0<b.childNodes.length&&0<b.getElementsByTagName("table").length?!0:!1;if(-1===b.className.indexOf(REDIPS.drag.trash.className))if(g=-1<b.className.indexOf(REDIPS.drag.only.cname)?!0:!1,!0===g){if(-1===b.className.indexOf(ya.div[i.id])){a();break}}else if(void 0!==ya.div[i.id]&&"deny"===ya.other){a();break}else if(g=-1<b.className.indexOf(REDIPS.drag.mark.cname)?
!0:!1,(!0===g&&"deny"===REDIPS.drag.mark.action||!1===g&&"allow"===REDIPS.drag.mark.action)&&-1===b.className.indexOf(Ta.exception[i.id])){a();break}g=-1<b.className.indexOf("single")?!0:!1;if("cell"===r){if(("single"===REDIPS.drag.dropMode||g)&&0<b.childNodes.length){if(1===b.childNodes.length&&3===b.firstChild.nodeType)break;g=!0;for(d=b.childNodes.length-1;0<=d;d--)if(b.childNodes[d].className&&-1<b.childNodes[d].className.indexOf("drag")){g=!1;break}if(!g&&(null!==t&&null!==v&&null!==A)&&(z!==
j||I!==h||T!==k)){a();break}}if(-1<b.className.indexOf("rowhandler")){a();break}if(b.parentNode.redips&&b.parentNode.redips.emptyRow){a();break}}break}};ja=function(){j<f.length&&(null!==j&&null!==h&&null!==k)&&(Y=Da(j,h,k),X(j,h,k),t=j,v=h,A=k)};X=function(a,b,c,d){if("cell"===r&&ga)c=f[a].rows[b].cells[c].style,c.backgroundColor=void 0===d?REDIPS.drag.hover.colorTd:d.color[0].toString(),void 0!==REDIPS.drag.hover.borderTd&&(void 0===d?c.border=REDIPS.drag.hover.borderTd:(c.borderTopWidth=d.top[0][0],
c.borderTopStyle=d.top[0][1],c.borderTopColor=d.top[0][2],c.borderRightWidth=d.right[0][0],c.borderRightStyle=d.right[0][1],c.borderRightColor=d.right[0][2],c.borderBottomWidth=d.bottom[0][0],c.borderBottomStyle=d.bottom[0][1],c.borderBottomColor=d.bottom[0][2],c.borderLeftWidth=d.left[0][0],c.borderLeftStyle=d.left[0][1],c.borderLeftColor=d.left[0][2]));else if("row"===r){a=f[a].rows[b];for(b=0;b<a.cells.length;b++)c=a.cells[b].style,c.backgroundColor=void 0===d?REDIPS.drag.hover.colorTr:d.color[b].toString(),
void 0!==REDIPS.drag.hover.borderTr&&(void 0===d?j===z?h<I?c.borderTop=REDIPS.drag.hover.borderTr:c.borderBottom=REDIPS.drag.hover.borderTr:"before"===REDIPS.drag.rowDropMode?c.borderTop=REDIPS.drag.hover.borderTr:c.borderBottom=REDIPS.drag.hover.borderTr:(c.borderTopWidth=d.top[b][0],c.borderTopStyle=d.top[b][1],c.borderTopColor=d.top[b][2],c.borderBottomWidth=d.bottom[b][0],c.borderBottomStyle=d.bottom[b][1],c.borderBottomColor=d.bottom[b][2]))}};Da=function(a,b,c){var d={color:[],top:[],right:[],
bottom:[],left:[]},e=function(a,b){var c="border"+b+"Style",d="border"+b+"Color";return[E(a,"border"+b+"Width"),E(a,c),E(a,d)]};if("cell"===r)c=f[a].rows[b].cells[c],d.color[0]=c.style.backgroundColor,void 0!==REDIPS.drag.hover.borderTd&&(d.top[0]=e(c,"Top"),d.right[0]=e(c,"Right"),d.bottom[0]=e(c,"Bottom"),d.left[0]=e(c,"Left"));else{a=f[a].rows[b];for(b=0;b<a.cells.length;b++)c=a.cells[b],d.color[b]=c.style.backgroundColor,void 0!==REDIPS.drag.hover.borderTr&&(d.top[b]=e(c,"Top"),d.bottom[b]=e(c,
"Bottom"))}return d};C=function(a,b,c){var d=0,e=0,g=a;"fixed"!==b&&(d=0-xa[0],e=0-xa[1]);if(void 0===c||!0===c){do d+=a.offsetLeft-a.scrollLeft,e+=a.offsetTop-a.scrollTop,a=a.offsetParent;while(a&&"BODY"!==a.nodeName)}else{do d+=a.offsetLeft,e+=a.offsetTop,a=a.offsetParent;while(a&&"BODY"!==a.nodeName)}return[e,d+g.offsetWidth,e+g.offsetHeight,d]};u=function(){var a,b,c,d;xa=K();for(a=0;a<f.length;a++){c=[];d=E(f[a],"position");"fixed"!==d&&(d=E(f[a].parentNode,"position"));for(b=f[a].rows.length-
1;0<=b;b--)"none"!==f[a].rows[b].style.display&&(c[b]=C(f[a].rows[b],d));f[a].redips.offset=C(f[a],d);f[a].redips.row_offset=c}D=C(y);for(a=0;a<L.length;a++)d=E(L[a].div,"position"),b=C(L[a].div,d,!1),L[a].offset=b,L[a].midstX=(b[1]+b[3])/2,L[a].midstY=(b[0]+b[2])/2};K=function(){var a,b;"number"===typeof window.pageYOffset?(a=window.pageXOffset,b=window.pageYOffset):document.body&&(document.body.scrollLeft||document.body.scrollTop)?(a=document.body.scrollLeft,b=document.body.scrollTop):document.documentElement&&
(document.documentElement.scrollLeft||document.documentElement.scrollTop)?(a=document.documentElement.scrollLeft,b=document.documentElement.scrollTop):a=b=0;return[a,b]};ka=function(a){var b,c;b=V;c=W;0<R&&(u(),Q(),b<D[1]&&(b>D[3]&&c<D[2]&&c>D[0])&&ia());"object"===typeof a&&(s=a);s===window?(a=K()[0],b=ta-F,c=M):(a=s.scrollLeft,b=s.scrollWidth-s.clientWidth,c=O);0<R&&(0>c&&0<a||0<c&&a<b)?(s===window?(window.scrollBy(c,0),K(),a=parseInt(i.style.left,10),isNaN(a)):s.scrollLeft+=c,setTimeout(ka,REDIPS.drag.scroll.speed)):
(REDIPS.event.add(s,"scroll",u),R=0,n=[0,0,0,0])};la=function(a){var b,c;b=V;c=W;0<S&&(u(),Q(),b<D[1]&&(b>D[3]&&c<D[2]&&c>D[0])&&ia());"object"===typeof a&&(s=a);s===window?(a=K()[1],b=ua-G,c=N):(a=s.scrollTop,b=s.scrollHeight-s.clientHeight,c=P);0<S&&(0>c&&0<a||0<c&&a<b)?(s===window?(window.scrollBy(0,c),K(),a=parseInt(i.style.top,10),isNaN(a)):s.scrollTop+=c,setTimeout(la,REDIPS.drag.scroll.speed)):(REDIPS.event.add(s,"scroll",u),S=0,n=[0,0,0,0])};ma=function(a,b){var c=a.cloneNode(!0),d=c.className,
e,g;!0===b&&(document.getElementById("redips_clone").appendChild(c),c.style.zIndex=999,c.style.position="fixed",e=C(a),g=C(c),c.style.top=e[0]-g[0]+"px",c.style.left=e[3]-g[3]+"px");c.setCapture&&c.setCapture();d=d.replace("clone","");d=d.replace(/climit(\d)_(\d+)/,"");c.className=sa(d);void 0===H[a.id]&&(H[a.id]=0);c.id=a.id+"c"+H[a.id];H[a.id]+=1;Ea(a,c);return c};Ea=function(a,b){var c=[],d;c[0]=function(a,b){a.redips&&(b.redips={},b.redips.enabled=a.redips.enabled,b.redips.container=a.redips.container,
a.redips.enabled&&U(b))};c[1]=function(a,b){a.redips&&(b.redips={},b.redips.emptyRow=a.redips.emptyRow)};d=function(d){var g,f,w;f=["DIV","TR"];g=a.getElementsByTagName(f[d]);f=b.getElementsByTagName(f[d]);for(w=0;w<f.length;w++)c[d](g[w],f[w])};if("DIV"===a.nodeName)c[0](a,b);else if("TR"===a.nodeName)c[1](a,b);d(0);d(1)};na=function(a,b){var c,d,e;e=a.className;c=e.match(/climit(\d)_(\d+)/);null!==c&&(d=parseInt(c[1],10),c=parseInt(c[2],10),0===c&&1===b&&(e+=" clone",2===d&&B(!0,a)),c+=b,e=e.replace(/climit\d_\d+/g,
"climit"+d+"_"+c),0>=c&&(e=e.replace("clone",""),2===d?(B(!1,a),REDIPS.drag.event.clonedEnd2()):REDIPS.drag.event.clonedEnd1()),a.className=sa(e))};Fa=function(a){var b=!1;a.srcElement?(b=a.srcElement.nodeName,a=a.srcElement.className):(b=a.target.nodeName,a=a.target.className);switch(b){case "A":case "INPUT":case "SELECT":case "OPTION":case "TEXTAREA":b=!0;break;default:b=/\bnodrag\b/i.test(a)?!0:!1}return b};B=function(a,b){var c,d,e,g=[],f=[],w,i,h,j,l=/\bdrag\b/i,k=/\bnoautoscroll\b/i;i=REDIPS.drag.style.opacityDisabled;
!0===a||"init"===a?(w=REDIPS.drag.style.borderEnabled,h="move",j=!0):(w=REDIPS.drag.style.borderDisabled,h="auto",j=!1);void 0===b?g=y.getElementsByTagName("div"):"string"===typeof b?g=document.querySelectorAll(b):"object"===typeof b&&("DIV"!==b.nodeName||-1===b.className.indexOf("drag"))?g=b.getElementsByTagName("div"):g[0]=b;for(d=c=0;c<g.length;c++)if(l.test(g[c].className))"init"===a||void 0===g[c].redips?(g[c].redips={},g[c].redips.container=y):!0===a&&"number"===typeof i?(g[c].style.opacity=
"",g[c].style.filter=""):!1===a&&"number"===typeof i&&(g[c].style.opacity=i/100,g[c].style.filter="alpha(opacity="+i+")"),U(g[c],j),g[c].style.borderStyle=w,g[c].style.cursor=h,g[c].redips.enabled=j;else if("init"===a&&(e=E(g[c],"overflow"),"visible"!==e)){REDIPS.event.add(g[c],"scroll",u);e=E(g[c],"position");f=C(g[c],e,!1);e=k.test(g[c].className)?!1:!0;L[d]={div:g[c],offset:f,midstX:(f[1]+f[3])/2,midstY:(f[0]+f[2])/2,autoscroll:e};f=g[c].getElementsByTagName("table");for(e=0;e<f.length;e++)f[e].sca=
L[d];d++}};E=function(a,b){var c;a&&a.currentStyle?c=a.currentStyle[b]:a&&window.getComputedStyle&&(c=document.defaultView.getComputedStyle(a,null)[b]);return c};x=function(a,b,c){b=b.parentNode;for(void 0===c&&(c=0);b&&b.nodeName!==a;)if((b=b.parentNode)&&b.nodeName===a&&0<c)c--,b=b.parentNode;return b};Ga=function(a,b){var c=x("TABLE",b),d,e;switch(a){case "firstInColumn":d=0;e=b.cellIndex;break;case "firstInRow":d=b.parentNode.rowIndex;e=0;break;case "lastInColumn":d=c.rows.length-1;e=b.cellIndex;
break;case "lastInRow":d=b.parentNode.rowIndex;e=c.rows[d].cells.length-1;break;case "last":d=c.rows.length-1;e=c.rows[d].cells.length-1;break;default:d=e=0}return[d,e,c.rows[d].cells[e]]};da=function(a,b,c){var d,e,g;d=function(a,b){REDIPS.drag.event.relocateBefore(a,b);var c=REDIPS.drag.getPosition(b);REDIPS.drag.moveObject({obj:a,target:c,callback:function(a){var c=REDIPS.drag.findParent("TABLE",a),d=c.redips.idx;REDIPS.drag.event.relocateAfter(a,b);wa[d]--;0===wa[d]&&(REDIPS.drag.event.relocateEnd(),
REDIPS.drag.enableTable(!0,c))}})};if(a!==b&&!("object"!==typeof a||"object"!==typeof b))if(g=a.childNodes.length,"animation"===c){if(0<g){c=x("TABLE",b);e=c.redips.idx;REDIPS.drag.enableTable(!1,c);for(c=0;c<g;c++)1===a.childNodes[c].nodeType&&"DIV"===a.childNodes[c].nodeName&&(wa[e]++,d(a.childNodes[c],b))}}else for(d=c=0;c<g;c++)1===a.childNodes[d].nodeType&&"DIV"===a.childNodes[d].nodeName?(e=a.childNodes[d],REDIPS.drag.event.relocateBefore(e,b),b.appendChild(e),e.redips&&!1!==e.redips.enabled&&
U(e),REDIPS.drag.event.relocateAfter(e)):d++};ea=function(a,b){var c,d=[],e;if("TD"===a.nodeName){c=a.childNodes.length;if("test"===b)return c=l.source===a?void 0:0===a.childNodes.length||1===a.childNodes.length&&3===a.firstChild.nodeType?!0:!1;for(e=0;e<c;e++)d.push(a.childNodes[0]),a.removeChild(a.childNodes[0]);return d}};oa=function(a,b){var c,d,e,g,f,i,h,j,k,n,m,o,p=!1,q,r;q=function(a,b){REDIPS.drag.shift.animation?da(a,b,"animation"):da(a,b)};r=function(a){"delete"===REDIPS.drag.shift.overflow?
ea(a):"source"===REDIPS.drag.shift.overflow?q(a,l.source):"object"===typeof REDIPS.drag.shift.overflow&&q(a,REDIPS.drag.shift.overflow);p=!1;REDIPS.drag.event.shiftOverflow(a)};if(a!==b){f=REDIPS.drag.shift.mode;c=x("TABLE",a);d=x("TABLE",b);i=Na(d);e=c===d?[a.redips.rowIndex,a.redips.cellIndex]:[-1,-1];g=[b.redips.rowIndex,b.redips.cellIndex];m=d.rows.length;o=Oa(d);switch(f){case "vertical2":c=c===d&&a.redips.cellIndex===b.redips.cellIndex?e:[m,b.redips.cellIndex];break;case "horizontal2":c=c===
d&&a.parentNode.rowIndex===b.parentNode.rowIndex?e:[b.redips.rowIndex,o];break;default:c=c===d?e:[m,o]}"vertical1"===f||"vertical2"===f?(f=1E3*c[1]+c[0]<1E3*g[1]+g[0]?1:-1,d=m,m=0,o=1):(f=1E3*c[0]+c[1]<1E3*g[0]+g[1]?1:-1,d=o,m=1,o=0);for(c[0]!==e[0]&&c[1]!==e[1]&&(p=!0);c[0]!==g[0]||c[1]!==g[1];)(h=i[c[0]+"-"+c[1]],c[m]+=f,0>c[m]?(c[m]=d,c[o]--):c[m]>d&&(c[m]=0,c[o]++),e=i[c[0]+"-"+c[1]],void 0!==e&&(j=e),void 0!==h&&(k=h),void 0!==e&&void 0!==k||void 0!==j&&void 0!==h)?(e=-1===j.className.indexOf(REDIPS.drag.mark.cname)?
0:1,h=-1===k.className.indexOf(REDIPS.drag.mark.cname)?0:1,p&&0===e&&1===h&&r(j),1===e?0===h&&(n=k):(0===e&&1===h&&(k=n),q(j,k))):p&&(void 0!==j&&void 0===k)&&(e=-1===j.className.indexOf(REDIPS.drag.mark.cname)?0:1,0===e&&r(j))}};Na=function(a){var b=[],c,d={},e,g,f,i,h,j,k,l;i=a.rows;for(h=0;h<i.length;h++)for(j=0;j<i[h].cells.length;j++){c=i[h].cells[j];a=c.parentNode.rowIndex;e=c.rowSpan||1;g=c.colSpan||1;b[a]=b[a]||[];for(k=0;k<b[a].length+1;k++)if("undefined"===typeof b[a][k]){f=k;break}d[a+
"-"+f]=c;void 0===c.redips&&(c.redips={});c.redips.rowIndex=a;c.redips.cellIndex=f;for(k=a;k<a+e;k++){b[k]=b[k]||[];c=b[k];for(l=f;l<f+g;l++)c[l]="x"}}return d};Oa=function(a){var b=a.rows,c=0,d,e;"string"===typeof a&&document.getElementById(a);for(d=0;d<b.length;d++){for(e=a=0;e<b[d].cells.length;e++)a+=b[d].cells[e].colSpan||1;a>c&&(c=a)}return c};Ha=function(a,b){var c=(b.k1-b.k2*a)*(b.k1-b.k2*a),d,a=a+REDIPS.drag.animation.step*(4-3*c)*b.direction;d=b.m*a+b.b;"horizontal"===b.type?(b.obj.style.left=
a+"px",b.obj.style.top=d+"px"):(b.obj.style.left=d+"px",b.obj.style.top=a+"px");a<b.last&&0<b.direction||a>b.last&&0>b.direction?setTimeout(function(){Ha(a,b)},REDIPS.drag.animation.pause*c):(Ba(b.obj),b.obj.redips&&(b.obj.redips.animated=!1),"cell"===b.mode?(!0===b.overwrite&&ea(b.targetCell),b.targetCell.appendChild(b.obj),b.obj.redips&&!1!==b.obj.redips.enabled&&U(b.obj)):Ia(pa(b.target[0]),b.target[1],b.obj),"function"===typeof b.callback&&b.callback(b.obj))};qa=function(a){var b,c,d;b=[];b=c=
d=-1;if(void 0===a)b=j<f.length?f[j].redips.idx:null===t||null===v||null===A?f[z].redips.idx:f[t].redips.idx,c=f[z].redips.idx,b=[b,h,k,c,I,T];else{if(a="string"===typeof a?document.getElementById(a):a)"TD"!==a.nodeName&&(a=x("TD",a)),a&&"TD"===a.nodeName&&(b=a.cellIndex,c=a.parentNode.rowIndex,a=x("TABLE",a),d=a.redips.idx);b=[d,c,b]}return b};pa=function(a){var b;for(b=0;b<f.length&&f[b].redips.idx!==a;b++);return b};sa=function(a){void 0!==a&&(a=a.replace(/^\s+|\s+$/g,"").replace(/\s{2,}/g," "));
return a};Qa=function(a){var b;for(b=0;b<a.childNodes.length;b++)if(1===a.childNodes[b].nodeType)return!0;return!1};ra=function(a,b,c){var d,e;"string"===typeof a&&(a=document.getElementById(a),a=x("TABLE",a));if("TR"===a.nodeName){a=a.getElementsByTagName("td");for(d=0;d<a.length;d++)if(a[d].style.backgroundColor=c?c:"","empty"===b)a[d].innerHTML="";else for(e=0;e<a[d].childNodes.length;e++)1===a[d].childNodes[e].nodeType&&(a[d].childNodes[e].style.opacity=b/100,a[d].childNodes[e].style.filter="alpha(opacity="+
b+")")}else a.style.opacity=b/100,a.style.filter="alpha(opacity="+b+")",a.style.backgroundColor=c?c:""};return{obj:i,objOld:m,mode:r,td:l,hover:{colorTd:"#E7AB83",colorTr:"#E7AB83"},scroll:{enable:!0,bound:25,speed:20},only:ya,mark:Ta,style:{borderEnabled:"solid",borderDisabled:"dotted",opacityDisabled:"",rowEmptyColor:"white"},trash:{className:"trash",question:null,questionRow:null},saveParamName:"p",dropMode:"multiple",multipleDrop:"bottom",clone:Ua,animation:{pause:20,step:2,shift:!1},shift:{mode:"horizontal1",
after:"default",overflow:"bunch"},rowDropMode:"before",tableSort:!0,init:function(a){var b;if(void 0===a||"string"!==typeof a)a="drag";y=document.getElementById(a);xa=K();document.getElementById("redips_clone")||(a=document.createElement("div"),a.id="redips_clone",a.style.width=a.style.height="1px",y.appendChild(a));B("init");q();Ca();REDIPS.event.add(window,"resize",Ca);b=y.getElementsByTagName("img");for(a=0;a<b.length;a++)REDIPS.event.add(b[a],"mousemove",J),REDIPS.event.add(b[a],"touchmove",J);
REDIPS.event.add(window,"scroll",u)},initTables:q,enableDrag:B,enableTable:function(a,b){var c;if("object"===typeof b&&"TABLE"===b.nodeName)b.redips.enabled=a;else for(c=0;c<f.length;c++)-1<f[c].className.indexOf(b)&&(f[c].redips.enabled=a)},cloneObject:ma,saveContent:function(a,b){var c="",d,e,f,h,i,j,k,l=[],m=REDIPS.drag.saveParamName;"string"===typeof a&&(a=document.getElementById(a));if(void 0!==a&&"object"===typeof a&&"TABLE"===a.nodeName){d=a.rows.length;for(i=0;i<d;i++){e=a.rows[i].cells.length;
for(j=0;j<e;j++)if(f=a.rows[i].cells[j],0<f.childNodes.length)for(k=0;k<f.childNodes.length;k++)h=f.childNodes[k],"DIV"===h.nodeName&&-1<h.className.indexOf("drag")&&(c+=h.id+"_"+i+"_"+j+"/",l.push([h.id,i,j]))}c="json"===b&&0<l.length?JSON.stringify(l):c.substring(0,c.length-1)}return c},relocate:da,emptyCell:ea,moveObject:function(a){var b={direction:1},c,d,e,g,i,h;b.callback=a.callback;b.overwrite=a.overwrite;"string"===typeof a.id?b.obj=b.objOld=document.getElementById(a.id):"object"===
typeof a.obj&&"DIV"===a.obj.nodeName&&(b.obj=b.objOld=a.obj);if("row"===a.mode){b.mode="row";h=pa(a.source[0]);i=a.source[1];m=b.objOld=f[h].rows[i];if(m.redips&&!0===m.redips.emptyRow)return!1;b.obj=fa(b.objOld,"animated")}else if(b.obj&&-1<b.obj.className.indexOf("row")){b.mode="row";b.obj=b.objOld=m=x("TR",b.obj);if(m.redips&&!0===m.redips.emptyRow)return!1;b.obj=fa(b.objOld,"animated")}else b.mode="cell";if(!("object"!==typeof b.obj||null===b.obj))return b.obj.style.zIndex=999,b.obj.redips&&y!==
b.obj.redips.container&&(y=b.obj.redips.container,q()),h=C(b.obj),e=h[1]-h[3],g=h[2]-h[0],c=h[3],d=h[0],!0===a.clone&&"cell"===b.mode&&(b.obj=ma(b.obj,!0),REDIPS.drag.event.cloned(b.obj)),void 0===a.target?a.target=qa():"object"===typeof a.target&&"TD"===a.target.nodeName&&(a.target=qa(a.target)),b.target=a.target,h=pa(a.target[0]),i=a.target[1],a=a.target[2],i>f[h].rows.length-1&&(i=f[h].rows.length-1),b.targetCell=f[h].rows[i].cells[a],"cell"===b.mode?(h=C(b.targetCell),i=h[1]-h[3],a=h[2]-h[0],
e=h[3]+(i-e)/2,g=h[0]+(a-g)/2):(h=C(f[h].rows[i]),e=h[3],g=h[0]),h=e-c,a=g-d,b.obj.style.position="fixed",Math.abs(h)>Math.abs(a)?(b.type="horizontal",b.m=a/h,b.b=d-b.m*c,b.k1=(c+e)/(c-e),b.k2=2/(c-e),c>e&&(b.direction=-1),h=c,b.last=e):(b.type="vertical",b.m=h/a,b.b=c-b.m*d,b.k1=(d+g)/(d-g),b.k2=2/(d-g),d>g&&(b.direction=-1),h=d,b.last=g),b.obj.redips&&(b.obj.redips.animated=!0),Ha(h,b),[b.obj,b.objOld]},shiftCells:oa,deleteObject:function(a){"object"===typeof a&&"DIV"===a.nodeName?a.parentNode.removeChild(a):
"string"===typeof a&&(a=document.getElementById(a))&&a.parentNode.removeChild(a)},getPosition:qa,rowOpacity:ra,rowEmpty:function(a,b,c){a=document.getElementById(a).rows[b];void 0===c&&(c=REDIPS.drag.style.rowEmptyColor);void 0===a.redips&&(a.redips={});a.redips.emptyRow=!0;ra(a,"empty",c)},getScrollPosition:K,getStyle:E,findParent:x,findCell:Ga,event:{changed:function(){},clicked:function(){},cloned:function(){},clonedDropped:function(){},clonedEnd1:function(){},clonedEnd2:function(){},dblClicked:function(){},
deleted:function(){},dropped:function(){},droppedBefore:function(){},finish:function(){},moved:function(){},notCloned:function(){},notMoved:function(){},shiftOverflow:function(){},relocateBefore:function(){},relocateAfter:function(){},relocateEnd:function(){},rowChanged:function(){},rowClicked:function(){},rowCloned:function(){},rowDeleted:function(){},rowDropped:function(){},rowDroppedBefore:function(){},rowDroppedSource:function(){},rowMoved:function(){},rowNotCloned:function(){},rowNotMoved:function(){},
rowUndeleted:function(){},switched:function(){},undeleted:function(){}}}}();REDIPS.event||(REDIPS.event=function(){return{add:function(q,B,J){q.addEventListener?q.addEventListener(B,J,!1):q.attachEvent?q.attachEvent("on"+B,J):q["on"+B]=J},remove:function(q,B,J){q.removeEventListener?q.removeEventListener(B,J,!1):q.detachEvent?q.detachEvent("on"+B,J):q["on"+B]=null}}}());
/*
Copyright (c) 2008-2011, www.redips.net All rights reserved.
Code licensed under the BSD License: http://www.redips.net/license/
http://www.redips.net/javascript/drag-and-drop-table-content/
Version 5.0.8
Jun 28, 2013.
*/

/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false */

/* reveal module-pattern */

/* enable strict mode */

"use strict";


/**
 * @name REDIPS
 * @description create REDIPS namespace (if is not already defined in another REDIPS package)
 */
var REDIPS = REDIPS || {};


/**
 * @namespace
 * @description REDIPS.drag is a JavaScript drag and drop library focused on dragging table content (DIV elements) and table rows.
 * @name REDIPS.drag
 * @author darko.bunic@google.com (Darko Bunic)
 * @see
 * <a href="http://www.redips.net/javascript/redips-drag-documentation-appendix-a/" title="REDIPS.drag documentation - Appendix A">REDIPS.drag documentation - Appendix A</a>
 *  
 * <a href="http://www.redips.net/javascript/drag-and-drop-table-content-animation/">Drag and drop table content plus animation</a>
 * <a href="http://www.redips.net/javascript/drag-and-drop-table-row/">Drag and drop table rows</a>
 * <a href="http://www.redips.net/javascript/drag-and-drop-table-content/">Drag and Drop table content</a>
 * <a href="http://www.redips.net/javascript/drag-and-drop-content-shift/">JavaScript drag and drop plus content shift</a>
 * @version 5.0.8 (2013-06-28)
 */
REDIPS.drag = (function () {
		// methods
	var	init,						// initialization
		initTables,					// table initialization
		enableDrag,					// method attaches / detaches onmousedown and onscroll event handlers for DIV elements
		enableTable,				// method enables / disables tables (selected by className) to accept elements 
		imgOnMouseMove,				// needed to set onmousemove event handler for images
		handlerOnMouseDown,			// onmousedown handler
		handlerOnDblClick,			// ondblclick handler (calls public event.dblClicked)
		tableTop,					// set current table group in "tables" array to the array top
		handlerOnMouseUp,			// onmouseup handler
		handlerOnMouseMove,			// onmousemove handler for the document level
		elementDrop,				// drop element to the table cell
		elementDeleted,				// actions needed after element is deleted (call event handler, updatig, climit1_X or climit2_X classnames, content shifting ...)
		resetStyles,				// reset object styles after element is dropped
		registerEvents,				// register event listeners for DIV element
		cellChanged,				// private method called from handlerOnMouseMove(), autoScrollX(), autoScrollY()
		handlerOnResize,			// onresize window event handler
		setTableRowColumn,			// function sets current table, row and cell
		setPosition,				// function sets color for the current table cell and remembers previous position and color
		setTdStyle,					// method sets background color and border styles for TD
		getTdStyle,					// method returns object containing background color and border styles for TD
		boxOffset,					// calculates object (box) offset (top, right, bottom, left)
		calculateCells,				// calculates table columns and row offsets (cells dimensions)
		getScrollPosition,			// returns scroll positions in array
		autoScrollX,				// horizontal auto scroll function
		autoScrollY,				// vertical auto scroll function
		cloneObject,				// clone object (DIV element)
		copyProperties,				// method copies custom properties from source element to the cloned element.
		cloneLimit,					// clone limit (after cloning object, take care about climit1_X or climit2_X classnames)
		elementControl,				// method returns true or false if element needs to have control
		getStyle,					// method returns style value of requested object and style name
		findParent,					// method returns a reference of the required parent element
		findCell,					// method returns first or last cell: rowIndex, cellIndex and cell reference (input is "first" or "last" parameter and table or object within table)
		saveContent,				// scan tables, prepare query string and sent to the multiple-parameters.php
		relocate,					// relocate objects from source cell to the target cell (source and target cells are input parameters)
		emptyCell,					// method removes elements from table cell
		shiftCells,					// method shifts table content to the left or right (useful for content where the order should be preserved)
		cellList,					// method returns cell list with new coordinates (it takes care about rowspan/colspan cells) 
		maxCols,					// method returns maximum number of columns in a table
		moveObject,					// method moves object to the destination table, row and cell
		deleteObject,				// method deletes DIV element
		animateObject,				// object animation
		getTableIndex,				// find table index - because tables array is sorted on every element click
		getPosition,				// returns position in format: tableIndex, rowIndex and cellIndex (input parameter is optional)
		rowOpacity,					// method sets opacity to table row (el, opacity, color)
		rowEmpty,					// method marks selected row as empty (input parameters are table index and row index)
		rowClone,					// clone table row - input parameter is DIV with class name "row" -> DIV class="drag row"
		rowDrop,					// function drops (delete old & insert new) table row (input parameters are current table and row)
		formElements,				// set form values in cloned row (to prevent reset values of form elements)
		normalize,					// private method returns normalized spaces from input string
		hasChilds,					// private method (returns true if element contains child nodes with nodeType === 1)
	
		// private parameters
		objMargin = null,			// space from clicked point to the object bounds (top, right, bottom, left)
		
		// window width and height (parameters are set in onload and onresize event handler)
		// just for a note: window and Window is reserved word in JS so I named variable "screen")
		screen = {width: 0,
				height: 0},

		// define scroll object with contained properties (this is private property)
		scrollData = {width : null,	// scroll width of the window (it is usually greater then window)
				height : null,		// scroll height of the window (it is usually greater then window)
				container : [],		// scrollable container areas (contains autoscroll areas, reference to the container and scroll direction)
				obj : null},		// scroll object (needed in autoscroll for recursive calls)
		
		edge = {page: {x: 0, y: 0}, // autoscroll bound values for page and div as scrollable container
				div:  {x: 0, y: 0},	// closer to the edge, faster scrolling
				flag: {x: 0, y: 0}},// flags are needed to prevent multiple calls of autoScrollX and autoScrollY from onmousemove event handler

		bgStyleOld,					// (object) old td styles (background color and border styles)

		tables = [],				// table offsets and row offsets (initialized in onload event)
		sortIdx,					// sort index needed for sorting tables in tableTop()
		moved,						// (boolean) true if element is moved
		cloned,						// (boolean) true if element is cloned
		clonedId = [],				// needed for increment ID of cloned elements
		currentCell = [],			// current cell bounds (top, right, bottom, left) and "containTable" flag for nested tables
		dragContainer = null,		// drag container reference
		divBox = null,				// div drag box: top, right, bottom and left margin (decrease number calls of setTableRowColumn)
		pointer = {x: 0, y: 0},		// mouse pointer position (this properties are set in handlerOnMouseMove() - needed for autoscroll)
		threshold = {x: 0,			// initial x, y position of mouse pointer
					y: 0,
					value: 7,		// threshold distance value
					flag: false},	// threshold flag
		shiftKey = false,			// (boolean) true if shift key is pressed (set in handler_mousedown)
		cloneClass = false,			// (boolean) true if clicked element contains clone in class name (set in handler_mousedown)
		animationCounter = [],		// (array) counter of animated elements to be shifted before table should be enabled
		windowScrollPosition,		// (array) top and left window offset (set in calculateCells and used in boxOffset)
		
		// selected, previous and source table, row and cell (private parameters too)
		table = null,
		table_old = null,
		table_source = null,
		row = null,
		row_old = null,
		row_source = null,
		cell = null,
		cell_old = null,
		cell_source = null,
		
		// variables in the private scope revealed as public (see init() method)
		obj = false,				// (object) moved object
		objOld = false,				// (object) previously moved object (before clicked or cloned)
		mode = 'cell',				// (string) drag mode: "cell" or "row" (default is cell)
		// (object) defines color and border styles for current TD and TR
		// hover.borderTr defines border color used in "row" mode to show whether row will be dropped above or below current row
		// borderTd and borderTr are initially undefined
		hover = {colorTd: '#E7AB83',
				colorTr: '#E7AB83'},
		scroll = {enable : true,	// (boolean) enable/disable autoscroll function (default is true) 
				bound : 25,			// (integer) bound width for autoscroll
				speed : 20},		// (integer) scroll speed in milliseconds
		only = {div: [],			// (array) DIVid -> classname, defined DIV elements can be placed only to the marked table cell with class name 'only'
				cname: 'only',		// (string) class name for marked cells (default is 'only') - only defined objects can be placed there
				other: 'deny'},		// (string) allow / deny dropping marked objects with "only" to other cells
		mark = {action: 'deny',
				cname: 'mark',
				exception: []},
		style = {borderEnabled : 'solid',	// (string) border style for enabled elements
				borderDisabled : 'dotted',	// (string) border style for disabled elements
				opacityDisabled : '',		// (integer) set opacity for disabled elements
				rowEmptyColor : 'white'},	// (string) color of empty row
		tableSort = true,				// (boolean) sort tables on DIV element click
		trash = {className : 'trash',	// (object) contains trash class name and confirmation questions for delete DIV or ROW	
				question : null,
				questionRow : null},
		saveParamName = 'p',			// (string) save content parameter name
		dropMode = 'multiple',			// (string) dropMode has the following options: multiple, single, switch, switching and overwrite
		multipleDrop = 'bottom',		// (string) defines position of dropped element in case of 'multiple' drop option
		td = {},						// (object) contains reference to source (set in onmousedown), current (set in onmousemove and autoscroll), previous (set in onmousemove and autoscroll) and target cell (set in onmouseup)
		animation = {pause : 20,		// (object) animation pause (integer), step (integer) and shift (boolean)
					step: 2,
					shift: false},
		// (object)
		shift = {mode : 'horizontal1',	// shift modes (horizontal1, horizontal2, vertical1, vertical2) 
				after : 'default',		// how to shift elements (always, if DIV element is dropped to the empty cell as well or if DIV element is deleted)
				overflow : 'bunch'},	// what to do with overflowed DIV (bunch, delete, source)
		clone = {keyDiv : false,		// (boolean) if true, elements could be cloned with pressed SHIFT key
				keyRow : false,			// (boolean) if true, rows could be cloned with pressed SHIFT key
				sendBack : false,		// (boolean) if true, then cloned element can be returned to its source
				drop : false},			// (boolean) if true, then cloned element will be always dropped to the table no matter if dropped outside of the table
		rowDropMode = 'before',			// (string) drop row before or after highlighted row (values are "before" or "after")
		// (object) event handlers
		event = {changed : function () {},
				clicked : function () {},
				cloned : function () {},
				clonedDropped : function () {},
				clonedEnd1 : function () {},
				clonedEnd2 : function () {},
				dblClicked : function () {},
				deleted : function () {},
				dropped : function () {},
				droppedBefore : function () {},
				finish : function () {},
				moved : function () {},
				notCloned : function () {},
				notMoved : function () {},
				shiftOverflow: function () {},
				relocateBefore : function () {},
				relocateAfter : function () {},
				relocateEnd : function () {},
				rowChanged : function () {},
				rowClicked : function () {},
				rowCloned : function () {},
				rowDeleted : function () {},
				rowDropped : function () {},
				rowDroppedBefore : function () {},
				rowDroppedSource : function () {},
				rowMoved : function () {},
				rowNotCloned : function () {},
				rowNotMoved : function () {},
				rowUndeleted : function () {},
				switched : function () {},
				undeleted : function () {}};


	/**
	 * Drag container initialization. It should be called at least once and it's possible to call a method many times.
	 * Every page should have at least one drag container.
	 * If REDIPS.drag.init() is called without input parameter, library will search for drag container with id="drag".
	 * Only tables inside drag container will be scanned. It is possible to have several drag containers totaly separated (elements from one container will not be visible to other drag containers).
	 * "init" method calls initTables and enableDrag. If tables are generated dynamically then REDIPS.init() method should be called to set custom properties to tables (table initialization). 
	 * @param {String} [dc] Drag container Id (default is "drag").
	 * @example
	 * // init drag container (with default id="drag")
	 * REDIPS.drag.init();
	 *  
	 * // init drag container with id="drag1"
	 * REDIPS.drag.init('drag1');
	 * @public
	 * @see <a href="#initTables">initTables</a>
	 * @see <a href="#enableDrag">enableDrag</a>
	 * @function
	 * @name REDIPS.drag#init
	 */
	init = function (dc) {
		// define local variables
		var self = this,		// assign reference to current object to "self"
			i,					// used in local for loops
			imgs,				// collect images inside div=drag
			redipsClone;		// reference to the DIV element needed for cloned elements 
		// if drag container is undefined or input parameter is not a string, then set reference to DIV element with default id="drag"
		if (dc === undefined || typeof(dc) !== 'string') {
			dc = 'drag';
		}
		// set reference to the drag container
		dragContainer = document.getElementById(dc);
		// set initial window scroll position
		windowScrollPosition = getScrollPosition();
		// append DIV id="redips_clone" if DIV doesn't exist (needed for cloning DIV elements)
		// if automatic creation isn't precise enough, user can manually create and place element with id="redips_clone" to prevent window expanding
		// (then this code will be skipped)
		if (!document.getElementById('redips_clone')) {
			redipsClone = document.createElement('div');
			redipsClone.id = 'redips_clone';
			redipsClone.style.width = redipsClone.style.height = '1px';
			dragContainer.appendChild(redipsClone);
		}
		// attach onmousedown event handler to the DIV elements
		// attach onscroll='calculateCells' for DIV elements with 'scroll' in class name (prepare scrollable container areas)
		enableDrag('init');
		// initialize table array
		// here was the following comment: "initTables should go after enableDrag because sca is attached to the table if table belongs to the scrollable container"
		// not sure about order of enableDrag and initTable - needed some further testing
		initTables();
		// set initial window width/height, scroll width/height and define onresize event handler
		// onresize event handler calls calculate columns
		handlerOnResize();
		REDIPS.event.add(window, 'resize', handlerOnResize);
		// collect images inside drag container
		imgs = dragContainer.getElementsByTagName('img');
		// disable onmousemove/ontouchmove event for images to prevent default action of onmousemove event (needed for IE to enable dragging on image)
		for (i = 0; i < imgs.length; i++) {
			REDIPS.event.add(imgs[i], 'mousemove', imgOnMouseMove);
			REDIPS.event.add(imgs[i], 'touchmove', imgOnMouseMove);
		}
		// attach onscroll event to the window (needed for recalculating table cells positions)
		REDIPS.event.add(window, 'scroll', calculateCells);
	};


	/**
	 * Needed to set "false" for onmousemove event on images. This way, images from DIV element will not be enabled for dragging by default.
	 * imgOnMouseMove is attached as handler to all images inside drag container.
	 * Multiple calling of REDIPS.drag.init() will not attach the same event handler to the images.
	 * @private
	 * @memberOf REDIPS.drag#
	 * @see <a href="#init">init</a>
	 */
	imgOnMouseMove = function () {
		return false;
	};


	/**
	 * Tables layout initialization (preparing internal "tables" array).
	 * Method searches for all tables inside defined selectors and prepares "tables" array. Defaule selector is "#drag table".
	 * Tables with className "nolayout" are ignored (e.g. table with "nolayout" class name in DIV element can be dragged as any other content). 
	 * "tables" array is one of the main parts of REDIPS.drag library.
	 * @example
	 * // call initTables after new empty table is added to the div#drag
	 * // REDIPS.init() method will also work but with some overhead 
	 * REDIPS.drag.initTables();
	 *  
	 * // change default selector for table search (div#sticky may contain table that is attached out of defaule drag container)
	 * // this means that table should not be a part of div#drag, but it should be positioned within drag container otherwise dragging will not work
	 * REDIPS.drag.initTables('#drag table, #sticky table');
	 *  
	 * // if new table is not empty and contains DIV elements then they should be enabled also
	 * // DIV elements in "drag" container are enabled by default
	 * REDIPS.drag.initTables('#drag table, #sticky table');
	 * REDIPS.drag.enableDrag(true, '#sticky div');
	 * @param {String} [selector] Defines selector for table search (default id "#drag table").
	 * @public
	 * @function
	 * @name REDIPS.drag#initTables
	 */
	initTables = function (selector) {
		var	i, j, k,			// loop variables
			tblSelector,		// table selectors
			element,			// used in searhing parent nodes of found tables below div id="drag"
			level,				// (integer) 0 - ground table, 1 - nested table, 2 - nested nested table, 3 - nested nested nested table ...
			groupIdx,			// tables group index (ground table and its nested tables will have the same group)
			tableNodeList,		// nodelist of tables found inside defined selectors (querySelector returns node list and it's not alive)
			nestedTables,		// nested tables nodelist (search for nested tables for every "ground" table)
			tdNodeList,			// td nodeList (needed for search rowspan attribute)
			rowspan;			// flag to set if table contains rowspaned cells
		// empty tables array
		// http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript
		tables.length = 0;
		// if selector is undefined then use reference of current drag container
		if (selector === undefined) {
			tableNodeList = dragContainer.getElementsByTagName('table');
		}
		// otherwise prepare tables node list based on defined selector
		// node list returned by querySelectorAll is not alive
		else {
			tableNodeList = document.querySelectorAll(selector);
		}
		// loop through tables and define table sort parameter
		for (i = 0, j = 0; i < tableNodeList.length; i++) {
			// skip table if table belongs to the "redipsClone" container (possible for cloned rows - if initTables() is called after rowClone())
			// or table has "nolayout" className
			if (tableNodeList[i].parentNode.id === 'redips_clone' || tableNodeList[i].className.indexOf('nolayout') > -1) {
				continue;
			}
			// set start element for "do" loop
			element = tableNodeList[i].parentNode;
			// set initial value for nested level
			level = 0;
			// go up through DOM until DIV id="drag" found (drag container)
			do {
				// if "TD" found then this is nested table
				if (element.nodeName === 'TD') {
					// increase nested level
					level++;
				}
				// go one level up
				element = element.parentNode;
			} while (element && element !== dragContainer);
			// copy table reference to the static list
			tables[j] = tableNodeList[i];
			// create a "property object" in which all custom properties will be saved (if "redips" property doesn't exist)
			if (!tables[j].redips) {
				tables[j].redips = {};
			}
			// set redips.container to the table (needed in case when row is cloned)
			// ATTENTION! Here is needed additional work because table outside div#drag can be added to the "tables" array ...
			tables[j].redips.container = dragContainer;
			// set nested level (needed for sorting in "tables" array)
			// level === 0 - means that this is "ground" table ("ground" table may contain nested tables)
			tables[j].redips.nestedLevel = level;
			// set original table index (needed for sorting "tables" array to the original order in saveContent() function)
			tables[j].redips.idx = j;
			// define animationCounter per table
			animationCounter[j] = 0;
			// prepare td nodeList of current table
			tdNodeList = tables[j].getElementsByTagName('td');
			// loop through nodeList and search for rowspaned cells
			for (k = 0, rowspan = false; k < tdNodeList.length; k++) {
				// if only one rowspaned cell is found set flag to "true" and break loop
				if (tdNodeList[k].rowSpan > 1) {
					rowspan = true;
					break;
				}
			}
			// set redips.rowspan flag - needed in setTableRowColumn()
			tables[j].redips.rowspan = rowspan;
			// increment j counter
			j++;
		}
		/*
		 * define "redips.nestedGroup" and initial "redips.sort" parameter for each table
		 * 
		 * for example if drag area contains two tables and one of them has nested tables then this code will create two groups
		 * with the following redips.sort values: 100, 200, and 201
		 * 100 - "ground" table of the first group
		 * 200 - "ground" table of the second group
		 * 201 - nested table of the second table group
		 * 
		 * this means that nested table of second group will always be sorted before its "ground" table
		 * after clicking on DIV element in "ground" table of second group or nested table in second group array order will be: 201, 200 and 100
		 * after clicking on DIV element in "ground" table of first group array order will be: 100, 201, 200
		 * 
		 * actually, sortIdx will be increased and sorted result will be: 300, 201, 200
		 * and again clicking on element in nested table sorted result will be: 401, 400, 300 
		 * and so on ...
		 */
		for (i = 0, groupIdx = sortIdx = 1; i < tables.length; i++) {
			// if table is "ground" table (lowest level) search for nested tables
			if (tables[i].redips.nestedLevel === 0) {
				// set group index for ground table and initial sort index
				tables[i].redips.nestedGroup = groupIdx;
				tables[i].redips.sort = sortIdx * 100;
				// search for nested tables (if there is any)
				nestedTables = tables[i].getElementsByTagName('table');
				// open loop for every nested table
				for (j = 0; j < nestedTables.length; j++) {
					// skip table if table contains "nolayout" className
					if (nestedTables[j].className.indexOf('nolayout') > -1) {
						continue;
					}
					// set group index and initial sort index
					nestedTables[j].redips.nestedGroup = groupIdx;
					nestedTables[j].redips.sort = sortIdx * 100 + nestedTables[j].redips.nestedLevel;
				}
				// increase group index and sort index (sortIdx is private parameter of REDIPS.drag)
				groupIdx++;
				sortIdx++;
			}
		}
	};


	/**
	 * onmousedown event handler.
	 * This event handler is attached to every DIV element in drag container (please see "enableDrag").
	 * @param {Event} e Event information.
	 * @see <a href="#enableDrag">enableDrag</a>
	 * @see <a href="#add">handlerOnDblClick</a>
	 * @see <a href="#add_events">add_events</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	handlerOnMouseDown = function (e) {
		var evt = e || window.event,	// define event (cross browser)
			offset,						// object offset
			mouseButton,				// start drag if left mouse button is pressed
			position,					// position of table or container box of table (if has position:fixed then exclude scroll offset)
			X, Y;						// X and Y position of mouse pointer
		// if current DIV element is animated, then disable dragging of this element
		if (this.redips.animated === true) {
			return true;
		}
		// stop event propagation (only first clicked element will register onmousedown event)
		// needed in case of placing table inside of <div class="drag"> (after element was dropped to this table it couldn't be moved out
		// any more - table and element moved together because table captures mousedown event also in bubbling proces)
		evt.cancelBubble = true;
		if (evt.stopPropagation) {
			evt.stopPropagation();
		}
		// set true or false if shift key is pressed
		shiftKey = evt.shiftKey;
		// define which mouse button was pressed
		if (evt.which) {
			mouseButton = evt.which;
		}
		else {
			mouseButton = evt.button;
		}
		// exit from event handler if:
		// 1) control should pass to form elements and links
		// 2) device is not touch device and left mouse button is not pressed
		if (elementControl(evt) || (!evt.touches && mouseButton !== 1)) {
			return true;
		}
		// remove text selection (Chrome, FF, Opera, Safari)
		if (window.getSelection) {
			window.getSelection().removeAllRanges();
		}
		// IE8
		else if (document.selection && document.selection.type === "Text") {
			try {
				document.selection.empty();
			}
			catch (error) {
				// ignore error to as a workaround for bug in IE8
			}
		}
		// define X and Y position (pointer.x and pointer.y are needed in setTableRowColumn() and autoscroll methods) for touchscreen devices
		if (evt.touches) {
			X = pointer.x = evt.touches[0].clientX;
			Y = pointer.y = evt.touches[0].clientY;
		}
		// or for monitor + mouse devices
		else {
			X = pointer.x = evt.clientX;
			Y = pointer.y = evt.clientY;
		}
		// set initial threshold position (needed for calculating distance)
		threshold.x = X;
		threshold.y = Y;
		threshold.flag = false;
		// remember previous object if defined or set to the clicked object
		REDIPS.drag.objOld = objOld = obj || this;
		// set reference to the clicked object
		REDIPS.drag.obj = obj = this;
		// set true or false if clicked element contains "clone" class name (needed for clone element and clone table row)
		cloneClass = obj.className.indexOf('clone') > -1 ? true : false;
		// if tableSort is set to true (this is default) then set current table group in "tables" array to the array top
		// tableTop() should go before definition of "mode" property
		if (REDIPS.drag.tableSort) {
			tableTop(obj);
		}
		// if clicked element doesn't belong to the current container then environment should be changed
		if (dragContainer !== obj.redips.container) {
			dragContainer = obj.redips.container;
			initTables();
		}
		// define drag mode ("cell" or "row")
		// mode definition should be after:
		// tableTop() - because "obj" is rewritten with table row reference
		// initTables() - because "obj" is rewritten with table row reference and row doesn't have defined redips.container property
		if (obj.className.indexOf('row') === -1) {
			REDIPS.drag.mode = mode = 'cell';
		}
		else {
			REDIPS.drag.mode = mode = 'row';
			// just return reference of the current row (do not clone)
			REDIPS.drag.obj = obj = rowClone(obj);
		}
		// if user has used a mouse event to increase the dimensions of the table - call calculateCells() 
		calculateCells();
		// set high z-index if object isn't "clone" type (clone object is motionless) for "cell" mode only
		if (!cloneClass && mode === 'cell') {
			// http://foohack.com/2007/10/top-5-css-mistakes/ (how z-index works)
			obj.style.zIndex = 999;
		}
		// reset table row and cell indexes (needed in case of enable / disable tables)
		table = row = cell = null;
		// set current table, row and cell and remember source position (old position is initially the same as source position) 
		setTableRowColumn();
		table_source = table_old = table;
		row_source = row_old = row;
		cell_source = cell_old = cell;
		// define source cell, current cell and previous cell (needed for event handlers)
		REDIPS.drag.td.source = td.source = findParent('TD', obj);
		REDIPS.drag.td.current = td.current = td.source;
		REDIPS.drag.td.previous = td.previous = td.source;
		// call event.clicked for table content
		if (mode === 'cell') {
			REDIPS.drag.event.clicked(td.current);
		}
		// or for table row
		else {
			REDIPS.drag.event.rowClicked(td.current);
		}
		// if start position cannot be defined then user probably clicked on element that belongs to the disabled table
		// (or something else happened that was not supposed to happen - every element should belong to the table)
		// this code must go after execution of event handlers
		if (table === null || row === null || cell === null) {
			// rerun setTableRowColumn() again because some of tables might be enabled in handler events above
			setTableRowColumn();
			table_source = table_old = table;
			row_source = row_old = row;
			cell_source = cell_old = cell;
			// no, clicked element is on the disabled table - sorry
			if (table === null || row === null || cell === null) { 
				return true;
			}
		}
		// reset "moved" flag (needed for clone object in handlerOnMouseMove) and "cloned" flag
		moved = cloned = false;
		// activate onmousemove and ontouchmove event handlers on document object
		REDIPS.event.add(document, 'mousemove', handlerOnMouseMove);
		REDIPS.event.add(document, 'touchmove', handlerOnMouseMove);
		// activate onmouseup and ontouchend event handlers on document object
		REDIPS.event.add(document, 'mouseup', handlerOnMouseUp);
		REDIPS.event.add(document, 'touchend', handlerOnMouseUp);
		// get IE (all versions) to allow dragging outside the window (?!)
		// http://stackoverflow.com/questions/1685326/responding-to-the-onmousemove-event-outside-of-the-browser-window-in-ie
		if (obj.setCapture) {
			obj.setCapture();
		}
		// remember background color if is possible
		if (table !== null && row !== null && cell !== null) {
			bgStyleOld = getTdStyle(table, row, cell);
		}
		// set table CSS position (needed for exclusion "scroll offset" if table box has position fixed)
		position = getStyle(tables[table_source], 'position');
		// if table doesn't have style position:fixed then table container should be tested 
		if (position !== 'fixed') {
			position = getStyle(tables[table_source].parentNode, 'position');
		}
		// define object offset
		offset = boxOffset(obj, position);
		// calculate offset from the clicked point inside element to the
		// top, right, bottom and left side of the element
		objMargin = [Y - offset[0], offset[1] - X, offset[2] - Y, X - offset[3]];
		// dissable text selection (but not for links and form elements)
		// onselectstart is supported by IE browsers, other browsers "understand" return false in onmousedown handler
		dragContainer.onselectstart = function (e) {
			evt = e || window.event;
			if (!elementControl(evt)) {
				// this lines are needed for IE8 in case when leftmouse button was clicked and SHIFT key was pressed
				// IE8 selected text anyway but document.selection.clear() prevented text selection
				if (evt.shiftKey) {
					document.selection.clear();
				}
			    return false;
			}
		};
		// disable text selection for non IE browsers
		return false;
	};


	/**
	 * ondblclick handler event handler.
	 * This event handler is attached to every DIV element in drag container (please see "enableDrag").
	 * @param {Event} e Event information.
	 * @see <a href="#enableDrag">enableDrag</a>
	 * @see <a href="#handlerOnMouseDown">handlerOnMouseDown</a>
	 * @see <a href="#add_events">add_events</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	handlerOnDblClick = function (e) {
		// call custom event handler
		REDIPS.drag.event.dblClicked();
	};

 
	/**
	 * Method sets current table group in "tables" array to the array top ("tables" array is sorted).
	 * The purpose is to enable tables nesting and to improve perfomance. Tables closer to the top of the array will be scanned before other tables in array.
	 * This method is called from "handlerOnMouseDown" on every DIV element click.
	 * DIV element belongs to the table and this table group ("ground" table + its nested tables) should go to the array top.
	 * @param {HTMLElement} obj Clicked DIV element (table of the clicked DIV element will be sorted to the array top).
	 * @see <a href="#handlerOnMouseDown">handlerOnMouseDown</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	tableTop = function (obj) {
		var	e,		// element
			i,		// loop variable
			tmp,	// temporary storage (needed for exchanging array members)
			group;	// tables group
		// find table for clicked DIV element
		e = findParent('TABLE', obj);
		// set tables group
		group = e.redips.nestedGroup;
		// set highest "redips.sort" parameter to the current table group
		for (i = 0; i < tables.length; i++) {
			// "ground" table is table with lowest level hierarchy and with its nested tables creates table group
			// nested table will be sorted before "ground" table
			if (tables[i].redips.nestedGroup === group) {
				tables[i].redips.sort = sortIdx * 100 + tables[i].redips.nestedLevel; // sort = sortIdx * 100 + level
			}
		}
		// sort "tables" array according to redips.sort (tables with higher redips.sort parameter will go to the array top)
		tables.sort(function (a, b) {
			return b.redips.sort - a.redips.sort;
		});
		// increase sortIdx
		sortIdx++;
	};


	/**
	 * Methods returns reference to the table row or clones table row.
	 * If called from handlerOnMouseDown:
	 * <ul>
	 * <li>input parameter is DIV class="row"</li>
	 * <li>method will return reference of the current row</li>
	 * </ul>
	 * If called from handlerOnMouseMove:
	 * <ul>
	 * <li>input parameter is TR (current row) - previously returned with this function</li>
	 * <li>method will clone current row and return reference of the cloned row</li>
	 * </ul>
	 * If called from moveObject:
	 * <ul>
	 * <li>input parameter is TR (row to animate)</li>
	 * <li>method will clone row and return reference of the cloned row</li>
	 * </ul> 
	 * @param {HTMLElement} el DIV class="row" or TR (current row)
	 * @param {String} [row_mode] If set to "animated" then search for last row will not include search for "rowhandler" DIV element.
	 * @return {HTMLElement} Returns reference of the current row or clone current row and return reference of the cloned row.
	 * @see <a href="#handlerOnMouseDown">handlerOnMouseDown</a>
	 * @see <a href="#handlerOnMouseMove">handlerOnMouseMove</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	rowClone = function (el, row_mode) {
		var tableMini,			// original table is cloned and all rows except picked row are deleted
			offset,				// offset of source TR
			rowObj,			// reference to the row object
			last_idx,			// last row index in cloned table
			emptyRow,			// (boolean) flag indicates if dragged row is last row and should be marked as "empty row"
			cr,					// current row (needed for searc if dragged row is last row)
			div,				// reference to the <DIV class="drag row"> element
			i, j;				// loop variables
		// 1) rowClone call in onmousedown will return reference of TR element (input parameter is HTMLElement <div class="drag row">)
		if (el.nodeName === 'DIV') {
			// remember reference to the <DIV class="drag row">
			div = el;
		    // find parent TR element
			el = findParent('TR', el);
			// create a "property object" in which all custom properties will be saved (it is only one property for now)
			if (el.redips === undefined) {
				el.redips = {};
			}
			// save reference to the DIV element as redips.div
			// this will mostly be referenced as objOld.redips.div (because objOld in row dragging context is reference to the source row)
			el.redips.div = div;
			// return reference to the TR element
			return el;
		}
		// 2) rowClone call in onmousemove will clone current row (el.nodeName === 'TR')
		else {
			// remember source row
			rowObj = el;
			// if redips object doesn't exist (possible if rowClone() is called from moveObject() method) then create initialize redips object on TR element
			if (rowObj.redips === undefined) {
				rowObj.redips = {};
			}
		    // find parent table
			el = findParent('TABLE', el);
			// before cloning, cut out "clone" class name from <div class="drag row clone"> element if needed
			if (cloneClass && cloned) {
				// set reference to the <div class="drag row clone"> element
				div = rowObj.redips.div;
				// no more cloning, cut "clone" from class names
				div.className = normalize(div.className.replace('clone', ''));
			}
			// clone whole table
			tableMini = el.cloneNode(true);
			// return "clone" to the source element
			if (cloneClass && cloned) {
				div.className = div.className + ' clone';
			}
			// find last row index in cloned table
			last_idx = tableMini.rows.length - 1;
			// if row mode is "animated" then definition of last row in table is simple
			if (row_mode === 'animated') {
				if (last_idx === 0) {
					emptyRow = true;
				}
				else {
					emptyRow = false;
				}
			}
			// else set initially emptyRow to true (it can be set to false in lower loop) 
			else {
				emptyRow = true;
			}
		    // test if dragged row is the last row and delete all rows but current row
			// the trick is to find rowhandler in cells except current cell and that's fine for user interface
			// if rows are animated, then "rowhandler" cells don't have to exsist and user should take care about marking last row as "empty row"
			for (i = last_idx; i >= 0; i--) {
				// if row is not the current row
				if (i !== rowObj.rowIndex) {
					// search for "rowhandler cell" in table row if row mode is not "animated" (user drags row)
					// this lines are skipped in case of animated mode (
					if (emptyRow === true && row_mode === undefined) {
						// set current row
						cr = tableMini.rows[i];
						// open loop to go through each cell
						for (j = 0; j < cr.cells.length; j++) {
							// if table cell contains "rowhandler" class name then dragged row is not the last row in table
							if (cr.cells[j].className.indexOf('rowhandler') > -1) {
								emptyRow = false;
								break;
							}
						}
						
					}
					// delete row (it should go after searching for "rowhandler" class name)
					tableMini.deleteRow(i);
				}
			}
			// if row is not cloned then set emptyRow property
			// cloned row always leaves original row in the table so emptyRow property should stay as it was before clone operation
			if (!cloned) {
				// set emptyRow flag to the current row
				// * needed in rowDrop() for replacing this row with dropped row
				// * needed in setTableRowColumn() to disable dropping DIV elements to the empty row
				rowObj.redips.emptyRow = emptyRow;
			}
			// create a "property object" in which all custom properties will be saved
			tableMini.redips = {};
			// set reference to the redips.container (needed if moveObject() moves elements in other container)
			tableMini.redips.container = el.redips.container;
			// save source row reference (needed for source row deletion in rowDrop method)
			tableMini.redips.sourceRow = rowObj;
			// set form values in cloned row (to prevent reset values of form elements)
			formElements(rowObj, tableMini.rows[0]);
			// copy custom properties to all child DIV elements and set onmousedown/ondblclick event handlers
			copyProperties(rowObj, tableMini.rows[0]);
			// append cloned mini table to the DIV id="redips_clone"
			document.getElementById('redips_clone').appendChild(tableMini);
			// include scroll position in offset
			offset = boxOffset(rowObj, 'fixed');
			// set position and position type
			tableMini.style.position = 'fixed';
			tableMini.style.top = offset[0] + "px";
			tableMini.style.left = offset[3] + "px";
			// define width of mini table
			tableMini.style.width = (offset[1] - offset[3]) + "px";
			// return reference of mini table
			return tableMini;
		}
	};


	/**
	 * Method drops table row to the target row and calls user event handlers. Source row is deleted and cloned row is inserted at the new position.
	 * Method takes care about the last row in the table only if user drags element. In case of moving rows with moveObject(), control
	 * and logic for last row is turned off. This method is called from handlerOnMouseUp() and animation().
	 * @param {Integer} tableIdx Table index.
	 * @param {Integer} rowIdx Row index.
	 * @param {HTMLElement} [tableMini] Reference to the mini table (table that contains only one row). This is actually clone of source row.
	 * @see <a href="#rowClone">rowClone</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	rowDrop = function (tableIdx, rowIdx, tableMini) {
		// local variables
		var animated = false,	// (boolean) flag shows if row is animated or dragged by user
			drop,				// (boolean) if false then dropping row will be canceled
			trMini,				// reference to the TR in mini table
			source = {},		// object contains: source table reference, source row reference, source row index and source table section (parent of row)
			target = {},		// object contains: target table reference, target row reference and target table section (parent of row)
			deleteTableRow;		// delete row (private method)
		// delete table row - input paremeter is row reference (private method)
		deleteTableRow = function (el) {
			var tbl;
			// if row doesn't have custom "redips" property or is not marked as empty, then it can be deleted
			if (el.redips === undefined || !el.redips.emptyRow) {
				tbl = findParent('TABLE', el);
				tbl.deleteRow(el.rowIndex);
			}
			// else, row is marked as "empty" and it will be only colored (not deleted)
			// content of table cells will be deleted and background color will be set to default color
			else {
				rowOpacity(el, 'empty', REDIPS.drag.style.rowEmptyColor);
			}
		};
		// if tableMini is not defined, then rowDrop() is called from handlerOnMouseUp() and set reference to the currently dragged row - mini table
		if (tableMini === undefined) {
			tableMini = obj;
		}
		// otherwise, rowDrop() is called from animation() (because third input parameter is set)
		// in that case set animated flag to true to turn off "last row" logic
		else {
			animated = true;
		}
		// define source data: row, row index, table and table section (needed for "switch" rowDropMode)
		source.row = tableMini.redips.sourceRow;
		source.rowIndex = source.row.rowIndex;
		source.table = findParent('TABLE', source.row);
		source.tableSection = source.row.parentNode;
		// define target data: row, row index, table and table section
		target.table = tables[tableIdx];
		// if row index is out of bounds, then set max row index (row will be appended to the table bottom)
		if (rowIdx > target.table.rows.length - 1) {
			rowIdx = target.table.rows.length - 1;
		}
		target.row = target.table.rows[rowIdx];
		target.rowIndex = rowIdx;
		target.tableSection = target.row.parentNode;
		// set reference to the TR in mini table (mini table has only one row - first row)
		trMini = tableMini.getElementsByTagName('tr')[0];
		// destroy mini table (node still exists in memory)
		tableMini.parentNode.removeChild(tableMini);
		// call event.rowDroppedBefore() - this handler can return "false" value
		drop = REDIPS.drag.event.rowDroppedBefore(source.table, source.rowIndex);
		// if handler returned false then row dropping will be canceled
		if (drop !== false) {
			// row is moved to the "trash"
			if (!animated && td.target.className.indexOf(REDIPS.drag.trash.className) > -1) {
				// test if cloned row is directly dropped to the "trash" cell (call rowDeleted event handler)
				if (cloned) {
					REDIPS.drag.event.rowDeleted();
				}
				// row is not cloned
				else {
					// if trash.questionRow is set then user should should confirm delete row action
					if (REDIPS.drag.trash.questionRow) {
						// ask user if is sure
						if (confirm(REDIPS.drag.trash.questionRow)) {
							// delete source row and call rowDeleted event handler
							deleteTableRow(source.row);
							REDIPS.drag.event.rowDeleted();
						}
						// user is not sure - undelete
						else {
							// delete emptyRow property from source row because emptyRow will be set on next move
							// otherwise row would be overwritten and that's no good
							delete objOld.redips.emptyRow;
							// just call undeleted handler
							REDIPS.drag.event.rowUndeleted();
						}
					}
					// trask_ask_row is set to "false" - source row can be deleted
					else {
						// delete source row and call rowDeleted event handler
						deleteTableRow(source.row);
						REDIPS.drag.event.rowDeleted();
					}
				}
			}
			// normal row move
			else {
				// if row is not dropped to the last row position
				if (target.rowIndex < target.table.rows.length) {
					// if source and target rows are from the same table
					if (table === table_source) {
						// row is dropped above source position from the same table
						if (source.rowIndex > target.rowIndex) {
							target.tableSection.insertBefore(trMini, target.row);
						}
						// row is dropped to the lower position in the same table
						else {
							target.tableSection.insertBefore(trMini, target.row.nextSibling);
						}
					}
					// row is dropped to other table and will be placed after highlighted row
					else if (REDIPS.drag.rowDropMode === 'after') {
						target.tableSection.insertBefore(trMini, target.row.nextSibling);
					}
					// row is dropped to other table and will be placed before highlighted row
					// this code will be executed in case of "before", "switch" and "overwrite" row drop mode (when dropping row to other table)
					else {
						target.tableSection.insertBefore(trMini, target.row);
					}
				}
				// row is dropped to the last row position
				// it's possible to set target row index greater then number of rows - in this case row will be appended to the table end
				else {
					// row should be appended
					target.tableSection.appendChild(trMini);
					// set reference to the upper row
					// after row is appended, upper row should be tested if contains "emptyRow" set to true  
					// this could happen in case when row is moved to the table with only one empty row
					target.row = target.table.rows[0];
				}
				// if table contains only "empty" row then this row should be deleted after inserting or appending to such table
				if (target.row && target.row.redips && target.row.redips.emptyRow) {
					target.table.deleteRow(target.row.rowIndex);
				}
				// in case of "overwrite", delete target row
				else if (REDIPS.drag.rowDropMode === 'overwrite') {
					deleteTableRow(target.row);
				}
				// insert target row to source location and delete source row (if row is not cloned)
				else if (REDIPS.drag.rowDropMode === 'switch' && !cloned) {
					source.tableSection.insertBefore(target.row, source.row);
					// delete emptyRow flag to the source row (needed in case when switching last row from table2 to table1)
					if (source.row.redips !== undefined) {
						delete source.row.redips.emptyRow;
					}
				}
				// delete source row if called from animation() or row is not cloned
				if (animated || !cloned) {
					deleteTableRow(source.row);
				}
				// delete emptyRow property from inserted/appended row because emptyRow will be set on next move
				// copyProperties() in rowClone() copied emptyRow property to the row in tableMini
				// otherwise row will be overwritten and that is not good
				delete trMini.redips.emptyRow;
				// call rowDropped event handler if rowDrop() was not called from animation()
				if (!animated) {
					REDIPS.drag.event.rowDropped(trMini, source.table, source.rowIndex);
				}
			} // end normal row move
			// if row contains TABLE(S) then recall initTables() to properly initialize tables array and set custom properties
			// no matter if row was moved or deleted
			if (trMini.getElementsByTagName('table').length > 0) {
				initTables();
			}
		}
		// event.rowDroppedBefore() returned "false" (it's up to user to return source row opacity to its original state) 
		else {
			// rowOpacity(objOld, 100);
		}
	};


	/**
	 * Method sets form values after cloning table row. Method is called from rowClone.
	 * cloneNode() should take care about form values when performing deep cloning - but some browsers have a problem.
	 * This method will fix checkboxes, selected indexes and so on when dragging table row (values in form elements will be preserved).
	 * @param {HTMLElement} str Source table row.
	 * @param {HTMLElement} ctr Cloned table row. Table row is cloned in a moment of dragging.
	 * @see <a href="#rowClone">rowClone</a>
	 * @private
	 * @memberOf REDIPS.drag# 
	 */
	formElements = function (str, ctr) {
		// local variables
		var i, j, k, type,
			src = [],	// collection of form elements from source row
			cld = [];	// collection of form elements from cloned row
		// collect form elements from source row
		src[0] = str.getElementsByTagName('input');
		src[1] = str.getElementsByTagName('textarea');
		src[2] = str.getElementsByTagName('select');
		// collect form elements from cloned row
		cld[0] = ctr.getElementsByTagName('input');
		cld[1] = ctr.getElementsByTagName('textarea');
		cld[2] = ctr.getElementsByTagName('select');
		// loop through found form elements in source row
		for (i = 0; i < src.length; i++) {
			for (j = 0; j < src[i].length; j++) {
				// define element type
				type = src[i][j].type;
				switch (type) {
				case 'text':
				case 'textarea':
				case 'password':
					cld[i][j].value = src[i][j].value;
					break;
				case 'radio':
				case 'checkbox':
					cld[i][j].checked = src[i][j].checked;
					break;
				case 'select-one':
					cld[i][j].selectedIndex = src[i][j].selectedIndex;
					break;
				case 'select-multiple':
					for (k = 0; k < src[i][j].options.length; k++) {
						cld[i][j].options[k].selected = src[i][j].options[k].selected;
					}
					break;
				} // end switch
			} // end for j
		} // end for i
	};


	/**
	 * onmouseup event handler.
	 * handlerOnMouseUp is attached to the DIV element in a moment when DIV element is clicked (this happens in handlerOnMouseDown).
	 * This event handler detaches onmousemove and onmouseup event handlers.
	 * @param {Event} e Event information.
	 * @see <a href="#handlerOnMouseDown">handlerOnMouseDown</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	handlerOnMouseUp = function (e) {
		var evt = e || window.event,	// define event (FF & IE)
			target_table,				// needed for test if cloned element is dropped outside table
			r_table, r_row,				// needed for mode="row"
			mt_tr,						// needed for returning color to the table cell (mt_tr - "mini table" "table_row")
			X, Y,						// X and Y position of mouse pointer
			i,							// used in local loop
			drop,						// if false then dropped DIV element (in case of dropMode="switch") will be canceled
			// define target elements and target elements length needed for switching table cells
			// target_elements_length is needed because nodeList objects in the DOM are live 
			// please see http://www.redips.net/javascript/nodelist-objects-are-live/
			target_elements, target_elements_length;
		// define X and Y position
		X = evt.clientX;
		Y = evt.clientY;
		// turn off autoscroll "current cell" handling (if user mouseup in the middle of autoscrolling)
		edge.flag.x = edge.flag.y = 0;
		// remove mouse capture from the object in the current document
		// get IE (all versions) to allow dragging outside the window (?!)
		// http://stackoverflow.com/questions/1685326/responding-to-the-onmousemove-event-outside-of-the-browser-window-in-ie
		if (obj.releaseCapture) {
			obj.releaseCapture();
		}
		// detach mousemove and touchmove event handlers on document object
		REDIPS.event.remove(document, 'mousemove', handlerOnMouseMove);
		REDIPS.event.remove(document, 'touchmove', handlerOnMouseMove);
		// detach mouseup and touchend event handlers on document object
		REDIPS.event.remove(document, 'mouseup', handlerOnMouseUp);
		REDIPS.event.remove(document, 'touchend', handlerOnMouseUp);
		// detach dragContainer.onselectstart handler to enable select for IE7/IE8 browser 
		dragContainer.onselectstart = null;
		// reset object styles
		resetStyles(obj);
		// document.body.scroll... only works in compatibility (aka quirks) mode,
		// for standard mode, use: document.documentElement.scroll...
		scrollData.width  = document.documentElement.scrollWidth;
		scrollData.height = document.documentElement.scrollHeight;	
		// reset autoscroll flags
		edge.flag.x = edge.flag.y = 0;
		// this could happen if "clone" element is placed inside forbidden table cell
		if (cloned && mode === 'cell' && (table === null || row === null || cell === null)) {
			obj.parentNode.removeChild(obj);
			// decrease clonedId counter
			clonedId[objOld.id] -= 1;
			REDIPS.drag.event.notCloned();
		}
		// if DIV element was clicked and left button was released, but element is placed inside unmovable table cell
		else if (table === null || row === null || cell === null) {
			REDIPS.drag.event.notMoved();
		}	
		else {
			// if current table is in range, use table for current location
			if (table < tables.length) {
				target_table = tables[table];
				REDIPS.drag.td.target = td.target = target_table.rows[row].cells[cell];
				// set background color for destination cell (cell had hover color)
				setTdStyle(table, row, cell, bgStyleOld);
				// set r_table & r_row (needed for mode === "row")
				r_table = table;
				r_row = row;
			}
			// if any level of old position is undefined, then use source location
			else if (table_old === null || row_old === null || cell_old === null) {
				target_table = tables[table_source];
				REDIPS.drag.td.target = td.target = target_table.rows[row_source].cells[cell_source];
				// set background color for destination cell (cell had hover color)
				setTdStyle(table_source, row_source, cell_source, bgStyleOld);
				// set r_table & r_row (needed for mode === "row")
				r_table = table_source;
				r_row = row_source;
			}
			// or use the previous location
			else {
				target_table = tables[table_old];
				REDIPS.drag.td.target = td.target = target_table.rows[row_old].cells[cell_old];
				// set background color for destination cell (cell had hover color)
				setTdStyle(table_old, row_old, cell_old, bgStyleOld);
				// set r_table & r_row (needed for mode === "row")
				r_table = table_old;
				r_row = row_old;
			}
			// if dragging mode is table row
			if (mode === 'row') {
				// row was clicked and mouse button was released right away (row was not moved)
				if (!moved) {
					REDIPS.drag.event.rowNotMoved();
				}
				// row was moved
				else {
					// and dropped to the source row
					if (table_source === r_table && row_source === r_row) {
						// reference to the TR in mini table (mini table has only one row)
						mt_tr = obj.getElementsByTagName('tr')[0];
						// return color to the source row from the row of cloned mini table
						// color of the source row can be changed in event.rowMoved() (when user wants to mark source row)
						objOld.style.backgroundColor = mt_tr.style.backgroundColor;
						// return color to the each table cell
						for (i = 0; i < mt_tr.cells.length; i++) {
							objOld.cells[i].style.backgroundColor = mt_tr.cells[i].style.backgroundColor;
						}
						// remove cloned mini table
						obj.parentNode.removeChild(obj);
						// delete emptyRow property from source row because emptyRow will be set on next move
						// otherwise row would be overwritten and that's no good
						delete objOld.redips.emptyRow;
						// if row was cloned and dropped to the source location then call rowNotCloned event handler
						if (cloned) {
							REDIPS.drag.event.rowNotCloned();
						}
						// call event.rowDroppedSource() event handler
						else {
							REDIPS.drag.event.rowDroppedSource(td.target);
						}
					}
					// and dropped to the new row
					else {
						rowDrop(r_table, r_row);
					}	
				}
			}
			// clicked element was not moved - DIV element didn't cross threshold value
			// just call event.notMoved event handler
			else if (!cloned && !threshold.flag) {
				REDIPS.drag.event.notMoved();
			}
			// delete cloned element if dropped on the start position
			else if (cloned && table_source === table && row_source === row && cell_source === cell) {
				obj.parentNode.removeChild(obj);
				// decrease clonedId counter
				clonedId[objOld.id] -= 1;
				REDIPS.drag.event.notCloned();
			}
			// delete cloned element if dropped outside current table and clone.drop is set to false
			else if (cloned && REDIPS.drag.clone.drop === false &&
					(X < target_table.redips.offset[3] || X > target_table.redips.offset[1] ||
					Y < target_table.redips.offset[0] || Y > target_table.redips.offset[2])) {
				obj.parentNode.removeChild(obj);
				// decrease clonedId counter
				clonedId[objOld.id] -= 1;
				REDIPS.drag.event.notCloned();
			}
			// remove object if destination cell has "trash" in class name
			else if (td.target.className.indexOf(REDIPS.drag.trash.className) > -1) {
				// remove child from DOM (node still exists in memory)
				obj.parentNode.removeChild(obj);
				// if public property trash.question is set then ask for confirmation
				if (REDIPS.drag.trash.question) {
					setTimeout(function () {
						// Are you sure?
						if (confirm(REDIPS.drag.trash.question)) {
							// yes, do all actions needed after element is deleted
							elementDeleted();
						}
						// no, do undelete
						else {
							// undelete DIV element
							if (!cloned) {
								// append removed object to the source table cell
								tables[table_source].rows[row_source].cells[cell_source].appendChild(obj);
								// and recalculate table cells because undelete can change row dimensions 
								calculateCells();
							}
							// call undeleted event handler
							REDIPS.drag.event.undeleted();	
						}
					}, 20);
				}
				// element is deleted and do all actions needed after element is deleted
				else {
					elementDeleted();
				}
			}
			else if (REDIPS.drag.dropMode === 'switch') {
				// call event.droppedBefore event handler
				drop = REDIPS.drag.event.droppedBefore(td.target);
				// if returned value is false then only call elementDrop with input parameter "false" to delete cloned element (if needed)
				// dragged DIV element will be returned to the initial position
				if (drop === false) {
					elementDrop(false);
				}
				// normal procedure for "switch" drag option
				else {
					// remove dragged element from DOM (source cell) - node still exists in memory
					obj.parentNode.removeChild(obj);
					// move object from the destination to the source cell
					target_elements = td.target.getElementsByTagName('div');
					target_elements_length = target_elements.length;
					for (i = 0; i < target_elements_length; i++) {
						// sourceCell is defined in onmouseup
						if (target_elements[0] !== undefined) { //fixes issue with nested DIVS
							// save reference of switched element in REDIPS.drag.objOld property
							// '0', not 'i' because NodeList objects in the DOM are live
							REDIPS.drag.objOld = objOld = target_elements[0];
							// append objOld to the source cell
							td.source.appendChild(objOld);
							// register event listeners (FIX for Safari Mobile)
							// it seems that Safari Mobile loses registrated events (traditional model) assigned to the DIV element (other browsers work just fine without this line)
							registerEvents(objOld);
						}
					}
					// elementDrop() should be called before event.switched() otherwise targetCell will be undefined
					elementDrop();
					// if destination element exists, then elements will be switched
					if (target_elements_length) {
						// call event.switched because cloneLimit could call event.clonedEnd1 or event.clonedEnd2
						REDIPS.drag.event.switched();
					}
				}
			}
			// overwrite destination cell with dragged content 
			else if (REDIPS.drag.dropMode === 'overwrite') {
				// call event.droppedBefore event handler
				drop = REDIPS.drag.event.droppedBefore(td.target);
				// if event handler didn't return "false" then proceed normaly (otherwise dropped element will be returned to the source table cell)
				if (drop !== false) {
					// empty target cell
					emptyCell(td.target);
				}
				// drop element to the table cell (or delete cloned element if drop="false")
				elementDrop(drop);
			}
			// else call event.droppedBefore(), append object to the cell and call event.dropped() 
			else {
				// call event.droppedBefore event handler
				drop = REDIPS.drag.event.droppedBefore(td.target);
				// drop element to the table cell (or delete cloned element if drop="false")
				elementDrop(drop);
			}
			// force naughty browsers (IE6, IE7 ...) to redraw source and destination row (element.className = element.className does the trick)
			// but careful (table_source || row_source could be null if clone element was clicked in denied table cell)
			//
			// today we are in era of FF5, IE9 ... so maybe this lines were not needed any more (first I will comment them out and if nobody will complain
			// then they will be deleted completely)
			/*
			if (table_source !== null && row_source !== null && tables[table_source].rows[row_source] !== undefined) {
				tables[table_source].rows[row_source].className = tables[table_source].rows[row_source].className;
			}
			targetCell.parentNode.className = targetCell.parentNode.className;
			*/
			// if dropped object contains TABLE(S) then recall initTables() to properly initialize tables array (only in cell mode)
			// if row is dragged and contains tables, then this will be handler in rowDrop() private method
			if (mode === 'cell' && obj.getElementsByTagName('table').length > 0) {
				initTables();
			}
			// recalculate table cells and scrollers because cell content could change row dimensions 
			calculateCells();
			// call last event handler
			REDIPS.drag.event.finish();
		}
		// reset old positions
		table_old = row_old = cell_old = null;
	};


	/**
	 * Element drop. This method is called from handlerOnMouseUp and appends element to the target table cell.
	 * If input parameter "drop" is set to "false" (this is actually return value from event.droppedBefore) then DIV elements will not be dropped (only cloned element will be deleted).
	 * @param {Boolean} [drop] If not "false" then DIV element will be dropped to the cell.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	elementDrop = function (drop) {
		var cloneSourceDiv = null,	// clone source element (needed if clone.sendBack is set to true)
			div,					// nodeList of DIV elements in target cell (needed if clone.sendBack is set to true)
			i;						// local variables
		// if input parameter is not "false" then DIV element will be dropped to the table cell
		if (drop !== false) {
			// if clone.sendBack is set to true then try to find source element in target cell
			if (clone.sendBack === true) {
				// search all DIV elements in target cell
				div = td.target.getElementsByTagName('DIV');
				// loop through all DIV elements in target cell
				for (i = 0; i < div.length; i++) {
					// if DIV in target cell is source of dropped DIV element (dropped DIV id and id of DIV in target cell has the same name beginning like "d12c2" and "d12")
					// of course, the case where source DIV element is dropped to the cell with cloned DIV element should be excluded (possible in climit1 type)
					if (obj !== div[i] && obj.id.indexOf(div[i].id) === 0) {
						// set reference to cloneSourceDiv element
						cloneSourceDiv = div[i];
						// break the loop
						break;
					}
				}
				// if clone source DIV element exists in target cell
				if (cloneSourceDiv) {
					// update climit class (increment by 1)
					cloneLimit(cloneSourceDiv, 1);
					// delete dropped DIV element
					obj.parentNode.removeChild(obj);
					// return from the method (everything is done)
					return;
				}
			}
			// shift table content if dropMode is set to "shift" and target cell is not empty or shift.after option is set to always
			// hasChild() is a private method
			if (REDIPS.drag.dropMode === 'shift' && (hasChilds(td.target) || REDIPS.drag.shift.after === 'always')) {
				shiftCells(td.source, td.target);
			}
			// insert (to top) or append (to bottom) object to the target cell
			if (REDIPS.drag.multipleDrop === 'top' && td.target.hasChildNodes()) {
				td.target.insertBefore(obj, td.target.firstChild);
			}
			else {
				td.target.appendChild(obj);
			}
			// register event listeners (FIX for Safari Mobile)
			registerEvents(obj);
			// call event.dropped because cloneLimit could call event.clonedEnd1 or event.clonedEnd2
			REDIPS.drag.event.dropped(td.target);
			// if object is cloned
			if (cloned) {
				// call clonedDropped event handler
				REDIPS.drag.event.clonedDropped(td.target);
				// update climit1_X or climit2_X classname
				cloneLimit(objOld, -1);
			}
		}
		// cloned element should be deleted (if not already deleted)
		else if (cloned && obj.parentNode) {
			obj.parentNode.removeChild(obj);
		}
	};


	/**
	 * Register event listeners for DIV element.
	 * DIV elements should have only onmousedown, ontouchstart and ondblclick attached (using traditional event registration model).
	 * I had a problem with advanced event registration model.
	 * In case of using advanced model, selected text and dragged DIV element were in collision.
	 * It looks like selected text was able to drag instead of DIV element.
	 * @param {HTMLElement} div Register event listeners for onmousedown, ontouchstart and ondblclick to the DIV element.
	 * @param {Boolean} [flag] If set to false then event listeners will be deleted.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	registerEvents = function (div, flag) {
		// if flag is se to false, then remove event listeners on DIV element
		if (flag === false) {
			div.onmousedown = null;
			div.ontouchstart = null;
			div.ondblclick = null;
		}
		else {
			div.onmousedown = handlerOnMouseDown;
			div.ontouchstart = handlerOnMouseDown;
			div.ondblclick = handlerOnDblClick;
		}
	};

	
	/**
	 * After element is dropped, styles need to be reset.
	 * @param {HTMLElement} el Element reference.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	resetStyles = function (el) {
		// reset top and left styles
		el.style.top  = '';
		el.style.left = '';
		// reset position and z-index style (if not set or default value for position style is "static")
		el.style.position = '';
		el.style.zIndex = '';
	};

	
	/**
	 * Actions needed after element is deleted. This function is called from handlerOnMouseUp. Function deletes element and calls event handlers.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	elementDeleted = function () {
		// set param needed to find last cell (for case where shift.after is 'always' or 'delete')
		var param;
		// if object is cloned, update climit1_X or climit2_X classname
		if (cloned) {
			cloneLimit(objOld, -1);
		}
		// shift table content if dropMode is set to "shift" and shift.after is set to "delete" or "always"
		if (REDIPS.drag.dropMode === 'shift' && (REDIPS.drag.shift.after === 'delete' || REDIPS.drag.shift.after === 'always')) {
			// define last table cell in column, row or table - depending on shift.mode value
			switch (REDIPS.drag.shift.mode) {
			case 'vertical2':
				param = 'lastInColumn';
				break;
			case 'horizontal2':
				param = 'lastInRow';
				break;
			default:
				param = 'last';
			}
			// content from source cell to last cell will be shifted (emulates dropping DIV element to the last table cell)
			shiftCells(td.source, findCell(param, td.source)[2]);
		}
		// call event.deleted() method and send cloned flag
		// inside event.deleted it's possible to know whether cloned element is directly moved to the trash
		REDIPS.drag.event.deleted(cloned);
	};


	/**
	 * onmousemove event handler.
	 * handlerOnMouseMove is attached to document level in a moment when DIV element is clicked (this happens in handlerOnMouseDown).
	 * handlerOnMouseUp detaches onmousemove and onmouseup event handlers.
	 * @param {Event} e Event information.
	 * @see <a href="#handlerOnMouseDown">handlerOnMouseDown</a>
	 * @see <a href="#handlerOnMouseUp">handlerOnMouseUp</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	handlerOnMouseMove = function (e) {
		var evt = e || window.event,			// define event (FF & IE)
			bound = REDIPS.drag.scroll.bound,	// read "bound" public property (maybe code will be faster, and it will be easier to reference in onmousemove handler)
			sca,								// current scrollable container area
			X, Y,								// X and Y position of mouse pointer
			deltaX, deltaY,						// delta from initial position
			i,									// needed for local loop
			scrollPosition;						// scroll position variable needed for autoscroll call
		// define X and Y position (pointer.x and pointer.y are needed in setTableRowColumn() and autoscroll methods) for touchscreen devices
		if (evt.touches) {
			X = pointer.x = evt.touches[0].clientX;
			Y = pointer.y = evt.touches[0].clientY;
		}
		// or for monitor + mouse devices
		else {
			X = pointer.x = evt.clientX;
			Y = pointer.y = evt.clientY;
		}
		// calculate delta from initial position
		deltaX = Math.abs(threshold.x - X);
		deltaY = Math.abs(threshold.y - Y);
		// if "moved" flag isn't set (this is the first moment when object is moved)
		if (!moved) {
			// if moved object is element and has clone in class name or cloneShiftKey is enabled and shift key is pressed
			// then remember previous object, clone object, set cloned flag and call event.cloned
			// (shiftKey is defined in handler_mousedown)
			if (mode === 'cell' && (cloneClass || (REDIPS.drag.clone.keyDiv === true && shiftKey))) {
				// remember previous object (original element)
				REDIPS.drag.objOld = objOld = obj;
				// clone DIV element ready for dragging
				REDIPS.drag.obj = obj = cloneObject(obj, true);
				// set cloned flag
				cloned = true;
				// call event.cloned event handler
				REDIPS.drag.event.cloned();
				// set color for the current table cell and remember previous position and color
				setPosition();
			}
			// else ordinary object is moved
			else {
				// if mode is row then remember reference of the source row, clone source row and set obj as reference to the current row
				if (mode === 'row') {
					// settings of "cloned" flag should go before calling rowClone() because "cloned" is needed in rowClone()
					// to cut out "clone" class name from <div class="drag row clone"> elements
					if (cloneClass || (REDIPS.drag.clone.keyRow === true && shiftKey)) {
						cloned = true;
					}
					// remember reference to the source row
					REDIPS.drag.objOld = objOld = obj;
					// clone source row and set as obj
					REDIPS.drag.obj = obj = rowClone(obj);
					// set high z-index for cloned mini table
					obj.style.zIndex = 999;
				}
				// get IE (all versions) to allow dragging outside the window (?!)
				// this was needed here also - despite setCaputure in onmousedown
				if (obj.setCapture) {
					obj.setCapture();
				}
				// set style to fixed to allow dragging DIV object
				obj.style.position = 'fixed';
				// call calculate cells for case where moved element changed cell dimension
				// place 3 elements in the same cell in example08 and try to move one out of the table cell
				calculateCells();
				// set current table, row and column
				setTableRowColumn();
				// call event handler (row cloned/moved)
				if (mode === 'row') {
					if (cloned) {
						REDIPS.drag.event.rowCloned();
					}
					else {
						REDIPS.drag.event.rowMoved();
					}
				}
				// set color for the current table cell and remember previous position and color
				// setPosition() must go after calling event.moved() and event.rowMoved() if user wants to
				// change color of source row
				setPosition();
			}
			// if element is far away on the right side of page, set possible right position (screen.width - object width)
			// objMargin[1] + objMargin[3] = object width
			if (X > screen.width - objMargin[1]) {
				obj.style.left = (screen.width - (objMargin[1] +  objMargin[3])) + 'px';
			}
			// if element is below page bottom, set possible lower position (screen.width - object height)
			// objMargin[0] + objMargin[2] = object height
			if (Y > screen.height - objMargin[2]) {
				obj.style.top  = (screen.height - (objMargin[0] + objMargin[2])) + 'px';
			}
		}
		// set moved_flag
		moved = true;
		// if REDIPS.drag works in "cell" mode and DIV element is moved out of defined threshold distance 
		if (mode === 'cell' && (deltaX > threshold.value || deltaY > threshold.value) && !threshold.flag) {
			// set threshold flag
			threshold.flag = true;
			// set position (highlight current position)
			setPosition();
			// call event.moved with cloned as input parameter
			REDIPS.drag.event.moved(cloned);
		}
		// set left and top styles for the moved element if element is inside window
		// this conditions will stop element on window bounds
		if (X > objMargin[3] && X < screen.width - objMargin[1]) {
			obj.style.left = (X - objMargin[3]) + 'px';
		}
		if (Y > objMargin[0] && Y < screen.height - objMargin[2]) {
			obj.style.top  = (Y - objMargin[0]) + 'px';
		}
		// set current table, row and cell (this condition should spare CPU):
		// 1) if mouse pointer is inside DIV id="drag"
		// 2) and autoscroll is not working
		// 3) and current table contains nested table or cursor is outside of current cell
		if (X < divBox[1] && X > divBox[3] && Y < divBox[2] && Y > divBox[0] &&
			edge.flag.x === 0 && edge.flag.y === 0 &&
			(currentCell.containTable || (X < currentCell[3] || X > currentCell[1] || Y < currentCell[0] || Y > currentCell[2]))) {
			// set current table row and table cell
			setTableRowColumn();
			// if new location is inside table and new location is different then old location
			cellChanged();
		}
		// if autoScroll option is enabled (by default it is but it can be turned off)
		if (REDIPS.drag.scroll.enable) {
			// calculate horizontally crossed page bound
			edge.page.x = bound - (screen.width / 2  > X ? X - objMargin[3] : screen.width - X - objMargin[1]);
			// if element crosses page bound then set scroll direction and call auto scroll 
			if (edge.page.x > 0) {
				// in case when object is only half visible
				if (edge.page.x > bound) {
					edge.page.x = bound;
				}
				// get horizontal window scroll position
				scrollPosition = getScrollPosition()[0];
				// set scroll direction
				edge.page.x *= X < screen.width / 2 ? -1 : 1;
				// if page bound is crossed and this two cases aren't met:
				// 1) scrollbar is on the left and user wants to scroll left
				// 2) scrollbar is on the right and user wants to scroll right
				if (!((edge.page.x < 0 && scrollPosition <= 0) || (edge.page.x > 0 && scrollPosition >= (scrollData.width - screen.width)))) {
					// fire autoscroll function (this should happen only once)
					if (edge.flag.x++ === 0) {
						// reset onscroll event
						REDIPS.event.remove(window, 'scroll', calculateCells);
						// call window autoscroll 
						autoScrollX(window);
					}
				}
			}
			else {
				edge.page.x = 0;
			}
			// calculate vertically crossed page bound
			edge.page.y = bound - (screen.height / 2 > Y ? Y - objMargin[0] : screen.height - Y - objMargin[2]);
			// if element crosses page bound
			if (edge.page.y > 0) {
				// set max crossed bound
				if (edge.page.y > bound) {
					edge.page.y = bound;
				}
				// get vertical window scroll position
				scrollPosition = getScrollPosition()[1];
				// set scroll direction
				edge.page.y *= Y < screen.height / 2 ? -1 : 1;
				// if page bound is crossed and this two cases aren't met:
				// 1) scrollbar is on the page top and user wants to scroll up
				// 2) scrollbar is on the page bottom and user wants to scroll down
				if (!((edge.page.y < 0 && scrollPosition <= 0) || (edge.page.y > 0 && scrollPosition >= (scrollData.height - screen.height)))) {
					// fire autoscroll (this should happen only once)
					if (edge.flag.y++ === 0) {
						// reset onscroll event
						REDIPS.event.remove(window, 'scroll', calculateCells);
						// call window autoscroll
						autoScrollY(window);
					}
				}
			}
			else {
				edge.page.y = 0;
			}
			// test if dragged object is in scrollable container
			// this code will be executed only if scrollable container (DIV with overflow other than 'visible) exists on page
			for (i = 0; i < scrollData.container.length; i++) {
				// set current scrollable container area
				sca = scrollData.container[i];
				// if dragged object is inside scrollable container and scrollable container has enabled autoscroll option
				if (sca.autoscroll && X < sca.offset[1] && X > sca.offset[3] && Y < sca.offset[2] && Y > sca.offset[0]) {
					// calculate horizontally crossed page bound
					edge.div.x = bound - (sca.midstX  > X ? X - objMargin[3] - sca.offset[3] : sca.offset[1] - X - objMargin[1]);
					// if element crosses page bound then set scroll direction and call auto scroll 
					if (edge.div.x > 0) {
						// in case when object is only half visible (page is scrolled on that object)
						if (edge.div.x > bound) {
							edge.div.x = bound;
						}
						// set scroll direction: negative - left, positive - right
						edge.div.x *= X < sca.midstX ? -1 : 1; 
						// remove onscroll event handler and call autoScrollY function only once
						if (edge.flag.x++ === 0) {
							REDIPS.event.remove(sca.div, 'scroll', calculateCells);
							autoScrollX(sca.div);
						}
					}
					else {
						edge.div.x = 0;
					}
					// calculate vertically crossed page bound
					edge.div.y = bound - (sca.midstY  > Y ? Y - objMargin[0] - sca.offset[0] : sca.offset[2] - Y - objMargin[2]);
					// if element crosses page bound then set scroll direction and call auto scroll
					if (edge.div.y > 0) {
						// in case when object is only half visible (page is scrolled on that object)
						if (edge.div.y > bound) {
							edge.div.y = bound;
						}
						// set scroll direction: negative - up, positive - down
						edge.div.y *= Y < sca.midstY ? -1 : 1;
						// remove onscroll event handler and call autoScrollY function only once
						if (edge.flag.y++ === 0) {
							REDIPS.event.remove(sca.div, 'scroll', calculateCells);
							autoScrollY(sca.div);
						}
					}
					else {
						edge.div.y = 0;
					}
					// break the loop (checking for other scrollable containers is not needed) 
					break;
				}
				// otherwise (I mean dragged object isn't inside any of scrollable container) reset crossed edge
				else {
					edge.div.x = edge.div.y = 0;
				} 
			}
		} // if autoScroll is enabled
		// stop all propagation of the event in the bubbling phase.
		// (save system resources by turning off event bubbling / propagation)
		evt.cancelBubble = true;
		if (evt.stopPropagation) {
			evt.stopPropagation();
		}
	};


	/**
	 * This method is called (from handlerOnMouseMove, autoScrollX, autoScrollY) in case of change of current table cell.
	 * When change happens, then return background color to old position, highlight new position, calculate cell boundaries and call event.changed.
	 * @see <a href="#handlerOnMouseMove">handlerOnMouseMove</a>
	 * @see <a href="#autoScrollX">autoScrollX</a>
	 * @see <a href="#autoScrollY">autoScrollY</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	cellChanged = function () {
		if (table < tables.length && (table !== table_old || row !== row_old || cell !== cell_old)) {
			// set cell background color to the previous cell
			if (table_old !== null && row_old !== null && cell_old !== null) {
				// set background color for previous table cell
				setTdStyle(table_old, row_old, cell_old, bgStyleOld);
				// define previous table cell
				REDIPS.drag.td.previous = td.previous = tables[table_old].rows[row_old].cells[cell_old];
				// define current table cell
				REDIPS.drag.td.current = td.current = tables[table].rows[row].cells[cell];
				// if drop option is 'switching' and drag mode is 'cell' (not 'row')
				// then replace content from current cell to the previous cell
				if (REDIPS.drag.dropMode === 'switching' && mode === 'cell') {
					// move objects from current cell to the previous cell
					relocate(td.current, td.previous);
					// recalculate table cells again (because cell content could change row dimensions) 
					calculateCells();
					// set current table cell again (because cell content can be larger then cell itself)
					setTableRowColumn();
				}
				// target cell changed - call event.changed handler 
				if (mode === 'cell') {
					REDIPS.drag.event.changed(td.current);
				}
				// for mode === 'row', table or row should change (changing cell in the same row will be ignored)
				else if (mode === 'row' && (table !== table_old || row !== row_old)) {
					REDIPS.drag.event.rowChanged(td.current);
				}
			}
			// set color for the current table cell and remembers previous position and color
			setPosition();
		}		
	};


	/**
	 * In initialization phase, this method is attached as onresize event handler for window.
	 * It also calculates window width and window height. Result is saved in variables screen.width and screen.height visible inside REDIPS.drag private scope.
	 * @see <a href="#init">init</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	handlerOnResize = function () {
		// Non-IE
		if (typeof(window.innerWidth) === 'number') {
			screen.width  = window.innerWidth;
			screen.height = window.innerHeight;
		}
		// IE 6+ in 'standards compliant mode'
		else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			screen.width  = document.documentElement.clientWidth;
			screen.height = document.documentElement.clientHeight;
		}
		// IE 4 compatible
		else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
			screen.width  = document.body.clientWidth;
			screen.height = document.body.clientHeight;
		}
		// set scroll size (onresize, onload and onmouseup event)
		scrollData.width  = document.documentElement.scrollWidth;
		scrollData.height = document.documentElement.scrollHeight;
		// calculate colums and rows offset (cells dimensions)
		calculateCells();  
	};


	/**
	 * Method sets current table, row and cell.
	 * Current cell position is based on position of mouse pointer and calculated grid of tables inside drag container.
	 * Method contains logic for dropping rules like marked/forbidden table cells.
	 * Rows with display='none' are not contained in row_offset array so row bounds calculation should take care about sparse arrays (since version 4.3.6).
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	setTableRowColumn = function () {
		var previous,	// set previous position (current cell will not be highlighted) 
			cell_current,	// define current cell (needed for some test at the function bottom)
			row_offset,		// row offsets for the selected table (row box bounds)
			row_found,		// remember found row
			cells,			// number of cells in the selected row
			empty,			// (boolean) flag indicates if table cell is empty or not
			mark_found,		// (boolean) found "mark" class name
			only_found,		// (boolean) found "only" class name
			single_cell,	// table cell can be defined as single
			tos = [],		// table offset
			X, Y,			// X and Y position of mouse pointer
			i;				// used in local loop
		// set previous position (current cell will not be highlighted)
		previous = function () {
			if (table_old !== null && row_old !== null && cell_old !== null) {
				table = table_old;
				row = row_old;
				cell = cell_old;
			}
		};
		// prepare X and Y position of mouse pointer
		X = pointer.x;
		Y = pointer.y;
		// find table below draggable object
		for (table = 0; table < tables.length; table++) {
			// if table is not enabled then skip table
			// by default tables don't have set redips.enabled property (undefined !== false)
			if (tables[table].redips.enabled === false) {
				continue;
			}
			// prepare table offset
			tos[0] = tables[table].redips.offset[0]; // top
			tos[1] = tables[table].redips.offset[1]; // right
			tos[2] = tables[table].redips.offset[2]; // bottom
			tos[3] = tables[table].redips.offset[3]; // left
			// if table belongs to the scrollable container then set scrollable container offset if needed
			// in case when some parts of table are hidden (for example with "overflow: auto")
			if (tables[table].sca !== undefined) {
				tos[0] = tos[0] > tables[table].sca.offset[0] ? tos[0] : tables[table].sca.offset[0]; // top
				tos[1] = tos[1] < tables[table].sca.offset[1] ? tos[1] : tables[table].sca.offset[1]; // right
				tos[2] = tos[2] < tables[table].sca.offset[2] ? tos[2] : tables[table].sca.offset[2]; // bottom
				tos[3] = tos[3] > tables[table].sca.offset[3] ? tos[3] : tables[table].sca.offset[3]; // left
			}
			// mouse pointer is inside table (or scrollable container)
			if (tos[3] < X && X < tos[1] && tos[0] < Y && Y < tos[2]) {
				// define row offsets for the selected table (row box bounds)
				row_offset = tables[table].redips.row_offset;
				// find the current row (loop skips hidden rows)
				for (row = 0; row < row_offset.length - 1; row++) {
					// if row doesn't exist (in case of hidden row) - skip it
					if (row_offset[row] === undefined) {
						continue;
					}
					// set top and bottom cell bounds
					currentCell[0] = row_offset[row][0];
					// set bottom cell bound (if is possible) - hidden row doesn't exist
					if (row_offset[row + 1] !== undefined) {
						currentCell[2] = row_offset[row + 1][0];
					}
					// hidden row (like style.display === 'none')
					else {
						// search for next visible row
						for (i = row + 2; i < row_offset.length; i++) {
							// visible row found
							if (row_offset[i] !== undefined) {
								currentCell[2] = row_offset[i][0];
								break;
							}
						}
					}
					// top bound of the next row
					if (Y <= currentCell[2]) {
						break;
					}
				}
				// remember found row
				row_found = row;
				// if loop exceeds, then set bounds for the last row (offset for the last row doesn't work in IE8, so use table bounds) 
				if (row === row_offset.length - 1) {
					currentCell[0] = row_offset[row][0];
					currentCell[2] = tables[table].redips.offset[2];
				}
				// do loop - needed for rowspaned cells (if there is any)
				do {
					// set the number of cells in the selected row
					cells = tables[table].rows[row].cells.length - 1;
					// find current cell (X mouse position between cell offset left and right)
					for (cell = cells; cell >= 0; cell--) {
						// row left offset + cell left offset
						currentCell[3] = row_offset[row][3] + tables[table].rows[row].cells[cell].offsetLeft;
						// cell right offset is left offset + cell width  
						currentCell[1] = currentCell[3] + tables[table].rows[row].cells[cell].offsetWidth;
						// is mouse pointer is between left and right offset, then cell is found
						if (currentCell[3] <= X && X <= currentCell[1]) {
							break;
						}
					}
				} // if table contains rowspaned cells and mouse pointer is inside table but cell was not found (hmm, rowspaned cell - try in upper row)
				while (tables[table].redips.rowspan && cell === -1 && row-- > 0);
				// if cell < 0 or row < 0 then use last possible location
				if (row < 0 || cell < 0) {
					previous();
				}
				// current cell found but if current row differ from previously found row (thanks too while loop with row--)
				// then test if Y is inside current cell
				// (this should prevent case where TD border > 1px and upper colspaned row like in example15)
				// logic will end in upper colspaned row while current row will not move - and that was wrong
				else if (row !== row_found) {
					// recalculate top and bottom row offset (again)
					currentCell[0] = row_offset[row][0];
					currentCell[2] = currentCell[0] + tables[table].rows[row].cells[cell].offsetHeight;
					// if Y is outside of the current row, return previous location 
					if (Y < currentCell[0] || Y > currentCell[2]) {
						previous();
					}
				}
				// set current cell (for easier access in test below)
				cell_current = tables[table].rows[row].cells[cell];
				// if current cell contain nested table(s) then set currentCell.containTable property
				// needed in handlerOnMouseMove() - see around line 1070
				if (cell_current.childNodes.length > 0 && cell_current.getElementsByTagName('table').length > 0) {
					currentCell.containTable = true;
				}
				else {
					currentCell.containTable = false;
				}
				// if current cell isn't trash cell, then search for marks in class name
				if (cell_current.className.indexOf(REDIPS.drag.trash.className) === -1) {
					// search for 'only' class name
					only_found = cell_current.className.indexOf(REDIPS.drag.only.cname) > -1 ? true : false;
					// if current cell is marked with 'only' class name
					if (only_found === true) {
						// marked cell "only" found, test for defined pairs (DIV id -> class name)
						if (cell_current.className.indexOf(only.div[obj.id]) === -1) {
							previous();
							break;
						}
					}
					// DIV objects marked with "only" can't be placed to other cells (if property "other" is "deny")
					else if (only.div[obj.id] !== undefined && only.other === 'deny') {
						previous();
						break;
					}
					else {
						// search for 'mark' class name
						mark_found = cell_current.className.indexOf(REDIPS.drag.mark.cname) > -1 ? true : false;
						// if current cell is marked and access type is 'deny' or current cell isn't marked and access type is 'allow'
						// then return previous location
						if ((mark_found === true && REDIPS.drag.mark.action === 'deny') || (mark_found === false && REDIPS.drag.mark.action === 'allow')) {
							// marked cell found, but make exception if defined pairs "DIV id -> class name" exists (return previous location)
							if (cell_current.className.indexOf(mark.exception[obj.id]) === -1) {
								previous();
								break;
							}
						}
					}
				}
				// test if current cell is defined as single
				single_cell = cell_current.className.indexOf('single') > -1 ? true : false;
				// if drag mode is "cell"
				if (mode === 'cell') {
					// if dropMode == single or current cell is single and current cell contains nodes then test if cell is occupied
					if ((REDIPS.drag.dropMode === 'single' || single_cell) && cell_current.childNodes.length > 0) {
						// if cell has only one node and that is text node then break - because this is empty cell
						if (cell_current.childNodes.length === 1 && cell_current.firstChild.nodeType === 3) {
							break;
						}
						// intialize "empty" flag to true
						empty = true;
						// open loop for each child node and jump out if 'drag' className found
						for (i = cell_current.childNodes.length - 1; i >= 0; i--) {
							if (cell_current.childNodes[i].className && cell_current.childNodes[i].className.indexOf('drag') > -1) {
								empty = false;
								break;
							} 
						}
						// if cell is not empty and old position exists ...
						if (!empty && table_old !== null && row_old !== null && cell_old !== null) {
							// .. and current position is different then source position then return previous position
							if (table_source !== table || row_source !== row || cell_source !== cell) {
								previous();
								break;
							}
						}
					}
					// current cell is marked as row handler and user is dragging DIV element over it - do not enable  
					if (cell_current.className.indexOf('rowhandler') > -1) {
						previous();
						break;
					}
					// if current row is defined as emptyRow, elements can't be dropped to these cells
					if (cell_current.parentNode.redips && cell_current.parentNode.redips.emptyRow) {
						previous();
						break;
					}
				}
				// break table loop 
				break;
			}
		}
	};


	/**
	 * Method sets background color for the current table cell and remembers previous position and background color.
	 * It is called from handlerOnMouseMove and cellChanged.
	 * @see <a href="#handlerOnMouseMove">handlerOnMouseMove</a>
	 * @see <a href="#cellChanged">cellChanged</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	setPosition = function () {
		// in case if ordinary element is placed inside 'deny' table cell
		if (table < tables.length && table !== null && row !== null && cell !== null) {
			// remember background color before setting the new background color
			bgStyleOld = getTdStyle(table, row, cell);
			// highlight current TD / TR (colors and styles are read from public property "hover"
			setTdStyle(table, row, cell);
			// remember current position (for table, row and cell)
			table_old = table;
			row_old = row;
			cell_old = cell;
		}
	};


	/**
	 * Method sets table cell(s) background styles (background colors and border styles).
	 * If tdStyle is undefined then current td/tr will be highlighted from public property hover.color_td, hover.color_tr ...
	 * @param {Integer} ti Table index.
	 * @param {Integer} ri Row index.
	 * @param {Integer} ci Cell index.
	 * @param {Object} t Object contains background color and border styles ("t" is TD style object is prepared in getTdStyle method).
	 * @see <a href="#getTdStyle">getTdStyle</a>
	 * @see <a href="#setPosition">setPosition</a>
	 * @see <a href="#cellChanged">cellChanged</a>
	 * @see <a href="#handlerOnMouseUp">handlerOnMouseUp</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	setTdStyle = function (ti, ri, ci, t) {
		// reference to the table row, loop variable and td.style
		var tr, i, s;
		// if drag mode is "cell" and threshold distance is prevailed
		if (mode === 'cell' && threshold.flag) {
			// set TD style reference
			s = tables[ti].rows[ri].cells[ci].style;
			// TD background color - tdStyle is undefined then highlight TD otherwise return previous background color
			s.backgroundColor = (t === undefined) ? REDIPS.drag.hover.colorTd : t.color[0].toString();
			// TD border - if hover.borderTd is set then take care of border style
			if (REDIPS.drag.hover.borderTd !== undefined) {
				// set border (highlight)
				if (t === undefined) {
					s.border = REDIPS.drag.hover.borderTd;
				}
				// return previous state (exit from TD)
				else {
					s.borderTopWidth = t.top[0][0];
					s.borderTopStyle = t.top[0][1];
					s.borderTopColor = t.top[0][2];
					s.borderRightWidth = t.right[0][0];
					s.borderRightStyle = t.right[0][1];
					s.borderRightColor = t.right[0][2];
					s.borderBottomWidth = t.bottom[0][0];
					s.borderBottomStyle = t.bottom[0][1];
					s.borderBottomColor = t.bottom[0][2];
					s.borderLeftWidth = t.left[0][0];
					s.borderLeftStyle = t.left[0][1];
					s.borderLeftColor = t.left[0][2];
				}
			}
		}
		// or drag mode is "row"
		else if (mode === 'row') {
			// set reference to the current table row
			tr = tables[ti].rows[ri];
			// set colors to table cells (respectively) or first color to all cells (in case of settings hover to the row)
			for (i = 0; i < tr.cells.length; i++) {
				// set reference to current TD style
				s = tr.cells[i].style;
				// TR background color - tdStyle is undefined then highlight TD otherwise return previous background color
				s.backgroundColor = (t === undefined) ? REDIPS.drag.hover.colorTr : t.color[i].toString();
				// TR border - if hover.borderTd is set then take care of border style
				if (REDIPS.drag.hover.borderTr !== undefined) {
					// set border (highlight) - source row will not have any border
					if (t === undefined) {
						// target is current table
						if (table === table_source) {
							// if row is moved above source row in current table
							if (row < row_source) {
								s.borderTop = REDIPS.drag.hover.borderTr;
							}
							// if row is moved below source row in current table 
							else {
								s.borderBottom = REDIPS.drag.hover.borderTr;
							}
						}
						// target is other table (where row will be placed is defined with public property REDIPS.drag.rowDropMode)
						else {
							// highlight top border
							if (REDIPS.drag.rowDropMode === 'before') {
								s.borderTop = REDIPS.drag.hover.borderTr;
							}
							// highlight bottom border
							else {
								s.borderBottom = REDIPS.drag.hover.borderTr;
							}
						}
					}
					// return previous state borderTop and borderBottom (exit from TD)
					else {
						s.borderTopWidth = t.top[i][0];
						s.borderTopStyle = t.top[i][1];
						s.borderTopColor = t.top[i][2];
						s.borderBottomWidth = t.bottom[i][0];
						s.borderBottomStyle = t.bottom[i][1];
						s.borderBottomColor = t.bottom[i][2];

					}
				}
			}
		}
	};


	/**
	 * Method s returns background and border styles as object for the input parameters table index, row index and cell index.
	 * @param {Integer} t Table index.
	 * @param {Integer} r Row index.
	 * @param {Integer} c Cell index.
	 * @return {Object} Object containing background color and border styles (for the row or table cell).
	 * @see <a href="#setTdStyle">setTdStyle</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	getTdStyle = function (ti, ri, ci) {
		var tr, i, c, // reference to the table row, loop variable and td reference
			// define TD style object with background color and border styles: top, right, bottom and left
			t = {color: [], top: [], right: [], bottom: [], left: []},
			// private method gets border styles: top, right, bottom, left
			border = function (c, name) {
				var width = 'border' + name + 'Width',
					style = 'border' + name + 'Style',
					color = 'border' + name + 'Color';			
				return [getStyle(c, width), getStyle(c, style), getStyle(c, color)];
			};
		// if drag mode is "cell" tdStyle.color and tdStyle.border will have only one value
		if (mode === 'cell') {
			// set TD reference
			c = tables[ti].rows[ri].cells[ci];
			// remember background color
			t.color[0] = c.style.backgroundColor;
			// remember top, right, bottom and left TD border styles if hover.borderTd property is set
			if (REDIPS.drag.hover.borderTd !== undefined) {
				t.top[0] = border(c, 'Top');
				t.right[0] = border(c, 'Right');
				t.bottom[0] = border(c, 'Bottom');
				t.left[0] = border(c, 'Left');
			}
		}
		// if drag mode is "row", then color array will contain color for each table cell
		else {
			// set reference to the current table row
			tr = tables[ti].rows[ri];
			// remember styles for each table cell
			for (i = 0; i < tr.cells.length; i++) {
				// set TD reference
				c = tr.cells[i];
				// remember background color
				t.color[i] = c.style.backgroundColor;
				// remember top and bottom TD border styles if hover.borderTr property is set
				if (REDIPS.drag.hover.borderTr !== undefined) {
					t.top[i] = border(c, 'Top');
					t.bottom[i] = border(c, 'Bottom');
				}
			}
		}
		// return TD style object
		return t;
	};


	/**
	 * Method returns array of element bounds (offset) top, right, bottom and left (needed for table grid calculation).
	 * @param {HTMLElement} box HTMLElement for box metrics.
	 * @param {String} [position] HTMLElement "position" style. Elements with style "fixed" will not have included page scroll offset.
	 * @param {Boolean} [box_scroll] If set to "false" then element scroll offset will not be included in calculation (default is "true").
	 * @return {Array} Box offset array: [ top, right, bottom, left ]
	 * @example
	 * // calculate box offset for the div id="drag"
	 * divbox = boxOffset(dragContainer);
	 * @example
	 * // include scroll position in offset
	 * offset = boxOffset(rowObj, 'fixed');
	 * @example
	 * // get DIV offset with or without "page scroll" and excluded element scroll offset
	 * cb = boxOffset(div, position, false);
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	boxOffset = function (box, position, box_scroll) {
		var oLeft = 0,		// define offset left (take care of horizontal scroll position)
			oTop  = 0,		// define offset top (take care od vertical scroll position)
			boxOld = box;	// remember box object
		// if table_position is undefined, '' or 'page_scroll' then include page scroll offset
		// windowScrollPosition is set in calculateCells()
		// calculateCells() is called on window scroll event
		if (position !== 'fixed') {
			oLeft = 0 - windowScrollPosition[0];	// define offset left (take care of horizontal scroll position)
			oTop  = 0 - windowScrollPosition[1];	// define offset top (take care od vertical scroll position)
		}
		// climb up through DOM hierarchy (getScrollPosition() takes care about page scroll positions)
		if (box_scroll === undefined || box_scroll === true) {
			do {
				oLeft += box.offsetLeft - box.scrollLeft;
				oTop += box.offsetTop - box.scrollTop;
				box = box.offsetParent;
			}
			while (box && box.nodeName !== 'BODY');
		}
		// climb up to the BODY element but without scroll positions
		else {
			do {
				oLeft += box.offsetLeft;
				oTop += box.offsetTop;
				box = box.offsetParent;
			}
			while (box && box.nodeName !== 'BODY');
		}
		// return box offset array
		//        top                 right,                     bottom           left
		return [ oTop, oLeft + boxOld.offsetWidth, oTop + boxOld.offsetHeight, oLeft ];
	};

 
	/** 
	 * Method is called in every possible case when position or size of table grid could change like: page scrolling, element dropped to the table cell, element start dragging and so on.
	 * It calculates table row offsets (table grid) and saves to the "tables" array.
	 * Table rows with style display='none' are skipped.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	calculateCells = function () {
		var i, j,		// local variables used in loops
			row_offset,	// row box
			position,	// if element (table or table container) has position:fixed then "page scroll" offset should not be added
			cb;			// box offset for container box (cb)
		// calculateCells() is called on window scroll event so here is perfect place to refresh window scroll position  
		// set window scroll position (needed for boxOffset() method)
		windowScrollPosition = getScrollPosition();
		// open loop for each HTML table inside id=drag (table array is initialized in init() function)
		for (i = 0; i < tables.length; i++) {
			// initialize row_offset array
			row_offset = [];
			// set table style position (to exclude "page scroll" offset from calculation if needed) 
			position = getStyle(tables[i], 'position');
			// if table doesn't have style position:fixed then table container should be tested
			if (position !== 'fixed') {
				position = getStyle(tables[i].parentNode, 'position');
			}
			// backward loop has better perfomance
			for (j = tables[i].rows.length - 1; j >= 0; j--) {
				// add rows to the offset array if row is not hidden 
				if (tables[i].rows[j].style.display !== 'none') {
					row_offset[j] = boxOffset(tables[i].rows[j], position);
				}
			}
			// save table informations (table offset and row offsets)
			tables[i].redips.offset = boxOffset(tables[i], position);
			tables[i].redips.row_offset = row_offset;
		}
		// calculate box offset for the div id=drag
		divBox = boxOffset(dragContainer);
		// update scrollable container areas if needed
		for (i = 0; i < scrollData.container.length; i++) {
			// set container box style position (to exclude page scroll offset from calculation if needed) 
			position = getStyle(scrollData.container[i].div, 'position');
			// get DIV container offset with or without "page scroll" and excluded scroll position of the content
			cb = boxOffset(scrollData.container[i].div, position, false);
			// prepare scrollable container areas
			scrollData.container[i].offset = cb;
			scrollData.container[i].midstX = (cb[1] + cb[3]) / 2;
			scrollData.container[i].midstY = (cb[0] + cb[2]) / 2;
		}
	};


	/**
	 * Method returns current page scroll values as array (X and Y axis).
	 * @return {Array} Returns array with two values [ scrollX, scrollY ].
	 * @public
	 * @function
	 * @name REDIPS.drag#getScrollPosition
	 */
	getScrollPosition = function () {
		// define local scroll position variables
		var scrollX, scrollY;
		// Netscape compliant
		if (typeof(window.pageYOffset) === 'number') {
			scrollX = window.pageXOffset;
			scrollY = window.pageYOffset;
		}
		// DOM compliant
		else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			scrollX = document.body.scrollLeft;
			scrollY = document.body.scrollTop;
		}
		// IE6 standards compliant mode
		else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			scrollX = document.documentElement.scrollLeft;
			scrollY = document.documentElement.scrollTop;
		}
		// needed for IE6 (when vertical scroll bar was on the top)
		else {
			scrollX = scrollY = 0;
		}
		// return scroll positions
		return [ scrollX, scrollY ];
	};


	/**
	 * Horizontal auto scroll method.
	 * @param {HTMLElement} so Window or DIV element (so - scroll object).
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	autoScrollX = function (so) {
		var pos,			// left style position
			old,			// old window scroll position (needed for window scrolling)
			scrollPosition,	// define current scroll position
			maxsp,			// maximum scroll position
			edgeCrossed,	// crossed edge for window and scrollable container
			X = pointer.x,	// define pointer X position
			Y = pointer.y;	// define pointer Y position
		// if mouseup then stop handling "current cell"
		if (edge.flag.x > 0) {
			// calculate cell (autoscroll is working)
			calculateCells();
			// set current table row and table cell
			setTableRowColumn();
			// set current table, row and cell if mouse pointer is inside DIV id="drag"
			if (X < divBox[1] && X > divBox[3] && Y < divBox[2] && Y > divBox[0]) {
				cellChanged();
			}
		}
		// save scroll object to the global variable for the first call from handlerOnMouseMove
		// recursive calls will not enter this code and reference to the scrollData.obj will be preserved
		if (typeof(so) === 'object') {
			scrollData.obj = so;
		}
		// window autoscroll (define current, old and maximum scroll position)
		if (scrollData.obj === window) {
			scrollPosition = old = getScrollPosition()[0];
			maxsp = scrollData.width - screen.width;
			edgeCrossed = edge.page.x;
		}
		// scrollable container (define current and maximum scroll position)
		else {
			scrollPosition = scrollData.obj.scrollLeft;
			maxsp = scrollData.obj.scrollWidth - scrollData.obj.clientWidth;
			edgeCrossed = edge.div.x;
		}
		// if scrolling is possible
		if (edge.flag.x > 0 && ((edgeCrossed < 0 && scrollPosition > 0) || (edgeCrossed > 0 && scrollPosition < maxsp))) {
			// if object is window
			if (scrollData.obj === window) {
				// scroll window
				window.scrollBy(edgeCrossed, 0);
				// get new window scroll position (after scrolling)
				// because at page top or bottom edgeY can be bigger then the rest of scrolling area
				// it will be nice to know how much was window scrolled after scrollBy command 
				scrollPosition = getScrollPosition()[0];
				// get current object top style
				pos = parseInt(obj.style.left, 10);
				if (isNaN(pos)) {
					pos = 0;
				}
			}
			// or scrollable container
			else {
				scrollData.obj.scrollLeft += edgeCrossed;
			}
			// recursive autoscroll call 
			setTimeout(autoScrollX, REDIPS.drag.scroll.speed);
		}
		// autoscroll is ended: element is out of the page edge or maximum position is reached (left or right)
		else {
			// return onscroll event handler (to window or div element)
			REDIPS.event.add(scrollData.obj, 'scroll', calculateCells);
			// reset auto scroll flag X
			edge.flag.x = 0;
			// reset current cell position
			currentCell = [0, 0, 0, 0];
		}
	};


	/**
	 * Vertical auto scroll method.
	 * @param {HTMLElement} so Window or DIV element (so - scroll object).
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	autoScrollY = function (so) {
		var pos,			// top style position
			old,			// old window scroll position (needed for window scrolling)
			scrollPosition,	// define current scroll position
			maxsp,			// maximum scroll position
			edgeCrossed,	// crossed edge for window and scrollable container
			X = pointer.x,	// define pointer X position
			Y = pointer.y;	// define pointer Y position
		// if mouseup then stop handling "current cell"
		if (edge.flag.y > 0) {
			// calculate cell (autoscroll is working)
			calculateCells();
			// set current table row and table cell
			setTableRowColumn();
			// set current table, row and cell if mouse pointer is inside DIV id="drag"
			if (X < divBox[1] && X > divBox[3] && Y < divBox[2] && Y > divBox[0]) {
				cellChanged();
			}
		}
		// save scroll object to the global variable for the first call from handlerOnMouseMove
		// recursive calls will not enter this code and reference to the scrollData.obj will be preserved
		if (typeof(so) === 'object') {
			scrollData.obj = so;
		}
		// window autoscroll (define current, old and maximum scroll position)
		if (scrollData.obj === window) {
			scrollPosition = old = getScrollPosition()[1];
			maxsp = scrollData.height - screen.height;
			edgeCrossed = edge.page.y;
		}
		// scrollable container (define current and maximum scroll position)
		else {
			scrollPosition = scrollData.obj.scrollTop;
			maxsp = scrollData.obj.scrollHeight - scrollData.obj.clientHeight;
			edgeCrossed = edge.div.y;
		}
		// if scrolling is possible
		if (edge.flag.y > 0 && ((edgeCrossed < 0 && scrollPosition > 0) || (edgeCrossed > 0 && scrollPosition < maxsp))) {
			// if object is window
			if (scrollData.obj === window) {
				// scroll window
				window.scrollBy(0, edgeCrossed);
				// get new window scroll position (after scrolling)
				// because at page top or bottom edgeY can be bigger then the rest of scrolling area
				// it will be nice to know how much was window scrolled after scrollBy command 
				scrollPosition = getScrollPosition()[1];
				// get current object top style
				pos = parseInt(obj.style.top, 10);
				if (isNaN(pos)) {
					pos = 0;
				}
			}
			// or scrollable container
			else {
				scrollData.obj.scrollTop += edgeCrossed;
			}
			// recursive autoscroll call 
			setTimeout(autoScrollY, REDIPS.drag.scroll.speed);
		}
		// autoscroll is ended: element is out of the page edge or maximum position is reached (top or bottom)
		else {
			// return onscroll event handler (to window or div element)
			REDIPS.event.add(scrollData.obj, 'scroll', calculateCells);
			// reset auto scroll flag Y
			edge.flag.y = 0;
			// reset current cell position
			currentCell = [0, 0, 0, 0];
		}
	};
	

	/**
	 * Method clones DIV element and returns cloned element reference.
	 * "clone" class name will not be copied in cloned element (in case if source element contains "clone" class name).
	 * This method is called internally when DIV elements are cloned.
	 * @param {HTMLElement} div DIV element to clone.
	 * @param {Boolean} [drag] If set to true, then cloned DIV element will be ready for dragging (otherwise element will be only cloned).
	 * @return {HTMLElement} Returns cloned DIV element.
	 * @public
	 * @function
	 * @name REDIPS.drag#cloneObject
	 */
	cloneObject = function (div, drag) {
		var divCloned = div.cloneNode(true),	// cloned DIV element
			cname = divCloned.className,		// set class names of cloned DIV element
			offset,								// offset of the original object
			offsetDragged;						// offset of the new object (cloned)
		// if cloned DIV element should be ready for dragging
		if (drag === true) {
			// append cloned element to the DIV id="redips_clone"
			document.getElementById('redips_clone').appendChild(divCloned);
			// set high z-index
			divCloned.style.zIndex = 999;
			// set style to fixed to allow dragging DIV object
			divCloned.style.position = 'fixed';
			// set offset for original and cloned element
			offset = boxOffset(div);
			offsetDragged = boxOffset(divCloned);
			// calculate top and left offset of the new object
			divCloned.style.top   = (offset[0] - offsetDragged[0]) + 'px';
			divCloned.style.left  = (offset[3] - offsetDragged[3]) + 'px';
		}
		// get IE (all versions) to allow dragging outside the window (?!)
		// this was needed here also -  despite setCaputure in onmousedown
		if (divCloned.setCapture) {
			divCloned.setCapture();
		}
		// remove "clone" and "climitX_Y" class names
		cname = cname.replace('clone', '');
		cname = cname.replace(/climit(\d)_(\d+)/, '');
		// set class names with normalized spaces to the cloned DIV element
		divCloned.className = normalize(cname);
		// if counter is undefined, set 0
		if (clonedId[div.id] === undefined) {
			clonedId[div.id] = 0;
		}
		// set id for cloned element (append id of "clone" element - tracking the origin)
		// id is separated with "c" ("_" is already used to compound id, table, row and column)  
		divCloned.id = div.id + 'c' + clonedId[div.id];
		// increment clonedId for cloned element
		clonedId[div.id] += 1;
		// copy custom properties to the DIV element and child DIV elements and register event handlers
		copyProperties(div, divCloned);
		// return reference to the cloned DIV element	
		return (divCloned);
	};


	/**
	 * Method copies custom properties from source element to the cloned element and sets event handlers (onmousedown and ondblclick).
	 * This action will be taken on DIV element itself and all child DIV elements.
	 * Needed in case when DIV element is cloned or ROW is cloned (for dragging mode="row").
	 * @param {HTMLElement} src Source element (DIV or TR element).
	 * @param {HTMLElement} cln Cloned element (DIV or TR element).
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	copyProperties = function (src, cln) {
		var	copy = [],	// copy method
			childs;		// copy properties for child elements (this method calls "copy" method)
		// define copy method for DIV elements (e1 source element, e2 cloned element)
		// http://stackoverflow.com/questions/4094811/javascript-clonenode-and-properties
		copy[0] = function (e1, e2) {
			// if redips property exists in source element
			if (e1.redips) {
				// copy custom properties (redips.enabled,  redips.container ...)
				e2.redips = {};
				e2.redips.enabled = e1.redips.enabled;
				e2.redips.container = e1.redips.container;
				// set onmousedown, ontouchstart and ondblclick event handler if source element is enabled
				if (e1.redips.enabled) {
					registerEvents(e2);
				}
			}
		};
		// define copy method for TR elements
		copy[1] = function (e1, e2) {
			// if redips property exists in source element
			if (e1.redips) {
				// copy custom properties (redips.emptyRow ...)
				e2.redips = {};
				e2.redips.emptyRow = e1.redips.emptyRow;
			}
		};
		// define method to copy properties for child elements (input parameter is element index 0 - DIV, 1 - TR)
		childs = function (e) {
			var	el1, el2,			// collection of DIV/TR elements in source and cloned element
				i,					// loop variable
				tn = ['DIV', 'TR'];	// tag name
			// collect child DIV/TR elements from the source element (possible if div element contains table)
			el1 = src.getElementsByTagName(tn[e]);
			// collect child DIV/TR elements from cloned element
			el2 = cln.getElementsByTagName(tn[e]);
			// copy custom properties (redips.enabled,  redips.container ...) and set event handlers to child DIV elements
			for (i = 0; i < el2.length; i++) {
				copy[e](el1[i], el2[i]);
			}
		};
		// if source element is DIV element then copy custom properties for DIV element
		if (src.nodeName === 'DIV') {
			copy[0](src, cln);
		}
		// if source element is TR element then copy custom properties for TR element
		else if (src.nodeName === 'TR') {
			copy[1](src, cln);
		}
		// copy properties for DIV child elements
		childs(0);
		// copy properties for TR child elements
		childs(1);
	};


	/**
	 * Method updates climit1_X or climit2_X class name (X defines cloning limit).
	 * <ul>
	 * <li>climit1_X - after cloning X elements, last element will be normal drag-able element</li>
	 * <li>climit2_X - after cloning X elements, last element will stay unmovable</li>
	 * </ul>
	 * @param {HTMLElement} el Element on which cname class should be updated.
	 * @param {Integer} value Increment or decrement climit value.
	 * @see <a href="#handlerOnMouseUp">handlerOnMouseUp</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	cloneLimit = function (el, value) {
		// declare local variables 
		var matchArray,	// match array
			limitType,	// limit type (1 - clone becomes "normal" drag element at last; 2 - clone element stays immovable)
			limit,		// limit number
			classes;	// class names of clone element
		// read class name from element
		classes = el.className;
		// match climit class name		
		matchArray = classes.match(/climit(\d)_(\d+)/);
		// if DIV class contains climit
		if (matchArray !== null) {
			// prepare limitType (1 or 2) and limit
			limitType = parseInt(matchArray[1], 10); 
			limit = parseInt(matchArray[2], 10);
			// if current limit is 0 and should be set to 1 then return "cloning" to the DIV element
			if (limit === 0 && value === 1) {
				// add "clone" class to class attribute
				classes += ' clone';
				// enable DIV element for climit2 type
				if (limitType === 2) {
					enableDrag(true, el);
				}
			}
			// update limit value
			limit += value;
			// update climit class name with new limit value
			classes = classes.replace(/climit\d_\d+/g, 'climit' + limitType + '_' + limit);
			// test if limit drops to zero
			if (limit <= 0) {
				// no more cloning, cut out "clone" from class name
				classes = classes.replace('clone', '');
				// if limit type is 2 then disable clone element (it will stay in cell)
				if (limitType === 2) {
					// disable source DIV element
					enableDrag(false, el);
					// call event.clonedEnd2 handler
					REDIPS.drag.event.clonedEnd2(); 
				}
				else {
					// call event.clonedEnd1 handler
					REDIPS.drag.event.clonedEnd1();
				}
			}
			// normalize spaces and return classes to the clone object 
			el.className = normalize(classes);
		}
	};


	/**
	 * Method returns true or false if element needs to have control.
	 * Elements like A, INPUT, SELECT, OPTION, TEXTAREA should have its own control (method returns "true").
	 * If element contains "nodrag" class name then dragging will be skipped (see example11 "Drag handle on titlebar").
	 * <ul>
	 * <li>true - click on element will not start dragging (element has its own control)</li>
	 * <li>false - click on element will start dragging</li>
	 * </ul>
	 * @param {Event} evt Event information.
	 * @return {Boolean} Returns true or false if element needs to have control.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	elementControl = function (evt) {
		// declare elementControl flag, source tag name and element classes
		var flag = false,
			srcName,
			classes,						// class names of DIV element;
			regexNodrag = /\bnodrag\b/i;	// regular expression to search "nodrag" class name 
		// set source tag name and classes for IE and FF
		if (evt.srcElement) {
			srcName = evt.srcElement.nodeName;
			classes = evt.srcElement.className;
		}
		else {
			srcName = evt.target.nodeName;
			classes = evt.target.className;
		}
		// set flag (true or false) for clicked elements
		switch (srcName) {
		case 'A':
		case 'INPUT':
		case 'SELECT':
		case 'OPTION':
		case 'TEXTAREA':
			flag = true;
			break;
		// none of form elements
		default:
			// if element has "nodrag" class name then dragging will be skipped 
			if (regexNodrag.test(classes)) {
				flag = true;
			}
			else {
				flag = false;
			}
		}
		// return true/false flag
		return flag;
	};


	/**
	 * Method attaches / detaches onmousedown, ontouchstart and ondblclick events to DIV elements and attaches onscroll event to the scroll containers in initialization phase.
	 * It also can be used for element initialization after DIV element was manually added to the table.
	 * If class attribute of DIV container contains "noautoscroll" class name then autoScroll option will be disabled.
	 * @param {Boolean|String} enableFlag Enable / disable element (or element subtree like table, dragging container ...).
	 * @param {HTMLElement|String} [el] HTML node or CSS selector to enable / disable. Parameter defines element reference or CSS selector of DIV elements to enable / disable.
	 * @example
	 * // enable element with id="id123" (element id should be a string according to DOM docs)
	 * rd.enableDrag(true, '#id123');
	 *  
	 * // or init manually added element with known id
	 * REDIPS.drag.enableDrag(true, '#id234');
	 *  
	 * // disable all DIV elements in drag1 subtree 
	 * rd.enableDrag(false, '#drag1 div')
	 *  
	 * // init DIV elements in dragging area (including newly added DIV element)
	 * // DIV initialization will work if table node stays intact (table is not generated dynamically) 
	 * REDIPS.drag.enableDrag('init');
	 *  
	 * // init added element with reference myElement
	 * REDIPS.drag.enableDrag(true, myElement);
	 *  
	 * // disable all DIV elements within TD (td is reference to TD node)
	 * REDIPS.drag.enableDrag(false, td);
	 * @public
	 * @function
	 * @name REDIPS.drag#enableDrag
	 * @see <a href="#init">init</a>
	 * @see <a href="#enableTable">enableTable</a>
	 */
	enableDrag = function (enable_flag, el) {
		// define local variables
		var i, j, k,		// local variables used in loop
			div = [],		// collection of div elements contained in tables or one div element
			tbls = [],		// collection of tables inside scrollable container
			borderStyle,	// border style (solid or dotted)
			opacity,		// (integer) set opacity for enabled / disabled elements
			cursor,			// cursor style (move or auto)
			overflow,		// css value of overflow property
			autoscroll,		// boolean - if scrollable container will have autoscroll option (default is true)
			enabled,		// enabled property (true or false) 
			cb,				// box offset for container box (cb)
			position,		// if table container has position:fixed then "page scroll" offset should not be added
			regexDrag = /\bdrag\b/i,	// regular expression to search "drag" class name
			regexNoAutoscroll = /\bnoautoscroll\b/i;	// regular expression to search "noautoscroll" class name
		// set opacity for disabled elements from public property "opacityDisabled" 
		opacity = REDIPS.drag.style.opacityDisabled;
		// set styles for enabled DIV element
		if (enable_flag === true || enable_flag === 'init') {
			borderStyle = REDIPS.drag.style.borderEnabled;
			cursor = 'move';
			enabled = true;
		}
		// else set styles for disabled DIV element
		else {
			borderStyle = REDIPS.drag.style.borderDisabled;
			cursor = 'auto';
			enabled = false;
		}
		// collect DIV elements inside current drag area (drag elements and scroll containers)
		// e.g. enableDrag(true)
		if (el === undefined) {
			div = dragContainer.getElementsByTagName('div');
		}
		// "el" is string (CSS selector) - it can collect one DIV element (like "#d12") or many DIV elements (like "#drag1 div")
		else if (typeof(el) === 'string') {
			div = document.querySelectorAll(el);
		}
		// "el" is node reference to element that is not DIV class="drag"
		else if (typeof(el) === 'object' && (el.nodeName !== 'DIV' || el.className.indexOf('drag') === -1)) {
			div = el.getElementsByTagName('div');
		}
		// none of above, el is DIV class="drag", so prepare array with one DIV element
		else {
			div[0] = el;
		}
		// 
		// main loop that goes through all DIV elements
		//
		for (i = 0, j = 0; i < div.length; i++) {
			// if DIV element contains "drag" class name
			if (regexDrag.test(div[i].className)) {
				// add reference to the DIV container (initialization or newly added element to the table)
				// this property should not be changed in later element enable/disable
				if (enable_flag === 'init' || div[i].redips === undefined) {
					// create a "property object" in which all custom properties will be saved
					div[i].redips = {};
					div[i].redips.container = dragContainer;
				}
				// remove opacity mask
				else if (enable_flag === true && typeof(opacity) === 'number') {
					div[i].style.opacity = '';
					div[i].style.filter = '';						
				}
				// set opacity for disabled elements
				else if (enable_flag === false && typeof(opacity) === 'number') {
					div[i].style.opacity = opacity / 100;
					div[i].style.filter = 'alpha(opacity=' + opacity + ')';					
				}
				// register event listener for DIV element
				registerEvents(div[i], enabled);
				// set styles for DIV element
				div[i].style.borderStyle = borderStyle;
				div[i].style.cursor = cursor;
				// add enabled property to the DIV element (true or false)
				div[i].redips.enabled = enabled;
			}
			// attach onscroll event to the DIV element in init phase only if DIV element has overflow other than default value 'visible'
			// and that means scrollable DIV container
			else if (enable_flag === 'init') {
				// ask for overflow style
				overflow = getStyle(div[i], 'overflow');
				// if DIV is scrollable
				if (overflow !== 'visible') {
					// define onscroll event handler for scrollable container
					REDIPS.event.add(div[i], 'scroll', calculateCells);
					// set container box style position (to exclude page scroll offset from calculation if needed) 
					position = getStyle(div[i], 'position');
					// get DIV container offset with or without "page scroll" and excluded scroll position of the content
					cb = boxOffset(div[i], position, false);
					// search for noautoscroll option
					if (regexNoAutoscroll.test(div[i].className)) {
						autoscroll = false;
					}
					else {
						autoscroll = true;
					}
					// prepare scrollable container areas
					scrollData.container[j] = {
						div : div[i],					// reference to the scrollable container
						offset : cb,					// box offset of the scrollable container
						midstX : (cb[1] + cb[3]) / 2,	// middle X
						midstY : (cb[0] + cb[2]) / 2,	// middle Y
						autoscroll : autoscroll			// autoscroll enabled or disabled (true or false)
					};
					// search for tables inside scrollable container
					tbls = div[i].getElementsByTagName('table');
					// loop goes through found tables inside scrollable area 
					for (k = 0; k < tbls.length; k++) {
						// add a reference to the corresponding scrollable area
						tbls[k].sca = scrollData.container[j];
					}
					// increase scrollable container counter
					j++;
				}
			}
		}
	};


	/**
	 * Method deletes DIV element from table.
	 * Input parameter is DIV reference or id of DIV element.
	 * @param {String|HTMLElement} el Id of DIV element or reference of DIV element that should be deleted. 
	 * @example
	 * // delete DIV element in event.dropped() event handler
	 * rd.event.dropped = function () {
	 *     rd.deleteObject(rd.obj);
	 * }
	 *  
	 * // delete DIV element with id="d1"
	 * rd.deleteObject('d1'); 
	 * @public
	 * @function
	 * @name REDIPS.drag#deleteObject
	 */
	deleteObject = function (el) {
		var div, i;
		// if "el" is DIV reference then remove DIV element
		if (typeof(el) === 'object' && el.nodeName === 'DIV') {
			el.parentNode.removeChild(el);
		}
		// else try to delete DIV element with its ID
		else if (typeof(el) === 'string') {
			// search for DIV element inside current drag area (drag elements and scrollable containers)
			div = document.getElementById(el);
			// if div element exists then it will be deleted
			if (div) {
				div.parentNode.removeChild(div);
			}
		}
	};


	/**
	 * This method can select tables by class name and mark them as enabled / disabled.
	 * Instead of class name, it it possible to send table reference for enable / disable.
	 * By default, all tables are enabled to accept dropped elements.
	 * @param {Boolean} enable_flag Enable / disable one or more tables.
	 * @param {String|HTMLElement} el Class name of table(s) to enable/disable or table reference to enable/disable. 
	 * @example
	 * // disable tables with class name 'mini'
	 * enableTable(false, 'mini');
	 * @public
	 * @function
	 * @name REDIPS.drag#enableTable
	 * @see <a href="#enableDrag">enableDrag</a>
	 */
	enableTable = function (enable_flag, el) {
		var i;
		// if "el" is table reference then set enable/disable to the table
		if (typeof(el) === 'object' && el.nodeName === 'TABLE') {
			el.redips.enabled = enable_flag;
		}
		// else "el" is table class name
		else {
			// loop through tables array
			for (i = 0; i < tables.length; i++) {
				// if class name is found then set redips.enabled property to the table (redips_enabled is tested inside setTableRowColumn() method)
				if (tables[i].className.indexOf(el) > -1) {
					tables[i].redips.enabled = enable_flag;
				}
			}
		}
	};


	/**
	 * Method returns style value for requested HTML element and style name.
	 * @param {HTMLElement} el Requested HTML element.
	 * @param {String} style_name Asked style name.
	 * @return {String} Returns style value.
	 * @see <a href="http://www.quirksmode.org/dom/getstyles.html">http://www.quirksmode.org/dom/getstyles.html</a>
	 * @public
	 * @function
	 * @name REDIPS.drag#getStyle
	 */
	getStyle = function (el, style_name) {
		var val; // value of requested object and property
		if (el && el.currentStyle) {
			val = el.currentStyle[style_name];
		}
		else if (el && window.getComputedStyle) {
			val = document.defaultView.getComputedStyle(el, null)[style_name];  
		}
		return val;
	};


	/**
	 * Method returns a reference of the required parent element.
	 * @param {String} tag_name Tag name of parent element.
	 * @param {HTMLElement} el Start position to search.
	 * @param {Integer} [skip] How many found nodes should be skipped. For example when start node is TD in inner table and findParent() should return reference of the outside table.
	 * @example
	 * // find parent TABLE element (from cell reference)
	 * tbl = findParent('TABLE', cell);
	 *  
	 * // find reference of the outside table (start node is TD in inner table - first TABLE node should be skipped)
	 * tbl = findParent('TABLE', cell, 1);
	 * @return {HTMLElement} Returns reference of the found parent element.
	 * @public
	 * @function
	 * @name REDIPS.drag#findParent
	 */
	findParent = function (tag_name, el, skip) {
		// move "el" one level up (to prevent finding node itself)
		el = el.parentNode;
		// if skip is not defined then set it to 0
		if (skip === undefined) {
			skip = 0;
		}
		// loop up until parent element is found 
		while (el && el.nodeName !== tag_name) {
			el = el.parentNode;
			// if node is found and needs to be skipped then decrease skip counter and move pointer to the parent node again
			if (el && el.nodeName === tag_name && skip > 0) {
				skip--;
				el = el.parentNode;
			}
	    }
	    // return found element
	    return el;
	};


	/**
	 * Method returns data (cell reference, row index and column index) for first or last cell in table or row / column.
	 * @param {String} param Parameter defines first or last table cell (values are "first", "firstInColumn", "firstInRow", "last", "lastInColumn", "lastInRow").
	 * @param {HTMLElement} el Table cell reference (td). For "first" or "last" request, el can be any HTMLElement within table.
	 * @example
	 * // find first cell in row (el is table cell reference)
	 * firstInRow = findCell('firstInRow', el);
	 * 
	 * // find last cell in table (el is reference of any cell inside table)
	 * last = findCell('last', el);
	 * 
	 * // find last cell in column (el is table cell reference)
	 * lastInColumn = findCell('lastInColumn', el);
	 * @return {Array} Returns array with row index, column index and cell reference, 
	 * @public
	 * @function
	 * @name REDIPS.drag#findCell
	 */
	findCell = function (param, el) {
		// find parent table (if "el" is already table then "el" reference will not change)
		var tbl = findParent('TABLE', el),
			ri,	// row index
			ci,	// cell index
			c;	// cell reference
		switch (param) {
		// first in column
		case 'firstInColumn':
			ri = 0;
			ci = el.cellIndex;
			break;
		// first in row
		case 'firstInRow':
			ri = el.parentNode.rowIndex;
			ci = 0;
			break;
		// last in column
		case 'lastInColumn':
			ri = tbl.rows.length - 1;
			ci = el.cellIndex;
			break;
		// last in row (cell index for current row)
		case 'lastInRow':
			ri = el.parentNode.rowIndex;
			ci = tbl.rows[ri].cells.length - 1;
			break;
		// last in table (cell index for last row)
		case 'last':
			ri = tbl.rows.length - 1;
			ci = tbl.rows[ri].cells.length - 1;
			break;
		// define cell reference for first table cell (row and column indexes are 0) 
		default:
			ri = ci = 0;
		}
		// set table cell reference
		c = tbl.rows[ri].cells[ci];
	    // return cell data as array: row index, cell index and td reference
	    return [ri, ci, c];
	};



	/**
	 * Method scans table content and prepares query string or JSON format for submitting to the server.
	 * Input parameters are id / table reference and optional output format.
	 * @param {String|HTMLElement} tbl Id or reference of table that will be scanned.
	 * @param {String} [type] Type defines output format. If set to "json" then output will be JSON format otherwise output will be query string.
	 * @return {String} Returns table content as query string or in JSON format.
	 * @example
	 * Query string:
	 * 'p[]='+id+'_'+r+'_'+c+'&p[]='+id+'_'+r+'_'+c + ...
	 *  
	 * JSON:
	 * [["id",r,c],["id",r,c],...]
	 *  
	 * id - element id
	 * r  - row index
	 * c  - cell index
	 *  
	 * Query string example:
	 * p[]=d1_1_0&p[]=d2_1_1&p[]=d3_5_2&p[]=d4_5_3
	 *  
	 * JSON example:
	 * [["d1",1,0],["d2",1,1],["d3",5,2],["d4",5,3]]
	 * @see <a href="#saveParamName">saveParamName</a>
	 * @public
	 * @function
	 * @name REDIPS.drag#saveContent
	 */
	saveContent = function (tbl, type) {
		var query = '',						// define query parameter
			tbl_start,						// table loop starts from tbl_start parameter
			tbl_end,						// table loop ends on tbl_end parameter
			tbl_rows,						// number of table rows
			cells,							// number of cells in the current row
			tbl_cell,						// reference to the table cell
			cn,								// reference to the child node
			id, r, c, d,					// variables used in for loops
			JSONobj = [],					// prepare JSON object
			pname = REDIPS.drag.saveParamName;	// set parameter name (default is 'p')
		// if input parameter is string, then set reference to the table
		if (typeof(tbl) === 'string') {
			tbl = document.getElementById(tbl);
		}
		// tbl should be reference to the TABLE object
		if (tbl !== undefined && typeof(tbl) === 'object' && tbl.nodeName === 'TABLE') {
			// define number of table rows
			tbl_rows = tbl.rows.length;
			// iterate through each table row
			for (r = 0; r < tbl_rows; r++) {
				// set the number of cells in the current row
				cells = tbl.rows[r].cells.length;
				// iterate through each table cell
				for (c = 0; c < cells; c++) {
					// set reference to the table cell
					tbl_cell = tbl.rows[r].cells[c];
					// if cells isn't empty (no matter is it allowed or denied table cell) 
					if (tbl_cell.childNodes.length > 0) {
						// cell can contain many DIV elements
						for (d = 0; d < tbl_cell.childNodes.length; d++) {
							// set reference to the child node
							cn = tbl_cell.childNodes[d];
							// childNode should be DIV with containing "drag" class name
							if (cn.nodeName === 'DIV' && cn.className.indexOf('drag') > -1) { // and yes, it should be uppercase
								// prepare query string
								query += cn.id + ',' + r + ',' + c + ' ';
								// push values for DIV element as Array to the Array
								JSONobj.push([cn.id, r, c]);
							}
						}
					}
				}
			}
			// prepare query string in JSON format (only if array isn't empty)
			//if (type === 'json' && JSONobj.length > 0) {
				query = JSON.stringify(JSONobj);
				//query = JSON.stringify(query);
				//query = JSON.parse(JSONobj);
			//}
			//else {
				// cut last '&' from query string
				//query = query.substring(0, query.length - 1);
			//}
		}
		// return prepared parameters (if tables are empty, returned value could be empty too) 
		return query;
	};


	/**
	 * Method relocates DIV elements from source table cell to the target table cell (with optional animation).
	 * If animation is enabled, then target table will be disabled until animated element reaches destination cell.
	 * In animation mode, event.relocated() will be called after animation is finished.
	 * @param {HTMLElement} from Source table cell.
	 * @param {HTMLElement} to Target table cell.
	 * @param {String} [mode] Relocation mode "instant" or "animation". Default is "instant".
	 * @public
	 * @function
	 * @see <a href="#event:relocateBefore">event.relocateBefore</a>
	 * @see <a href="#event:relocateAfter">event.relocateAfter</a>
	 * @see <a href="#event:relocateEnd">event.relocateEnd</a>
	 * @name REDIPS.drag#relocate
	 */
	relocate = function (from, to, mode) {
		var i, j,	// loop variables
			tbl2,	// target table
			idx2,	// target table index
			cn,		// number of child nodes
			div,	// DIV element (needed in for loop)
			move;	// move object (private function)
		// define private move function (after animation is finished table will be enabled)
		move = function (el, to) {
			// call relocateBefore event handler for this element
			REDIPS.drag.event.relocateBefore(el, to);
			// define target position
			var target = REDIPS.drag.getPosition(to);
			// move object
			REDIPS.drag.moveObject({
				obj: el,
				target: target,
				callback: function (div) {
					// set reference to the table and table index
					var tbl = REDIPS.drag.findParent('TABLE', div),
						idx = tbl.redips.idx;
					// call relocateAfter event handler for th
					REDIPS.drag.event.relocateAfter(div, to);
					// decrease animation counter per table
					animationCounter[idx]--;
					// after last element is placed the table then table should be enabled
					if (animationCounter[idx] === 0) {
						// call event handler after relocation is finished
						REDIPS.drag.event.relocateEnd();
						// enable target table
						REDIPS.drag.enableTable(true, tbl);
					}
				}
			});
		};
		// test if "from" cell is equal to "to" cell then do nothing
		if (from === to) {
			return;
		}
		// "from" and "to" should be element nodes, if not then return from method
		if (typeof(from) !== 'object' || typeof(to) !== 'object') {
			return;
		}
		// define childnodes length before loop
		cn = from.childNodes.length;
		// if mode is "animation"
		if (mode === 'animation') {
			// if child nodes exist
			if (cn > 0) {
				// define target table reference and target table index
				tbl2 = findParent('TABLE', to);
				idx2 = tbl2.redips.idx;
				// disable target table
				REDIPS.drag.enableTable(false, tbl2);
				// loop through all child nodes in table cell
				for (i = 0; i < cn; i++) {
					// relocate (with animation) only DIV elements
					if (from.childNodes[i].nodeType === 1 && from.childNodes[i].nodeName === 'DIV') {
						// increase animated counter (counter is initially set to 0)
						animationCounter[idx2]++;
						// move DIV element to the target cell
						move(from.childNodes[i], to);
					}
				}
			}
		}
		// instant mode
		else {
			// loop through all child nodes in table cell
			// 'j', not 'i' because NodeList objects in the DOM are live
			for (i = 0, j = 0; i < cn; i++) {
				// relocate only DIV elements
				if (from.childNodes[j].nodeType === 1 && from.childNodes[j].nodeName === 'DIV') {
					// set DIV element
					div = from.childNodes[j];
					// call relocateBefore event handler for this element
					REDIPS.drag.event.relocateBefore(div, to);
					// append DIV element to the table cell
					to.appendChild(div);
					// register event listeners (FIX for Safari Mobile) if DIV element is not disabled
					if (div.redips && div.redips.enabled !== false) {
						registerEvents(div);
					}
					// call relocateAfter event handler
					REDIPS.drag.event.relocateAfter(div);
				}
				// skip text nodes, attribute nodes ...
				else {
					j++;
				}
			}	
		}
	};


	/**
	 * Method tests TD if is empty or removes elements from table cell.
	 * Cell is considered as empty if does not contain any child nodes or if cell has only one text node.
	 * In other words, if cell contains only text then it will be treated as empty cell.
	 * @param {HTMLElement} td Table cell to test or from which all the elements will be deleted.
	 * @param {String} [mode] If mode is set to "test" then method will only test TD and return true or false.
	 * @example
	 * // set REDIPS.drag reference
	 * var rd = REDIPS.drag;
	 * // search for TABLE element (from cell reference)
	 * tbl = rd.emptyCell(td);
	 *  
	 * // how to test TD if cell is occupied
	 * var empty = rd.emptyCell(td, 'test');  
	 * @return {Boolean|Array} Returns true/false depending on cell content or array with deleted child nodes.
	 * @public
	 * @function
	 * @name REDIPS.drag#emptyCell
	 */
	emptyCell = function (tdElement, mode) {
		var cn,			// number of child nodes
			el = [],	// removed elements will be saved in array
			flag,		// empty cell flag
			i;			// loop variable
		// td should be table cell element otherwise return undefined
		if (tdElement.nodeName !== 'TD') {
			return undefined;
		}
		// define childnodes length before loop (not in loop because NodeList objects in the DOM are live)
		cn = tdElement.childNodes.length;
		// if mode is set to "test" then check for cell content
		if (mode === 'test') {
			// in case of source cell, return undefined
			if (td.source === tdElement) {
				flag = undefined;
			}
			// cell without child nodes or if cell has only one node and that is text node then cell is empty
			else if (tdElement.childNodes.length === 0 || (tdElement.childNodes.length === 1 && tdElement.firstChild.nodeType === 3)) {
				flag = true;
			}
			// otherwise, cell contain some elements
			else {
				flag = false;
			}
			// return empty flag state
			return flag;
		}
		// otherwise delete all child nodes from td
		else {
			for (i = 0; i < cn; i++) {
				// save node reference
				el.push(tdElement.childNodes[0]);
				// delete node
				tdElement.removeChild(tdElement.childNodes[0]);
			}
			// return array with references od deleted nodes
			return el;
		}
	};


	/**
	 * Method shifts table content horizontally or vertically. REDIPS.drag.shift.mode defines the way of how content will be shifted.
	 * Useful for sorting table content in any direction.
	 * @param {HTMLElement} td1 Source table cell.
	 * @param {HTMLElement} td2 Target table cell.
	 * @example
	 * // define first and last table cell
	 * var firstCell = document.getElementById('firstCellOnTable'),
	 *     lastCell = document.getElementById('lastCellOnTable');
	 * // enable animation
	 * REDIPS.drag.shift.animation = true;
	 * // shift content
	 * REDIPS.drag.shiftCells(lastCell, firstCell);
	 * @public
	 * @function
	 * @name REDIPS.drag#shiftCells
	 * @see <a href="#shift">shift.mode</a>
	 */
	shiftCells = function (td1, td2) {
		var tbl1, tbl2,	// table reference of source and target cell
			pos,		// start cell (source) position
			pos1,		// start position (used for settings of pos variable)
			pos2,		// end cell (target) position
			d,			// direction (1 - left, -1 - right)
			cl,			// cell list in form of [row, cell] -> table_cell (it takes care about rowspan and colspan)
			t1, t2,		// temporary source and target cell needed for relocate
			c1, c2,		// source and target cell needed for relocate
			m1, m2,		// set flags if source or target cell contains "mark" class name
			p2,			// remember last possible cell when marked cell occures
			shiftMode,	// shift.mode read from public parameter
			rows,		// row number
			cols,		// column number (column number is defined from first row)
			x, y,		// column / row
			max,
			overflow = false,	// (boolean) overflow flag (initially is set to false)
			myShift,			// shift method used locally in shiftCells
			handleOverflow;		// overflow method used locally (handler overflowed cells)
		// define myShift local method (content will be shifted with or without animation)
		myShift = function (source, target) {
			if (REDIPS.drag.shift.animation) {
				relocate(source, target, 'animation');
			}
			else {
				relocate(source, target);
			}
		};
		// handleOverflow - how to handle overflow content
		handleOverflow = function (target) {
			if (REDIPS.drag.shift.overflow === 'delete') {
				emptyCell(target);
			}
			// relocate overflowed content
			else if (REDIPS.drag.shift.overflow === 'source') {
				myShift(target, td.source);
			}
			else if (typeof(REDIPS.drag.shift.overflow) === 'object') {
				myShift(target, REDIPS.drag.shift.overflow);
			}
			// set overflow flag to false (overflow could happen only once)
			overflow = false;
			// call shiftOverflow event handler
			REDIPS.drag.event.shiftOverflow(target);
		};
		// if DIV element is dropped to the source cell then there's nothing to do - just return from method
		if (td1 === td2) {
			return;
		}
		// set shift.mode from public property
		shiftMode = REDIPS.drag.shift.mode;
		// set table reference for source and target table cell
		tbl1 = findParent('TABLE', td1);
		tbl2 = findParent('TABLE', td2);
		// prepare cell index (this will take care about rowspan and cellspan cases)
		cl = cellList(tbl2);
		// set source position only if both locations are from the same table
		if (tbl1 === tbl2) {
			pos1 = [td1.redips.rowIndex, td1.redips.cellIndex];
		}
		else {
			pos1 = [-1, -1];
		}
		// set source and target position (pos1 is used for setting pos variable in switch (shiftMode) case)
		pos2 = [td2.redips.rowIndex, td2.redips.cellIndex];
		// define number of rows and columns for target table (it's used as row and column index) 
		rows = tbl2.rows.length;
		cols = maxCols(tbl2);
		// set start position for shifting (depending on shift.mode value)
		switch (shiftMode) {
		case 'vertical2':
			// if source and target are from the same table and from the same column then use pos1 otherwise set last cell in column
			pos = (tbl1 === tbl2 && td1.redips.cellIndex === td2.redips.cellIndex) ? pos1 : [rows, td2.redips.cellIndex];
			break;
		case 'horizontal2':
			// if source and target are from the same table and from the same row then use pos1 otherwise set last cell in row
			pos = (tbl1 === tbl2 && td1.parentNode.rowIndex === td2.parentNode.rowIndex) ? pos1 : [td2.redips.rowIndex, cols];
			break;
		// vertical1 and horizontal1 shift.mode
		default:
			// set start cell if source and target cells are from the same table otherwise set last cell in table
			pos = (tbl1 === tbl2) ? pos1 : [rows, cols];
		}
		//
		// shift direction, max and row / column variables
		//
		// set direction (up/down) for vertical shift.mode
		// if source cell is prior to the target cell then set direction to the "up", otherwise direction is to the "down"
		if (shiftMode === 'vertical1' || shiftMode === 'vertical2') {
			d = (pos[1] * 1000 + pos[0] < pos2[1] * 1000 + pos2[0]) ? 1 : -1;
			max = rows;
			x = 0;
			y = 1;
		}
		// set direction (left/right) for horizontal shift.mode
		// if source cell is prior to the target cell then set direction to the "left", otherwise direction is to the "right"
		else {
			d = (pos[0] * 1000 + pos[1] < pos2[0] * 1000 + pos2[1]) ? 1 : -1;
			max = cols;
			x = 1;
			y = 0;
		}
		//
		// set overflow flag
		//
		// if source and target tables are different or max cell is defined for row, column or table then set possible overflow
		if (pos[0] !== pos1[0] && pos[1] !== pos1[1]) {
			overflow = true;
		}
		//
		// loop
		//
		// while loop - goes from target to source position (backward)
		// imagine row with 5 cells, relocation will go like this: 3->4, 2->3, 1->2 and 0->1 
		while (pos[0] !== pos2[0] || pos[1] !== pos2[1]) {
			// define target cell
			t2 = cl[pos[0] + '-' + pos[1]];
			// increase indexes for row and column to define source cell 
			// increment row index
			pos[x] += d;
			// if row is highest row
			if (pos[x] < 0) {
				pos[x] = max;
				pos[y]--;
			}
			// if cellIndex was most right column
			else if (pos[x] > max) {
				pos[x] = 0;
				pos[y]++;
			}
			// define temp source cell
			t1 = cl[pos[0] + '-' + pos[1]];
			// if temp1 cell source cell exists then remember location to c1
			if (t1 !== undefined) {
				c1 = t1;
			}
			// if temp2 cell source cell exists then remember location to c2
			if (t2 !== undefined) {
				c2 = t2;
			}
			// shift DIV if exists (t1 and c2) or (c1 and t2)
			if ((t1 !== undefined && c2 !== undefined) || (c1 !== undefined && t2 !== undefined)) {
				// set "mark" flags if source or target cell contains "mark" class name
				m1 = c1.className.indexOf(REDIPS.drag.mark.cname) === -1 ? 0 : 1;
				m2 = c2.className.indexOf(REDIPS.drag.mark.cname) === -1 ? 0 : 1;
				// detect overflow (actually this is detection of first allowed cell)
				if (overflow) {
					// if target cell is marked and source cell is not marked handle overflow (overflow flag will be automatically set to false)
					if (m1 === 0 && m2 === 1) {
						handleOverflow(c1);
					}
				}
				// if source cell is forbidden then skip shifting
				if (m1 === 1) {
					// if target cell isn't foribdden then remember this location
					if (m2 === 0) {
						p2 = c2;
					}
					continue;
				}
				// set target cell to be last free cell (remembered in previous step)
				else if (m1 === 0 && m2 === 1) {
					c2 = p2;
				}
				// relocate cell content with or without animation
				myShift(c1, c2);
			}
			// overflow detection (fall off table edge)
			else if (overflow && c1 !== undefined && c2 === undefined) {
				// test for "mark" class name for source cell
				m1 = c1.className.indexOf(REDIPS.drag.mark.cname) === -1 ? 0 : 1;
				// if edge cell is not marked then handle overflow
				if (m1 === 0) {
					handleOverflow(c1);
				}
			}
		}
	};


	/**
	 * Determining a table cell's X and Y position/index.
	 * @see <a href="http://www.javascripttoolbox.com/temp/table_cellindex.html">http://www.javascripttoolbox.com/temp/table_cellindex.html</a>
	 * @see <a href="http://www.barryvan.com.au/2012/03/determining-a-table-cells-x-and-y-positionindex/">http://www.barryvan.com.au/2012/03/determining-a-table-cells-x-and-y-positionindex/</a>
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	cellList = function (table) {
		var matrix = [],
			matrixrow,
			lookup = {},
			c,			// current cell
			ri,			// row index
			rowspan,
			colspan,
			firstAvailCol,
			tr,			// TR collection
			i, j, k, l;	// loop variables
		// set HTML collection of table rows
		tr = table.rows;
		// open loop for each TR element
		for (i = 0; i < tr.length; i++) {
			// open loop for each cell within current row
			for (j = 0; j < tr[i].cells.length; j++) {
				// define current cell
				c = tr[i].cells[j];
				// set row index
				ri = c.parentNode.rowIndex;
				// define cell rowspan and colspan values
				rowspan = c.rowSpan || 1;
				colspan = c.colSpan || 1;
				// if matrix for row index is not defined then initialize array
				matrix[ri] = matrix[ri] || [];
				// find first available column in the first row
				for (k = 0; k < matrix[ri].length + 1; k++) {
					if (typeof(matrix[ri][k]) === 'undefined') {
						firstAvailCol = k;
						break;
					}
				}
				// set cell coordinates and reference to the table cell
				lookup[ri + '-' + firstAvailCol] = c;
				// create a "property object" in which "real" row/cell index will be saved
				if (c.redips === undefined) {
					c.redips = {};
				}
				// save row and cell index to the cell
				c.redips.rowIndex = ri;
				c.redips.cellIndex = firstAvailCol;
				for (k = ri; k < ri + rowspan; k++) {
					matrix[k] = matrix[k] || [];
					matrixrow = matrix[k];
					for (l = firstAvailCol; l < firstAvailCol + colspan; l++) {
						matrixrow[l] = 'x';
					}
				}
			}
		}
		return lookup;
	};


	/**
	 * Method returns number of maximum columns in table (some row may contain merged cells).
	 * @param {HTMLElement|String} table TABLE element.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	maxCols = function (table) {
		var	tr = table.rows,	// define number of rows in current table
			span,				// sum of colSpan values
			max = 0,			// maximum number of columns
			i, j;				// loop variable
		// if input parameter is string then overwrite it with table reference
		if (typeof(table) === 'string') {
			table = document.getElementById(table);
		}
		// open loop for each TR within table
		for (i = 0; i < tr.length; i++) {
			// reset span value
			span = 0;
			// sum colspan value for each table cell
			for (j = 0; j < tr[i].cells.length; j++) {
				span += tr[i].cells[j].colSpan || 1;
			}
			// set maximum value
			if (span > max) {
				max = span;
			}
		}
		// return maximum value
		return max;
	};


	/**
	 * Method will calculate parameters and start animation (DIV element to the target table cell).
	 * "moveObject" will always move DIV element with animation while "relocate" has option to relocate all DIV elements from one TD to another TD with or without animation.
	 * If "target" property is not defined then current location will be used. Here is properties definition of input parameter:
	 * <ul>
	 * <li>{String} id - id of element to animate - DIV element or row handler (div class="drag row")</li>
	 * <li>{String} obj - reference of element to animate - DIV element or row handler (if "id" parameter exists, "obj" parameter will be ignored)</li>
	 * <li>{String} mode - animation mode (if mode="row" then source and target properties should be defined)</li>
	 * <li>{Boolean} clone - if set to true then DIV element will be cloned instead of moving (used only in "cell" mode and default is false)</li>
	 * <li>{Boolean} overwrite - if set to true then elements in target cell will be overwritten (used only in "cell" mode and default is false)</li>
	 * <li>{Array} source - source position (table index and row index)</li>
	 * <li>{Array} target - target position (table, row and cell index (optional for "row" mode)</li>
	 * <li>{Function} callback - callback function executed after animation is finished</li>
	 * </ul>
	 * Method returns array containing reference of two object. In "cell" mode returned objects are:
	 * <ul>
	 * <li>Array[0] - dragged element</li>
	 * <li>Array[1] - dragged element</li>
	 * </ul>
	 * In "row" mode returned objects are:
	 * <ul>
	 * <li>Array[0] - tableMini</li>
	 * <li>Array[1] - source row</li>
	 * </ul>
	 * If "clone" parameter is set to true then event.cloned() event handler will be invoked with input parameter of cloned element.
	 * @param {Object} ip Object with properties: id, mode, source, target and callback.
	 * @return {Array|Boolean} Returns reference of two elements in array or false. In "cell" mode both elements are dragged element, while in "row" mode first element is tableMini and second element is source row or it could be false if "emptyRow" try to move.
	 * @example
	 * // move element with id="a1" to the current location and after
	 * // animation is finished display alert "Finished"  
	 * rd.moveObject({
	 *     id: 'a1',
	 *     callback: function () {
	 *         alert('Finished');
	 *     }
	 * });
	 *  
	 * // move DIV element with reference "mydiv" to the TD with reference td
	 * rd.moveObject({
	 *     obj: mydiv,
	 *     target: td
	 * });
	 *  
	 * // move DIV element with reference "mydiv" to the first table, second row and third cell
	 * rd.moveObject({
	 *     obj: mydiv,
	 *     target: [0, 1, 2]
	 * });
	 *  
	 * // move element with id="a2" to the first table, second row and third cell
	 * rd.moveObject({
	 *     id: 'a2',
	 *     target: [0, 1, 2]
	 * });
	 *  
	 * // clone DIV element with reference "mydiv", move to the first table, second row,
	 * // third cell and overwrite all content in target cell
	 * rd.moveObject({
	 *     obj: mydiv,
	 *     clone: true,
	 *     overwrite: true,
	 *     target: [0, 1, 2]
	 * });
	 *  
	 * // move first row and after animation is finished call "enable_button" function
	 * // "moveObject" returns Array with references of tableMini and source row
	 * row = rd.moveObject({
	 *           mode: 'row',            // animation mode - row
	 *           source: [0, 0],         // source position (table index and row index)
	 *           target: [0, 6],         // target position
	 *           callback: enable_button // function to call after animation is over
	 *        });
	 * @see <a href="#relocate">relocate</a>
	 * @public
	 * @function
	 * @name REDIPS.drag#moveObject
	 */
	moveObject = function (ip) {
		var p = {'direction': 1},	// param object (with default direction)
			x1, y1,	w1, h1,			// coordinates and width/height of object to animate
			x2, y2,	w2, h2,			// coordinates and width/height of target cell
			row, col,				// row and cell indexes
			dx, dy,					// delta x and delta y
			pos, i,					// local variables needed for calculation coordinates and settings the first point
			target;
		// set callback function - it will be called after animation is finished
		p.callback = ip.callback;
		// set overwrite parameter
		p.overwrite = ip.overwrite;
		// define obj and objOld (reference of the object to animate - DIV element or row handler)
		// ip.id - input parameter obj_id
		if (typeof(ip.id) === 'string') {
			p.obj = p.objOld = document.getElementById(ip.id);
		}
		// reference of DIV element to animate
		else if (typeof(ip.obj) === 'object' && ip.obj.nodeName === 'DIV') {
			p.obj = p.objOld = ip.obj;
		}
		// test if animation mode is "row" (mode, source and target properties should be defined)
		if (ip.mode === 'row') {
			p.mode = 'row';
			// find table index for source table (source[0] contains original table index)
			i = getTableIndex(ip.source[0]);
			// define source row index from input parameter object
			row = ip.source[1];
			// set source row
			objOld = p.objOld = tables[i].rows[row];
			// if row is marked as empty row then it will not be moved and method will return false
			if (objOld.redips && objOld.redips.emptyRow === true) {
				return false;
			}
			// set reference to the mini table - cloned from source row (TABLE element)
			p.obj = rowClone(p.objOld, 'animated');
		}
		// test if element is row handler
		else if (p.obj && p.obj.className.indexOf('row') > -1) {
			p.mode = 'row';
			// find TR element and remember reference to the source row (TR element)
			p.obj = p.objOld = objOld = findParent('TR', p.obj);
			// if row is marked as empty row then it will not be moved and method will return false
			if (objOld.redips && objOld.redips.emptyRow === true) {
				return false;
			}
			// set reference to the mini table - cloned from source row (TABLE element)
			p.obj = rowClone(p.objOld, 'animated');
		}
		// animation mode is "cell"
		else {
			p.mode = 'cell';
		}
		// p.obj should be existing object (null or non objects are not allowed)
		if (typeof(p.obj) !== 'object' || p.obj === null) {
			return undefined;
		}
		// set high z-index
		p.obj.style.zIndex = 999;
		// if clicked element doesn't belong to the current container then context should be changed
		// redips property could not be set in case when static DIV is moved (like in example25)
		if (p.obj.redips && dragContainer !== p.obj.redips.container) {
			dragContainer = p.obj.redips.container;
			initTables();
		}
		// set width, height and coordinates for source position of object
		pos = boxOffset(p.obj);
		w1 = pos[1] - pos[3];
		h1 = pos[2] - pos[0];
		x1 = pos[3];
		y1 = pos[0];
		// if input parameter "clone" is true and DIV element is moving then clone DIV element instead of moving original element
		// this should go after definition of start coordinates x1 and y1
		if (ip.clone === true && p.mode === 'cell') {
			// clone object (DIV element)
			p.obj = cloneObject(p.obj, true);
			// and call event.cloned event handler
			REDIPS.drag.event.cloned(p.obj);
		}
		// if target parameted is undefined then use current position in table 
		if (ip.target === undefined) {
			ip.target = getPosition();
		}
		// if target is TD (object) then set position for this TD
		else if (typeof(ip.target) === 'object' && ip.target.nodeName === 'TD') {
			ip.target = getPosition(ip.target);
		}
		// set target table, row and cell indexes (needed for moving table row)
		// table index is index from array not original table index
		p.target = ip.target;
		// find table index because tables array is sorted on every element click (target[0] contains original table index)
		i = getTableIndex(ip.target[0]);
		// set index for row and cell (target input parameter is array)
		row = ip.target[1];
		col = ip.target[2];
		// if target row index is greater then number of rows in target table then set last row index
		if (row > tables[i].rows.length - 1) {
			row = tables[i].rows.length - 1;
		}
		// save reference of target cell
		p.targetCell = tables[i].rows[row].cells[col];
		// set width, height and coordinates of target cell
		if (p.mode === 'cell') {
			pos = boxOffset(p.targetCell);
			w2 = pos[1] - pos[3];
			h2 = pos[2] - pos[0];
			// target coordinates are cell center including object dimensions
			x2 = pos[3] + (w2 - w1) / 2;
			y2 = pos[0] + (h2 - h1) / 2;
		}
		// set width, height and coordinates of target row
		else {
			pos = boxOffset(tables[i].rows[row]);
			w2 = pos[1] - pos[3];
			h2 = pos[2] - pos[0];
			x2 = pos[3];
			y2 = pos[0];
		}
		// calculate delta x and delta y
		dx = x2 - x1;
		dy = y2 - y1;
		// set style to fixed to allow moving DIV object
		p.obj.style.position = 'fixed';
		// if line is more horizontal
		if (Math.abs(dx) > Math.abs(dy)) {
			// set path type
			p.type = 'horizontal';
			// set slope (m) and y-intercept (b)
			// y = m * x + b
			p.m = dy / dx;
			p.b = y1 - p.m * x1;
			// parameters needed for delay calculation (based on parabola)
			p.k1 = (x1 + x2) / (x1 - x2);
			p.k2 = 2 / (x1 - x2);
			// define animation direction
			if (x1 > x2) {
				p.direction = -1;
			}
			// set first and last point
			i = x1;
			p.last = x2;
		}
		// line is more vertical
		else {
			// set path type
			p.type = 'vertical';
			// set slope (m) and y-intercept (b)
			// y = m * x + b
			p.m = dx / dy;
			p.b = x1 - p.m * y1;
			// parameters needed for delay calculation (based on parabola)
			p.k1 = (y1 + y2) / (y1 - y2);
			p.k2 = 2 / (y1 - y2);
			// define animation direction
			if (y1 > y2) {
				p.direction = -1;
			}
			// set first and last point
			i = y1;
			p.last = y2;
		}
		// set attribute "animated" of DIV object to true (to disable dragging od DIV while animation lasts)
		// redips property could not be set in case when static DIV is moved (like in example25)
		if (p.obj.redips) {
			p.obj.redips.animated = true;
		}
		// start animation
		animateObject(i, p);
		// return reference of obj and objOld elements
		// "cell" mode
		// obj - dragged element
		// objOld - dragged element
		// "row" mode
		// obj - tableMini
		// objOld - source row
		return [p.obj, p.objOld];
	};


	/**
	 * Element (DIV or table row) animation.
	 * After "moveObject" calculates parameters, animation is started by calling "animate" method.
	 * Each other animation step is done by recursive calls until element reaches last point.
	 * Input parameters are first (current) point and 'p' object with following properties:
	 * <ul>
	 * <li>obj - object to animate</li>
	 * <li>targetCell - target table cell</li>
	 * <li>last - last point</li>
	 * <li>m, b - slope and y-intercept (needed for y = m * x + b)</li>
	 * <li>k1, k2 - constants needed for calculation 1 -> 0 -> 1 parameter (regarding current position)</li>
	 * <li>direction - animation direction (1 or -1)</li>
	 * <li>type - line type (horizontal or vertical)</li>
	 * <li>overwrite - if set to true then elements in target cell will be overwritten (used only in "cell" mode and default is false)</li>
	 * </ul>
	 * @param {Integer} i First (and lately current) point
	 * @param {Object} p Object with properties: obj, targetCell, last, m, b, k1, k2, direction and type
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	animateObject = function (i, p) {
		// calculate parameter k (k goes 1 -> 0 -> 1 for start and end step)
		var k = (p.k1 - p.k2 * i) * (p.k1 - p.k2 * i),
			f;
		// calculate step and function of step (y = m * x + b)
		i = i + REDIPS.drag.animation.step * (4 - k * 3) * p.direction;
		f = p.m * i + p.b;
		// set element position
		if (p.type === 'horizontal') {
			p.obj.style.left = i + 'px';
			p.obj.style.top  = f + 'px';			
		}
		else {
			p.obj.style.left = f + 'px';
			p.obj.style.top  = i + 'px';
		}
		// if line is not finished then make recursive call
		if ((i < p.last && p.direction > 0) || ((i > p.last) && p.direction < 0)) {
			// recursive call for next step
			setTimeout(function () {
				animateObject(i, p);
			}, REDIPS.drag.animation.pause * k);
		}
		// animation is finished
		else {
			// reset object styles
			resetStyles(p.obj);
			// set animation flag to false to enable DIV dragging
			// redips property could not be set in case when static DIV is moved (like in example25)
			if (p.obj.redips) {
				p.obj.redips.animated = false;
			}
			// if moved element is cell then append element to the target cell
			if (p.mode === 'cell') {
				// if overwrite parameter is set to true then empty targetCell
				if (p.overwrite === true) {
					// empty target cell
					emptyCell(p.targetCell);
				}
				p.targetCell.appendChild(p.obj);
				// register event listeners (FIX for Safari Mobile) if DIV element is not disabled
				if (p.obj.redips && p.obj.redips.enabled !== false) {
					registerEvents(p.obj);
				}
			}
			// else element is row
			else {
				// take care about real table index
				rowDrop(getTableIndex(p.target[0]), p.target[1], p.obj);
			}
			// execute callback function if callback is defined and send reference of moved element
			if (typeof(p.callback) === 'function') {
				p.callback(p.obj);
			}
		}
	};


	/**
	 * Method returns position as array with members tableIndex, rowIndex and cellIndex (array length is 3).
	 * If input parameter is not defined then method will return array with current and source positions (array length will be 6).
	 * @param {String|HTMLElement} [ip] DIV element id / reference or table cell id / reference.
	 * @return {Array} Returns array with members tableIndex, rowIndex and cellIndex. If position is not found then all array members will have value -1.
	 * @example
	 * // set REDIPS.drag reference
	 * var rd = REDIPS.drag;
	 * // display target and source position of dropped element
	 * rd.event.dropped = function () {
	 *    // get target and source position (method returns positions as array)
	 *    // pos[0] - target table index
	 *    // pos[1] - target row index
	 *    // pos[2] - target cell (column) index
	 *    // pos[3] - source table index
	 *    // pos[4] - source row index
	 *    // pos[5] - source cell (column) index
	 *    var pos = rd.getPosition();
	 *    // display element positions
	 *    console.log(pos);
	 * };
	 * @public
	 * @function
	 * @name REDIPS.drag#getPosition
	 */
	getPosition = function (ip) {
		var toi,		// table original index (because tables are sorted on every element click)
			toi_source,	// table original index (source table)
			ci, ri, ti,	// cellIndex, rowIndex and table index (needed for case if input parameter exists)
			el,			// element reference
			tbl,		// table reference
			arr = [];	// array to return
		// set initial values for cell, row and table index
		ci = ri = ti = -1;
		// if input parameter is is undefined, then return current location and source location (array will contain 6 elements)
		if (ip === undefined) {
			// table original index (because tables are sorted on every element click)
			if (table < tables.length) {
				toi = tables[table].redips.idx;
			}
			// if any level of old position is undefined, then use source location
			else if (table_old === null || row_old === null || cell_old === null) {
				toi = tables[table_source].redips.idx;
			}
			// or use the previous location
			else {
				toi = tables[table_old].redips.idx;
			}
			// table source original index
			toi_source = tables[table_source].redips.idx;
			// prepare array to return (row, cell and row_source, cell_source are global variables)
			arr = [toi, row, cell, toi_source, row_source, cell_source];
		}
		// input parameter is defined (id or reference of table cell or any child of table cell) 
		else {
			// if input parameter is string (this should be element id), then set element reference
			if (typeof(ip) === 'string') {
				el = document.getElementById(ip);
			}
			// else, input parameter is reference
			else {
				el = ip;
			}
			// if element exists
			if (el) {
				// find parent TD element (because "ip" could be the child element of table cell - DIV drag or any other inner element)
				if (el.nodeName !== 'TD') {
					el = findParent('TD', el);
				}
				// if node is table cell then set coordinates
				if (el && el.nodeName === 'TD') {
					// define cellIndex and rowIndex 
					ci = el.cellIndex;
					ri = el.parentNode.rowIndex;
					// find table
					tbl = findParent('TABLE', el);
					// define table index
					ti = tbl.redips.idx;
				}
			}
			// prepare array with tableIndex, rowIndex and cellIndex (3 elements)
			arr = [ti, ri, ci];
		}
		// return result array
		return arr;
	};
	

	/**
	 * Find table index - because tables array is sorted on every element click.
	 * @param {Integer} idx Table index of initial table order.
	 * @return {Integer} Returns current index from tables array.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	getTableIndex = function (idx) {
		var i;
		for (i = 0; i < tables.length; i++) {
			if (tables[i].redips.idx === idx) {
				break;
			}
		}
		return i;
	};


	/**
	 * Function returns a string in which all of the preceding and trailing white space has been
	 * removed, and in which all internal sequences of white is replaced with one white space. 
	 * @param {String} str Input string.
	 * @return {String} Returns normalized string.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	normalize = function (str) {
		if (str !== undefined) {
			str = str.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ');
		}
		// return normalized string (without preceding and trailing spaces)
		return str;
	};


	/**
	 * Method returns "true" if input element contains child nodes with nodeType === 1.
	 * Other node types (like text node) are ignored.
	 * @param {HTMLElement} el Input element.
	 * @return {Boolean} Returns true or false.
	 * @private
	 * @memberOf REDIPS.drag#
	 */
	hasChilds = function (el) {
		// local variable
		var i;
		// loop goes through all child nodes and search for node with nodeType === 1
		for (i = 0; i < el.childNodes.length; i++) {
			if (el.childNodes[i].nodeType === 1) {
				return true;
			}
		}
		return false;
	};


	/**
	 * Method sets opacity to table row or deletes row content.
	 * Input parameter "el" is reference to the table row or reference to the cloned mini table (when row is moved).
	 * @param {HTMLElement|String} el Id of row handler (div class="drag row") or reference to element (source row or mini table).
	 * @param {Integer|String} opacity Opacity level (from 0 to 100) or "empty" (then content of table cells in row will be deleted - in that case first parameter should be TR).
	 * @param {String} [color] Background color.
	 * @example
	 * // set reference to the REDIPS.drag library
	 * rd = REDIPS.drag; 
	 * 
	 * // make row semi-transparent
	 * rd.rowOpacity(rowObj, 50);
	 * 
	 * // set row as empty and white (content in table cells will be deleted)
	 * rd.rowOpacity(rowObj, 'empty', 'White');
	 * @public
	 * @function
	 * @name REDIPS.drag#rowOpacity
	 */
	rowOpacity = function (el, opacity, color) {
		var	tdNodeList,	// table cells
			i, j;		// loop variables
		// if input parameter is string (this should be element id), then set element reference
		if (typeof(el) === 'string') {
			el = document.getElementById(el);
			// el could be reference of the DIV class="drag row" (row handler)
			el = findParent('TABLE', el);
		}
		// if el is TR, then set background color to each cell (if needed) and apply opacity
		if (el.nodeName === 'TR') {
			// collect table cell from the row
			tdNodeList = el.getElementsByTagName('td');
			// set opacity for DIV element
			for (i = 0; i < tdNodeList.length; i++) {
				// set background color to table cell if needed
				tdNodeList[i].style.backgroundColor = color ? color : '';
				// if opacity is set to "empty" then delete cell content 
				if (opacity === 'empty') {
					tdNodeList[i].innerHTML = '';
				}
				// otherwise set opacity to every child node in table cell
				else {
					// loop through child nodes of every table cell
					for (j = 0; j < tdNodeList[i].childNodes.length; j++) {
						// apply styles only to Element nodes (not text nodes, attributes ...)
						// http://code.stephenmorley.org/javascript/dom-nodetype-constants/
						if (tdNodeList[i].childNodes[j].nodeType === 1) {
							tdNodeList[i].childNodes[j].style.opacity = opacity / 100;
							tdNodeList[i].childNodes[j].style.filter = 'alpha(opacity=' + opacity + ')';
							//td[i].childNodes[j].style.visibility = 'hidden';
						}
					}
				}
			}
		}
		// when row is moved then REDIPS.drag will create mini table with one row
		// all browsers (IE8, Opera11, FF3.6, Chrome10) can set opacity to the table
		else {
			el.style.opacity = opacity / 100;					// set opacity for FF, Chrome, Opera
			el.style.filter = 'alpha(opacity=' + opacity + ')';	// set opacity for IE
			el.style.backgroundColor = color ? color : '';		// set background color 
		}
	};


	/**
	 * Method marks selected row as empty. Could be needed for displaying initially empty table.
	 * Input parameters are table id and row index.
	 * @param {String} tbl_id Table id.
	 * @param {Integer} row_idx Row index (starts from 0).
	 * @param {String} [color] Color of empty row (default is "White" or defined with REDIPS.drag.rowEmptyColor parameter).
	 * @see <a href="#style">style.rowEmptyColor</a>
	 * @example
	 * // set reference to the REDIPS.drag library
	 * rd = REDIPS.drag; 
	 * // mark first row as empty in table with id="tbl1"
	 * rd.rowEmpty('tbl1', 0);
	 * @public
	 * @function
	 * @name REDIPS.drag#rowEmpty
	 */
	rowEmpty = function (tbl_id, row_idx, color) {
		var tbl = document.getElementById(tbl_id),
			row = tbl.rows[row_idx];
		// define color parameter if input parameter "color" is not defined
		if (color === undefined) {
			color = REDIPS.drag.style.rowEmptyColor;
		}
		// create a "property object" in which all custom properties of row will be saved.
		if (row.redips === undefined) {
			row.redips = {};
		}
		// set emptyRow property to true
		row.redips.emptyRow = true;
		// mark row as empty
		rowOpacity(row, 'empty', color);
	};


	return {
		/* public properties */
		/**
		 * Currently moved DIV element. Reference to the REDIPS.drag.obj (dragged DIV element) is visible and can be used in appropriate event handlers.
		 * @type HTMLElement
		 * @name REDIPS.drag#obj
		 */
		obj	: obj,
		/**
		 * Previously moved DIV element (before clicked or cloned). In case when DIV element is cloned, obj is reference of current (cloned) DIV element while objOld is reference of bottom (origin) DIV element.
		 * @type HTMLElement
		 * @name REDIPS.drag#objOld
		 */
		objOld	: objOld,
		/**
		 * Dragging mode "cell" or "row" (readonly).
		 * This is readonly property defined in a moment when DIV element or row handler is clicked.
		 * @type String
		 * @name REDIPS.drag#mode
		 */
		mode : mode,
		/**
		 * Object contains reference to previous, source, current and target table cell. Td references can be used in event handlers. 
		 * <ul>
		 * <li>{HTMLElement} td.source - reference to source table cell (set in onmousedown)</li>
		 * <li>{HTMLElement} td.previous - reference to previous table cell (set in onmousemove and autoscroll)</li>
		 * <li>{HTMLElement} td.current - reference to current table cell (set in onmousemove and autoscroll)</li>
		 * <li>{HTMLElement} td.target - reference to target table cell (target table cell is set in a moment of dropping element to the table cell)</li>
		 * </ul>  
		 * @type Object
		 * @name REDIPS.drag#td
		 */
		td : td,
		/**
		 * Hover object contains 4 properties: colorTd, colorTr, borderTd and borderTr. colorTd and colorTr define hover color for DIV element and table row.
		 * If borderTd is defined, then highlighted cell will have border. If borderTr is defined then highlighted row will have only top or bottom border.
		 * Top border shows that row will be placed above current row, while bottom border shows that current row will be placed below current row.
		 * Some browsers may have problem with "border-collapse:collapse" table style and border highlighting.
		 * In that case try without collapsing TD borders (e.g set "border-spacing:0" and smaller "td.border-width").
		 * @type Object
		 * @name REDIPS.drag#hover
		 * @example
		 * // set "#9BB3DA" as hover color for TD
		 * REDIPS.drag.hover.colorTd = '#9BB3DA';
		 *  
		 * // or set "Lime" as hover color for TR
		 * REDIPS.drag.hover.colorTr = 'Lime';
		 *  
		 * // set red border for highlighted TD
		 * REDIPS.drag.hover.borderTd = '2px solid red';
		 */
		hover : hover,
		/**
		 * Scroll object contains properties needed for autoscroll option.
		 * <ul>
		 * <li>{Boolean} scroll.enable - Enable / disable autoscroll option. By default autoscroll is enabled but it can be usefull in some cases to completely turn off autoscroll (if application doesn't need autoscrolling page nor autoscrolling DIV container). Turning off autoscroll will speed up application because extra calculations will be skipped. Default is true</li>
		 * <li>{Integer} scroll.bound - Bound size for triggering page autoScroll or autoScroll of scrollable DIV container. Default value is 25 (px).</li>
		 * <li>{Integer} scroll.speed - Autoscroll pause in milliseconds. Default value is 20 (milliseconds).</li>
		 * </ul>
		 * @type Object
		 * @name REDIPS.drag#scroll
		 */
		scroll : scroll,
		/**
		 * Table cells marked with "only" class name can accept only defined DIV elements.
		 * Object contains:
		 * <ul>
		 * <li>{Array} div - defined DIV elements can be dropped only to the table cells marked with class name "only" (DIV id -> class name)</li>
		 * <li>{String} cname - class name of marked cells (default is "only")</li>
		 * <li>{String} other - allow / deny dropping DIV elements to other table cells (default is "deny")</li>
		 * </ul>
		 * @example
		 * // only element with Id "a1" can be dropped to the cell with class name "only last"
		 * REDIPS.drag.only.div.a1 = 'last';
		 *  
		 * // DIV elements mentioned in REDIPS.drag.only.div cannot be dropped to other cells
		 * REDIPS.drag.only.other = 'deny';
		 * @type Object
		 * @name REDIPS.drag#only
		 * @see <a href="#mark">mark</a>
		 */
		only : only,
		/**
		 * Table cells marked with "mark" class name can be allowed or forbidden for accessing (with exceptions) - default is "deny".
		 * This is useful to define table cells forbidden for every DIV element with exceptions (or contrary, define table cells allowed for all DIV elements except some).
		 * Object contains:
		 * <ul>
		 * <li>{String} action - allow / deny table cell (default is "deny")</li>
		 * <li>{String} cname - class name of marked cells (default is "mark")</li>
		 * <li>{Array} exception - defined DIV elements can be dropped to the table cells marked with class "mark" (DIV id -> class name)</li>
		 * </ul>
		 * @example
		 * // only element with Id "d8" can be dropped to the cell with class name "mark smile"
		 * REDIPS.drag.mark.exception.d8 = 'smile';
		 * @type Object
		 * @see <a href="#only">only</a>
		 * @name REDIPS.drag#mark
		 */
		mark : mark,
		/**
		 * Object contains styles (colors, opacity levels) for DIV elements and table rows.
		 * <ul>
		 * <li>{String} style.borderEnabled - Border style for enabled DIV elements. Default is "solid".</li>
		 * <li>{String} style.borderDisabled - Border style for disabled DIV elements. Default is "dotted".</li>
		 * <li>{Integer} style.opacityDisabled - Opacity level for disabled elements. Default is empty string.</li>
		 * <li>{String} style.rowEmptyColor - "Empty row" color. When last row from table is moved then this color will be set to "empty row". Default is "white".</li>
		 * </ul>
		 * @example
		 * // define border style for disabled elements
		 * REDIPS.drag.style.borderDisabled = 'dashed';
		 * @type Object
		 * @name REDIPS.drag#style
		 */
		style : style,
		/**
		 * Object contains td class name (where DIV elements can be deleted) and confirmation questions for deleting DIV element or table row.
		 * <ul>
		 * <li>{String} trash.className - Class name of td which will become trash can. Default value is "trash".</li>
		 * <li>{String} trash.question - If trash.question is set then popup will appear and ask to confirm element deletion. Default value is null.</li>
		 * <li>{String} trash.questionRow - If trash.questionRow is set then popup will appear and ask to confirm row deletion. Default value is null.</li>
		 * </ul>
		 * @example
		 * // confirm DIV element delete action 
		 * REDIPS.drag.trash.question = 'Are you sure you want to delete DIV element?';
		 *  
		 * // confirm row delete action 
		 * REDIPS.drag.trash.questionRow = 'Are you sure you want to delete table row?';  
		 * @type Object
		 * @name REDIPS.drag#trash
		 */
		trash : trash,
		/**
		 * Save content parameter name. Parameter name should be short because it will be repeated for every DIV element.
		 * It is irrelevant in case of JSON format.
		 * @type String
		 * @name REDIPS.drag#saveParamName
		 * @default p
		 */
		saveParamName : saveParamName,
		/**
		 * Property defines working types of REDIPS.drag library for dragging DIV elements: multiple, single, switch, switching, overwrite and shift.
		 * @type String
		 * @name REDIPS.drag#dropMode
		 * @default multiple
		 * @example
		 * // elements can be dropped to all table cells (multiple elements in table cell)
		 * REDIPS.drag.dropMode = 'multiple';
		 *  
		 * // elements can be dropped only to the empty table cells
		 * REDIPS.drag.dropMode = 'single';
		 *  
		 * // switch content
		 * REDIPS.drag.dropMode = 'switch';
		 *  
		 * // switching content continuously
		 * REDIPS.drag.dropMode = 'switching';
		 *  
		 * // overwrite content in table cell
		 * REDIPS.drag.dropMode = 'overwrite';
		 *  
		 * // shift table content after element is dropped or moved to trash cell
		 * REDIPS.drag.dropMode = 'shift';
		 */
		dropMode : dropMode,
		/**
		 * Property defines "top" or "bottom" position of dropped element in table cell (if cell already contains DIV elements).
		 * It has affect only in case of dropMode="multiple".
		 * @type String
		 * @name REDIPS.drag#multipleDrop
		 * @default bottom
		 * @example
		 * // place dropped elements to cell top
		 * REDIPS.drag.multipleDrop = 'top';
		 */
		multipleDrop : multipleDrop,
		/**
		 * Object defines several rules related to cloning DIV elements like enable cloning with shift key, enable returning cloned DIV element to its source and so on.
		 * Instead of moving, DIV element / row will be cloned and ready for dragging.
		 * Just press SHIFT key and try to drag DIV element / row.
		 * if clone.sendBack property set to true, cloned DIV element will be deleted when dropped to the cell containing its source clone element.
		 * If exists, "climit" class will be updated (increased by 1).
		 * clone.drop property defines placing cloned DIV element (dropped outside any table) to the last marked position.
		 * If this property is set to true, the cloned DIV element will be always placed to the table cell.  
		 * <ul>
		 * <li>{Boolean} clone.keyDiv - If set to true, all DIV elements on tables could be cloned with pressed SHIFT key. Default is false.</li>
		 * <li>{Boolean} clone.keyRow - If set to true, table rows could be cloned with pressed SHIFT key. Default is false.</li>
		 * <li>{Boolean} clone.sendBack - If set to true, cloned element can be returned to its source. Default is false.</li>
		 * <li>{Boolean} clone.drop - If set to true, cloned element will be always placed to the table (to the last possible cell) no matter if is dropped outside the table. Default is false.</li>
		 * </ul>
		 * @type Object
		 * @name REDIPS.drag#clone
		 */
		clone : clone,
		/**
		 * Object contains animation properties: pause and step.
		 * <ul>
		 * <li>{Integer} animation.pause - Animation pause (lower values means the animation will go faster). Default value is 20 (milliseconds).</li>
		 * <li>{Integer} animation.step - Value defines number of pixels in each step. Higher values means bigger step (faster animation) but with less smoothness. Default value is 2 (px).</li>
		 * </ul>
		 * @type Object
		 * @name REDIPS.drag#animation
		 */
		animation : animation,
		/**
		 * Object contains several properties: shift.after, shift.mode, shift.overflow and shift.animation.
		 * <ul>
		 * <li>{String} shift.after - how to shift table content after DIV element is dropped</li>
		 * <li>{String} shift.mode - shift modes (horizontal / vertical)</li>
		 * <li>{String|HTMLElement} shift.overflow - defines how to behave when DIV element falls off the end</li>
		 * <li>{Boolean} shift.animation - if set to true, table content will be relocated with animation - default is false</li>
		 * </ul>
		 *  
		 * shift.after option has the following values: "default", "delete" and "always" (this property will have effect only if dropMode is set to "shift"). Default value is "default".
		 * <ul>
		 * <li>default - table content will be shifted only if DIV element is dropped to the non empty cell</li>
		 * <li>delete - same as "default" + shift table content after DIV element is moved to trash</li>
		 * <li>always - table content will be always shifted</li>
		 * </ul>
		 *  
		 * shift.mode defines shift modes: "horizontal1", "horizontal2", "vertical1" and "vertical2". Default value is "horizontal1".
		 * <ul>
		 * <li>horizontal1 - horizontal shift (element shift can affect more rows)</li>
		 * <li>horizontal2 - horizontal shift (each row is treated separately)</li>
		 * <li>vertical1 - vertical shift (element shift can affect more columns)</li>
		 * <li>vertical2 - vertical shift (each column is treated separately)</li>
		 * </ul>
		 * 
		 * shift.overflow defines how to behave when DIV element falls off the end. Possible actions are: "bunch", "delete" and "source". Default value is "bunch".
		 * <ul>
		 * <li>bunch - overflow will stay in last cell</li>
		 * <li>delete - overflow will be deleted</li>
		 * <li>source - overflow will be moved to the source TD</li>
		 * <li>{HTMLElement} - overflow will be moved to user defined HTML element</li>
		 * </ul> 
		 * @example
		 * // DIV elements will be shifted vertically (each column is treated separately)
		 * REDIPS.drag.shift.mode = 'vertical2';
		 *  
		 * // delete overflowed DIV element
		 * REDIPS.drag.shift.overflow = 'delete';
		 * @type Object
		 * @see <a href="#dropMode">dropMode</a>
		 * @see <a href="#shiftCells">shiftCells</a>
		 * @name REDIPS.drag#shift
		 */
		shift : shift,
		/**
		 * Property defines working types of REDIPS.drag library for dragging table rows: before, after, switch and overwrite.
		 * <ul>
		 * <li>before - row will be dropped before highlighted row</li>
		 * <li>after - row will be dropped after highlighted row</li>
		 * <li>switch - source and highlighted rows will be switched</li>
		 * <li>overwrite - highlighted row will be overwritten</li>
		 * </ul>  
		 * Values "before" and "after" have effect only if row is dropped to other tables (not in current table).
		 * In case of only one table, after/before is defined relatively to source row position (middle row will be dropped before highlighted row if dragged to the table top or after highlighted row in other case).
		 * @type String
		 * @name REDIPS.drag#rowDropMode
		 * @default before
		 */
		rowDropMode : rowDropMode,
		/**
		 * Table sort is feature where tables inside drop container are sorted on each element click.
		 * Clicked DIV element defines table that should be placed on the array top.
		 * Tables order is important for highlighting current cell in case of nested tables.
		 * But sometimes this feature should be turned off when one table overlays the other using "position" style relative, fixed or absolute.
		 * @type Boolean
		 * @name REDIPS.drag#tableSort
		 * @default true
		 */
		tableSort : tableSort,
		/* public methods (documented in main code) */
		init : init,
		initTables : initTables,
		enableDrag : enableDrag,
		enableTable : enableTable,
		cloneObject : cloneObject,
		saveContent : saveContent,
		relocate : relocate,
		emptyCell : emptyCell,
		moveObject : moveObject,
		shiftCells : shiftCells,
		deleteObject : deleteObject,
		getPosition : getPosition,
		rowOpacity : rowOpacity,
		rowEmpty : rowEmpty,
		getScrollPosition : getScrollPosition,
		getStyle : getStyle,
		findParent : findParent,
		findCell : findCell,

		/* Event Handlers */
		/**
		 * All events are part of REDIPS.drag.event namespace.
		 * @type Object
		 * @ignore
		 */
		event : event

		/* Element Event Handlers */
		/**
		 * Event handler invoked if a mouse button is pressed down while the mouse pointer is over DIV element.
		 * @param {HTMLElement} [currentCell] Reference to the table cell of clicked element.
		 * @name REDIPS.drag#event:clicked
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked if a mouse button is clicked twice while the mouse pointer is over DIV element.
		 * @name REDIPS.drag#event:dblClicked
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked if element is moved from home position.
		 * @param {Boolean} [cloned] True if moved element is actually a cloned DIV. Needed for cases when obj or objOld should be used.
		 * @name REDIPS.drag#event:moved
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked if mouse button is pressed down and released while the mouse pointer is over DIV element (element was not actually moved).
		 * Default threshold value is 7px, so if DIV element is moved within threshold value (background color of cell will not change) the same event handler will be called.
		 * @name REDIPS.drag#event:notMoved
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked if element is dropped to the table cell.
		 * @param {HTMLElement} [targetCell] Target cell reference.
		 * @name REDIPS.drag#event:dropped
		 * @function
		 * @event
		 */		
		/**
		 * Event handler invoked if mouse button is released but before element is dropped to the table cell.
		 * If boolen "false" is returned from event handler then element drop will be canceled.
		 * Dragged element will be returned to the start position while cloned element will be deleted.
		 * @param {HTMLElement} [targetCell] Target cell reference.
		 * @name REDIPS.drag#event:droppedBefore
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked if DIV elements are switched (dropMode is set to "switch").
		 * @param {HTMLElement} [targetCell] Reference to the target table cell.
		 * @name REDIPS.drag#event:switched
		 * @see <a href="#dropMode">dropMode</a>
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked after all DIV elements are relocated and before table is enabled (DIV elements enabled for dragging).
		 * This event can be triggered after single call of relocate() method or after all DIV elements are shifted in "shift" mode.
		 * It is called only if animation is turned on.
		 * @name REDIPS.drag#event:relocateEnd
		 * @see <a href="#relocate">relocate</a>
		 * @see <a href="#event:relocateBefore">event.relocateBefore</a>
		 * @see <a href="#event:relocateAfter">event.relocateAfter</a>
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked before DIV element will be relocated.
		 * For example, in shift drop mode, this event handler will be called before each DIV element move.
		 * @param {HTMLElement} div Reference of DIV element that will be relocated.
		 * @param {HTMLElement} td Reference of TD where DIV element will be relocated.
		 * @name REDIPS.drag#event:relocateBefore
		 * @see <a href="#relocate">relocate</a>
		 * @see <a href="#event:relocateAfter">event.relocateAfter</a>
		 * @see <a href="#event:relocateEnd">event.relocateEnd</a>
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked after DIV element is relocated.
		 * For example, in shift drop mode, this event handler will be called after each DIV element has been moved.
		 * @param {HTMLElement} div Reference of DIV element that is relocated.
		 * @param {HTMLElement} td Reference of TD where DIV element is relocated.
		 * @name REDIPS.drag#event:relocateAfter
		 * @see <a href="#relocate">relocate</a>
		 * @see <a href="#event:relocateBefore">event.relocateBefore</a>
		 * @see <a href="#event:relocateEnd">event.relocateEnd</a>
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked on every change of current (highlighted) table cell.
		 * @param {HTMLElement} [currentCell] Reference to the current (highlighted) table cell.
		 * @name REDIPS.drag#event:changed
		 * @see <a href="#getPosition">getPosition</a>
		 * @example
		 * // set REDIPS.drag reference
		 * var rd = REDIPS.drag;
		 * // define event.changed handler  
		 * rd.event.changed = function () {
		 *   // get current position (method returns positions as array)
		 *   var pos = rd.getPosition();
		 *   // display current row and current cell
		 *   console.log('Changed: ' + pos[1] + ' ' + pos[2]);
		 * };
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked after DIV element is cloned - interactively by moving DIV element or by calling moveObject() in "cell" mode with "clone" option.
		 * If event handler is called from moveObject() then reference of cloned element is sent as input parameter.
		 * Otherwise, reference of cloned DIV element is set to REDIPS.drag.obj while reference of original element is set to REDIPS.drag.objOld public property.
		 * @param {HTMLElement} [clonedElement] Cloned element reference.
		 * @see <a href="#moveObject">moveObject</a>
		 * @name REDIPS.drag#event:cloned
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked after cloned DIV element is dropped.
		 * @param {HTMLElement} [targetCell] Reference to the target table cell.
		 * @name REDIPS.drag#event:clonedDropped
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked if last element is cloned (type 1).
		 * Element has defined "climit1_X" class name where X defines number of elements to clone. Last element can be dragged.
		 * @name REDIPS.drag#event:clonedEnd1
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked if last element is cloned (type 2).
		 * Element has defined "climit2_X" class name where X defines number of elements to clone. Last element can't be dragged and stays static.
		 * @name REDIPS.drag#event:clonedEnd2
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked if cloned element is dropped on start position or cloned element is dropped outside current table with "clone.drop" property set to false.
		 * This event handler could be also invoked if "clone" type element is placed inside forbidden table cell.
		 * @see <a href="#clone">clone.drop</a>
		 * @name REDIPS.drag#event:notCloned
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked if element is deleted (dropped to the "trash" table cell).
		 * @param {Boolean} [cloned] True if cloned element is directly moved to the trash (in one move). If cloned element is dropped to the table and then moved to the trash then "cloned" parameter will be set to false.
		 * @name REDIPS.drag#event:deleted
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked if element is undeleted.
		 * After element is dropped to the "trash" table cell and trash.question property is not null then popup with set question will appear.
		 * Clicking on "Cancel" will undelete element and call this event handler.
		 * @see <a href="#trash">trash</a>
		 * @name REDIPS.drag#event:undeleted 
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked after any DIV element action.
		 * For example, if drop option is set to "multiple" (default drop mode) and DIV element is dropped to the table cell then the following order of event handlers will be performed:
		 * <ol>
		 * <li>event.droppedBefore</li>
		 * <li>event.dropped (only if event.droppedBefore doesn't return false)</li>
		 * <li>event.finish</li>
		 * <ol>
		 * So, event.finish will be called after deleting DIV element, cloning, switching and so on.
		 * Its main purpose is to execute some common code (like "cleaning") after any DIV element action.
		 * @name REDIPS.drag#event:finish
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked in a moment when overflow happen in shift mode.
		 * @param {HTMLElement} td Reference of TD where overflow happen.
		 * @name REDIPS.drag#event:shiftOverflow
		 * @see <a href="#dropMode">dropMode</a>
		 * @function
		 * @event
		 */

		/* Row Event Handlers */
		/**
		 * Event handler invoked if a mouse button is pressed down while the mouse pointer is over row handler (div class="drag row").
		 * @param {HTMLElement} [currentCell] Reference to the table cell of clicked element.
		 * @name REDIPS.drag#event:rowClicked
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked if row is moved from home position.
		 * @name REDIPS.drag#event:rowMoved
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked if a mouse button is pressed down and released while the mouse pointer is over row handler (row was not actually moved).
		 * @name REDIPS.drag#event:rowNotMoved
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked after dropping row to the table.
		 * @param {HTMLElement} [targetRow] Reference to the target row (dropped row).
		 * @param {HTMLElement} [sourceTable] Source table reference. If row is dropped to the same table then this reference and targetRow will be in correlation (actually "source table" contains targetRow).
		 * @param {Integer} [sourceRowIndex] Source row index.
		 * @name REDIPS.drag#event:rowDropped
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked in the moment when mouse button is released but before row is dropped to the table.
		 * @param {HTMLElement} [sourceTable] Source table reference.
		 * @param {Integer} [sourceRowIndex] Source row index.
		 * If boolen "false" is returned from event handler then row drop will be canceled. 
		 * @name REDIPS.drag#event:rowDroppedBefore
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked if row is moved around and dropped to the home position.
		 * @param {HTMLElement} [targetCell] Reference to the target table cell.
		 * @name REDIPS.drag#event:rowDroppedSource
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked on every change of current (highlighted) table row.
		 * @param {HTMLElement} [currentCell] Reference to the current (highlighted) table cell.
		 * @name REDIPS.drag#event:rowChanged
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked if table row is cloned.
		 * @name REDIPS.drag#event:rowCloned
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked if cloned row is dropped to the source row.
		 * @name REDIPS.drag#event:rowNotCloned
		 * @function
		 * @event
		 */	
		/**
		 * Event handler invoked if row is deleted (dropped to the "trash" table cell).
		 * @name REDIPS.drag#event:rowDeleted
		 * @function
		 * @event
		 */
		/**
		 * Event handler invoked if row is undeleted.
		 * After row is dropped to the "trash" table cell and trash.questionRow property is not null then popup with set question will appear.
		 * Clicking on "Cancel" will undelete row and call this event handler.
		 * @see <a href="#trash">trash</a>
		 * @name REDIPS.drag#event:rowUndeleted 
		 * @function
		 * @event
		 */	

	}; // end of public (return statement)		
}());




// if REDIPS.event isn't already defined (from other REDIPS file) 
if (!REDIPS.event) {
	REDIPS.event = (function () {
		var add,	// add event listener
			remove;	// remove event listener
		
		// http://msdn.microsoft.com/en-us/scriptjunkie/ff728624
		// http://www.javascriptrules.com/2009/07/22/cross-browser-event-listener-with-design-patterns/
		// http://www.quirksmode.org/js/events_order.html

		// add event listener
		add = function (obj, eventName, handler) {
			if (obj.addEventListener) {
				// (false) register event in bubble phase (event propagates from from target element up to the DOM root)
				obj.addEventListener(eventName, handler, false);
			}
			else if (obj.attachEvent) {
				obj.attachEvent('on' + eventName, handler);
			}
			else {
				obj['on' + eventName] = handler;
			}
		};
	
		// remove event listener
		remove = function (obj, eventName, handler) {
			if (obj.removeEventListener) {
				obj.removeEventListener(eventName, handler, false);
			}
			else if (obj.detachEvent) {
				obj.detachEvent('on' + eventName, handler);
			}
			else {
				obj['on' + eventName] = null;
			}
		};
	
		return {
			add		: add,
			remove	: remove
		}; // end of public (return statement)	
		
	}());
}
;
/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */


/* enable strict mode */

"use strict";

var redipsInit;

var colours = ["R", "W", "G", "B"];
var pieces = {"Bansidh" : 7, "Seannaiche" : 6, "SquareChieftain" : 5, "LeapingChieftain" : 4, "DiagonalChieftain" : 3, "Champion" : 2, "Clansman" : 1};
var pieces2 = {"B" : 7, "S" : 6, "R" : 5, "L" : 4, "D" : 3, "C" : 2, "P" : 1};
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];

var coloured_spells = ["M"];
var images = {"G7" : ["green/Bansidh.png", "Green Bansidh", "30x30"], "G6" : ["green/Seannaiche.png", "Green Seannaiche", "30x30"], "G5" : ["green/square.png", "Green Square", "30x30"], "G4" : ["green/leaping.png", "Green Leaping", "30x30"], "G3" : ["green/diagonal.png", "Green Diagonal", "30x30"], "G2" : ["green/champion.png", "Green Champion", "30x30"], "G1" : ["green/clansman.png", "Green Clansman", "30x30"], "W7" : ["white/Bansidh.png", "White Bansidh", "30x30"], "W6" : ["white/Seannaiche.png", "White Seannaiche", "30x30"], "W5" : ["white/square.png", "White Square", "30x30"], "W4" : ["white/leaping.png", "White Leaping", "30x30"], "W3" : ["white/diagonal.png", "White Diagonal", "30x30"], "W2" : ["white/champion.png", "White Champion", "30x30"], "W1" : ["white/clansman.png", "White Clansman", "30x30"], "R7" : ["red/Bansidh.png", "Red Bansidh", "30x30"], "R6" : ["red/Seannaiche.png", "Red Seannaiche", "30x30"], "R5" : ["red/square.png", "Red Square", "30x30"], "R4" : ["red/leaping.png", "Red Leaping", "30x30"], "R3" : ["red/diagonal.png", "Red Diagonal", "30x30"], "R2" : ["red/champion.png", "Red Champion", "30x30"], "R1" : ["red/clansman.png", "Red Clansman", "30x30"], "B7" : ["black/Bansidh.png", "Black Bansidh", "30x30"], "B6" : ["black/Seannaiche.png", "Black Seannaiche", "30x30"], "B5" : ["black/square.png", "Black Square", "30x30"], "B4" : ["black/leaping.png", "Black Leaping", "30x30"], "B3" : ["black/diagonal.png", "Black Diagonal", "30x30"], "B2" : ["black/champion.png", "Black Champion", "30x30"], "B1" : ["black/clansman.png", "Black Clansman", "30x30"], "F" : ["spells/harp.png", "Dagda's Harp", "30x30"], "GM" : ["green/mist.png", "Green Mist", "30x30"], "RM" : ["red/mist.png", "Red Mist", "30x30"], "WM" : ["white/mist.png", "White Mist", "30x30"], "BM" : ["black/mist.png", "Black Mist", "30x30"]};
var FREEZE = 3;
var ZAP = 2;
var SHIELD = 8;
var MIST = 1;

var dragging = false;
var shown_lpk = null;
var shown_result = false;
var selected_spell = null;
var engine_response = "";
var engine_json = null;

function update(engine_json){
        window.engine_json = engine_json;
        load_position(engine_json["eng_game"]["board"]);
        set_turn_indicator(engine_json["eng_game"]["side_to_move"]);
        // $("ul#chat").append(engine_json["eng_game"]["message_log_html"]);
        var lpk;
        if (engine_json["eng_game"]["last_player_killed"] && shown_lpk!=engine_json["eng_game"]["last_player_killed"]["name"]){
                alert(engine_json["eng_game"]["last_player_killed"]["name"] + " was eliminated.");
                shown_lpk = engine_json["eng_game"]["last_player_killed"]["name"];
        }
        var result = engine_json["eng_game"]["result"];

        if (result && !shown_result){
          alert(result);
          shown_result = true;
        }

        // $("red_td").html("<h2>Red: " + engine_json["eng_game"]["players"][0]["name"] + "</h2>");
        // $("white_td").html("<h2>White: " + engine_json["eng_game"]["players"][1]["name"] + "</h2>");
        // if (engine_json["eng_game"]["players"][2]){
        // $("green_td").html("<h2>Green: " + engine_json["eng_game"]["players"][2]["name"] + "</h2>");}
        // if (engine_json["eng_game"]["players"][3]){
        // $("black_td").html("<h2>Black: " + engine_json["eng_game"]["players"][3]["name"] + "</h2>");}

        // urgh

        // for (var i=0;i<engine_json["eng_game"]["max_players"];i+=1){
        //   if (engine_json["eng_game"]["players"][i]["player"]["waiting_piece"]){
        //     var colour = colours[engine_json["eng_game"]["players"][i]["player"]["waiting_piece"]["owner"]]
        //     var piece = pieces[engine_json["eng_game"]["players"][i]["player"]["waiting_piece"]["class"]]
        //     var id = colour + piece;
        //     var image = images[id];
        //     $("#_14_2").html('<div id="'+id+'" style="border-style: solid; cursor: move;"'+'><img src="' + document.URL + '/../../../assets/' + image[0] + '" alt="' + image[1] + '" width=30 height=30></div>');
        //   }
        // }

        $('.overlay').fadeOut(function(){
          $('.overlay').html("");
        });
}

// setInterval(function(){
//         if (!dragging){$.ajax({
//                 type: "GET",
//                 url: "/games/" + game_id + ".json",
//                 failure: function(msg) {
//                 alert("Request unsuccessful, check your internet connection.")},
//                 dataType: "json",
//                 success: update});
//         }
// }, 10000);

var start_square = null;


// redips initialization
redipsInit = function () {
	// reference to the REDIPS.drag library and message line
	var	rd = REDIPS.drag,
		//msg = document.getElementById('out'),
		msg2 =  document.getElementById('datastring'),
		_common;


  rd.style.borderEnabled = 'none';
	// how to display disabled elements
	rd.style.borderDisabled = 'solid';	// border style for disabled element will not be changed (default is dotted)
	rd.style.opacityDisabled = 60;		// disabled elements will have opacity effect
	// initialization
	rd.init();
	// only "smile" can be placed to the marked cell
	rd.mark.exception.d8 = 'smile';

  $.ajax({
        type: "GET",
        url: "/games/" + game_id + ".json",
        failure: function(msg) {
        alert("Request unsuccessful")},
        dataType: "json",
        success: update});


	// prepare handlers
	rd.event.clicked = function(currentCell) {

		var pos = currentCell.id.split("_");
		start_square = find_square(pos[1], pos[2]);
    dragging = true;

    switch (selected_spell){
    case FREEZE:
      freeze(start_square);
      selected_spell = null;
      dragging = false;
      //alert("Spell invoked!");
    case ZAP:
      zap(start_square);
      selected_spell = null;
      dragging = false;
      alert("Spell invoked!");
    case SHIELD:
      shield(start_square);
      selected_spell = null;
      dragging = false;
      alert("Spell invoked!");
    case MIST:
      mist(start_square);
      selected_spell = null;
      dragging = false;
      alert("Spell invoked!");
    }
	};
	rd.event.moved  = function() {
	};
	rd.event.notMoved = function() {
	};
	rd.event.droppedBefore = function(targetCell) {
    dragging = false;
    if (selected_spell){
      return false;
    }
    var pos = targetCell.id.split("_");

		var to_square = null;

    if (targetCell.id == "_16_16" && REDIPS.drag.obj.id[1] == "1"){
            $(".overlay").fadeIn();
            $(".promotion_window").fadeIn();
          return false;
      } else if (start_square["misted_piece"] && start_square["piece"]){

      } else {
              to_square = {"x": pos[1], "y": pos[2]};
      }
      var params = {"fromx" : start_square["x"], "fromy" : start_square["y"], "tox" : to_square["x"], "toy" : to_square["y"]};

      var response = send_command("enginemove2", params);
      if (response != "true"){
              // alert("Illegal move!");
              $("#error").fadeIn(function() {
                $( "#error" ).fadeOut(1000);
              });
              dragging = false;
              return false;
      }

	};
	rd.event.switched = function () {
	};
	rd.event.clonedEnd1 = function () {
	};
	rd.event.clonedEnd2 = function () {
	};
	rd.event.notCloned = function () {
	};
	rd.event.deleted = function (cloned) {
		// if cloned element is directly moved to the trash
		if (cloned) {
			// set id of original element (read from redips property)
			// var id_original = rd.obj.redips.id_original;
		}
		else {
		}
	};
	rd.event.undeleted = function () {
	};
	rd.event.cloned = function () {
	};
	rd.event.changed = function () {
	};
};


// toggles trash_ask parameter defined at the top
function toggleConfirm(chk) {
	if (chk.checked === true) {
		REDIPS.drag.trash.question = 'Are you sure you want to delete DIV element?';
	}
	else {
		REDIPS.drag.trash.question = null;
	}
}


// toggles delete_cloned parameter defined at the top
function toggleDeleteCloned(chk) {
	REDIPS.drag.clone.drop = !chk.checked;
}


// enables / disables dragging
function toggleDragging(chk) {
	REDIPS.drag.enableDrag(chk.checked);
}


// function sets drop_option parameter defined at the top
function setMode() {
	REDIPS.drag.dropMode = "overwrite";
}



var images_path = document.URL + '/../../../images/';

function set_turn_indicator(player_num){
        var images = [images_path + "Turn_red.png", images_path + "Turn_white.png", images_path + "Turn_green.png", images_path + "Turn_black.png"];
        $(".player2").html('<img src="'+images[parseInt(player_num)] + '" alt="Celtia" height="120" width="120">');
}

function send_command(command, params){
        var response = $.ajax({
        type: "POST",
        url: "/games/" + game_id + "/" + command,
        data: params,
        async: false
        });

        return response.responseText;

}

function clear_board(board){
    for (var i=0;i<16;i++){
            for (var j=0;j<16;j++){
                    $("#_"+i+"_"+j).html("");
            }
    }
    $(".mist").off("mouseover");
    $(".mist").removeClass("mist");
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function set_image(square, ignore_spells){
  var square_to_s = ignore_spells ? square["to_s_ignoring_spells"] : square["to_s"];
  var i = square["x"];
  var j = square["y"];
  if (pieces2.hasOwnProperty(square_to_s)){
    var piece = ignore_spells ? square["misted_piece"] : square["piece"];
    var col = colours[piece["owner"]["turn_order"]];
    var id;
    id = col + pieces2[square_to_s];
    var image = images[id];
    $("#_"+i+"_"+j).html('<div class="drag" id="'+id+'" style="border-style: solid; cursor: move;"'+'><img src="' + document.URL + '/../../../assets/' + image[0] + '" alt="' + image[1] + '" width=30 height=30></div>');
    return;
  } else if (coloured_spells.contains(square_to_s)){
    var colour = colours[square["mist_spell_owner"]["turn_order"]];
    var id = colour + square_to_s;
    var image = images[id];
    $("#_"+i+"_"+j).html('<div class="drag" id="'+id+'" style="border-style: solid; cursor: move;"'+'><img src="' + document.URL + '/../../../assets/' + image[0] + '" alt="' + image[1] + '" width=30 height=30></div>');
    $("#_"+i+"_"+j).addClass("mist");
    $("#_"+i+"_"+j).on("mouseover", function(){
      set_image(square, true);
    });
    return;

  } else if (images.hasOwnProperty(square_to_s)){
    var image = images[square_to_s];
    $("#_"+i+"_"+j).html('<div class="drag" style="border-style: solid; cursor: move;"'+'><img src="' + document.URL + '/../../../assets/' + image[0] + '" alt="' + image[1] + '" width=30 height=30></div>');
    return;
  }
  throw "image not found"
}

function load_position(board){
        clear_board(board);
        var skippable_letters = ["-", "p", "a", "z", "f", "i", "h", "m", "s", "'", "=", "+", "*", "d", "b", "o"];
        //var b = document.getElementById("chess_board");
        for (var k=0;k<board["squares"].length;k++){
                var square = board["squares"][k]["square"];

                //if (skippable_letters.contains(square["to_s"])) continue;

                try {
                  set_image(square, false);
                } catch (err) {
                  //console.error(err);
                }


        }


        REDIPS.drag.init();

}


if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}


function promote(piece){
        var params = {"fromx" : start_square["x"], "fromy" : start_square["y"], "piece" : piece};
        var response = send_command("enginemovepromote", params);
        if (response != "true"){
                alert("Illegal move!");
                return false;
        }

        REDIPS.drag.deleteObject(REDIPS.drag.obj);
        $(this).dialog("close");
        return true;
}

function shapeshift(){
        if (confirm("Are you sure?") == true) {
          var response = send_command("enginemoveshapeshift");
          if (response=="true"){
            alert("Shapeshift activated!");
          } else {
            alert("Illegal move.");
          }
        }
}

function possession(){
      if (confirm("Are you sure?") == true) {
        var response = send_command("enginemovepossession");
        if (response=="true"){
          alert("Possession activated!");
        } else {
          alert("Illegal move.");
        }
      }
}

function flight(){
        if (confirm("Are you sure?") == true) {
          var response = send_command("enginemoveflight");
          if (response=="true"){
            alert("Flight activated!");
          } else {
            alert("Illegal move.");
          }
        }
}

function zap_window() {
        if (confirm("Are you sure?") == true) {
          $(".overlay").fadeIn();
          $(".cauldron_window").fadeOut();
          $(".zap_window").fadeIn();
        }
}

function cauldron_window() {
        if (confirm("Are you sure?") == true) {
          $(".overlay").fadeIn();
            $(".cauldron_window").fadeIn();
        }
}
// Modified resurrect_window() and resurrect functions to enable correct fading out of prompt window divs.
function resurrect_window() {
	// $("#promotion_window").dialog({
 //                                modal: true,
 //                                width: 600,
 //                                autoOpen: true,
 //                                resizable: false,
 //                                dialogClass: "promotion",
 //                                buttons: [
 //                                {

 //                                        "id": "bansidh_button",
 //                                        click: function(){
 //                                                resurrect('B');
 //                                                $(".zap_window").fadeOut();
 //                                                $("#promotion_window").fadeOut();
 //                                                $(".overlay").fadeOut();
 //                                        }
 //                                },
 //                                {

 //                                        "id": "clansman_button",
 //                                        click: function(){
 //                                               resurrect('P');
 //                                                $(".zap_window").fadeOut();
 //                                                $("#promotion_window").fadeOut();
 //                                                $(".overlay").fadeOut();
 //                                        }
 //                                },
 //                                {

 //                                        "id": "champion_button",
 //                                        click: function(){
 //                                                resurrect('C');
 //                                                $(".zap_window").fadeOut();
 //                                                $("#promotion_window").fadeOut();
 //                                                $(".overlay").fadeOut();
 //                                        }
 //                                },
 //                                {

 //                                        "id": "leapingchieftain_button",
 //                                        click: function(){
 //                                                resurrect('L');
 //                                                $(".zap_window").fadeOut();
 //                                                $("#promotion_window").fadeOut();
 //                                                $(".overlay").fadeOut();
 //                                        }
 //                                },
 //                                {

 //                                        "id": "squarechieftain_button",
 //                                        click: function(){
 //                                                resurrect('R');
 //                                                $(".zap_window").fadeOut();
 //                                                $("#promotion_window").fadeOut();
 //                                                $(".overlay").fadeOut();
 //                                        }
 //                                },
 //                                {

 //                                        "id": "diagonalchieftain_button",
 //                                        click: function(){
 //                                               resurrect('D');
 //                                                $(".zap_window").fadeOut();
 //                                                $("#promotion_window").fadeOut();
 //                                                $(".overlay").fadeOut();
 //                                        }
 //                                }]

 //                        });

            // $(".overlay").fadeIn();
            $(".zap_window").fadeOut();
            $("#resurrection_window").fadeIn();

}

function resurrect(piece) {
  if (confirm("Are you sure?") == true) {
  	 var params = {"piece" : piece};
  	 var response = send_command("enginemoveresurrect", params);
      if (response == "false"){
                  alert("Illegal move!");
                  return false;
      }
      $("#resurrection_window").fadeOut();
  $(".promotion_window").fadeOut();
  $(".zap_window").fadeOut();
  $(".overlay").fadeOut();
  REDIPS.drag.deleteObject(REDIPS.drag.obj);
  $(this).dialog("close");
  return true;
  }
  
  
}

function select_freeze(){
  if (confirm("Are you sure?") == true) {
    if (selected_spell != FREEZE){
      selected_spell = FREEZE;
      alert("Dagda's Harp spell selected.  Click on a square to invoke.");
    } else {
      selected_spell = null;
    }
  }
}

function select_zap(){
    $(".zap_window").fadeOut();
    $(".promotion_window").fadeOut();
    $(".overlay").fadeOut(function(){
    if (selected_spell != ZAP){
      selected_spell = ZAP;
      alert("Dagda's Harp spell selected.  Click on a square to invoke.");
    } else {
      selected_spell = null;

    }
    });
}

function select_shield(){
  if (confirm("Are you sure?") == true) {
    if (selected_spell != SHIELD){
      selected_spell = SHIELD;
      alert("Shield spell selected.  Click on a square to invoke.");
    } else {
      selected_spell = null;
    }
  }
}

function select_mist(){
  if (confirm("Are you sure?") == true) {
    if (selected_spell != MIST){
      selected_spell = MIST;
      alert("Mist spell selected.  Click on a square to invoke.");
    } else {
      selected_spell = null;
    }
  }
}

function freeze(params){
        var response = send_command("enginemovefreeze", params);
        if (response=="true"){
          engine_response = "Spell invoked"
        } else {
          engine_response = "Illegal move."
        }
}

function zap(params){
        var response = send_command("enginemovezap", params);
        if (response=="true"){

        } else {
          engine_response = "Illegal move."
        }
}

function shield(params){
        var response = send_command("enginemoveshield", params);
        if (response=="true"){

        } else {
          engine_response = "Illegal move."
        }
}

function mist(params){
        var response = send_command("enginemovemist", params);
        if (response=="true"){

        } else {
          engine_response = "Illegal move."
        }
}

function find_square(x, y){
  for (var i=0;i<engine_json["eng_game"]["board"]["squares"].length;i+=1){
    var square = engine_json["eng_game"]["board"]["squares"][i]["square"];
    if (square.x==x && square.y==y){
      return square;
    }
  }
}
;
(function() {


}).call(this);
// Generated by CoffeeScript 1.6.2
/*
Sticky Elements Shortcut for jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/

(function(){(function(t,n){if(typeof define==="function"&&define.amd){return define(["jquery","waypoints"],n)}else{return n(t.jQuery)}})(window,function(t){var n,i;n={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"};i=function(t,n){var i;t.wrap(n.wrapper);i=t.parent();return i.data("isWaypointStickyWrapper",true)};t.waypoints("extendFn","sticky",function(r){var e,a,s;a=t.extend({},t.fn.waypoint.defaults,n,r);e=i(this,a);s=a.handler;a.handler=function(n){var i,r;i=t(this).children(":first");r=a.direction.indexOf(n)!==-1;i.toggleClass(a.stuckClass,r);e.height(r?i.outerHeight():"");if(s!=null){return s.call(this,n)}};e.waypoint(a);return this.data("stuckClass",a.stuckClass)});return t.waypoints("extendFn","unsticky",function(){var t;t=this.parent();if(!t.data("isWaypointStickyWrapper")){return this}t.waypoint("destroy");this.unwrap();return this.removeClass(this.data("stuckClass"))})})}).call(this);
// Generated by CoffeeScript 1.6.2
/*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/

(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(window,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;e=n.extend({},n.fn[g].defaults,e);if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.on("load.waypoints",function(){return n[m]("refresh")})})}).call(this);
	/*!
 * zoom.js 0.3
 * http://lab.hakim.se/zoom-js
 * MIT licensed
 *
 * Copyright (C) 2011-2014 Hakim El Hattab, http://hakim.se
 */

var zoom = (function(){

	// The current zoom level (scale)
	var level = 1;

	// The current mouse position, used for panning
	var mouseX = 0,
		mouseY = 0;

	// Timeout before pan is activated
	var panEngageTimeout = -1,
		panUpdateInterval = -1;

	// Check for transform support so that we can fallback otherwise
	var supportsTransforms = 	'WebkitTransform' in document.body.style ||
								'MozTransform' in document.body.style ||
								'msTransform' in document.body.style ||
								'OTransform' in document.body.style ||
								'transform' in document.body.style;

	if( supportsTransforms ) {
		// The easing that will be applied when we zoom in/out
		document.body.style.transition = 'transform 0.8s ease';
		document.body.style.OTransition = '-o-transform 0.8s ease';
		document.body.style.msTransition = '-ms-transform 0.8s ease';
		document.body.style.MozTransition = '-moz-transform 0.8s ease';
		document.body.style.WebkitTransition = '-webkit-transform 0.8s ease';
	}

	// Zoom out if the user hits escape
	document.addEventListener( 'keyup', function( event ) {
		if( level !== 1 && event.keyCode === 27 ) {
			zoom.out();
		}
	} );

	// Monitor mouse movement for panning
	document.addEventListener( 'mousemove', function( event ) {
		if( level !== 1 ) {
			mouseX = event.clientX;
			mouseY = event.clientY;
		}
	} );

	/**
	 * Applies the CSS required to zoom in, prefers the use of CSS3
	 * transforms but falls back on zoom for IE.
	 *
	 * @param {Object} rect
	 * @param {Number} scale
	 */
	function magnify( rect, scale ) {

		var scrollOffset = getScrollOffset();

		// Ensure a width/height is set
		rect.width = rect.width || 1;
		rect.height = rect.height || 1;

		// Center the rect within the zoomed viewport
		rect.x -= ( window.innerWidth - ( rect.width * scale ) ) / 2;
		rect.y -= ( window.innerHeight - ( rect.height * scale ) ) / 2;

		if( supportsTransforms ) {
			// Reset
			if( scale === 1 ) {
				document.body.style.transform = '';
				document.body.style.OTransform = '';
				document.body.style.msTransform = '';
				document.body.style.MozTransform = '';
				document.body.style.WebkitTransform = '';
			}
			// Scale
			else {
				var origin = scrollOffset.x +'px '+ scrollOffset.y +'px',
					transform = 'translate('+ -rect.x +'px,'+ -rect.y +'px) scale('+ scale +')';

				document.body.style.transformOrigin = origin;
				document.body.style.OTransformOrigin = origin;
				document.body.style.msTransformOrigin = origin;
				document.body.style.MozTransformOrigin = origin;
				document.body.style.WebkitTransformOrigin = origin;

				document.body.style.transform = transform;
				document.body.style.OTransform = transform;
				document.body.style.msTransform = transform;
				document.body.style.MozTransform = transform;
				document.body.style.WebkitTransform = transform;
			}
		}
		else {
			// Reset
			if( scale === 1 ) {
				document.body.style.position = '';
				document.body.style.left = '';
				document.body.style.top = '';
				document.body.style.width = '';
				document.body.style.height = '';
				document.body.style.zoom = '';
			}
			// Scale
			else {
				document.body.style.position = 'relative';
				document.body.style.left = ( - ( scrollOffset.x + rect.x ) / scale ) + 'px';
				document.body.style.top = ( - ( scrollOffset.y + rect.y ) / scale ) + 'px';
				document.body.style.width = ( scale * 100 ) + '%';
				document.body.style.height = ( scale * 100 ) + '%';
				document.body.style.zoom = scale;
			}
		}

		level = scale;
	}

	/**
	 * Pan the document when the mosue cursor approaches the edges
	 * of the window.
	 */
	function pan() {
		var range = 0.12,
			rangeX = window.innerWidth * range,
			rangeY = window.innerHeight * range,
			scrollOffset = getScrollOffset();

		// Up
		if( mouseY < rangeY ) {
			window.scroll( scrollOffset.x, scrollOffset.y - ( 1 - ( mouseY / rangeY ) ) * ( 14 / level ) );
		}
		// Down
		else if( mouseY > window.innerHeight - rangeY ) {
			window.scroll( scrollOffset.x, scrollOffset.y + ( 1 - ( window.innerHeight - mouseY ) / rangeY ) * ( 14 / level ) );
		}

		// Left
		if( mouseX < rangeX ) {
			window.scroll( scrollOffset.x - ( 1 - ( mouseX / rangeX ) ) * ( 14 / level ), scrollOffset.y );
		}
		// Right
		else if( mouseX > window.innerWidth - rangeX ) {
			window.scroll( scrollOffset.x + ( 1 - ( window.innerWidth - mouseX ) / rangeX ) * ( 14 / level ), scrollOffset.y );
		}
	}

	function getScrollOffset() {
		return {
			x: window.scrollX !== undefined ? window.scrollX : window.pageXOffset,
			y: window.scrollY !== undefined ? window.scrollY : window.pageYOffset
		}
	}

	return {
		/**
		 * Zooms in on either a rectangle or HTML element.
		 *
		 * @param {Object} options
		 *   - element: HTML element to zoom in on
		 *   OR
		 *   - x/y: coordinates in non-transformed space to zoom in on
		 *   - width/height: the portion of the screen to zoom in on
		 *   - scale: can be used instead of width/height to explicitly set scale
		 */
		to: function( options ) {

			// Due to an implementation limitation we can't zoom in
			// to another element without zooming out first
			if( level !== 1 ) {
				zoom.out();
			}
			else {
				options.x = options.x || 0;
				options.y = options.y || 0;

				// If an element is set, that takes precedence
				if( !!options.element ) {
					// Space around the zoomed in element to leave on screen
					var padding = 250;
					var bounds = options.element.getBoundingClientRect();

					options.x = bounds.left - padding;
					options.y = bounds.top - padding;
					options.width = bounds.width + ( padding * 2 );
					options.height = bounds.height + ( padding * 2 );
				}

				// If width/height values are set, calculate scale from those values
				if( options.width !== undefined && options.height !== undefined ) {
					options.scale = Math.max( Math.min( window.innerWidth / options.width, window.innerHeight / options.height ), 1 );
				}

				if( options.scale > 1 ) {
					options.x *= options.scale;
					options.y *= options.scale;

					magnify( options, options.scale );

					if( options.pan !== false ) {

						// Wait with engaging panning as it may conflict with the
						// zoom transition
						panEngageTimeout = setTimeout( function() {
							panUpdateInterval = setInterval( pan, 1000 / 60 );
						}, 800 );

					}
				}
			}
		},

		/**
		 * Resets the document zoom state to its default.
		 */
		out: function() {
			clearTimeout( panEngageTimeout );
			clearInterval( panUpdateInterval );

			magnify( { x: 0, y: 0 }, 1 );

			level = 1;
		},

		// Alias
		magnify: function( options ) { this.to( options ) },
		reset: function() { this.out() },

		zoomLevel: function() {
			return level;
		}
	}

})();

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//



// require backbone

// JS bundles


//
// CSS bundles

//
// Pull in all app/assets/images/ since app/views may link to them

// link ./../../images/Turn_black.png
