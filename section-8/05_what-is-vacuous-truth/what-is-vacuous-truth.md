## 🧠 What Is Vacuous Truth?

**Vacuous truth** is a concept from **modern logic**, especially the kind of logic used in **Boolean logic, Boolean algebra, mathematics, and programming**.

In this logic, a statement like:

> All A are B.

means:

> There is no A that is not B.

So if there are no A’s at all, then there is also no A that breaks the rule. That is why the statement is considered true.

---

## 🥭 Example 1: Mango Basket

Statement:

> All mangoes in this basket are sweet.

But the basket is actually empty.

There are no mangoes inside it.

So there is:

* no sweet mango
* no sour mango
* no mango that can disprove the statement

Because there is no sour mango in the basket, the statement is treated as true.

But it is not true because we found sweet mangoes.
It is true because there is **no counterexample**.

That is vacuous truth.

---

## 👩‍🎓 Example 2: Students in a Class

Statement:

> All students in this class today are wearing uniform.

But today, no student is present in the class.

There is:

* no student wearing uniform
* no student not wearing uniform
* no student who can disprove the statement

Because there is no student present without uniform, the statement is treated as true.

Again, it is not true because students are wearing uniform.
It is true because no student violated the rule.

---

## 💻 Why This Matters in Programming

Programming languages generally follow this modern Boolean-style logic.

That is why, in many languages, checking whether **all items** in an empty list satisfy a condition returns `true`.

For example, in JavaScript:

```js
const numbers = [];

const result = numbers.every((num) => num > 10);

console.log(result); // true
```

There is no number in the array that is less than or equal to `10`, so the condition is treated as true.

Another example:

```js
const mangoes = [];

const allSweet = mangoes.every((mango) => mango.isSweet);

console.log(allSweet); // true
```

This is like saying:

> All mangoes in this basket are sweet.

But the mango array is empty, so there is no mango that is not sweet.

Because no item failed the condition, JavaScript returns `true`.

---

## 🏛️ Difference From Aristotelian Logic

In traditional Aristotelian logic, a statement like:

> All A are B.

was often understood as also implying:

> A exists.

So if there are no A’s, the statement would not be accepted as true in the same way.

---

## 🎯 Simple Summary

Vacuous truth means:

> A universal statement about an empty group is true because nothing in that group violates the statement.

Modern Boolean logic, mathematics, and programming accept this idea.