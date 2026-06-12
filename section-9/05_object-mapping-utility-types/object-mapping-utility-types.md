# 🧾 Object Mapping Utility Types

Object mapping utility types help us create object types from keys and value types.

Main object mapping utility type is:

```txt
Record
```

---

# 1. 🧾 `Record<K, T>`

`Record<K, T>` creates an object type with fixed keys and a common value type.

```ts
type Role = "admin" | "user" | "guest";

type Permissions = Record<Role, boolean>;
```

Now `Permissions` becomes:

```ts
type Permissions = {
  admin: boolean;
  user: boolean;
  guest: boolean;
};
```

## ✅ Use Case

Useful when we want to create a type-safe object map.

```ts
const permissions: Permissions = {
  admin: true,
  user: true,
  guest: false,
};
```

If we miss a key:

```ts
const permissions: Permissions = {
  admin: true,
  user: true,
}; // ❌ Error: guest is missing
```

---

# 🧠 Quick Summary

| Utility Type   | What It Does                                    |
| -------------- | ----------------------------------------------- |
| `Record<K, T>` | Creates an object type from keys and value type |

---

# 🎯 Main Idea

`Record<K, T>` helps us generate object types dynamically using keys and value types.

```txt
Keys + Value Type → Object Type
```
