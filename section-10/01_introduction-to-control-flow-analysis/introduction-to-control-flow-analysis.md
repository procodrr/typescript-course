# 🧠 What is Control Flow Analysis in TypeScript?

Before understanding **Control Flow Analysis**, we first need to understand something more fundamental:

# 🚦 What is Control Flow?

Control flow simply means:

> 👉 The path your program follows while executing code.

JavaScript does not execute every line at once.

Instead, it decides:

* which block should run
* which block should be skipped
* where execution should go next
* whether the function should continue or stop

That movement of execution through the program is called:

# ✨ Control Flow

---

# 📌 Simple Example of Control Flow

```ts
function greet(isLoggedIn: boolean) {
  if (isLoggedIn) {
    return "Welcome Back!";
  }

  return "Please Login";
}
```

Here JavaScript has **two possible execution paths**:

## ✅ Path 1

If `isLoggedIn` is `true`

```ts
return "Welcome Back!";
```

Function ends immediately.

---

## ❌ Path 2

If `isLoggedIn` is `false`

```ts
return "Please Login";
```

runs instead.

---

So the execution flow looks like this:

```text
Start
   ↓
Check condition
   ↓
true  → Welcome Back
false → Please Login
```

This is called:

# 🚦 Control Flow

---

# 🔍 What is Control Flow Analysis?

Now comes the TypeScript part.

TypeScript does not run your code.

But it studies your code and tries to understand:

> 🤔 “If execution reaches this line, what must be true?”

This process is called:

# 🧠 Control Flow Analysis

---

# 📌 Example

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}
```

At the beginning:

```ts
value: string | number
```

TypeScript sees this condition:

```ts
typeof value === "string"
```

Now TypeScript analyzes the control flow and thinks:

```text
If this branch runs,
value must be string.
```

So inside this block:

```ts
value.toUpperCase();
```

TypeScript treats `value` as:

```ts
string
```

---

Then TypeScript sees:

```ts
return value.toUpperCase();
```

Since the function returns here, TypeScript understands:

```text
If execution continues after this point,
the string case is already finished.
```

So in the remaining code:

```ts
return value.toFixed(2);
```

TypeScript knows:

```ts
value: number
```

---

# 🎯 The Most Important Idea

Control Flow Analysis means:

> 🧠 TypeScript studies all possible execution paths of your code and keeps track of what is true in each path.

---

# ⚡ Extremely Important Line

```text
JavaScript uses control flow to run code.

TypeScript uses control flow analysis to understand types.
```

---

# 🏗️ Real Foundation of Type Narrowing

Type narrowing is possible because TypeScript continuously analyzes:

* conditions
* returns
* branches
* unreachable code
* possible execution paths

Without control flow analysis:

❌ TypeScript would not know:

* which types are possible
* which types are impossible
* which branch guarantees what

---

# 📌 Another Simple Example

```ts
function example(value: string | undefined) {
  if (!value) {
    return;
  }

  console.log(value.length);
}
```

TypeScript analyzes this like:

```text
If execution reaches console.log,
value cannot be undefined anymore.
```

So here:

```ts
value.length
```

is completely safe.

---

# 🧠 Final Mental Model

```text
Control Flow
    ↓
Possible Execution Paths
    ↓
TypeScript Analyzes Those Paths
    ↓
Tracks What Must Be True
    ↓
Narrows Types Automatically
```

---

# ✨ In One Sentence

> Control Flow Analysis is the process where TypeScript statically analyzes the possible execution paths of your program to determine what types are possible at each point in the code.
