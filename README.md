# test-es2015-proxy

> :ledger: Testing ES2015 Proxy

---

Yesterday (2016-09-07) during beer [@RafaelSzefler](https://github.com/RafaelSzefler) said that JavaScript is bad,
because when you try to access non-existing property you get `undefined` value,
instead of an exception or error.

I agree with that. But...

In ECMAScript 2015 we have `Proxy` object which gives opportunity to override default "getter" of property.

I wrote some code. Please look at:

```javascript
'use strict';

// Any object which doesn't have property that we will try to access to.
var myObject = { foo: 'foo' };

// Overwrite default action, which gets objects property.
myObject = new Proxy(myObject, {
    // Overwrite default getter.
    get: function (o, name) {
        // Check if target object contains passed property
        if (!o[name]) {
            // If not, the error will be thrown
            throw new ReferenceError(`Object property '${name}' is not defined (try define using null value)`);
        }

        // In default mode, we return existing property.
        return o[name];
    }
});

// Print existing property (finished successfully).
console.log(myObject.foo);

// Try to print non-existing property.
// Once the Proxy is not used, the `undefined` value will be printed.
// After overwriting the default behaviour of getting property values, the ReferenceError will be thrown.
console.log(myObject.bar);
```

Results:

```
foo
/Users/piecioshka/projects/test-es2015-proxy/index.js:12
            throw new ReferenceError(`Object property '${name}' is not defined (try define using null value)`);
            ^

ReferenceError: Object property 'bar' is not defined (try define using null value)
    at Object.get (/Users/piecioshka/projects/test-es2015-proxy/index.js:12:19)
    at Object.<anonymous> (/Users/piecioshka/projects/test-es2015-proxy/index.js:27:21)
    at Module._compile (module.js:556:32)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.runMain (module.js:590:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
```

## How to test on my computer?

1. Either open in browser `index.html` file.
2. Or run command:

```bash
node index.js
```

## Thanks 

* [@RafaelSzefler](https://github.com/RafaelSzefler) for your opinion about JavaScript.
* [@rgierczak](https://github.com/rgierczak) for your help in PL to EN translation.

----

@ 2016
