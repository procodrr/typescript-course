# 🧠 Nested Conditional Types

Nested conditional types mean:

> using one conditional type inside another conditional type.

It is similar to nested `if-else` in JavaScript.

```ts id="a1b2c3"
type Result<T> =
  T extends string
    ? "String"
    : T extends number
      ? "Number"
      : "Other";
```

Here TypeScript checks step by step:

1. Is `T` a `string`?
2. If not, is `T` a `number`?
3. If not, return `"Other"`.

---

# 📦 Example

```ts id="d4e5f6"
type CheckType<T> =
  T extends string
    ? "This is a string"
    : T extends number
      ? "This is a number"
      : T extends boolean
        ? "This is a boolean"
        : "Unknown type";
```

Now when we pass different types:

```ts id="g7h8i9"
type A = CheckType<string>;
// "This is a string"

type B = CheckType<number>;
// "This is a number"

type C = CheckType<boolean>;
// "This is a boolean"

type D = CheckType<object>;
// "Unknown type"
```

---

# 🧩 Another Simple Example

```ts id="j1k2l3"
type GetValue<T> =
  T extends string
    ? string
    : T extends number
      ? number
      : never;
```

Usage:

```ts id="m4n5o6"
type A = GetValue<"hello">;
// string

type B = GetValue<100>;
// number

type C = GetValue<boolean>;
// never
```

---

# 🎯 Final Understanding

Nested conditional types help us check multiple type conditions one by one.

```ts id="p7q8r9"
type Result<T> =
  T extends A
    ? X
    : T extends B
      ? Y
      : Z;
```

Meaning:

> If `T` matches `A`, return `X`. Otherwise, if `T` matches `B`, return `Y`. Otherwise, return `Z`.

They are useful when one condition is not enough and we want multiple type-level checks.
