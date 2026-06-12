# 🛡️ Assertion Functions and Type Narrowing with `asserts`

Assertion-based narrowing is a narrowing technique where we write a function that tells TypeScript:

> 👉 “If this function finishes successfully, then you can assume this condition is true.”

These functions are called:

# ✨ Assertion Functions

---

# 🧠 Basic Idea

A normal type guard returns:

```ts
true
```

or

```ts
false
```

But assertion functions work differently.

Instead of returning a boolean, they usually:

* continue successfully
  or
* throw an error

If the function continues successfully, TypeScript assumes the value is safe.

---

# 📌 Basic Syntax

```ts
function assertSomething(value: unknown): asserts value is SomeType {
  if (!someCondition) {
    throw new Error("Invalid value");
  }
}
```

➡️ The important part is:

```ts
asserts value is SomeType
```

Meaning:

> If this function does not throw an error, TypeScript should treat the value as `SomeType`.

---

# 📌 Simple Example

```ts
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
}
```

Usage:

```ts
function print(value: unknown) {
  assertString(value);

  console.log(value); // value is string
  console.log(value.toUpperCase());
}
```

After calling:

```ts
assertString(value);
```

TypeScript narrows:

```ts
value: string
```

---

# 🔁 Difference Between `is` and `asserts`

## ➡️ `is`

Used when a function returns:

```ts
true
```

or

```ts
false
```

Example:

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

Usage:

```ts
if (isString(value)) {
  console.log(value); // value is string
}
```

---

## ➡️ `asserts`

Used when the function throws if the condition is invalid.

Example:

```ts
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
}
```

Usage:

```ts
assertString(value);

console.log(value); // value is string
```

---

# 🧠 Mental Difference

```text
is
    ↓
Ask a question
    ↓
Returns true or false

asserts
    ↓
Enforce a condition
    ↓
Continue only if valid
```

---

# 📌 Assertion Function with Object Type

```ts
type User = {
  name: string;
};

function assertUser(value: unknown): asserts value is User {
  if (
    typeof value !== "object" ||
    value === null ||
    !("name" in value)
  ) {
    throw new Error("Value must be a User");
  }
}
```

Usage:

```ts
function print(value: unknown) {
  assertUser(value);

  console.log(value); // value is User
  console.log(value.name);
}
```

---

# 📌 `asserts condition`

There is another form of assertion function:

```ts
function assert(condition: unknown): asserts condition {
  if (!condition) {
    throw new Error("Assertion failed");
  }
}
```

Usage:

```ts
function print(name: string | undefined) {
  assert(name);

  console.log(name); // name is string
}
```

➡️ Here:

```ts
asserts condition
```

means:

> If this function finishes successfully, the condition must be truthy.

---

# ⚠️ Assertion Functions Do NOT Return `false`

This is NOT how assertion functions should behave:

```ts
function assertString(value: unknown): asserts value is string {
  return typeof value === "string"; // ❌ wrong idea
}
```

Assertion functions are not meant to return booleans.

They should usually:

* throw errors
* stop execution
* or fail loudly when the condition is invalid

---

# ⚠️ TypeScript Trusts Assertion Functions Completely

This is extremely important.

```ts
function assertString(value: unknown): asserts value is string {
  // incorrect implementation
}
```

Usage:

```ts
function print(value: unknown) {
  assertString(value);

  console.log(value); // value is string
}
```

Even if the function performs no real check, TypeScript still trusts it.

So assertion functions must be written carefully.

---

# ⚠️ `asserts` Is TypeScript-Only Syntax

The `asserts` keyword exists only in TypeScript.

It disappears after compilation.

JavaScript only keeps the runtime function body.

---

# 📌 Common Real-World Use Cases

Assertion functions are commonly used for:

* API validation
* environment variable validation
* checking required values
* backend request validation
* defensive programming
* reusable validation utilities

---

# 🧠 Best Mental Model

```text
Assertion Function
        ↓
Runtime Check
        ↓
Throws Error if Invalid
        ↓
If Execution Continues,
TypeScript Narrows the Type
```

---

# ⚡ Final Summary

Assertion functions use the `asserts` keyword to narrow types after successful runtime validation.

---

# ✨ Most Important Understanding

```text
asserts value is SomeType
```

means:

```text
If this function does not throw,
TypeScript should treat the value
as SomeType after the function call.
```
