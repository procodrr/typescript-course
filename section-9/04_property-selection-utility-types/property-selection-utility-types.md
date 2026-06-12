# 🎯 Property Selection Utility Types

Property selection utility types help us create new object types by selecting or removing properties.

Main property selection utility types are:

```txt
Pick
Omit
```

---

# 1. 🎯 `Pick<T, K>`

`Pick<T, K>` creates a new object type by picking selected properties.

```ts
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type PublicUser = Pick<User, "id" | "name">;
```

Now `PublicUser` becomes:

```ts
type PublicUser = {
  id: number;
  name: string;
};
```

## ✅ Use Case

Useful when we need only a few properties from a bigger type.

```ts
const user: PublicUser = {
  id: 1,
  name: "Anurag",
};
```

---

# 2. ✂️ `Omit<T, K>`

`Omit<T, K>` creates a new object type by removing selected properties.

```ts
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type SafeUser = Omit<User, "password">;
```

Now `SafeUser` becomes:

```ts
type SafeUser = {
  id: number;
  name: string;
  email: string;
};
```

## ✅ Use Case

Useful when we want almost the full object, but without some sensitive or unnecessary fields.

```ts
const user: SafeUser = {
  id: 1,
  name: "Anurag",
  email: "anurag@example.com",
};
```

---

# 🧠 Quick Summary

| Utility Type | What It Does                |
| ------------ | --------------------------- |
| `Pick<T, K>` | Selects specific properties |
| `Omit<T, K>` | Removes specific properties |

---

# 🎯 Main Idea

These utility types help us create smaller or safer object types from bigger object types.

```txt
Large Object Type → Selected/Removed Properties → New Object Type
```