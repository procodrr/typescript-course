# 🤔 Why Do We Need Type Narrowing?

Because a variable can sometimes have **multiple possible types**.

Example:

```ts
function print(value: string | number) {
  // What is value here?
}
```

At this point:

```ts
value: string | number;
```

TypeScript only knows that `value` could be:

- string
- number

It doesn't know which one it actually is.

---

# 🚫 The Problem

Suppose you write:

```ts
function print(value: string | number) {
  value.toUpperCase();
}
```

TypeScript gives an error.

Why?

Because:

```text
What if value is a number?
```

Numbers do not have:

```ts
toUpperCase();
```

---

# 🎯 The Goal of Type Narrowing

Type narrowing helps TypeScript answer:

> 👉 "Which exact type is this value right now?"

Once TypeScript knows the exact type, it can safely allow operations specific to that type.

---

# 📌 Example

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

Inside the block:

```ts
value: string;
```

Now TypeScript knows:

```text
This value is definitely a string.
```

So string methods become safe.

---

# 🧠 Type Narrowing Removes Uncertainty

At the start:

```ts
value: string | number;
```

TypeScript is uncertain.

After narrowing:

```ts
value: string;
```

TypeScript becomes certain.

You can think of narrowing as:

```text
Removing uncertainty from a type.
```

---

# 🚦 Real Purpose of Narrowing

Without narrowing:

```ts
string | number | boolean | null;
```

would be very difficult to work with.

TypeScript would constantly say:

```text
I don't know which type this is.
```

Narrowing allows TypeScript to gradually eliminate impossible possibilities.

Example:

```text
string | number | null
        ↓
string | number
        ↓
string
```

---

# 📌 Another Example

```ts
function greet(name: string | undefined) {
  if (name === undefined) {
    return;
  }

  console.log(name.toUpperCase());
}
```

TypeScript thinks:

```text
If execution reaches this line,
name cannot be undefined.
```

So:

```ts
name: string;
```

---

# 🧠 Why Is This Important?

Because different types support different operations.

Example:

```ts
string  → toUpperCase()
number  → toFixed()
Date    → getFullYear()
Array   → push()
```

TypeScript must know the exact type before allowing those operations.

---

# ⚡ The Deepest Mental Model

```text
Type Narrowing
        ↓
Reduces Possible Types
        ↓
Increases Certainty
        ↓
Allows Safe Access to Type-Specific Operations
```

---

# ✨ In One Sentence

> Type narrowing exists to help TypeScript reduce uncertainty by eliminating impossible types, allowing it to safely access properties and methods specific to the remaining type.
