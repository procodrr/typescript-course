## 🧠 What Is `infer`?

`infer` is used inside conditional types to **extract a type from another type**.

Think of it like:

> “If this type matches this pattern, capture this part and store it in a temporary type variable.”

---

## ⚙️ Basic Syntax

```ts
type Something<T> = T extends SomePattern<infer X> ? X : never;
```

Here:

```ts
infer X
```

means:

> capture this unknown part of the matched type and call it `X`.

---

## 📚 Example 1: Extract Array Element Type

```ts
type ElementType<T> = T extends (infer U)[] ? U : never;

type A = ElementType<string[]>;
// string

type B = ElementType<number[]>;
// number
```

### What happens?

```ts
number[]
```

is matched against:

```ts
(infer U)[]
```

So TypeScript asks:

> What is the element type inside this array?

Answer:

```ts
U = number;
```

---

## ⚙️ Example 2: Extract Function Return Type

```ts
type Return<T> = T extends (...args: any[]) => infer R ? R : never;

type A = Return<() => string>;
// string

type B = Return<() => number>;
// number
```

### What happens?

```ts
() => string;
```

is matched against:

```ts
(...args: any[]) => infer R
```

So TypeScript captures the return type:

```ts
R = string;
```

---

## 🧾 Example 3: Extract Function Parameters

```ts
type Params<T> = T extends (...args: infer P) => any ? P : never;

type A = Params<(name: string, age: number) => void>;
// [name: string, age: number]
```

Here:

```ts
infer P
```

captures the function parameter list as a tuple.

---

## 📦 Example 4: Extract Object Property Type

```ts
type GetId<T> = T extends { id: infer I } ? I : never;

type A = GetId<{ id: number; name: string }>;
// number

type B = GetId<{ id: string; name: string }>;
// string
```

TypeScript matches the object with:

```ts
{ id: infer I }
```

and captures the type of `id`.

---

## 🏠 Example 5: Extract Nested Object Property

```ts
type GetCity<T> = T extends { address: { city: infer C } } ? C : never;

type A = GetCity<{
  address: {
    city: "Bangalore";
    pincode: 560001;
  };
}>;
// "Bangalore"
```

Here, TypeScript looks inside the nested object and captures the `city` type.

---

## 🎯 Final Understanding

`infer` is used when you want TypeScript to **look inside a type and extract some part of it automatically**.

It is commonly used with:

- arrays
- tuples
- functions
- promises
- objects
- template literal types

The simple idea is:

> Match the type against a pattern, then capture the unknown part using `infer`.
