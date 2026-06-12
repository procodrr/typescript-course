# 🔍 Narrowing with `typeof` Type Guard

`typeof` is one of the most basic type guards in TypeScript.

It is used to check the runtime type of a value.

```ts
if (typeof value === "string") {
  // value is string here
}
```

TypeScript understands this check and narrows the type inside that block.

---

# 🧠 What Can `typeof` Return?

JavaScript’s `typeof` operator can return only these string values:

```ts
"string"
"number"
"boolean"
"bigint"
"symbol"
"undefined"
"function"
"object"
```

So these are the valid `typeof` checks TypeScript understands.

---

# 1️⃣ `typeof value === "string"`

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    value.toUpperCase();
  }
}
```

➡️ Inside the `if` block, TypeScript knows `value` is `string`.

---

# 2️⃣ `typeof value === "number"`

```ts
function double(value: string | number) {
  if (typeof value === "number") {
    return value * 2;
  }

  return value.toUpperCase();
}
```

➡️ Inside the `if` block, `value` is `number`.

---

# 3️⃣ `typeof value === "boolean"`

```ts
function handle(value: boolean | string) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return value.toUpperCase();
}
```

➡️ TypeScript narrows `value` to `boolean`.

---

# 4️⃣ `typeof value === "undefined"`

```ts
function greet(name: string | undefined) {
  if (typeof name === "undefined") {
    return "No name found";
  }

  return name.toUpperCase();
}
```

➡️ After the `if`, TypeScript knows `name` is `string`.

---

# 5️⃣ `typeof value === "function"`

```ts
function run(value: string | (() => void)) {
  if (typeof value === "function") {
    value();
  }
}
```

➡️ TypeScript narrows `value` to a callable function.

---

# 6️⃣ `typeof value === "bigint"`

```ts
function printId(id: number | bigint) {
  if (typeof id === "bigint") {
    return id.toString();
  }

  return id.toFixed(2);
}
```

➡️ TypeScript narrows `id` to `bigint`.

---

# 7️⃣ `typeof value === "symbol"`

```ts
function describe(value: string | symbol) {
  if (typeof value === "symbol") {
    return value.description;
  }

  return value.toUpperCase();
}
```

➡️ TypeScript narrows `value` to `symbol`.

---

# 8️⃣ `typeof value === "object"`: The Tricky One

This is very important.

In JavaScript:

```ts
typeof null
```

returns:

```ts
"object"
```

So this is dangerous:

```ts
function print(value: object | null) {
  if (typeof value === "object") {
    // value can still be null
  }
}
```

Inside the block, TypeScript knows:

```ts
value: object | null
```

because `null` also has `typeof "object"`.

So you should write:

```ts
function print(value: object | null) {
  if (typeof value === "object" && value !== null) {
    // value is object here
  }
}
```

➡️ Correct safe check:

```ts
typeof value === "object" && value !== null
```

---

# ⚠️ Arrays Are Also Objects

```ts
console.log(typeof []);
// "object"
```

So this does not mean plain object:

```ts
if (typeof value === "object") {
  // could be array, object, date, null, etc.
}
```

Example:

```ts
function handle(value: object | null) {
  if (typeof value === "object" && value !== null) {
    // value can be array, object, Date, etc.
  }
}
```

➡️ `typeof` cannot separate arrays from objects.

For arrays, use:

```ts
Array.isArray(value)
```

---

# ⚠️ Dates Are Also Objects

```ts
console.log(typeof new Date());
// "object"
```

So:

```ts
if (typeof value === "object" && value !== null) {
  // value could be Date also
}
```

For dates, use:

```ts
value instanceof Date
```

---

# ⚠️ `typeof NaN` is `"number"`

```ts
console.log(typeof NaN);
// "number"
```

So this is true:

```ts
if (typeof value === "number") {
  // value could be NaN
}
```

If you want a real valid number:

```ts
if (typeof value === "number" && !Number.isNaN(value)) {
  // valid number
}
```

---

# ⚠️ `typeof Infinity` is also `"number"`

```ts
console.log(typeof Infinity);
// "number"
```

So if you want only finite numbers:

```ts
if (typeof value === "number" && Number.isFinite(value)) {
  // finite number
}
```

---

# ⚠️ Classes Are Functions

```ts
class User {}

console.log(typeof User);
// "function"
```

So `typeof something === "function"` can include:

* normal functions
* arrow functions
* class constructors

---

# ⚠️ `typeof` Cannot Check TypeScript Types

This does not work:

```ts
type User = {
  name: string;
};

if (typeof value === "User") {
  // ❌ impossible
}
```

Why?

Because TypeScript types do not exist at runtime.

`typeof` only checks JavaScript runtime types.

---

# 🧠 Best Mental Model

```text
typeof works only with JavaScript runtime categories,
not TypeScript-only types.
```

So `typeof` is good for:

```ts
string
number
boolean
undefined
bigint
symbol
function
object
```

But not for:

```ts
User
Product
Student
Admin
Custom interface
Custom type alias
```

---

# ✅ Final Summary

Use `typeof` for primitive narrowing.

```ts
typeof value === "string"
typeof value === "number"
typeof value === "boolean"
typeof value === "undefined"
typeof value === "bigint"
typeof value === "symbol"
typeof value === "function"
typeof value === "object"
```

But remember the tricky parts:

```text
typeof null        → "object"
typeof []          → "object"
typeof new Date()  → "object"
typeof NaN         → "number"
typeof Infinity    → "number"
typeof class       → "function"
```

Most important safe object check:

```ts
typeof value === "object" && value !== null
```