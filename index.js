'use strict';

// Any object which don't have property that we will try to access.
var myObject = { foo: 'foo' };

// Overwrite default action, which gets objects property.
myObject = new Proxy(myObject, {
    // Overwrite default getter.
    get: function (o, name) {
        // Check if target object contains passed property
        if (!Object.prototype.hasOwnProperty.call(o, name)) {
            // If not, the error will be thrown
            throw new ReferenceError(`Object property '${name}' is not defined (try to define the new one using null value)`);
        }

        // In default mode, we return existing property.
        return o[name];
    }
});

// Print existed property (finished successfully).
console.log(myObject.foo); // "foo"

// Try to print not existed property.
// Once the Proxy is not used, the `undefined` value will be printed.
// After overwrite the default behaviour of getting property values, the ReferenceError will be thrown.
console.log(myObject.bar);
