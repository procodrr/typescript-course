# 🧠 Possible Outcomes of Conditional Types

A conditional type expression can have **5 different possible outcomes** depending on how TypeScript evaluates the condition.

```ts id="a1b2c3"
T extends U ? TrueType : FalseType
```

These are the five possible outcomes:

1. TypeScript chooses the true branch
2. TypeScript chooses the false branch
3. TypeScript returns both branches as a union
4. TypeScript defers the decision for later
5. TypeScript decides the result based on the distributive property of conditional types

---

# ✅ 1. True Branch Is Returned

If the condition is clearly true, TypeScript returns the first branch.

```ts id="d4e5f6"
type A = "Hi" extends string ? "Yes" : "No";
// "Yes"
```

Here, `"Hi"` is assignable to `string`.

So TypeScript returns:

```ts id="g7h8i9"
"Yes";
```

---

# ❌ 2. False Branch Is Returned

If the condition is clearly false, TypeScript returns the second branch.

```ts id="j1k2l3"
type B = 100 extends string ? "Yes" : "No";
// "No"
```

Here, `100` is not assignable to `string`.

So TypeScript returns:

```ts id="m4n5o6"
"No";
```

---

# 🔀 3. Both Branches Are Returned as a Union

Sometimes TypeScript cannot choose only one side and returns both branches as a union.

The most common example is `any`.

```ts id="p7q8r9"
type C = any extends string ? "Yes" : "No";
// "Yes" | "No"
```

Here, `any` behaves like an unchecked wildcard.

It can behave like a `string`, so `"Yes"` is possible.

It can also behave like a non-string value, so `"No"` is also possible.

So TypeScript returns:

```ts id="s1t2u3"
"Yes" | "No";
```

---

# ⏳ 4. Deferred State

Sometimes TypeScript cannot decide the result immediately.

This usually happens when the condition depends on a generic type parameter.

```ts id="y7z8a9"
type IsString<T> = T extends string ? "Yes" : "No";
```

At this point, TypeScript does not know what `T` is.

So it does not immediately choose `"Yes"` or `"No"`.

It keeps the condition pending and decides later when the actual type is provided.

```ts id="b1c2d3"
type A = IsString<string>;
// "Yes"

type B = IsString<number>;
// "No"
```

So the conditional type was in a **deferred state** until `T` became known.

---

## 📦 Deferred State Inside a Function

```ts id="e4f5g6"
function createHandler<T>() {
  type ParamType = T extends string ? string : number;

  return function (value: ParamType) {
    console.log(value);
  };
}
```

Here, this condition is deferred:

```ts id="h7i8j9"
T extends string ? string : number
```

Because TypeScript does not know what `T` is when `createHandler` is declared.

When we call it with `string`:

```ts id="k1l2m3"
const stringHandler = createHandler<string>();

stringHandler("hello"); // ✅ allowed
stringHandler(123); // ❌ error
```

Now TypeScript knows `T` is `string`, so the parameter type becomes `string`.

When we call it with `boolean`:

```ts id="n4o5p6"
const numberHandler = createHandler<boolean>();

numberHandler(123); // ✅ allowed
numberHandler("hello"); // ❌ error
```

Now TypeScript knows `T` is `boolean`, so the parameter type becomes `number`.

---

# 🧬 5. Result Decided by Distributive Property

In this case the final result is decided by the **distributive property** of conditional types.

We'll this in the next video in detail.

## Example

```ts id="j4k5l6"
type RemoveString<T> = T extends string ? never : T;

type Result = RemoveString<string | number | boolean | undefined>;
// number | boolean | undefined
```

Here, `RemoveString` removes `string` from the union.

---

# 🎯 Final Understanding

A conditional type expression can resolve in different ways:

```ts id="q7r8s9"
T extends U ? TrueType : FalseType
```

It may return:

```ts id="t1u2v3"
TrueType;
```

or:

```ts id="w4x5y6"
FalseType;
```

or:

```ts id="z7a8b9"
TrueType | FalseType;
```

or it may stay in a **deferred state** until TypeScript gets more information.

Or, its result may be decided by the **distributive property** of conditional types.