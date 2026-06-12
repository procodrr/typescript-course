# 🧠 Type Narrowing and Type Widening in TypeScript

## 📈 What is Type Widening?

Type widening means:

> 👉 TypeScript expands a very specific type into a broader/general type.

---

## 📌 Example of Type Widening

```ts id="rlfj5e"
let username = "Anurag";
```

Here the value is:

```ts id="m0c2ud"
"Anurag"
```

which is a very specific string literal.

But TypeScript infers the type as:

```ts id="x2xnnx"
string
```

Why?

Because this variable is declared using `let`.

That means its value can change later.

```ts id="9rfvbb"
username = "ProCodrr";
```

So TypeScript widens:

```text id="5dm1m4"
"Anurag" → string
```

This process is called Type Widening.

---

## 🚦 Why Does TypeScript Widen Types?

Because TypeScript tries to predict future possibilities.

If a variable can change later, keeping a super-specific type would become impractical.

So TypeScript automatically makes the type broader.

---

## 📌 Another Example

```ts id="a35u3r"
let age = 25;
```

TypeScript infers:

```ts id="qpg26u"
number
```

NOT:

```ts id="zjlwmj"
25
```

because later:

```ts id="hkmq6g"
age = 30;
```

is allowed.

---

## 🔒 Preventing Type Widening

```ts id="r0nh1d"
const username = "Anurag";
```

Now TypeScript infers:

```ts id="ngfqv0"
"Anurag"
```

because `const` variables cannot be reassigned.

So TypeScript preserves the exact literal type.

---

## 📌 `as const`

```ts id="18r2g6"
const user = {
  role: "admin",
} as const;
```

Without `as const`:

```ts id="jlwmzb"
{
  role: string
}
```

With `as const`:

```ts id="84z6ko"
{
  readonly role: "admin"
}
```

So `as const` prevents widening.

---

## 📉 What is Type Narrowing?

Type narrowing means:

> 👉 TypeScript reduces a broader type into a more specific type.

---

## 📌 Example of Type Narrowing

```ts id="vz4r17"
function print(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}
```

At the beginning:

```ts id="3j97of"
value: string | number
```

This is a broader type.

Then TypeScript sees:

```ts id="f2u4aq"
typeof value === "string"
```

Inside this block:

```ts id="cclwsk"
value.toUpperCase();
```

TypeScript narrows the type to:

```ts id="d8mn1y"
string
```

---

After the `return`:

```ts id="6g6f72"
return value.toUpperCase();
```

TypeScript understands:

```text id="m1g9k9"
If execution continues,
value cannot be string anymore.
```

So here:

```ts id="e17vdy"
return value.toFixed(2);
```

TypeScript narrows:

```ts id="mds4lt"
value: number
```

---

## 🎯 Core Difference

## 📈 Widening

Moves from:

```text id="2m7kvv"
Specific → General
```

Examples:

```text id="t3m8di"
"hello" → string
25 → number
true → boolean
```

---

## 📉 Narrowing

Moves from:

```text id="i99nn4"
General → Specific
```

Examples:

```text id="2vjyk4"
string | number → string
string | undefined → string
```

---

# 🧠 The Deep Mental Model

TypeScript is always trying to balance:

```text id="8i0hvb"
Flexibility
vs
Precision
```

---

## 📈 Widening gives flexibility

```ts id="tejlwm"
let name = "Anurag";
```

TypeScript widens to:

```ts id="aj7nqn"
string
```

so future assignments are possible.

---

## 📉 Narrowing gives precision

```ts id="4pbjlwm"
if (typeof value === "string")
```

TypeScript narrows to:

```ts id="kvvz6h"
string
```

so string methods become safe.

---

# ⚡ Most Important Understanding

```text id="s0qg9u"
Type Widening happens mostly during inference.

Type Narrowing happens mostly during control flow analysis.
```

---

# 🏗️ Final Mental Model

```text id="rq1kzh"
TypeScript first widens types
to allow flexibility.

Then later narrows types
to improve safety and precision.
```

---

# ✨ In One Sentence

> Type widening expands a specific type into a broader type, while type narrowing reduces a broader type into a more specific type based on how the code executes.
