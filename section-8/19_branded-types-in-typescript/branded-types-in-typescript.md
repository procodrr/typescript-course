# 🏷️ Branded Types in TypeScript

## 🧠 Why Do We Need Branded Types?

TypeScript uses **structural typing**.

That means TypeScript checks the **shape** of a type, not its name.

```ts
type UserId = string;
type CourseId = string;

const userId: UserId = "user_123";
const courseId: CourseId = "course_456";

const id: UserId = courseId; // ✅ Allowed
```

Why?

Because both are just:

```ts
string
```

So TypeScript thinks they are compatible.

---

# 🧱 Structural Typing

In **structural typing**, if two types have the same structure, they are considered compatible.

```ts
type A = {
  name: string;
};

type B = {
  name: string;
};

const b: B = { name: "Anurag" };

const a: A = b; // ✅ Allowed
```

Even though the names are different, the structure is same.

---

# 🪪 Nominal Typing

In **nominal typing**, the name of the type matters.

So theoretically:

```ts
type UserId = string;
type CourseId = string;
```

would be treated as different types.

```ts
const id: UserId = courseId; // ❌ Not allowed in nominal typing
```

But TypeScript does **not** work like this by default.

---

# 🏷️ What Is a Branded Type?

A **branded type** adds a hidden compile-time marker to a normal type.

```ts
type UserId = string & { __brand: "UserId" };
type CourseId = string & { __brand: "CourseId" };
```

Now TypeScript sees them differently.

```ts
const userId = "user_123" as UserId;
const courseId = "course_456" as CourseId;

const id: UserId = courseId; // ❌ Error
```

Because now their structures are different:

```ts
string & { __brand: "UserId" }
string & { __brand: "CourseId" }
```

---

# ✅ Example

```ts
type UserId = string & { __brand: "UserId" };
type CourseId = string & { __brand: "CourseId" };

function enrollUser(userId: UserId, courseId: CourseId) {
  console.log(userId, courseId);
}

const userId = "user_123" as UserId;
const courseId = "course_456" as CourseId;

enrollUser(userId, courseId); // ✅ Correct
enrollUser(courseId, userId); // ❌ Error
```

Without branded types, this mistake would not be caught.

---

# 🧰 Reusable Brand Utility

Instead of writing the brand manually every time:

```ts
type Brand<T, BrandName> = T & {
  __brand: BrandName;
};
```

Now we can create branded types like this:

```ts
type UserId = Brand<string, "UserId">;
type CourseId = Brand<string, "CourseId">;
type Email = Brand<string, "Email">;
type INR = Brand<number, "INR">;
```

---

# 🔐 Better Version with `unique symbol`

A safer way:

```ts
declare const brand: unique symbol;

type Brand<T, BrandName> = T & {
  readonly [brand]: BrandName;
};
```

Usage:

```ts
type UserId = Brand<string, "UserId">;
type CourseId = Brand<string, "CourseId">;
```

This avoids using a normal property name like `__brand`.

---

# 🧪 Creating Branded Values Safely

Usually, we create branded values through functions.

```ts
declare const brand: unique symbol;

type Brand<T, BrandName> = T & {
  readonly [brand]: BrandName;
};

type UserId = Brand<string, "UserId">;

function createUserId(value: string): UserId {
  if (!value.startsWith("user_")) {
    throw new Error("Invalid UserId");
  }

  return value as UserId;
}

const userId = createUserId("user_123");
```

This is better than directly writing:

```ts
const userId = "user_123" as UserId;
```

Because the function can validate the value first.

---

# 🧩 Example: Email Brand

```ts
type Email = Brand<string, "Email">;

function createEmail(value: string): Email {
  if (!value.includes("@")) {
    throw new Error("Invalid email");
  }

  return value as Email;
}

function sendEmail(email: Email) {
  console.log(email);
}

const email = createEmail("anurag@example.com");

sendEmail(email); // ✅
sendEmail("normal-string"); // ❌ Error
```

---

# 🧠 Important Point

Branded types are **not real nominal types**.

They are a way to create a **nominal-like effect** inside TypeScript’s structural type system.

TypeScript still checks structure.

We just add an extra hidden structure:

```ts
{ __brand: "UserId" }
```

or:

```ts
readonly [brand]: "UserId"
```

So TypeScript treats the values differently.

---

# 🎯 In Simple Words

```ts
type UserId = Brand<string, "UserId">;
```

means:

> This is still a string, but TypeScript should treat it specially as a `UserId`.

Branded types are useful when multiple values have the same primitive type but different meanings.

Examples:

```ts
type UserId = Brand<string, "UserId">;
type CourseId = Brand<string, "CourseId">;
type Email = Brand<string, "Email">;
type Password = Brand<string, "Password">;
type INR = Brand<number, "INR">;
type USD = Brand<number, "USD">;
```