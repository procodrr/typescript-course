# 🔍 Truthiness Narrowing in TypeScript

Truthiness narrowing is a narrowing technique where TypeScript narrows types based on whether a value is:

* truthy
  or
* falsy

TypeScript analyzes these conditions during control flow analysis and removes impossible values.

---

# 🧠 Basic Idea

When TypeScript sees:

```ts id="n6tjlwm"
if (value)
```

it tries to understand:

```text id="3jlwmh"
If this condition is true,
which values are still possible?
```

This process is called:

# ✨ Truthiness Narrowing

---

# 📌 Simple Example

```ts id="5jlwmw"
function print(value: string | undefined) {
  if (value) {
    console.log(value); // value is string
  }
}
```

Inside the `if` block, TypeScript removes:

```ts id="cjlwmx"
undefined
```

So:

```ts id="jwjlwm"
value: string
```

---

# 📌 Another Example

```ts id="5djlwm"
function greet(name: string | null) {
  if (name) {
    console.log(name); // name is string
  } else {
    console.log(name); // name is string | null
  }
}
```

TypeScript narrows based on whether the condition succeeds or fails.

---

# 📌 Using `!value`

```ts id="sjlwm1"
function print(value: string | undefined) {
  if (!value) {
    console.log(value); // value is undefined
    return;
  }

  console.log(value); // value is string
}
```

TypeScript understands:

```text id="xjlwm2"
If !value is true,
value must be falsy.
```

---

# 📌 Truthiness Narrowing with Multiple Types

```ts id="jlwm3"
function handle(value: string | number | null) {
  if (value) {
    console.log(value);
    // value is string | number
  }
}
```

TypeScript removes:

```ts id="jlwm4"
null, 0, ""
```

because `null`, `0`, `""` are falsy.

---

# ⚠️ What Values Are Falsy in JavaScript?

These values are considered falsy:

```ts id="jlwm5"
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is truthy.

---

# ⚠️ Empty String Problem

This is extremely important.

```ts id="jlwm6"
function print(value: string | null) {
  if (value) {
    console.log(value); // value is string
  }
}
```

At runtime:

```ts id="jlwm7"
""
```

is falsy.

So this condition excludes:

* `null`
* empty string `""`

This can sometimes cause bugs.

---

# ⚠️ Zero Problem

```ts id="jlwm8"
function print(value: number | undefined) {
  if (value) {
    console.log(value); // value is number
  }
}
```

But:

```ts id="jlwm9"
0
```

is falsy.

So the condition accidentally excludes `0`.

---

# ⚠️ Truthiness Narrowing Can Be Too Broad

Example:

```ts id="jlwm10"
function print(value: string | null) {
  if (value) {
    console.log(value);
  }
}
```

This removes:

* `null`
* `""`

even if you only intended to remove `null`.

Sometimes explicit checks are safer:

```ts id="jlwm11"
if (value !== null)
```

---

# 📌 Safer Explicit Check

Instead of:

```ts id="jlwm12"
if (value)
```

sometimes prefer:

```ts id="jlwm13"
if (value !== null)
```

or:

```ts id="jlwm14"
if (value !== undefined)
```

because they are more precise.

---

# 📌 Truthiness Narrowing with Objects

```ts id="jlwm15"
function print(value: object | null) {
  if (value) {
    console.log(value); // value is object
  }
}
```

TypeScript removes `null`.

---

# 📌 Truthiness Narrowing with Arrays

```ts id="jlwm16"
function print(value: string[] | null) {
  if (value) {
    console.log(value); // value is string[]
  }
}
```

Even empty arrays are truthy:

```ts id="jlwm17"
Boolean([]); // true
```

---

# 📌 Truthiness Narrowing with Objects

```ts id="jlwm18"
function print(value: { name: string } | null) {
  if (value) {
    console.log(value); // value is { name: string }
  }
}
```

Even empty objects are truthy:

```ts id="jlwm19"
Boolean({}); // true
```

---

# ⚠️ `Boolean(value)` Does NOT Narrow Properly

This surprises many developers.

```ts id="jlwm20"
function print(value: string | undefined) {
  if (Boolean(value)) {
    console.log(value);
    // value is still string | undefined
  }
}
```

Why?

Because TypeScript does not treat arbitrary function calls as truthiness guards.

But this works:

```ts id="jlwm21"
if (value)
```

---

# ⚠️ Double Negation Works Better

```ts id="jlwm22"
function print(value: string | undefined) {
  if (!!value) {
    console.log(value); // value is string
  }
}
```

because TypeScript can analyze the boolean coercion here.

---

# ⚠️ Truthiness Narrowing Is Based on JavaScript Runtime Rules

TypeScript follows JavaScript truthy/falsy behavior exactly.

It does not invent its own rules.

---

# 🧠 Best Mental Model

```text id="jlwm23"
Truthiness Narrowing
        ↓
TypeScript removes falsy possibilities
when a condition must be truthy.
```

---

# 📌 When Truthiness Narrowing Is Useful

Truthiness narrowing is very useful for:

* nullable values
* optional values
* optional chaining logic
* early returns
* defensive programming

---

# 📌 When to Avoid Truthiness Narrowing

Avoid relying heavily on truthiness narrowing when:

* empty strings are valid
* 0 is valid
* false is meaningful
* precision matters

In such cases, explicit equality checks are safer.

---

# ⚡ Final Summary

Truthiness narrowing happens when TypeScript narrows types based on whether a value is truthy or falsy during control flow analysis.

---

# ✨ Most Important Understanding

```text id="jlwm24"
Truthiness narrowing removes
falsy possibilities from a type
when a condition must evaluate to true.
```
