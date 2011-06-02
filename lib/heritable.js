//
// (c) 2010 Stuart B. Malin
//
// stuart [at] yellowhelium [dot] com
//

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.


// Declare global variables used (for JSLint)
/*global */

var	Heritable;


Heritable = function (name, superHeritable, initializer, props) {
	return this.init(name, superHeritable, initializer, props);
};


Heritable.prototype = (function () {
	var	F,				// a Function that we re-use for creating prototype objects
		hSerialNum,		// every Heritable gets a serial number
		iSerialNum,		// every Heritable instance gets a serial number
		// functions
		createHeritable;
		
	
	//----------------------------
	createHeritable = function (name, superHeritable, initializer, props) {
	//----------------------------
		var	K,	// a Klass function
			S,	// will be the super (parent) Heritable for this Heritable
			hp,	// a reference to Heritable's prototype
			p;	// used to hold property names (just a generic variable)
			
		// 1. new contsructor
		C = function () {
			// this refers to the new object to become an instance of the Heritable
			
			// rather than have each instance of C hold a full copy of the constructor code, it is commonalized 
			C.prototype.constructor.konstructor.call(this, C, arguments);
			
		};
				
		// 2. inheritance
		S = superHeritable || Object;
		F.prototype = S.prototype;
		C.prototype = new F();			// an object whose [[prototype]] --> S.prototype
		C.prototype.constructor = F;	// provides access for commoninalization
		C.constructor = Heritable;		// Heritable constructed the Constructor
		
		// 3. meta information
		C.serialNum = hSerialNum;
		C.uberClass = S;
		C.initializer = initializer;
		C.className = name;
		
		// 4. accessors for meta information 
		// (these methods are shared, and are stored in Heritable.prototype)
		hp = Heritable.prototype;
		C.__proto__ = hp;
		C.proxy = function (methodName) {
			return hp.proxy(this, methodName, arguments);
		};

		// 4. install methods
		for (p in props) {
			if (props.hasOwnProperty(p)) {
				C.prototype[p] = props[p];
			}
		}
		
		// 5. housekeeping
		hSerialNum += 1;
		
		// 6. return the Constructor
		return C;
	};
	
	//----------------------------
	// initialize 
	//----------------------------
	
	// F's function is the common constructor used when a Heritable creates an instance
	F = function () {this.TEMP = 'obj created by F'};
	F.konstructor = function (C, arguments) {
		// this refers to the new instance object of C
		var	f;		// a generic var, sometimes used to hold functions

		Object.defineProperty(this, 'constructor', {
			value: C
		});
		
		f = C.uberClass;
		if (f) {
			f = f.initializer;
			if (f) {
				f.apply(this, arguments);
			}
		}
		f = C.initializer;
		if (f) {
			f.apply(this, arguments);
		}
	};
	
	
	hSerialNum = 1;
	iSerialNum = 1;

	//----------------------------
	// public methods 
	//----------------------------

	return {
		init:	function () {
//FIXME: do not init if already an object
			return createHeritable.apply(this, arguments);
/*
eyes.inspect(this.constructor, 'init: this.constructor: ');
			if (this.constructor.hasOwnPropery('heritable')) {
				// already an instance of Heritable
				return this;
			} else {
				return createHeritable.call(this, arguments);
			}
*/
		},
		
		getClassName: function () {
			return this.className;
		},
		
		getSerialNum: function () {
			return this.serialNum;
		},
		
		proxy: function (instance, methodName) {
			var	args = Array.prototype.splice.apply(arguments, [2]), 
				method = this[methodName];
			return (method && (typeof method === "function")) ? method.apply(instance, args) : undefined;
		}

	};
	
}());


module.exports = Heritable;
