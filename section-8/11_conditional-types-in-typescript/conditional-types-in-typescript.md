## 🧠 What Are Conditional Types?

Conditional types allow TypeScript to:

> choose one type or another based on a condition.

They are the type-level equivalent of:

```js id="w1e2r3"
condition ? trueCase : falseCase;
```

in JavaScript.

---

# ⚙️ Syntax

```ts id="t4y5u6"
T extends U ? TrueType : FalseType
```

Meaning:

- if `T` is assignable to `U`
  → return `TrueType`
- otherwise
  → return `FalseType`

---

# 📦 Basic Example

```ts id="i7o8p9"
type T1 = "Hi" extends string ? "Yes" : "No"; // "Yes"
type T2 = 5 extends string ? "Yes" : "No"; // "No"
type T3 = 5 extends number ? "Yes" : "No"; // "Yes"
```

---

# 🧠 Understanding `extends`

In conditional types:

```ts id="f4g5h6"
T extends U
```

means:

> Is `T` is assignable to of `U`?

It is acting like a type-level condition check.

---

# ⚠️ Conditional Types with `any`

Now let’s see what happens when we use `any` in conditional types.

```ts id="a1b2c3"
type T1 = any extends string ? "Yes" : "No";
// "Yes" | "No"
```

This may look surprising at first.

Normally, we may expect:

```ts id="d4e5f6"
any extends string ? "Yes" : "No"
```

to give only `"Yes"`.

But TypeScript gives:

```ts id="g7h8i9"
"Yes" | "No";
```

---

# 🧠 Why Does This Happen?

`any` is a special type in TypeScript.

It means:

> TypeScript does not know the exact type, and it also stops strict type checking.

So when we write:

```ts id="j1k2l3"
any extends string ? "Yes" : "No"
```

TypeScript cannot safely decide only one side.

Because `any` could behave like a `string`:

```ts id="m4n5o6"
type A = any extends string ? "Yes" : "No";
// could be "Yes"
```

But `any` could also behave like some non-string value:

```ts id="p7q8r9"
type B = any extends string ? "Yes" : "No";
// could be "No"
```

So TypeScript keeps both possibilities:

```ts id="s1t2u3"
type Result = any extends string ? "Yes" : "No";
// "Yes" | "No"
```

---

# 📦 More Examples

```ts id="v4w5x6"
type T2 = any extends number ? 1 : 0;
// 1 | 0

type T3 = any extends boolean ? true : false;
// true | false => boolean

type T4 = any extends { name: string } ? "Object" : "Not Object";
// "Object" | "Not Object"
```

---

# 🎯 Important Point

When `any` is used on the left side of `extends` in a conditional type:

```ts id="y7z8a9"
any extends SomeType ? TrueType : FalseType
```

TypeScript usually returns:

```ts id="b1c2d3"
TrueType | FalseType;
```

Because `any` is not checked like a normal type.

It represents an unchecked value, so TypeScript keeps both possible results.

[StackOverflow Discussion](https://stackoverflow.com/questions/68754652/why-any-extends-x-a-b-give-a-b-in-typescript)  
[GitHub Discussion](https://github.com/microsoft/TypeScript/issues/40049?utm_source=chatgpt.com)

---

# 🔥 Conditionals with Generics

```ts id="j7k8l9"
type IsString<T> = T extends string ? "Yes" : "No";

type A = IsString<string>; // "Yes"
type B = IsString<boolean>; // "No"
```

---

# 🎯 Final Understanding

> Conditional types allow TypeScript to choose between different types based on type relationships and conditions.
