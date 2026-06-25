# test-es2015-proxy

:ledger: Testing ES2015 Proxy

## Story time

Yesterday (2016-09-07) during beer with [@RafalSzefler](https://github.com/RafalSzefler), he said that JavaScript is bad,
because when you try to access non-existing property you get `undefined` value,
instead of an exception or error.

I agree with that. But...

In ECMAScript 2015 we have a `Proxy` object, which gives the opportunity to override the default "getter" of property.

I wrote some code. Please take a look at:

```javascript
'use strict';

// Any object which doesn't have property that we will try to access.
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

// Print existing property (finished successfully).
console.log(myObject.foo); // "foo"

// Try to print non-existing property.
// Once the Proxy is not used, the `undefined` value will be printed.
// After overwrite the default behaviour of getting property values, the ReferenceError will be thrown.
console.log(myObject.bar);
```

Results:

```
foo
/Users/piecioshka/projects/test-es2015-proxy/index.js:12
            throw new ReferenceError(`Object property '${name}' is not defined (try to define the new one using null value)`);
            ^

ReferenceError: Object property 'bar' is not defined (try to define the new one using null value)
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

## Limitations

This repository is an **experiment**, not a recommended pattern. As pointed out by
[@ffigiel](https://github.com/ffigiel) in [#3](https://github.com/piecioshka/test-es2015-proxy/issues/3),
guarding property access with a `Proxy` increases complexity without really solving the
underlying problem:

- **It relies on discipline.** Every object has to be wrapped before use. Forget a single
  one and that part of the app silently falls back to the `undefined` behavior you tried to
  avoid. Wrapping each object before you can use it also hurts readability and
  maintainability.
- **You lose track of what is safe.** With some objects proxied and some plain, it stops
  being obvious which is which, so you lose confidence in the code.
- **It only fails at runtime.** The error shows up when the code runs, not while you write
  it, and only on the exact path that was executed.
- **It adds overhead.** The trap runs on every property read.

A better way to catch missing properties is **static typing**. Tools like
[TypeScript](https://www.typescriptlang.org/) or [Flow](https://flow.org/) describe the
expected shape of an object and report missing or misspelled properties at compile time,
with zero runtime cost and no need to wrap anything. Extensive integration tests can cover
some of this too, but they are far more expensive than static types for the same guarantee.

So treat this as a demonstration of what `Proxy` _can_ do, not as advice to ship it.

## How to test on my computer?

* Either open in browser `index.html` file
* Or run command:

    ```bash
    $ node index.js
    ```

## Thanks 

* [@RafalSzefler](https://github.com/RafalSzefler) for your opinion about JavaScript.
* [@rgierczak](https://github.com/rgierczak) for your help in PL to EN translation.

----

@ 2016

## License

[The MIT License](https://piecioshka.mit-license.org) @ 2026
