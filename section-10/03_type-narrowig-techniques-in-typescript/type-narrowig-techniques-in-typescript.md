# 🛡️ Type Narrowing Techniques in TypeScript

TypeScript supports multiple narrowing techniques. These can broadly be divided into the following categories:

---

## 1️⃣ Built-in Type Guards

These are JavaScript runtime checks recognized by TypeScript.

➡️ **`typeof` Type Guard**
Used mainly for primitive values.

➡️ **`instanceof` Type Guard**
Used with classes and constructor functions.

➡️ **`in` Operator Type Guard**
Used to check whether a property exists in an object.

---

## 2️⃣ Equality Narrowing

TypeScript narrows types using equality comparisons like:

* `===`
* `!==`
* `==`
* `!=`

> This technique is called **Equality Narrowing**.

---

## 3️⃣ Truthiness Narrowing

TypeScript narrows types based on:

* truthy values
* falsy values

> This technique is called **Truthiness Narrowing**.

---

## 4️⃣ Assignment-Based Narrowing

Assignments can temporarily narrow the current known type of a variable during control flow analysis.

> This technique is called **Assignment Narrowing**.

---

## 5️⃣ Discriminated Union Narrowing

Used with unions having a shared literal property.

> One of the most powerful narrowing patterns in TypeScript.

---

## 6️⃣ User-Defined Type Guards

Custom functions created by developers to help TypeScript narrow types.

These usually use:

```ts id="w5rmm2"
value is SomeType
```

> This syntax is called a **Type Predicate**.

---

## 7️⃣ Assertion-Based Narrowing

Functions using:

```ts id="4w8m4o"
asserts
```

can narrow types after function calls.

> These are called **Assertion Functions**.

---

## 8️⃣ Exhaustiveness Checking

TypeScript can narrow types by eliminating all impossible union members and ensuring every possible case has been handled.

This is commonly done using:

```ts id="e4f7yn"
never
```

> This technique is commonly called **Exhaustiveness Checking** or **Exhaustiveness Narrowing**.

---

## ✨ In One Sentence

> Type narrowing techniques are different mechanisms TypeScript uses during control flow analysis to reduce broader types into more specific and safer types.
