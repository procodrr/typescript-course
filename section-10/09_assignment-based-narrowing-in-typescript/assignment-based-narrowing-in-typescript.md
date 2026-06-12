# 🔍 Assignment-Based Narrowing in TypeScript

Assignment-based narrowing is a narrowing technique where TypeScript narrows the current known type of a variable based on the value assigned to it.

This happens during control flow analysis.

---

# 🧠 Basic Idea

When TypeScript sees an assignment like:

```ts id="jlwm25"
value = "hello";
```

it updates its understanding of the variable for the current control flow path.

It thinks:

```text id="jlwm26"
At this point in the code,
value currently holds a string.
```

This process is called:

# ✨ Assignment-Based Narrowing

---

# 📌 Simple Example

```ts id="jlwm27"
let value: string | number;

value = "hello";

console.log(value); // value is string
```

Even though the declared type is:

```ts id="jlwm28"
string | number;
```

TypeScript knows the current assigned value is a string.

So at this point:

```ts id="jlwm29"
value: string;
```

---

# 📌 Another Example

```ts id="jlwm30"
let value: string | number;

value = 100;

console.log(value); // value is number
```

Now TypeScript narrows the current flow type to:

```ts id="jlwm31"
number;
```

---

# 📌 Flow Type Changes After Every Assignment

```ts id="jlwm32"
let value: string | number;

value = "hello";
console.log(value); // value is string

value = 100;
console.log(value); // value is number
```

The declared type remains:

```ts id="jlwm33"
string | number;
```

But the current flow type keeps changing based on assignments.

---

# 📌 Assignment Narrowing Inside Conditions

```ts id="jlwm34"
let value: string | number;

if (Math.random() > 0.5) {
  value = "hello";
  console.log(value); // value is string
} else {
  value = 100;
  console.log(value); // value is number
}

console.log(value); // value is string | number
```

After the `if-else`, TypeScript combines both possibilities again.

Because both execution paths are possible.

---

# 📌 Assignment Narrowing with Early Return

```ts id="jlwm35"
function print(value: string | number) {
  value = "hello";

  console.log(value); // value is string

  return;

  value = 100;
}
```

The last assignment is unreachable.

So TypeScript only considers the reachable assignment.

---

# 📌 Assignment Narrowing with `undefined`

```ts id="jlwm36"
let value: string | undefined;

value = "Anurag";

console.log(value); // value is string
```

Current flow type becomes:

```ts id="jlwm37"
string;
```

---

# 📌 Reassigning Back to a Broader Possibility

```ts id="jlwm38"
let value: string | number;

value = "hello";
console.log(value); // value is string

value = Math.random() > 0.5 ? "hi" : 100;

console.log(value); // value is string | number
```

Because the new assignment itself can produce multiple types.

---

# ⚠️ Declared Type Never Changes

This is extremely important.

```ts id="jlwm39"
let value: string | number;

value = "hello";
```

TypeScript narrows the current flow type to:

```ts id="jlwm40"
string;
```

BUT the declared type is still:

```ts id="jlwm41"
string | number;
```

So this is still valid later:

```ts id="jlwm42"
value = 100;
```

---

# ⚠️ Assignment Narrowing Does NOT Permanently Narrow

This is temporary flow analysis.

Example:

```ts id="jlwm43"
let value: string | number;

value = "hello";

console.log(value); // string

value = 100;

console.log(value); // number
```

The variable itself is not permanently transformed into `string`.

Only the current control flow understanding changes.

---

# ⚠️ `const` Variables Behave Differently

```ts id="jlwm44"
const value = "hello";

console.log(value); // value is "hello"
```

Because `const` cannot be reassigned, TypeScript preserves the literal type itself.

This is more related to:

- literal inference
- widening prevention

than assignment narrowing.

---

# ⚠️ Assignment Narrowing Depends on Reachable Code

```ts id="jlwm45"
let value: string | number;

value = "hello";

throw new Error();

value = 100;
```

The last assignment is unreachable.

So TypeScript ignores it during control flow analysis.

---

# ⚠️ Variables Can Become Wider Again

```ts id="jlwm46"
let value: string | number;

value = "hello";
console.log(value); // string

value = Math.random() > 0.5 ? "hi" : 42;

console.log(value); // string | number
```

Assignments can both:

- narrow
- broaden current flow understanding

depending on the assigned expression.

---

# 🧠 Best Mental Model

```text id="jlwm47"
Declared Type
        ↓
Permanent Allowed Type Range

Current Flow Type
        ↓
TypeScript's Current Understanding
Based on Assignments and Control Flow
```

---

# 📌 When Assignment Narrowing Is Useful

Assignment narrowing is useful because TypeScript can:

- track variables more precisely
- reduce unnecessary checks
- improve autocomplete
- improve type safety

without changing the declared type itself.

---

# ⚡ Final Summary

Assignment-based narrowing happens when TypeScript narrows the current known type of a variable based on assignments during control flow analysis.

---

# ✨ Most Important Understanding

```text id="jlwm48"
Assignments do not change
the declared type.

They only change TypeScript's
current understanding of the type
at that point in the control flow.
```
