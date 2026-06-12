# 🔍 Narrowing with the `in` Operator Type Guard

The `in` operator is a type guard used to check whether a property exists inside an object.

It is especially useful when working with:

* object unions
* discriminated object structures
* optional properties

---

# 🧠 Basic Syntax

```ts
"propertyName" in value
```

If the property exists, TypeScript narrows the type inside that block.

---

# 📌 Simple Example

```ts
type User = {
  name: string;
};

type Product = {
  price: number;
};

function print(value: User | Product) {
  if ("name" in value) {
    console.log(value); // value is User
  } else {
    console.log(value); // value is Product
  }
}
```

TypeScript sees:

```ts
"name" in value
```

and understands:

```text
If "name" exists,
value must be User.
```

---

# 📌 Another Example

```ts
type Car = {
  drive: () => void;
};

type Boat = {
  sail: () => void;
};

function move(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    console.log(vehicle); // vehicle is Car
  } else {
    console.log(vehicle); // vehicle is Boat
  }
}
```

---

# 🚦 How the `in` Operator Works

The `in` operator checks whether a property exists in an object.

Example:

```ts
const user = {
  name: "Anurag",
};

console.log("name" in user); // true
console.log("age" in user); // false
```

TypeScript uses this information for narrowing.

---

# 📌 Optional Property Example

```ts
type User = {
  name?: string;
};

type Product = {
  price: number;
};

function handle(value: User | Product) {
  if ("name" in value) {
    console.log(value); // value is User
  }
}
```

Even optional properties can be used for narrowing.

---

# ⚠️ `in` Only Works with Objects

This is invalid:

```ts
"name" in "Anurag"; // ❌ Error
```

because strings are not objects.

The right side of `in` must be an object type.

---

# ⚠️ Property Existing Does NOT Mean Property Has Value

This is extremely important.

```ts
const user = {
  name: undefined,
};

console.log("name" in user); // true
```

The property exists even though its value is `undefined`.

So:

```ts
"name" in obj
```

checks:

```text
Does the property exist?
```

NOT:

```text
Does the property contain a meaningful value?
```

---

# ⚠️ `in` Checks Prototype Chain Too

```ts
console.log("toString" in {});
```

returns:

```ts
true
```

because `toString` exists in the prototype chain.

So `in` checks:

* own properties
* inherited properties

---

# ⚠️ Arrays Can Also Be Used with `in`

```ts
const arr = ["a", "b"];

console.log(0 in arr); // true
console.log(5 in arr); // false
```

Because array indexes are also properties internally.

---

# ⚠️ Safer Alternative for Own Properties

Sometimes developers prefer:

```ts
Object.hasOwn(obj, "name")
```

or:

```ts
Object.prototype.hasOwnProperty.call(obj, "name")
```

because `in` also checks inherited properties.

But for TypeScript narrowing, `in` is commonly used.

---

# ⚠️ `in` Does NOT Check TypeScript Types

This does not work:

```ts
type User = {
  name: string;
};

if (value in User) {
  // ❌ impossible
}
```

Because TypeScript types do not exist at runtime.

The `in` operator only works with runtime objects.

---

# ⚠️ Similar Shapes Can Cause Confusion

```ts
type A = {
  name: string;
};

type B = {
  name: string;
  age: number;
};
```

Example:

```ts
function print(value: A | B) {
  if ("name" in value) {
    console.log(value);
  }
}
```

This does NOT narrow anything properly because both types already contain `name`.

So `in` works best when properties are unique to particular union members.

---

# 🧠 Best Mental Model

```text
typeof
    ↓
Checks primitive runtime categories

instanceof
    ↓
Checks object/class identity

in
    ↓
Checks whether a property exists in an object
```

---

# 📌 When to Use `in`

Use `in` when:

* working with object unions
* checking unique properties
* narrowing based on object structure
* distinguishing object variants

---

# 📌 When NOT to Use `in`

Avoid using `in`:

* on primitive values
* when all union members already contain the same property
* when you need exact own-property checking only

---

# ⚡ Final Summary

The `in` operator is a type guard that checks whether a property exists inside an object.

TypeScript uses this information during control flow analysis to narrow object union types safely.

---

# ✨ Most Important Understanding

```text
typeof
    ↓
Primitive runtime categories

instanceof
    ↓
Runtime object/class identity

in
    ↓
Property existence inside objects
```
