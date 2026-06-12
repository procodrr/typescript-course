# Type-Level Arithmetic Operations in TypeScript 🧮

In JavaScript, we can directly perform arithmetic operations like this:

```ts
const result = 5 + 3;
```

But at the **type level**, TypeScript does not directly allow arithmetic like this:

```ts
type Result = 5 + 3; // ❌ Not allowed
```

So if we want to perform arithmetic at the type level, we need a different technique.

One common technique is:

> Represent numbers using tuple length.

For example:

```ts
type Five = [unknown, unknown, unknown, unknown, unknown];
```

The length of this tuple is `5`.

So at the type level:

```ts
Five["length"] // 5
```

Using this idea, we can create arithmetic operations like:

```txt
Add
Subtract
Multiply
Divide
```

---

# 🧱 Creating Numbers at Type Level

First, we create a utility type called `Num`.

```ts
type Num<
  N extends number,
  Result extends unknown[] = [],
> = Result["length"] extends N ? Result : Num<N, [unknown, ...Result]>;
```

## What Does `Num<N>` Do?

`Num<N>` creates a tuple whose length is `N`.

Example:

```ts
type A = Num<3>;
```

This becomes:

```ts
type A = [unknown, unknown, unknown];
```

So:

```ts
type Length = Num<3>["length"];
// 3
```

## Why Do We Need This?

Because TypeScript cannot directly calculate:

```ts
type A = 2 + 3; // ❌
```

But TypeScript can work with tuple lengths:

```ts
type A = [...Num<2>, ...Num<3>]["length"];
// 5
```

So tuple length becomes our foundation for type-level arithmetic.

---

# ➕ Addition at Type Level

```ts
type Add<N1 extends number, N2 extends number> = [
  ...Num<N1>,
  ...Num<N2>,
]["length"];
```

## How Addition Works

If we want to calculate:

```txt
2 + 3
```

Then we create two tuples:

```ts
Num<2> // [unknown, unknown]
Num<3> // [unknown, unknown, unknown]
```

Then we merge them:

```ts
[...Num<2>, ...Num<3>]
```

Result:

```ts
[unknown, unknown, unknown, unknown, unknown]
```

The length is `5`.

## Example

```ts
type A = Add<5, 9>;
// 14
```

```ts
type B = Add<10, 20>;
// 30
```

So addition at type level means:

> Create two tuples, merge them, and return the final length.

---

# ➖ Subtraction at Type Level

```ts
type Subtract<N1 extends number, N2 extends number> =
  Num<N1> extends [...Num<N2>, ...infer Rest] ? Rest["length"] : never;
```

## How Subtraction Works

If we want to calculate:

```txt
5 - 2
```

First we create:

```ts
Num<5>
```

This gives:

```ts
[unknown, unknown, unknown, unknown, unknown]
```

Then we check:

```ts
Num<5> extends [...Num<2>, ...infer Rest]
```

Meaning:

> Can we remove a tuple of length `2` from the starting part of a tuple of length `5`?

So:

```ts
[unknown, unknown, unknown, unknown, unknown]
```

becomes:

```ts
[unknown, unknown] + Rest
```

Now `Rest` becomes:

```ts
[unknown, unknown, unknown]
```

So:

```ts
Rest["length"]
```

is:

```ts
3
```

## Example

```ts
type A = Subtract<10, 4>;
// 6
```

```ts
type B = Subtract<9, 9>;
// 0
```

```ts
type C = Subtract<4, 9>;
// never
```

## Why `never`?

Because we cannot remove a tuple of length `9` from a tuple of length `4`.

So this operation works safely for cases where `N1 >= N2`.

---

# ✖️ Multiplication at Type Level

```ts
type Multiply<
  N1 extends number,
  N2 extends number,
  Result extends unknown[] = [],
> = N2 extends 0
  ? Result["length"]
  : Multiply<N1, Subtract<N2, 1>, [...Result, ...Num<N1>]>;
```

## How Multiplication Works

Multiplication is repeated addition.

For example:

```txt
3 × 4
```

means:

```txt
3 + 3 + 3 + 3
```

So our type-level multiplication does the same thing.

## Step-by-Step Example

```ts
type A = Multiply<3, 4>;
```

Initially:

```ts
N1 = 3
N2 = 4
Result = []
```

First call:

```ts
Multiply<3, 4, []>
```

Since `N2` is not `0`, add `Num<3>` to `Result`.

```ts
Result = [unknown, unknown, unknown]
N2 = 3
```

Second call:

```ts
Result = [unknown, unknown, unknown, unknown, unknown, unknown]
N2 = 2
```

Third call:

```ts
Result = [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]
N2 = 1
```

Fourth call:

```ts
Result = [
  unknown, unknown, unknown,
  unknown, unknown, unknown,
  unknown, unknown, unknown,
  unknown, unknown, unknown
]
N2 = 0
```

Now `N2 extends 0`, so return:

```ts
Result["length"]
```

Output:

```ts
12
```

## Example

```ts
type A = Multiply<3, 4>;
// 12
```

```ts
type B = Multiply<5, 5>;
// 25
```

```ts
type C = Multiply<10, 0>;
// 0
```

So multiplication at type level means:

> Keep adding `N1` into `Result`, and reduce `N2` by `1` each time.

---

# ➗ Division at Type Level

```ts
type Divide<
  N1 extends number,
  N2 extends number,
  Count extends unknown[] = [],
> = N2 extends 0
  ? never
  : N1 extends 0
    ? Count["length"]
    : Num<N1> extends [...Num<N2>, ...infer Rest]
      ? Divide<Rest["length"], N2, [...Count, unknown]>
      : Count["length"];
```

## How Division Works

Division is repeated subtraction.

For example:

```txt
9 ÷ 3
```

means:

```txt
How many times can we subtract 3 from 9?
```

Step by step:

```txt
9 - 3 = 6
6 - 3 = 3
3 - 3 = 0
```

We subtracted `3` exactly `3` times.

So:

```txt
9 ÷ 3 = 3
```

## Step-by-Step Example

```ts
type A = Divide<9, 3>;
```

Initially:

```ts
N1 = 9
N2 = 3
Count = []
```

First subtraction:

```ts
9 - 3 = 6
Count length = 1
```

Second subtraction:

```ts
6 - 3 = 3
Count length = 2
```

Third subtraction:

```ts
3 - 3 = 0
Count length = 3
```

Now `N1 extends 0`, so return:

```ts
Count["length"]
```

Output:

```ts
3
```

## Example

```ts
type A = Divide<9, 9>;
// 1
```

```ts
type B = Divide<12, 3>;
// 4
```

```ts
type C = Divide<10, 2>;
// 5
```

```ts
type D = Divide<10, 3>;
// 3
```

In the last example, the result is `3` because this implementation gives integer division.

```txt
10 ÷ 3 = 3 remainder 1
```

It does not return decimal values.

## Division by Zero

```ts
type A = Divide<10, 0>;
// never
```

We return `never` because division by zero is invalid.

---

# ⚠️ Important Limitations

This approach is great for learning, but it has some limitations.

## 1. It Works Best with Small Numbers

Since TypeScript has to create large tuples internally, very large numbers can become slow or produce compiler errors.

Example:

```ts
type A = Multiply<1000, 1000>;
```

This may become too heavy for TypeScript.

## 2. It Only Handles Non-Negative Integers

This implementation works with:

```txt
0, 1, 2, 3, 4...
```

It does not handle:

```txt
negative numbers
decimal numbers
floating-point numbers
```

## 3. Division Gives Integer Result

```ts
type A = Divide<10, 3>;
// 3
```

It does not return:

```txt
3.333...
```

It only counts how many times `3` can be fully subtracted from `10`.

---

# 📝 Assignments

Now try to implement more type-level arithmetic utilities yourself.

---

## Assignment 1: Create `Increment<N>`

Create a utility type that increases a number by `1`.

Expected result:

```ts
type A = Increment<5>;
// 6

type B = Increment<0>;
// 1
```

Hint:

```ts
type Increment<N extends number> = ?
```

Think:

```txt
N + 1
```

You can reuse `Add`.

---

## Assignment 2: Create `Decrement<N>`

Create a utility type that decreases a number by `1`.

Expected result:

```ts
type A = Decrement<5>;
// 4

type B = Decrement<1>;
// 0

type C = Decrement<0>;
// never
```

Hint:

```ts
type Decrement<N extends number> = ?
```

Think:

```txt
N - 1
```

You can reuse `Subtract`.

---

## Assignment 3: Create `Equal<N1, N2>`

Create a utility type that checks whether two numbers are equal.

Expected result:

```ts
type A = Equal<5, 5>;
// true

type B = Equal<5, 3>;
// false
```

Hint:

```ts
type Equal<N1 extends number, N2 extends number> = ?
```

Think about tuple lengths:

```ts
Num<N1> extends Num<N2>
```

But remember, equality should work both ways.

---

## Assignment 4: Create `GreaterThan<N1, N2>`

Create a utility type that checks whether `N1` is greater than `N2`.

Expected result:

```ts
type A = GreaterThan<5, 3>;
// true

type B = GreaterThan<3, 5>;
// false

type C = GreaterThan<5, 5>;
// false
```

Hint:

```ts
type GreaterThan<N1 extends number, N2 extends number> = ?
```

Think:

```txt
If N1 - N2 gives a positive number, then N1 is greater.
```

But if both are equal, the result should be `false`.

---

## Assignment 5: Create `LessThan<N1, N2>`

Create a utility type that checks whether `N1` is less than `N2`.

Expected result:

```ts
type A = LessThan<3, 5>;
// true

type B = LessThan<5, 3>;
// false

type C = LessThan<5, 5>;
// false
```

Hint:

```ts
type LessThan<N1 extends number, N2 extends number> = ?
```

You can reuse `GreaterThan`.

---

## Assignment 6: Create `GreaterThanOrEqual<N1, N2>`

Expected result:

```ts
type A = GreaterThanOrEqual<5, 3>;
// true

type B = GreaterThanOrEqual<5, 5>;
// true

type C = GreaterThanOrEqual<3, 5>;
// false
```

Hint:

```txt
N1 >= N2 means:
N1 is greater than N2 OR N1 is equal to N2
```

---

## Assignment 7: Create `LessThanOrEqual<N1, N2>`

Expected result:

```ts
type A = LessThanOrEqual<3, 5>;
// true

type B = LessThanOrEqual<5, 5>;
// true

type C = LessThanOrEqual<5, 3>;
// false
```

Hint:

```txt
N1 <= N2 means:
N1 is less than N2 OR N1 is equal to N2
```

---

## Assignment 8: Create `Modulo<N1, N2>`

Create a utility type that returns the remainder after division.

Expected result:

```ts
type A = Modulo<10, 3>;
// 1

type B = Modulo<10, 2>;
// 0

type C = Modulo<9, 4>;
// 1
```

Hint:

```txt
Modulo means repeatedly subtract N2 from N1 until N1 becomes smaller than N2.
The remaining value is the answer.
```

---

## Assignment 9: Create `IsEven<N>`

Create a utility type that checks whether a number is even.

Expected result:

```ts
type A = IsEven<4>;
// true

type B = IsEven<5>;
// false

type C = IsEven<0>;
// true
```

Hint:

```txt
A number is even if N % 2 is 0.
```

You can use your `Modulo` utility.

---

## Assignment 10: Create `IsOdd<N>`

Create a utility type that checks whether a number is odd.

Expected result:

```ts
type A = IsOdd<5>;
// true

type B = IsOdd<4>;
// false
```

Hint:

```txt
A number is odd if it is not even.
```

---

## Assignment 11: Create `Min<N1, N2>`

Create a utility type that returns the smaller number.

Expected result:

```ts
type A = Min<3, 7>;
// 3

type B = Min<10, 4>;
// 4

type C = Min<5, 5>;
// 5
```

Hint:

```txt
If N1 is less than N2, return N1.
Otherwise return N2.
```

---

## Assignment 12: Create `Max<N1, N2>`

Create a utility type that returns the bigger number.

Expected result:

```ts
type A = Max<3, 7>;
// 7

type B = Max<10, 4>;
// 10

type C = Max<5, 5>;
// 5
```

Hint:

```txt
If N1 is greater than N2, return N1.
Otherwise return N2.
```

---

# ✅ Practice Challenge

After implementing all the above utilities, try to create this type:

```ts
type Calculate<N1 extends number, N2 extends number> = {
  add: Add<N1, N2>;
  subtract: Subtract<N1, N2>;
  multiply: Multiply<N1, N2>;
  divide: Divide<N1, N2>;
  greaterThan: GreaterThan<N1, N2>;
  lessThan: LessThan<N1, N2>;
  equal: Equal<N1, N2>;
};
```

Expected result:

```ts
type A = Calculate<10, 2>;
```

Output should behave like:

```ts
type A = {
  add: 12;
  subtract: 8;
  multiply: 20;
  divide: 5;
  greaterThan: true;
  lessThan: false;
  equal: false;
};
```

---

# 🎯 Summary

In this chapter, we learned that arithmetic operations can be performed at the type level by representing numbers as tuple lengths.

```txt
Number  → Tuple length
Addition → Merging tuples
Subtraction → Removing one tuple from another
Multiplication → Repeated addition
Division → Repeated subtraction
```

These concepts are not commonly used in day-to-day application code, but they are very useful for understanding the power of TypeScript’s type system.


https://github.com/microsoft/TypeScript/pull/45711

https://youtu.be/xI2GgCjAMXc