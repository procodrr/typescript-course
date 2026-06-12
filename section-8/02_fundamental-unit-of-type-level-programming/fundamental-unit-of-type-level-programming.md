## 🧠 Fundamental Unit of Type-Level Programming

> The fundamental unit is **a type**.

Everything in type-level programming is built using types. There is no separate concept like “function”, “loop”, or “value” like in runtime languages. All of those ideas are expressed **through types**.

---

## 🧩 Everything Is a Type

At the type level:

* Values → **types**
* Functions → **generic types**
* Logic → **conditional types**
* Iteration → **recursive types**
* Data → **type structures**

There is only one building block: **types**.

---

## ⚙️ How Computation Happens

Type-level programming works by **transforming one type into another type**.

You have:

* type → new type (compile time)

That transformation is the core of computation.

---

## 🔁 How Control Flow Exists

There are no real “statements” like `if`, `for`, `while`.

Instead:

* Decision making → done using **conditional types**
* Repetition → done using **recursion**
* Mapping over collections → done using **type transformations**

All of these are still just **types evaluating into other types**.

---

## 🧠 Key Mental Model

There is no separation of concepts.

Everything is unified:

> A type can represent data, logic, behavior, and computation at the same time.

---

## 🎯 Final Definition

> The fundamental unit of type-level programming is the **type itself**, and computation is achieved by defining types that transform other types into new types through recursion and conditional evaluation.