## 🧠 What Is an Index Signature?

An **index signature** allows you to define:

> what type of values an object can store for dynamically named keys.

It is used when the exact property names are not known beforehand.

---

# ⚙️ Syntax

```ts id="j3k4l5"
{
  [Key: KeyType]: ValueType
}
```

* `Key` → placeholder name (only for readability)
* `KeyType` → `string`, `number`, or `symbol`
* `ValueType` → type of values stored

---

# 📦 Basic Example

```ts id="m6n7o8"
type Scores = {
  [subject: string]: number;
};
```

Meaning:

> Any string key is allowed, and its value must be a number.

---

# ✅ Valid

```ts id="p9q1r2"
const scores: Scores = {
  math: 90,
  science: 85,
  english: 95,
};
```

All keys are strings and all values are numbers.

---

# ❌ Invalid

```ts id="s3t4u5"
const scores: Scores = {
  math: 90,
  english: "A+",
};
```

Error because:

```ts id="v6w7x8"
english: "A+"
```

is not a number.

---

# 🔢 Number Index Signature

```ts id="y9z1a2"
type T = {
  [index: number]: string;
};
```

Meaning:

> Any numeric key is allowed, value must be string.

---

# 📚 Arrays Internally

Arrays behave similarly to:

```ts id="b3c4d5"
type MyArray<T> = {
  [index: number]: T;
};
```

Because arrays are indexed using numbers.

---

# 🔗 Symbol Index Signature

```ts id="e6f7g8"
type T = {
  [key: symbol]: boolean;
};
```

Meaning:

> Any symbol key is allowed.

---

# ⚠️ Important Rule

If you use a string index signature:

```ts id="h9i1j2"
type T = {
  [key: string]: number;
};
```

then every string-named property must follow it.

---

# ✅ Allowed

```ts id="k3l4m5"
type T = {
  [key: string]: number;
  age: number;
};
```

---

# ❌ Not Allowed

```ts id="n6o7p8"
type T = {
  [key: string]: number;
  name: string;
};
```

Because `"name"` is also a string key.

---

# 🧠 Mental Model

Runtime JavaScript:

```js id="q9r1s2"
obj["theme"] = "dark";
obj["language"] = "en";
```

Keys are dynamic.

---

Index signatures describe this behavior at the type level.

---

# 🎯 Final Understanding

> Index signatures define the type of values allowed for dynamically accessed property keys in an object.
