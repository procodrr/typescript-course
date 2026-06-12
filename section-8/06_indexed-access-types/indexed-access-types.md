## 🧠 What Is an Indexed Access Type?

An **indexed access type** allows you to:

> access or extract a type using a key/index.

It is the type-level version of:

```js id="w1k2x3"
obj[key]
```

in JavaScript.

---

# ⚙️ Syntax

```ts id="m1n2b3"
Type[Key]
```

* `Type` → the type you want to access
* `Key` → the property/index you want to access

---

# 📦 Basic Example

```ts id="a1b2c3"
type User = {
  id: number;
  name: string;
};

type T = User["id"];
```

Result:

```ts id="d4e5f6"
number
```

Because:

```ts id="g7h8i9"
User["id"]
```

means:

> give me the type of the `"id"` property.

---

# 🔑 Multiple Keys

```ts id="j1k2l3"
type T = User["id" | "name"];
```

Result:

```ts id="m4n5o6"
number | string
```

Because it accesses both properties.

---

# 📚 Array Example

```ts id="p7q8r9"
type T = string[][number];
```

Result:

```ts id="s1t2u3"
string
```

Because:

```ts id="v4w5x6"
arr[number]
```

means:

> what type do I get when indexing this array with a number?

---

# 📦 Tuple Example

```ts id="y7z8a9"
type T = ["a", "b"][number];
```

Result:

```ts id="b1c2d3"
"a" | "b"
```

Because indexing any numeric position can return either value.

---

# 🔥 Nested Access

```ts id="e4f5g6"
type User = {
  address: {
    city: string;
  };
};

type T = User["address"]["city"];
```

Result:

```ts id="h7i8j9"
string
```

---

# 🧩 Using `keyof`

```ts id="k1l2m3"
type T = User[keyof User];
```

Result:

```ts id="n4o5p6"
number | string
```

Because:

```ts id="q7r8s9"
keyof User
```

becomes:

```ts id="t1u2v3"
"id" | "name"
```

So:

```ts id="w4x5y6"
User["id" | "name"]
```

---

# ⚠️ Invalid Key

```ts id="z7a8b9"
type T = User["age"];
```

❌ Error, because `"age"` does not exist on `User`.

---

# 🧠 Mental Model

Runtime JavaScript:

```js id="c1d2e3"
user["name"]
```

gets a value.

---

TypeScript type level:

```ts id="f4g5h6"
User["name"]
```

gets a type.

---

# 🎯 Final Understanding

> Indexed access types allow you to extract types from other types using property keys or indexes.
