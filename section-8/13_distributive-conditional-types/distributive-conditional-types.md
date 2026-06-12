# Distributive Conditional Types 🚀

Distributive behavior happens in **generic conditional types**.

```ts
type Check<T> = T extends string ? "Yes" : "No";
```

Here, this part is important:

```ts
T extends string
```

`T` is a **generic type parameter**, and it is used directly on the left side of `extends`.

This direct usage is called **naked type parameter**.

So this type is distributive:

```ts
type Check<T> =
  T extends string ? "Yes" : "No";
```

Meaning, when we pass a union into `T`, TypeScript does not check the whole union at once. It splits the union and checks each member separately.

---

## Example 1: Passing a Single Type 📦

```ts
type A = Check<string>;
```

TypeScript checks:

```ts
string extends string ? "Yes" : "No"
```

Result:

```ts
type A = "Yes";
```

Here distribution is not visible because there is only one type.

---

## Example 2: Passing a Union Type 🔥

```ts
type B = Check<string | number>;
```

Because `Check<T>` is distributive, TypeScript splits the union:

```ts
Check<string> | Check<number>
```

Now it evaluates both separately:

```ts
string extends string ? "Yes" : "No"
// "Yes"

number extends string ? "Yes" : "No"
// "No"
```

Final result:

```ts
type B = "Yes" | "No";
```

So this:

```ts
Check<string | number>
```

becomes this:

```ts
Check<string> | Check<number>
```

That is the distributive behavior.

---

# Why Does This Behavior Exist? 🤔

Because unions represent multiple possibilities.

```ts
string | number
```

means:

```txt
value can be string
or
value can be number
```

So TypeScript says:

```txt
Let me check each possibility separately.
```

This is very useful because it lets us filter, remove, and transform union members.

---

## Use Case 1: Filtering a Union ✨

```ts
type OnlyStrings<T> =
  T extends string ? T : never;
```

Now use it:

```ts
type Result = OnlyStrings<string | number | boolean>;
```

TypeScript distributes:

```ts
OnlyStrings<string> |
OnlyStrings<number> |
OnlyStrings<boolean>
```

Then evaluates:

```ts
string extends string ? string : never
// string

number extends string ? number : never
// never

boolean extends string ? boolean : never
// never
```

So the result becomes:

```ts
type Result = string | never | never;
```

And because `never` disappears from unions:

```ts
type Result = string;
```

This is how TypeScript can filter union types.

---

## Use Case 2: Removing a Type 🧹

```ts
type RemoveString<T> =
  T extends string ? never : T;
```

Use it:

```ts
type Result = RemoveString<string | number | boolean>;
```

Distribution:

```ts
RemoveString<string> |
RemoveString<number> |
RemoveString<boolean>
```

Evaluation:

```ts
never | number | boolean
```

Final result:

```ts
type Result = number | boolean;
```

This is the basic idea behind utility types like `Exclude`.

---

## Use Case 3: Transforming Every Union Member 🔄

```ts
type Wrap<T> =
  T extends any ? { value: T } : never;
```

Use it:

```ts
type Result = Wrap<string | number>;
```

Distribution:

```ts
Wrap<string> | Wrap<number>
```

Final result:

```ts
type Result =
  | { value: string }
  | { value: number };
```

So every union member gets transformed separately.

---

# How To Disable Distribution? 🧱

Wrap the generic type parameter so it is no longer naked.

Most commonly, we wrap it in tuple syntax:

```ts
type Check<T> =
  [T] extends [string] ? "Yes" : "No";
```

Now `T` is not directly on the left side of `extends`.

Instead of this:

```ts
T extends string
```

we have this:

```ts
[T] extends [string]
```

So TypeScript will not distribute.

---

## Example Without Distribution 🚫

```ts
type Check<T> =
  [T] extends [string] ? "Yes" : "No";

type Result = Check<string | number>;
```

Now TypeScript checks the whole union at once:

```ts
[string | number] extends [string] ? "Yes" : "No"
```

This is false because `string | number` is not fully assignable to `string`.

So result becomes:

```ts
type Result = "No";
```

Compare this with distributive behavior:

```ts
type Check<T> =
  T extends string ? "Yes" : "No";

type Result = Check<string | number>;
// "Yes" | "No"
```

But non-distributive version gives:

```ts
type Check<T> =
  [T] extends [string] ? "Yes" : "No";

type Result = Check<string | number>;
// "No"
```

---

# The Core Rule 🧠

This distributes:

```ts
type Check<T> =
  T extends string ? "Yes" : "No";
```

Because `T` is naked on the left side of `extends`.

This does not distribute:

```ts
type Check<T> =
  [T] extends [string] ? "Yes" : "No";
```

Because `T` is wrapped.

---

# Final Mental Model ✅

A distributive conditional type behaves like this:

```txt
For each member of the union:
  run the conditional type separately

Then combine all results back into a union.
```

So this:

```ts
Check<string | number | boolean>
```

becomes:

```ts
Check<string> | Check<number> | Check<boolean>
```

That is why distributive conditional types are so powerful. They allow TypeScript to work on union members one by one instead of always treating the union as one big combined type.

https://github.com/microsoft/TypeScript/issues/27418
