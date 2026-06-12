# 🛡️ User-Defined Type Guards with Type Predicates

Sometimes TypeScript cannot automatically determine the exact type of a value.

In such cases, we can create our own custom type guards to help TypeScript narrow types safely.

These are called:

# ✨ User-Defined Type Guards

---

# 🧠 What is a Type Predicate?

A type predicate is special syntax that tells TypeScript:

> 👉 “If this function returns `true`, then the value should be treated as a specific type.”

The syntax looks like this:

```ts
value is SomeType
```

This is called:

# ✨ Type Predicate

---

# 📌 Basic Syntax

```ts
function isSomething(value: unknown): value is SomeType {
  return someCondition;
}
```

---

# 📌 Simple Example

```ts
const isString = (value: string | number): value is string => {
  if (typeof value === "string") {
    return true;
  }
  return false;
};
```

Here:

```ts
value is string
```

is the type predicate.

It tells TypeScript:

```text
If this function returns true,
value should be treated as string.
```

---

# 📌 Using the Custom Type Guard

```ts
function print(value: unknown) {
  if (isString(value)) {
    console.log(value); // value is string
  }
}
```

TypeScript understands the narrowing because of the type predicate.

---

# 🚦 How TypeScript Understands This

Without the type predicate:

```ts
const isString = (value: string | number) => {
  if (typeof value === "string") {
    return true;
  }
  return false;
};
```

TypeScript only knows:

```ts
boolean;
```

It does NOT know anything about narrowing.

But with:

```ts
value is string
```

TypeScript receives extra type information.

---

# 📌 Object Example

```ts
type User = {
  name: string;
};

function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "name" in value;
}
```

Usage:

```ts
function print(value: unknown) {
  if (isUser(value)) {
    console.log(value); // value is User
  }
}
```

---

# 📌 Type Predicates Work with Control Flow Analysis

TypeScript combines:

- type predicates
- control flow analysis
- branch analysis

to narrow types automatically.

Example:

```ts
function print(value: unknown) {
  if (!isString(value)) {
    return;
  }

  console.log(value); // value is string
}
```

TypeScript understands:

```text
If execution reaches here,
value must be string.
```

---

# 📌 Type Predicate Parameter Name Must Match

This is important.

```ts
function isString(value: unknown): value is string;
```

Here:

```ts
value is string
```

must use the same parameter name.

This is invalid:

```ts
function isString(value: unknown): input is string {
  // ❌ Error
}
```

because `input` is not a parameter of the function.

---

# 📌 Type Predicates Can Narrow Union Types

```ts
type Dog = {
  bark: () => void;
};

type Cat = {
  meow: () => void;
};

function isDog(value: Dog | Cat): value is Dog {
  return "bark" in value;
}
```

Usage:

```ts
function handle(animal: Dog | Cat) {
  if (isDog(animal)) {
    console.log(animal); // animal is Dog
  } else {
    console.log(animal); // animal is Cat
  }
}
```

---

# ⚠️ Type Predicates Do NOT Add Runtime Safety Automatically

This is extremely important.

Type predicates only help TypeScript understand types.

They do NOT magically validate data safely.

Example:

```ts
function isUser(value: unknown): value is User {
  return true;
}
```

This is technically valid.

But now TypeScript blindly trusts the function.

So incorrect predicates can create unsafe code.

---

# ⚠️ TypeScript Trusts Your Predicate Completely

```ts
function isString(value: unknown): value is string {
  return true;
}
```

Usage:

```ts
function print(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

Even if the runtime value is actually a number, TypeScript trusts the predicate.

So predicates must be written carefully.

---

# ⚠️ Type Predicates Exist Only for TypeScript

This:

```ts
value is string
```

is TypeScript-only syntax.

It disappears after compilation.

JavaScript does not know anything about type predicates.

---

# 📌 Very Common Real-World Use Cases

User-defined type guards are commonly used for:

- API validation
- parsing unknown data
- backend request validation
- DOM checks
- filtering arrays
- runtime validation libraries
- reusable validation utilities

---

# 📌 Array Filtering Example

```ts
function isString(value: unknown) {
  return typeof value === "string";
}

const values = ["hello", 42, "world"];

const strings = values.filter(isString);

console.log(strings); // strings is string[]
```

TypeScript understands the filtered array type because of the predicate.

---

# 🧠 Best Mental Model

```text
Type Predicate
        ↓
Provides extra type information
to TypeScript
        ↓
TypeScript trusts that information
during control flow analysis
```

---

# ⚡ Final Summary

User-defined type guards are custom functions that help TypeScript narrow types using special syntax called type predicates.

---

# ✨ Most Important Understanding

```text
value is SomeType
```

means:

```text
If this function returns true,
TypeScript should treat the value
as SomeType.
```
