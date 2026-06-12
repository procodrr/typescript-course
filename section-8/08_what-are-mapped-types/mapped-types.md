## 🧠 What Are Mapped Types?

Mapped types allow you to:

> create a new object type by iterating over a union of keys and generating properties automatically.

They are like a **type-level loop**.

---

# ⚙️ Basic Syntax

```ts id="m1a2p3"
type T = {
  [K in Keys]: ValueType;
};
```

* `K` → placeholder for each key
* `Keys` → union of keys
* `ValueType` → type of each generated property

---

# 📦 Basic Example

```ts id="q4w5e6"
type Keys = "id" | "name";

type User = {
  [K in Keys]: string;
};
```

Result:

```ts id="r7t8y9"
{
  id: string;
  name: string;
}
```

---

# 🧠 What Happens Internally

TypeScript conceptually does something like:

```ts id="u1i2o3"
for each key in "id" | "name"
    create property
```

So:

```ts id="p4a5s6"
id: string
name: string
```

are generated automatically.

---

# 🔑 Real Example with `keyof`

```ts id="d7f8g9"
type User = {
  id: number;
  name: string;
};

type Flags = {
  [K in keyof User]: boolean;
};
```

---

## Step-by-Step

### `keyof User`

becomes:

```ts id="h1j2k3"
"id" | "name"
```

---

### Mapped Type Iterates

```ts id="l4z5x6"
[K in "id" | "name"]
```

So TypeScript generates:

```ts id="c7v8b9"
{
  id: boolean;
  name: boolean;
}
```

---

# 🔄 Preserving Original Value Types

```ts id="n1m2q3"
type Copy = {
  [K in keyof User]: User[K];
};
```

Result:

```ts id="w4e5r6"
{
  id: number;
  name: string;
}
```

---

# 🎯 Final Understanding

> Mapped types iterate over a union of keys and generate new properties dynamically at the type level.
