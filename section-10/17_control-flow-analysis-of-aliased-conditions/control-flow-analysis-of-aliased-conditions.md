# 🔗 Control Flow Analysis of Aliased Conditions and Discriminants

In TypeScript, **control flow analysis** means TypeScript studies our code flow and narrows types based on conditions.

For example, when we write:

```ts
if (typeof value === "string") {
  // value is string here
}
```

TypeScript understands that inside the `if` block, `value` must be a `string`.

But TypeScript 4.4 made this smarter.

Now TypeScript can also understand some conditions even when we store them inside another variable.

This feature is called:

> **Control Flow Analysis of Aliased Conditions and Discriminants**

In simple words:

> TypeScript can narrow a value even when the narrowing condition is stored in a separate variable.

---

# 🧠 Normal Control Flow Analysis

First, let’s understand the normal case.

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

Here the condition is directly written inside the `if` statement:

```ts
typeof value === "string";
```

So TypeScript clearly understands:

```text
Inside this if block,
value is a string.
```

That is normal control flow analysis.

---

# 🔗 Aliased Conditions

Now look at this:

```ts
function print(value: string | number) {
  const isString = typeof value === "string";

  if (isString) {
    console.log(value.toUpperCase());
  }
}
```

Here, the `if` condition does not directly check:

```ts
typeof value === "string";
```

Instead, we stored the condition inside another variable:

```ts
const isString = typeof value === "string";
```

Then we used that variable:

```ts
if (isString) {
  // ...
}
```

Here, `isString` is an **alias** for the original condition.

So TypeScript understands this relationship:

```text
isString
    ↓
typeof value === "string"
    ↓
value is string
```

That is why `value.toUpperCase()` works inside the `if` block.

---

# 📌 What Does “Aliased Condition” Mean?

An **aliased condition** simply means:

> A condition stored inside another variable.

Example:

```ts
const isString = typeof value === "string";
```

Here, `isString` is not just a normal boolean in TypeScript’s understanding.

TypeScript remembers that `isString` came from this condition:

```ts
typeof value === "string";
```

So later, when we write:

```ts
if (isString) {
  // value is string here
}
```

TypeScript can still narrow `value`.

---

# 🔁 Aliased Conditions Can Be Chained

TypeScript can also follow simple chains of aliases.

```ts
function print(value: string | undefined) {
  const hasValue = value !== undefined;
  const canPrint = hasValue;

  if (canPrint) {
    console.log(value.toUpperCase());
  }
}
```

Here TypeScript follows this chain:

```text
canPrint
    ↓
hasValue
    ↓
value !== undefined
    ↓
value is string
```

So inside the `if` block, TypeScript knows that `value` is not `undefined`.

---

# 📏 Up to What Depth Does It Work?

TypeScript does not follow alias chains forever.

For aliased condition narrowing, TypeScript tracks the condition through **up to 5 levels of indirection**.

Example:

```ts
function print(value: string | undefined) {
  const a = value !== undefined;
  const b = a;
  const c = b;
  const d = c;
  const e = d;

  if (e) {
    console.log(value.toUpperCase()); // value is string
  }
}
```

Here TypeScript can follow the chain:

```text
e
↓
d
↓
c
↓
b
↓
a
↓
value !== undefined
```

So inside the `if` block, TypeScript knows that `value` is a `string`.

But after too many levels, TypeScript loses track:

```ts
function print(value: string | undefined) {
  const a = value !== undefined;
  const b = a;
  const c = b;
  const d = c;
  const e = d;
  const f = e;

  if (f) {
    console.log(value.toUpperCase()); // error
  }
}
```

Here the alias chain has gone beyond TypeScript’s tracking limit, so TypeScript no longer narrows `value`.

So the practical rule is:

> TypeScript can follow aliased conditions through **5 levels**, but after that it loses track.

---

# 📌 Works Best with `const`

Aliased condition narrowing works best with `const`.

```ts
function print(value: string | undefined) {
  const hasValue = value !== undefined;

  if (hasValue) {
    console.log(value.toUpperCase());
  }
}
```

This works because `hasValue` cannot be reassigned.

So TypeScript can trust that:

```ts
hasValue;
```

still means:

```ts
value !== undefined;
```

---

# ⚠️ Why `let` Is Weaker

Now compare it with `let`:

```ts
function print(value: string | undefined) {
  let hasValue = value !== undefined;

  if (hasValue) {
    console.log(value.toUpperCase()); // may not narrow reliably
  }
}
```

Here `hasValue` can be reassigned later.

For example:

```ts
function print(value: string | undefined) {
  let hasValue = value !== undefined;

  hasValue = true;

  if (hasValue) {
    console.log(value.toUpperCase()); // error
  }
}
```

Now `hasValue` no longer reliably means:

```ts
value !== undefined;
```

That is why TypeScript trusts `const` aliases more than `let` aliases.

---

# 🧩 Aliased Discriminants

This feature also works with **discriminated unions**.

A discriminated union is a union where each member has a common property with a literal value.

Example:

```ts
type Result =
  | { status: "success"; data: string }
  | { status: "error"; message: string };
```

Here, `status` is the discriminant.

It tells TypeScript which object shape we are dealing with.

---

# 🧠 Direct Discriminant Narrowing

Normally we write:

```ts
function handle(result: Result) {
  if (result.status === "success") {
    console.log(result.data);
  }
}
```

TypeScript understands:

```text
result.status === "success"
    ↓
result is the success case
```

So inside the `if` block, `result.data` is allowed.

---

# 🔗 Aliased Discriminant Narrowing

Now we can store the discriminant check in a variable:

```ts
function handle(result: Result) {
  const isSuccess = result.status === "success";

  if (isSuccess) {
    console.log(result.data);
  }
}
```

Here, `isSuccess` is an alias for:

```ts
result.status === "success";
```

TypeScript follows this relationship:

```text
isSuccess
    ↓
result.status === "success"
    ↓
result is { status: "success"; data: string }
```

So inside the `if` block, TypeScript knows that `result` is the success case.

---

# 📌 Another Example with Destructuring

TypeScript can also narrow through an aliased discriminant when we destructure carefully.

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape) {
  const { kind } = shape;

  if (kind === "circle") {
    return Math.PI * shape.radius * shape.radius;
  }

  return shape.side * shape.side;
}
```

Here, `kind` is taken from `shape`.

So when TypeScript sees:

```ts
kind === "circle";
```

it can understand that `shape` is the circle case.

The relationship is:

```text
kind
    ↓
shape.kind
    ↓
shape is circle
```

---

# ⚠️ Important Limitation

TypeScript is smart, but it is not trying to do full human-level logical reasoning.

It works with practical compiler-friendly patterns like:

```ts
const isString = typeof value === "string";
const isSuccess = result.status === "success";
const hasValue = value !== undefined;
```

But it will not understand every possible logical relationship.

For example:

```ts
function print(value: string | number) {
  const type = typeof value;
  const isString = type === "string";

  if (isString) {
    console.log(value.toUpperCase()); // may not narrow in all cases
  }
}
```

This is more indirect.

TypeScript does not always follow every computed relationship deeply.

The safer and clearer version is:

```ts
function print(value: string | number) {
  const isString = typeof value === "string";

  if (isString) {
    console.log(value.toUpperCase());
  }
}
```

---

# ✨ Final Understanding

**Control Flow Analysis of Aliased Conditions and Discriminants** means:

> TypeScript can narrow types not only from direct checks, but also from conditions or discriminant checks stored inside `const` variables.

So instead of only understanding this:

```ts
if (typeof value === "string") {
  // value is string
}
```

TypeScript can also understand this:

```ts
const isString = typeof value === "string";

if (isString) {
  // value is string
}
```

And instead of only understanding this:

```ts
if (result.status === "success") {
  // result is success case
}
```

TypeScript can also understand this:

```ts
const isSuccess = result.status === "success";

if (isSuccess) {
  // result is success case
}
```

That is the core idea behind this TypeScript 4.4 feature.

---

# 🔗 References

- [TypeScript 4.4 Release Notes][1]
- [GitHub Pull Request by Anders Hejlsberg][2]

[1]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html
[2]: https://github.com/microsoft/TypeScript/pull/44730
