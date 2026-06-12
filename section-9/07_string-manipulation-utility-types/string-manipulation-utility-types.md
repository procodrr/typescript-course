# 🔤 String Manipulation Utility Types

String manipulation utility types help us transform **string literal types**.

Main string manipulation utility types are:

```txt
Uppercase
Lowercase
Capitalize
Uncapitalize
```

---

# 1. 🔠 `Uppercase<T>`

`Uppercase<T>` converts a string literal type into uppercase.

```ts
type A = Uppercase<"hello">;
```

Now `A` becomes:

```ts
type A = "HELLO";
```

---

# 2. 🔡 `Lowercase<T>`

`Lowercase<T>` converts a string literal type into lowercase.

```ts
type B = Lowercase<"HELLO">;
```

Now `B` becomes:

```ts
type B = "hello";
```

---

# 3. 🅰️ `Capitalize<T>`

`Capitalize<T>` converts the first character of a string literal type into uppercase.

```ts
type C = Capitalize<"hello">;
```

Now `C` becomes:

```ts
type C = "Hello";
```

---

# 4. 🔽 `Uncapitalize<T>`

`Uncapitalize<T>` converts the first character of a string literal type into lowercase.

```ts
type D = Uncapitalize<"Hello">;
```

Now `D` becomes:

```ts
type D = "hello";
```

---

# 🧩 Useful with Template Literal Types

String manipulation utilities become very powerful with template literal types.

```ts
type EventName = "click" | "hover";

type HandlerName = `on${Capitalize<EventName>}`;
```

Now `HandlerName` becomes:

```ts
type HandlerName = "onClick" | "onHover";
```

---

# 🧱 How They Work Internally

These utility types are built into TypeScript compiler itself. So unlike many other utility types, can not see their full implementation.

Conceptually:

```ts
type A = Uppercase<"hello">;
```

means:

```txt
"hello" → Uppercase → "HELLO"
```

---

# 🧠 Quick Summary

| Utility Type      | What It Does                              |
| ----------------- | ----------------------------------------- |
| `Uppercase<T>`    | Converts string literal type to uppercase |
| `Lowercase<T>`    | Converts string literal type to lowercase |
| `Capitalize<T>`   | Uppercases the first character            |
| `Uncapitalize<T>` | Lowercases the first character            |

---

# 🎯 Main Idea

String manipulation utility types help us transform string literal types.

```txt
String Literal Type → Utility Type → New String Literal Type
```

They are useful when we want to generate new string-based types from existing string types.
