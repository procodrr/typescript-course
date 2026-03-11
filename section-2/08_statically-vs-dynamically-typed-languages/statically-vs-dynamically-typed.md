## 🧠 Statically vs Dynamically Typed Languages

In programming languages, **types** describe what kind of data a value represents.

Examples of types:

* 🔢 Number
* 📝 String
* ✔️ Boolean
* 📦 Object
* 📚 Array

The main difference between languages is **when the program verifies that types are used correctly**.

---

# 🟦 Statically Typed Languages

A **statically typed language** verifies types **before the program runs** (during compilation).

If something violates the type rules, the program **will not run** until it is fixed.

### Example (TypeScript)

```ts
let age: number = 25;

age = "hello"; // ❌ Error
```

The compiler detects:

```
number ← string
```

This is invalid, so it stops execution.

---

### Examples of Statically Typed Languages

* 🟦 TypeScript
* ☕ Java
* ⚙️ C
* ⚙️ C++
* 🦀 Rust
* 🐹 Go
* 🍏 Swift

---

# 🟨 Dynamically Typed Languages

A **dynamically typed language** verifies types **while the program is running**.

Variables can hold different types over time.

### Example (JavaScript)

```javascript
let age = 25;

age = "hello"; // ✅ allowed
```

JavaScript allows the type to change.

---

### Runtime Type Error Example

```javascript
let x = null;

x.toUpperCase(); // ❌ Runtime error
```

Error happens **during execution**, not before.

---

### Examples of Dynamically Typed Languages

* 🟨 JavaScript
* 🐍 Python
* 💎 Ruby
* 🐘 PHP
* 🌙 Lua

---

# 🔑 Core Difference

| Feature                   | 🟦 Static Typing | 🟨 Dynamic Typing |
| ------------------------- | ---------------- | ----------------- |
| When verification happens | Before execution | During execution  |
| Errors detected           | Early            | Late              |
| Variable type             | Fixed            | Can change        |
| Safety                    | Higher           | Lower             |

---

# 🏗️ Why Static Typing Helps in Large Projects

Large projects often contain:

* 📁 Thousands of files
* 👨‍💻 Many developers
* 🔄 Frequent code changes
* 🧩 Complex logic

Static typing helps manage this complexity.


# 🛑 1. Errors Are Caught Early

Example:

```ts
function getName(user: { name: string }) {
  return user.name;
}

getName({ age: 20 }); // ❌ Error
```

Bug is caught **before the program runs**.

---

# 📖 2. Code Becomes Self-Documenting

Types explain what a function expects.

```ts
function calculateSalary(base: number, bonus: number): number
```

Anyone reading the code understands:

* input types
* return type

---

# 🔧 3. Safer Refactoring

Suppose a property is renamed:

```
user.email → user.primaryEmail
```

TypeScript immediately shows **every broken location**.

This is extremely useful in large codebases.

---

# 💻 4. Better IDE Support

Static typing enables powerful tooling:

* ✨ Autocomplete
* 🔎 Jump to definition
* 🧠 Smart suggestions
* 🚨 Instant error detection

---

# 👥 5. Better Team Collaboration

Types act as a **contract** between developers.

Example:

```ts
function createUser(name: string, age: number)
```

Every developer knows exactly what the function expects.

---

✅ **In simple words**

* 🟦 **Static typing** catches mistakes **before the program runs**.
* 🟨 **Dynamic typing** detects issues **while the program runs**.

That is why **large applications often prefer statically typed languages like TypeScript**.
