# 🔍 Exhaustiveness Checking in TypeScript

Exhaustiveness checking is a narrowing technique where TypeScript ensures that every possible case in a union type has been handled safely.

It is most commonly used with:

- discriminated unions
- `switch` statements
- the `never` type

---

# 🧠 Basic Idea

When working with union types, TypeScript tries to understand:

```text id="jlwm49"
Have all possible cases been handled?
```

If some cases are missing, TypeScript can warn us using exhaustiveness checking.

---

# 📌 Simple Example

```ts id="jlwm50"
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };
```

---

# 📌 Using `switch`

```ts id="jlwm51"
function print(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      console.log(shape); // shape is circle
      break;

    case "square":
      console.log(shape); // shape is square
      break;
  }
}
```

Here every possible union member has been handled.

So the logic is exhaustive.

---

# 🚦 What Does “Exhaustive” Mean?

Exhaustive means:

```text id="jlwm52"
All possible cases are covered.
Nothing is left unhandled.
```

---

# 📌 Problem When a Case Is Missing

```ts id="jlwm53"
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "triangle"; base: number; height: number };
```

Example:

```ts id="jlwm54"
function print(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      console.log(shape); // shape is circle
      break;

    case "square":
      console.log(shape); // shape is square
      break;
  }
}
```

Now:

```text id="jlwm55"
triangle
```

was forgotten.

This creates incomplete logic.

---

# 📌 Solving This with `never`

```ts id="jlwm56"
function print(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      console.log(shape); // shape is circle
      break;

    case "square":
      console.log(shape); // shape is square
      break;

    default:
      const exhaustiveCheck: never = shape;
      console.log(exhaustiveCheck);
  }
}
```

Now TypeScript gives an error.

Why?

Because:

```ts id="jlwm57"
shape;
```

can still be:

```ts id="jlwm58"
triangle;
```

which cannot be assigned to:

```ts id="jlwm59"
never;
```

---

# 🧠 What is `never`?

The `never` type represents:

```text id="jlwm60"
A value that should never exist.
```

So:

```ts id="jlwm61"
const exhaustiveCheck: never = shape;
```

means:

```text id="jlwm62"
At this point,
there should be no remaining possible types.
```

---

# 📌 Correct Exhaustive Version

```ts id="jlwm63"
function print(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      console.log(shape); // shape is circle
      break;

    case "square":
      console.log(shape); // shape is square
      break;

    case "triangle":
      console.log(shape); // shape is triangle
      break;

    default:
      const exhaustiveCheck: never = shape;
      console.log(exhaustiveCheck);
  }
}
```

Now all union members are handled.

So inside `default`:

```ts id="jlwm64"
shape: never;
```

---

# 📌 Exhaustiveness Checking with `if-else`

It also works with normal conditions.

```ts id="jlwm65"
type Status = "loading" | "success" | "error";
```

```ts id="jlwm66"
function handle(status: Status) {
  if (status === "loading") {
    console.log(status); // loading
  } else if (status === "success") {
    console.log(status); // success
  } else if (status === "error") {
    console.log(status); // error
  } else {
    const exhaustiveCheck: never = status;
    console.log(exhaustiveCheck);
  }
}
```

---

# ⚠️ Exhaustiveness Checking Depends on Narrowing

Exhaustiveness checking works because TypeScript continuously narrows union members during control flow analysis.

Example:

```text id="jlwm67"
circle removed
↓
square removed
↓
triangle removed
↓
nothing left
↓
never
```

---

# ⚠️ `never` Means Impossible State

When TypeScript infers:

```ts id="jlwm68"
never;
```

it means:

```text id="jlwm69"
This code path should be impossible.
```

---

# ⚠️ Exhaustiveness Checking Works Best with Discriminated Unions

This pattern is especially powerful with:

```ts id="jlwm70"
kind;
type;
status;
variant;
```

style discriminant properties.

---

# 📌 Real-World Examples

Exhaustiveness checking is extremely useful for:

- Redux reducers
- API response states
- React state management
- backend request handling
- finite state machines
- event systems

---

# 📌 Async State Example

```ts id="jlwm71"
type State =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };
```

```ts id="jlwm72"
function render(state: State) {
  switch (state.status) {
    case "loading":
      console.log(state); // loading
      break;

    case "success":
      console.log(state); // success
      break;

    case "error":
      console.log(state); // error
      break;

    default:
      const exhaustiveCheck: never = state;
      console.log(exhaustiveCheck);
  }
}
```

This ensures every possible application state is handled safely.

---

# 🧠 Best Mental Model

```text id="jlwm73"
Union Type
      ↓
Control Flow Analysis Removes Cases
      ↓
No Possibilities Left
      ↓
Type Becomes never
```

---

# 📌 Why Exhaustiveness Checking Is Important

Without exhaustiveness checking:

❌ New union members can silently break logic.

With exhaustiveness checking:

✅ TypeScript forces all cases to be handled safely.

This greatly improves:

- maintainability
- scalability
- refactoring safety
- long-term code reliability

---

# ⚡ Final Summary

Exhaustiveness checking is a narrowing technique where TypeScript ensures that every possible union member has been handled safely during control flow analysis.

---

# ✨ Most Important Understanding

```text id="jlwm74"
If all possible union members
have been removed through narrowing,
the remaining type becomes never.
```
