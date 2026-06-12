# 🔍 Equality Narrowing in TypeScript

Equality narrowing is a narrowing technique where TypeScript narrows types using comparison operators like:

* `===`
* `!==`
* `==`
* `!=`

TypeScript analyzes these comparisons during control flow analysis and removes impossible types.

---

# 🧠 Basic Idea

When TypeScript sees:

```ts id="n7ytnu"
value === something
```

it tries to understand:

```text id="b5phbx"
If this comparison is true,
what must the type/value be?
```

That process is called:

# ✨ Equality Narrowing

---

# 📌 Simple Example

```ts id="jybm2m"
function print(value: string | number) {
  if (value === "hello") {
    console.log(value); // value is "hello"
  }
}
```

Inside the `if` block, TypeScript narrows:

```ts id="zjlwmg"
value: "hello"
```

because only the string literal `"hello"` can satisfy that condition.

---

# 📌 Another Example

```ts id="s4c8lu"
function print(value: string | number) {
  if (value === 10) {
    console.log(value); // value is 10
  }
}
```

Inside the block:

```ts id="0sj9jo"
value: 10
```

---

# 📌 Equality Narrowing Between Variables

```ts id="7f4u0k"
function print(
  a: string | number,
  b: string
) {
  if (a === b) {
    console.log(a); // a is string
  }
}
```

TypeScript understands:

```text id="98mm9e"
If a equals b,
and b is string,
then a must also be string.
```

So inside the block:

```ts id="u1j5ii"
a: string
```

---

# 📌 Narrowing with `!==`

```ts id="a6om0e"
function print(value: string | null) {
  if (value !== null) {
    console.log(value); // value is string
  }
}
```

TypeScript removes `null` from the union.

---

# 📌 Narrowing with `undefined`

```ts id="1jlwm5"
function greet(name: string | undefined) {
  if (name !== undefined) {
    console.log(name); // name is string
  }
}
```

---

# 📌 Narrowing with `null`

```ts id="0c0yze"
function print(value: string | null) {
  if (value === null) {
    console.log(value); // value is null
  } else {
    console.log(value); // value is string
  }
}
```

---

# ⚠️ Difference Between `===` and `==`

TypeScript understands both:

```ts id="jzjlwm"
==
===
!=
!==
```

But in real projects:

✅ Prefer:

```ts id="mqbjlwm"
===
!==
```

because they avoid JavaScript type coercion.

---

# ⚠️ Loose Equality Can Be Confusing

Example:

```ts id="ewkwkh"
console.log(0 == false); // true
console.log("" == false); // true
```

because JavaScript converts types internally.

So even though TypeScript supports narrowing with `==`, strict equality is safer.

---

# ⚠️ Literal Narrowing

Equality narrowing becomes very powerful with literal types.

```ts id="2psjlwm"
type Status =
  | "loading"
  | "success"
  | "error";

function handle(status: Status) {
  if (status === "success") {
    console.log(status); // status is "success"
  }
}
```

TypeScript narrows to the exact literal type.

---

# ⚠️ Equality Narrowing Does NOT Check Structure

```ts id="14wwcs"
type User = {
  name: string;
};

type Product = {
  price: number;
};
```

This does not help much:

```ts id="xncdqy"
if (value === someObject)
```

because object equality checks identity, not shape.

---

# ⚠️ Objects Compare by Reference

```ts id="qjlwmf"
const a = { name: "Anurag" };
const b = { name: "Anurag" };

console.log(a === b); // false
```

because they are different object references.

So equality narrowing is most useful with:

* primitives
* literal values
* discriminant values
* `null`
* `undefined`

---

# ⚠️ `NaN === NaN` is False

This is a famous JavaScript quirk.

```ts id="1daz6x"
console.log(NaN === NaN); // false
```

So this check is useless:

```ts id="9jlwmk"
if (value === NaN) {
  // never works
}
```

Instead use:

```ts id="djlwm8"
Number.isNaN(value)
```

---

# ⚠️ `null == undefined`

```ts id="6fjlwm"
console.log(null == undefined); // true
```

But:

```ts id="56qjlwm"
console.log(null === undefined); // false
```

Another reason why strict equality is safer.

---

# 🧠 Best Mental Model

```text id="i9jlwm"
Equality Narrowing
        ↓
TypeScript narrows types
based on comparison results.
```

---

# 📌 When Equality Narrowing Is Most Useful

Equality narrowing works best with:

* literal types
* discriminated unions
* `null`
* `undefined`
* primitive values
* status flags
* enums-like values

---

# 📌 When NOT to Rely on Equality Narrowing

Avoid relying heavily on equality checks for:

* object structure checking
* deep object comparison
* arrays
* runtime validation

---

# ⚡ Final Summary

Equality narrowing happens when TypeScript narrows types using comparison operators like:

```ts id="l9jlwm"
===
!==
==
!=
```

TypeScript analyzes the comparison result and removes impossible types during control flow analysis.

---

# ✨ Most Important Understanding

```text id="xtjlwm"
If a comparison can only be true
for certain types or values,
TypeScript narrows accordingly.
```
