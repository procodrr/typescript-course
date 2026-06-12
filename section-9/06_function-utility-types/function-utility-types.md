# ⚙️ Function Utility Types in TypeScript

Function utility types help us extract useful type information from function types.

Main function utility types are:

```txt
Parameters
ReturnType
```

---

# 1. 📥 `Parameters<T>`

`Parameters<T>` extracts the parameter types of a function as a tuple.

```ts
function createUser(name: string, age: number) {
  return {
    name,
    age,
  };
}

type CreateUserParams = Parameters<typeof createUser>;
```

Now `CreateUserParams` becomes:

```ts
type CreateUserParams = [name: string, age: number];
```

## ✅ Use Case

Useful when we want to reuse the same function parameter types somewhere else.

```ts
const userData: CreateUserParams = ["Anurag", 25];
```

So instead of manually writing:

```ts
[string, number]
```

we can extract it directly from the function.

---

# 2. 📤 `ReturnType<T>`

`ReturnType<T>` extracts the return type of a function.

```ts
function createUser(name: string, age: number) {
  return {
    name,
    age,
  };
}

type User = ReturnType<typeof createUser>;
```

Now `User` becomes:

```ts
type User = {
  name: string;
  age: number;
};
```

## ✅ Use Case

Useful when we want to reuse the return type of a function without writing it manually.

```ts
const user: User = {
  name: "Anurag",
  age: 25,
};
```

---

# 🧠 Why Do We Use `typeof` Here?

When we write:

```ts
type User = ReturnType<typeof createUser>;
```

`createUser` is a value.

But `ReturnType` needs a type.

So we use `typeof` to get the type of the function.

```ts
typeof createUser
```

means:

```ts
(name: string, age: number) => {
  name: string;
  age: number;
}
```

Then `ReturnType` extracts the return type from it.

---

# 🧱 How They Work Internally

These utility types are mainly built using:

```txt
🧩 Generics
🧩 Conditional Types
🧩 infer Keyword
```

Conceptually, `ReturnType` works like this:

```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

Here:

```ts
infer R
```

means:

> Capture the return type and store it in `R`.

---

# 🧠 Quick Summary

| Utility Type    | What It Does                                 |
| --------------- | -------------------------------------------- |
| `Parameters<T>` | Extracts function parameter types as a tuple |
| `ReturnType<T>` | Extracts function return type                |

---

# 🎯 Main Idea

Function utility types help us reuse function-related types.

```txt
Function Type → Utility Type → Extracted Type
```

They help us avoid manually repeating parameter and return types.
