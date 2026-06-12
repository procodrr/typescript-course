# 🔁 Recursion at the Type Level Using Conditional Types

In JavaScript, recursion means:

> “A function calls itself again and again until it reaches a stopping point.”

In TypeScript, we can do something similar at the **type level**.

But here, we are not running JavaScript code.

Instead, we are asking TypeScript to **calculate a type again and again** until it reaches the final answer.

Usually, type-level recursion is written using **conditional types**.

Basic shape:

```ts
type SomeType<T> =
  T extends SomeCondition
    ? SomeType<SomethingNew>
    : FinalResult;
```

Here:

* `T extends SomeCondition` checks whether the type matches a pattern.
* If it matches, we call the same type again with a new type.
* If it does not match, we return the final result.

So the main idea is:

> Recursion at the type level means repeatedly transforming a type until a base case is reached.

---

# 1. Why Do We Need Recursion at the Type Level?

We need type-level recursion when a type has a **nested**, **repeated**, or **layered** structure.

For example:

```ts
type A = number[][][];
```

Here, the actual inner value is:

```ts
number
```

But it is wrapped inside multiple array layers.

So we need a type that can:

1. check whether the type is an array,
2. remove one array layer,
3. repeat the same process,
4. stop when the type is no longer an array.

This is exactly where recursion at the type level becomes useful.

---

# 2. First Example: Deep Flatten

Suppose we want to create a type that removes all array layers.

```ts
type DeepFlatten<T> =
  T extends (infer U)[]
    ? DeepFlatten<U>
    : T;

type A = DeepFlatten<number[]>;
// number

type B = DeepFlatten<number[][]>;
// number

type C = DeepFlatten<number[][][]>;
// number
```

---

# 🧠 How It Works

Take this:

```ts
type C = DeepFlatten<number[][][]>;
```

TypeScript starts evaluating it like this:

```ts
DeepFlatten<number[][][]>
```

`number[][][]` is an array, so `infer U` becomes:

```ts
number[][]
```

So now it becomes:

```ts
DeepFlatten<number[][]>
```

Again, `number[][]` is an array, so `U` becomes:

```ts
number[]
```

So now it becomes:

```ts
DeepFlatten<number[]>
```

Again, `number[]` is an array, so `U` becomes:

```ts
number
```

So now it becomes:

```ts
DeepFlatten<number>
```

Now `number` is not an array.

So TypeScript stops recursion and returns:

```ts
number
```

Final result:

```ts
type C = DeepFlatten<number[][][]>;
// number
```

---

# 3. Two Important Parts of Type-Level Recursion

Every recursive type usually has two important parts:

---

## 1. 🛑 Base Case

The base case is where recursion stops.

In this example:

```ts
type DeepFlatten<T> =
  T extends (infer U)[]
    ? DeepFlatten<U>
    : T;
```

The base case is:

```ts
: T
```

Meaning:

```ts
If T is not an array, return T.
```

Without a base case, TypeScript would keep trying to calculate the type again and again.

So the base case is very important.

---

## 2. 🔁 Recursive Case

The recursive case is where the type calls itself again.

```ts
? DeepFlatten<U>
```

Meaning:

```ts
If T is an array, remove one layer and call DeepFlatten again.
```

So this type has both parts:

```ts
type DeepFlatten<T> =
  T extends (infer U)[]
    ? DeepFlatten<U> // recursive case
    : T;             // base case
```

---

# 4. Recursion with Promises

We can also use recursion to unwrap nested promises.

```ts
type UnwrapPromise<T> =
  T extends Promise<infer U>
    ? UnwrapPromise<U>
    : T;

type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<Promise<Promise<number>>>; // number
type C = UnwrapPromise<Promise<Promise<Promise<boolean>>>>; // boolean
```

---

# 🧠 How It Works

Take this:

```ts
type B = UnwrapPromise<Promise<Promise<number>>>;
```

TypeScript evaluates it like this:

```ts
UnwrapPromise<Promise<Promise<number>>>
```

The type is a `Promise`, so `infer U` becomes:

```ts
Promise<number>
```

So now it becomes:

```ts
UnwrapPromise<Promise<number>>
```

Again, it is a `Promise`, so `U` becomes:

```ts
number
```

So now it becomes:

```ts
UnwrapPromise<number>
```

Now `number` is not a `Promise`.

So TypeScript stops recursion and returns:

```ts
number
```

Final result:

```ts
type B = UnwrapPromise<Promise<Promise<number>>>;
// number
```

This recursively removes one `Promise` layer at a time.

---

# 5. Recursion with Tuples

Type-level recursion is also very useful for transforming tuples.

Example:

```ts
type Reverse<T extends unknown[]> =
  T extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : [];

type A = Reverse<[1, 2, 3]>;
// [3, 2, 1]
```

### JavaScript Equivalent 👇
```js
function reverse([first, ...rest]) {
  return first !== undefined
    ? [...reverse(rest), first]
    : [];
}

const A = reverse([1, 2, 3]);
console.log(A); // [3, 2, 1]
```
---

# 🧠 How It Works

Take this:

```ts
Reverse<[1, 2, 3]>
```

It becomes:

```ts
[...Reverse<[2, 3]>, 1]
```

Now `Reverse<[2, 3]>` becomes:

```ts
[...Reverse<[3]>, 2]
```

Now `Reverse<[3]>` becomes:

```ts
[...Reverse<[]>, 3]
```

Now `Reverse<[]>` reaches the base case:

```ts
[]
```

So now TypeScript resolves everything back:

```ts
[...[], 3]
// [3]
```

Then:

```ts
[...[3], 2]
// [3, 2]
```

Then:

```ts
[...[3, 2], 1]
// [3, 2, 1]
```

Final result:

```ts
type A = Reverse<[1, 2, 3]>;
// [3, 2, 1]
```

---

# ⭐ Important Concept

This example is different from `DeepFlatten`.

`DeepFlatten` only keeps unwrapping a type.

But `Reverse` builds the final result while recursion resolves back.

This is very similar to JavaScript recursion.

In JavaScript, a recursive function may call itself first, and then build the result while returning back.

In TypeScript also, something similar happens at the type level.

---

# 6. Recursion with Strings

Since template literal types can pattern-match strings, we can also use recursion on string literal types.

Example: remove spaces from the left side.

```ts
type TrimLeft<S extends string> =
  S extends ` ${infer Rest}`
    ? TrimLeft<Rest>
    : S;

type A = TrimLeft<"   hello">;
// "hello"

type B = TrimLeft<"world">;
// "world"
```

---

# 🧠 How It Works

```ts
TrimLeft<"   hello">
```

becomes:

```ts
TrimLeft<"  hello">
```

then:

```ts
TrimLeft<" hello">
```

then:

```ts
TrimLeft<"hello">
```

Now there is no space on the left side.

So final result is:

```ts
"hello"
```

---

# 7. Another String Example: Replace Spaces

We can also replace all spaces with underscores.

```ts
type ReplaceSpaces<S extends string> =
  S extends `${infer Left} ${infer Right}`
    ? `${Left}_${ReplaceSpaces<Right>}`
    : S;
    
type A = ReplaceSpaces<"hello world from ts">;
// "hello_world_from_ts"
```

---

# 🧠 How It Works

Take this:

```ts
ReplaceSpaces<"hello world from ts">
```

TypeScript finds the first space.

So:

```ts
Left = "hello"
Right = "world from ts"
```

Now it returns:

```ts
`hello_${ReplaceSpaces<"world from ts">}`
```

Again, TypeScript finds the next space.

```ts
Left = "world"
Right = "from ts"
```

So it becomes:

```ts
`hello_world_${ReplaceSpaces<"from ts">}`
```

Again:

```ts
Left = "from"
Right = "ts"
```

So it becomes:

```ts
`hello_world_from_${ReplaceSpaces<"ts">}`
```

Now `"ts"` has no space.

So the final result is:

```ts
"hello_world_from_ts"
```

---

# 8. What Is Actually Happening?

In all these examples, TypeScript is doing the same basic process:

1. Check if the type matches a pattern.
2. Extract some part using `infer`.
3. Call the same type again with the extracted or transformed type.
4. Stop when the base case is reached.
5. Return the final calculated type.

So type-level recursion is not about running code.

It is about **calculating types step by step**.

---

# 9. Where Is Type-Level Recursion Used?

Type-level recursion is commonly used for:

* unwrapping nested arrays,
* unwrapping nested promises,
* transforming tuples,
* reversing tuples,
* trimming strings,
* replacing parts of strings,
* deeply transforming object types,
* building advanced utility types.

Examples:

```ts
type A = DeepFlatten<number[][][]>;
// number

type B = UnwrapPromise<Promise<Promise<string>>>;
// string

type C = Reverse<[1, 2, 3]>;
// [3, 2, 1]

type D = TrimLeft<"   hello">;
// "hello"
```

---

# 10. Final Summary

Type-level recursion means:

> A type repeatedly calls itself to calculate another type.

Usually, we write this using conditional types.

A recursive type generally has two parts:

* 🛑 **Base Case**: where recursion stops.
* 🔁 **Recursive Case**: where the type calls itself again.

Conditional types help us decide:

> “Should we continue recursion, or should we stop?”