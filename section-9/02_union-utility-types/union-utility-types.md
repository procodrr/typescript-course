# 🔀 Union Utility Types in TypeScript

Union utility types help us transform union types.

Main union utility types are:

```txt
Exclude
Extract
NonNullable
```

---

# 1. 🚫 `Exclude<T, U>`

`Exclude<T, U>` removes types from a union.

```ts
type Status = "pending" | "success" | "failed" | "cancelled";

type ActiveStatus = Exclude<Status, "cancelled">;
```

Now `ActiveStatus` becomes:

```ts
type ActiveStatus = "pending" | "success" | "failed";
```

## ✅ Use Case

Useful when we want to remove some unwanted options from a union.

```ts
let status: ActiveStatus;

status = "success"; // ✅
status = "cancelled"; // ❌ Error
```

---

# 2. 🎯 `Extract<T, U>`

`Extract<T, U>` keeps only matching types from a union.

```ts
type Status = "pending" | "success" | "failed" | "cancelled";

type FinalStatus = Extract<Status, "success" | "failed">;
```

Now `FinalStatus` becomes:

```ts
type FinalStatus = "success" | "failed";
```

## ✅ Use Case

Useful when we want to select only specific members from a union.

```ts
type UserEvent =
  | "user:create"
  | "user:update"
  | "user:delete"
  | "order:create"
  | "order:update"
  | "payment:success"
  | "payment:failed";

type UserOnlyEvents = Extract<UserEvent, `user:${string}`>;
```

```ts
type Response =
  | { type: "success"; data: string }
  | { type: "error"; message: string }
  | { type: "loading" };

type SuccessResponse = Extract<Response, { type: "success" }>;
```

---

# 3. 🧹 `NonNullable<T>`

`NonNullable<T>` removes `null` and `undefined` from a type.

```ts
type UserName = string | null | undefined;

type ValidUserName = NonNullable<UserName>;
```

Now `ValidUserName` becomes:

```ts
type ValidUserName = string;
```

## ✅ Use Case

Useful when we want a type without nullable values.

```ts
let name: ValidUserName;

name = "Anurag"; // ✅
name = null; // ❌ Error
name = undefined; // ❌ Error
```

---

# 🧠 How They Work Internally

Union utility types are mostly built using **conditional types**.

For example, `Exclude` works like this conceptually:

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

Because conditional types distribute over unions:

```ts
type Result = Exclude<"a" | "b" | "c", "a">;
```

works like:

```txt
"a" extends "a" ? never : "a"  → never
"b" extends "a" ? never : "b"  → "b"
"c" extends "a" ? never : "c"  → "c"
```

Final result:

```ts
type Result = "b" | "c";
```

`never` disappears from unions, so we get only the remaining types.

---

# 🧠 Quick Summary

| Utility Type     | What It Does                        |
| ---------------- | ----------------------------------- |
| `Exclude<T, U>`  | Removes matching types from a union |
| `Extract<T, U>`  | Keeps matching types from a union   |
| `NonNullable<T>` | Removes `null` and `undefined`      |

---

# 🎯 Main Idea

Union utility types help us filter union types.

```txt
Union Type → Utility Type → New Union Type
```

They are especially useful when we want to remove, select, or clean union members.
