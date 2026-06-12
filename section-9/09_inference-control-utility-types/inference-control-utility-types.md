# 🧠 Inference Control Utility Types

Inference control utility types help us control how TypeScript infers generic types.

The main inference control utility type is:

```txt
NoInfer
```

---

# 1. 🧠 `NoInfer<T>`

`NoInfer<T>` blocks TypeScript from inferring a generic type from a specific value.

It does **not change the type**.

It only controls **where inference should come from**.

---

# 🧩 Problem Without `NoInfer`

```ts
function createStreetLight<C extends string>
(colors: C[], defaultColor?: C) {}
```

Now if we call:

```ts
createStreetLight(["red", "yellow", "green"], "blue");
```

TypeScript may infer `C` as:

```ts
"red" | "yellow" | "green" | "blue";
```

So `"blue"` may get accepted.

But logically, `"blue"` should not be allowed because it is not present in the `colors` array.

---

# ✅ Solution with `NoInfer`

```ts
function createStreetLight<C extends string>(
  colors: C[],
  defaultColor?: NoInfer<C>,
) {}
```

Now `C` is inferred only from `colors`.

```ts
createStreetLight(["red", "yellow", "green"], "red");
// ✅ Allowed

createStreetLight(["red", "yellow", "green"], "blue");
// ❌ Error
```

Because `"blue"` is not part of:

```ts
"red" | "yellow" | "green";
```

---

# 🧠 What `NoInfer<T>` Means

```ts
NoInfer<C>;
```

means:

> Use the already inferred type `C`, but do not infer `C` from this position.

So in this example:

```ts
function createStreetLight<C extends string>(
  colors: C[],
  defaultColor?: NoInfer<C>,
) {}
```

TypeScript should infer `C` from:

```ts
colors;
```

not from:

```ts
defaultColor;
```

---

# ⚠️ Important Point

`NoInfer<T>` does not create a new type.

```ts
NoInfer<C>;
```

is still basically:

```ts
C;
```

But it changes TypeScript’s inference behavior.

So it is not like:

```ts
Partial<T>;
Readonly<T>;
ReturnType<T>;
```

Those utility types transform types.

`NoInfer<T>` controls inference.

---

# 🧠 Quick Summary

| Utility Type | What It Does                              |
| ------------ | ----------------------------------------- |
| `NoInfer<T>` | Blocks inference from a specific position |

---

# 🎯 Main Idea

`NoInfer<T>` is useful when one argument should decide the generic type, and another argument should only be checked against that type.

```txt
Infer from one place → Block inference from another place → Better type safety
```

In simple words:

> `NoInfer<T>` says: “Do not use this value to guess `T`. Just check whether it matches the already guessed `T`.”
