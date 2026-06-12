# 🏗️ Property Modifier Utility Types

Property modifier utility types help us modify the behavior of object properties.

Main property modifier utility types are:

```txt
Partial
Required
Readonly
```

---

# 1. 🟡 `Partial<T>`

`Partial<T>` makes all properties optional.

```ts
type User = {
  name: string;
  age: number;
};

type PartialUser = Partial<User>;
```

Now `PartialUser` becomes:

```ts
type PartialUser = {
  name?: string;
  age?: number;
};
```

## ✅ Use Case

Useful when we want to update only some properties.

```ts
function updateUser(user: Partial<User>) {
  // user may contain name, age, or both
}

updateUser({ name: "Anurag" }); // ✅
```

---

# 2. 🔴 `Required<T>`

`Required<T>` makes all optional properties required.

```ts
type User = {
  name?: string;
  age?: number;
};

type RequiredUser = Required<User>;
```

Now `RequiredUser` becomes:

```ts
type RequiredUser = {
  name: string;
  age: number;
};
```

## ✅ Use Case

Useful when we want to make sure every property is present.

```ts
const user: RequiredUser = {
  name: "Anurag",
  age: 25,
};
```

---

# 3. 🔒 `Readonly<T>`

`Readonly<T>` makes all properties read-only.

```ts
type User = {
  name: string;
  age: number;
};

type ReadonlyUser = Readonly<User>;
```

Now `ReadonlyUser` becomes:

```ts
type ReadonlyUser = {
  readonly name: string;
  readonly age: number;
};
```

## ✅ Use Case

Useful when we do not want an object to be modified.

```ts
const user: ReadonlyUser = {
  name: "Anurag",
  age: 25,
};

user.name = "Akash"; // ❌ Error
```

---

# 🧠 Quick Summary

| Utility Type  | What It Does                   |
| ------------- | ------------------------------ |
| `Partial<T>`  | Makes all properties optional  |
| `Required<T>` | Makes all properties required  |
| `Readonly<T>` | Makes all properties read-only |

---

# 🎯 Main Idea

These utility types modify the behavior of existing object properties.

```txt
Existing Properties → Modified Properties
```
