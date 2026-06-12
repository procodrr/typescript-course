# ⏳ Promise Utility Types in TypeScript

Promise utility types help us work with `Promise` based types.

The main promise utility type is:

```txt
Awaited
```

---

# 1. ⏳ `Awaited<T>`

`Awaited<T>` extracts the final resolved type from a `Promise`.

```ts
type Result = Awaited<Promise<string>>;
```

Now `Result` becomes:

```ts
type Result = string;
```

---

# 🧠 Why Do We Need `Awaited<T>`?

When we work with async functions, they usually return a `Promise`.

```ts
async function getUserName() {
  return "Anurag";
}
```

The return type of this function is:

```ts
Promise<string>
```

But sometimes we want the actual resolved value type:

```ts
string
```

For that, we use `Awaited`.

```ts
type UserName = Awaited<ReturnType<typeof getUserName>>;
```

Now `UserName` becomes:

```ts
type UserName = string;
```

---

# 🔁 Works with Nested Promises

`Awaited<T>` can unwrap nested promises too.

```ts
type Result = Awaited<Promise<Promise<number>>>;
```

Now `Result` becomes:

```ts
type Result = number;
```

It keeps unwrapping until it gets the final value type.

---

# ⚠️ Works Like `await`

`Awaited<T>` behaves similar to how `await` works in JavaScript.

```ts
const value = await Promise.resolve("hello");
```

Here, `value` is:

```ts
string
```

Similarly:

```ts
type Value = Awaited<Promise<string>>;
```

Here, `Value` is:

```ts
string
```

---

# 🧱 How It Works Internally

`Awaited<T>` is mainly built using:

```txt
🧩 Generics
🧩 Conditional Types
🧩 infer Keyword
🧩 Recursive Types
```

Conceptually, it works like this:

```ts
type MyAwaited<T> =
  T extends Promise<infer Value>
    ? MyAwaited<Value>
    : T;
```

Here:

```ts
infer Value
```

captures the value inside the `Promise`.

---

# 🧠 Quick Summary

| Utility Type | What It Does                                    |
| ------------ | ----------------------------------------------- |
| `Awaited<T>` | Extracts the resolved value type from a Promise |

---

# 🎯 Main Idea

`Awaited<T>` helps us get the final value type from Promise-based types.

```txt
Promise Type → Awaited → Resolved Value Type
```

Example:

```ts
type Data = Awaited<Promise<string>>;
```

means:

```ts
type Data = string;
```