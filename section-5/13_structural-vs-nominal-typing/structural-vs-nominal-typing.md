## 1. Structural Typing (TypeScript, Python, Golang, etc)

Structural typing is often called "Duck Typing".

> “If it looks like a duck, walks like a duck, quacks like a duck, it is a duck.”

Type compatibility is based on **shape**, not name.

---

### Example

```ts
type User = {
  id: number;
  name: string;
};

type Person = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "Anurag",
};

const person: Person = user; // ✅ allowed
```

Even though:

- `User` ≠ `Person` (different names)

Still allowed because:

- structure is the same

---

### Another example

```ts
type User = {
  id: number;
  name: string;
};

const obj = {
  id: 1,
  name: "Anurag",
  age: 80,
};

const user: User = obj; // ✅ allowed
```

Because:

- required properties exist
- extra properties are ignored (in structural typing)

---

## 2. Nominal Typing (Java, C#, C++, etc)

> “A duck is only a duck if it is explicitly declared as a duck.”

Type compatibility is based on **name/identity**, not shape.

---

### Example (conceptual)

```ts
// Imagine TypeScript was nominal

type User = {
  id: number;
  name: string;
};

type Person = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "Anurag",
};

const person: Person = user; // ❌ ERROR in nominal typing
```

Even though structure is same,

- names are different → not allowed

---

# 🔥 Core Difference

| Feature                        | Structural Typing      | Nominal Typing          |
| ------------------------------ | ---------------------- | ----------------------- |
| Based on                       | Shape                  | Name / Identity         |
| Same structure, different name | ✅ Allowed             | ❌ Not allowed          |
| Extra properties               | Usually allowed        | Usually restricted      |
| Used in                        | TypeScript, JavaScript | Java, C#, Rust (mostly) |

---

# 🎯 Why TypeScript chose Structural Typing

Because JavaScript works like this:

```js
function printName(obj) {
  console.log(obj.name);
}

printName({ name: "Anurag", age: 80 }); // valid JS
```

TypeScript had to match JavaScript behavior.

---

# ⚠️ Where confusion happens

This 👇 looks like nominal typing but is not:

```ts
const user: User = {
  id: 1,
  name: "Anurag",
  age: 80, // ❌ error
};
```

You might think:

> “Oh, TS is strict → maybe nominal?”

But actually:  
👉 This is **excess property checking**, not nominal typing. Excess property check happens when we directly assign object literals.

---

# 🧩 Can we simulate Nominal Typing in TypeScript?

Yes, using **branding**

---

## 🔒 Branded Type Example

```ts
type UserId = number & { __brand: "UserId" };
type ProductId = number & { __brand: "ProductId" };

const userId = 1 as UserId;
const productId = 1 as ProductId;

const x: UserId = productId; // ❌ error
```

Even though both are numbers,

- they are treated as different types

---

# 🧠 Simple intuition

### Structural typing

> “Do you have the required properties?”

### Nominal typing

> “Who are you exactly?”

---

# 💡 One-liner

> TypeScript checks **what you have**, not **what you are called**.

---

https://www.typescriptlang.org/docs/handbook/type-compatibility.html

https://youtu.be/j-b8zbi37v4
https://en.wikipedia.org/wiki/Duck_test
https://dev.to/rafaeljohn9/if-it-quacks-like-a-duck-1fl8

