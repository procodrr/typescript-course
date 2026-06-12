# 🔍 Narrowing with `instanceof` Type Guard

`instanceof` is a type guard used to check whether a value was created using a particular class or constructor function.

It is commonly used with:

* classes
* built-in JavaScript objects
* custom constructor functions

---

# 🧠 Basic Syntax

```ts
value instanceof SomeClass
```

If the check succeeds, TypeScript narrows the type inside that block.

---

# 📌 Simple Example

```ts
class User {}

function print(value: User | string) {
  if (value instanceof User) {
    console.log(value); // value is User
  }
}
```

---

# 🚦 How `instanceof` Works

`instanceof` checks the prototype chain of an object.

Very simply:

```text
Was this object created from this class or constructor function?
```

---

# 📌 Another Simple Example

```ts
class Dog {}

class Cat {}

function handle(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    console.log(animal); // animal is Dog
  } else {
    console.log(animal); // animal is Cat
  }
}
```

---

# 📌 Using `instanceof` with Built-in Objects

`instanceof` is very commonly used with built-in JavaScript classes.

---

## ➡️ `Date`

```ts
function print(value: Date | string) {
  if (value instanceof Date) {
    console.log(value); // value is Date
    value.getFullYear();
  }
}
```

---

## ➡️ `Error`

```ts
function handle(error: Error | string) {
  if (error instanceof Error) {
    console.log(error); // error is Error
    console.log(error.message);
  }
}
```

---

## ➡️ `Array`

```ts
function print(value: string[] | string) {
  if (value instanceof Array) {
    console.log(value); // value is string[]
    value.push("Hello");
  }
}
```

Although in real projects people usually prefer:

```ts
Array.isArray(value)
```

---

# ⚠️ `instanceof` Only Works with Runtime Values

This works:

```ts
class User {}

value instanceof User;
```

But this does NOT work:

```ts
type User = {
  name: string;
};

value instanceof User; // ❌ Error
```

Why?

Because:

```text
TypeScript types do not exist at runtime.
```

`instanceof` only works with:

* classes
* constructor functions
* runtime values

It does not work with:

* interfaces
* type aliases
* union types
* TypeScript-only types

---

# ⚠️ Primitive Values Do Not Work

```ts
console.log("hello" instanceof String);
```

Output:

```ts
false
```

Because `"hello"` is a primitive string, not a `String` object.

Similarly:

```ts
console.log(123 instanceof Number); // false
console.log(true instanceof Boolean); // false
```

So for primitive types, use:

```ts
typeof
```

not:

```ts
instanceof
```

---

# ⚠️ `null` and `undefined`

```ts
console.log(null instanceof Object); // false
console.log(undefined instanceof Object); // false
```

---

# ⚠️ Arrays Are Objects

```ts
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
```

Arrays are objects created from the `Array` constructor.

---

# ⚠️ Functions Are Also Objects

```ts
function greet() {}

console.log(greet instanceof Function); // true
console.log(greet instanceof Object); // true
```

Functions are objects in JavaScript.

---

# ⚠️ `instanceof` Checks Runtime Identity, Not Shape

This is extremely important.

`instanceof` does not check whether an object has the same properties.

It checks whether the object is connected to a particular prototype chain.

Example:

```ts
class User {}

const obj = {};

console.log(obj instanceof User); // false
```

Even if an object looks similar, `instanceof` only returns `true` when it was created from that class or has that class in its prototype chain.

---

# 🧠 Best Mental Model

```text
typeof
    ↓
Checks primitive runtime categories

instanceof
    ↓
Checks object constructor/class identity
```

---

# 📌 When to Use `instanceof`

Use `instanceof` when working with:

* classes
* `Date`
* `Error`
* arrays
* functions
* custom constructor functions
* runtime objects

---

# 📌 When NOT to Use `instanceof`

Do not use it for:

* interfaces
* type aliases
* primitive values
* structural object checking

---

# ⚡ Final Summary

`instanceof` is a runtime type guard that checks whether an object was created using a specific class or constructor function.