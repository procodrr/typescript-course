# ✅ The `satisfies` Operator in TypeScript

The `satisfies` operator is used to check whether a value matches a particular type, without changing the inferred type of that value.

It was introduced to solve an important problem:

> 👉 “I want TypeScript to verify this value against a type, but I don’t want TypeScript to lose the exact inferred information.”

---

# 🧠 Basic Idea

The `satisfies` operator sits between:

```ts
const value = expression satisfies SomeType;
```

It means:

> Check whether `expression` satisfies `SomeType`, but keep the original inferred type of `expression`.

---

# 📌 Simple Example

```ts
type User = {
  name: string;
  age: number;
};

const user = {
  name: "Anurag",
  age: 25,
} satisfies User;

console.log(user.name); // user.name is string
console.log(user.age); // user.age is number
```

Here TypeScript checks that `user` has the structure of `User`.

But `satisfies` does not force the variable to become exactly `User`.

---

# 🔁 Normal Annotation vs `satisfies`

## ❌ With Type Annotation

```ts
type User = {
  name: string;
  age: number;
};

const user: User = {
  name: "Anurag",
  age: 25,
};
```

Here the variable is treated as:

```ts
User
```

The exact object inference is reduced to the annotated type.

---

## ✅ With `satisfies`

```ts
const user = {
  name: "Anurag",
  age: 25,
} satisfies User;
```

Here TypeScript checks the object against `User`, but preserves the inferred type of the object.

---

# 📌 Why `satisfies` Is Useful

Suppose we want a config object.

```ts
type Config = {
  mode: "development" | "production";
  port: number;
};
```

Using annotation:

```ts
const devConfig: Config = {
  mode: "development",
  port: 3000,
};
```

Here:

```ts
devConfig.mode
```

is treated as:

```ts
"development" | "production"
```

But using `satisfies`:

```ts
const devConfig = {
  mode: "development",
  port: 3000,
} satisfies Config;

console.log(devConfig.mode); // devConfig.mode is "development"
```

TypeScript checks the object against `Config`, but keeps the specific value:

```ts
"development"
```

---

# 📌 Catching Mistakes

`satisfies` still performs type checking.

```ts
type Config = {
  mode: "development" | "production";
  port: number;
};

const devConfig = {
  mode: "dev",
  port: 3000,
} satisfies Config;
```

TypeScript gives an error because:

```ts
"dev"
```

is not assignable to:

```ts
"development" | "production"
```

So `satisfies` gives safety without losing precision.

---

# 📌 Extra Property Checking

```ts
type User = {
  name: string;
  age: number;
};

const user = {
  name: "Anurag",
  age: 25,
  email: "anurag@example.com",
} satisfies User;
```

In this direct object literal case, TypeScript can complain about extra properties depending on the target shape.

So `satisfies` is useful for catching mistakes in object literals.

---

# 📌 Very Useful with Records

```ts
type Route = {
  path: string;
  requiresAuth: boolean;
};

const routes = {
  home: {
    path: "/",
    requiresAuth: false,
  },
  dashboard: {
    path: "/dashboard",
    requiresAuth: true,
  },
} satisfies Record<string, Route>;
```

Now TypeScript checks that every route matches `Route`.

But it still preserves exact keys:

```ts
routes.home
routes.dashboard
```

So you get both:

* validation
* precise autocomplete

---

# 📌 Without `satisfies`, We Lose Key Precision

```ts
const routes: Record<string, Route> = {
  home: {
    path: "/",
    requiresAuth: false,
  },
  dashboard: {
    path: "/dashboard",
    requiresAuth: true,
  },
};
```

Now TypeScript treats keys as:

```ts
string
```

So exact key information is weakened.

With `satisfies`, exact keys are preserved.

---

# 📌 `satisfies` Does Not Change Runtime Code

This is important.

```ts
const user = {
  name: "Anurag",
  age: 25,
} satisfies User;
```

At runtime, `satisfies` disappears.

It is only for TypeScript type checking.

JavaScript does not know about it.

---

# ⚠️ `satisfies` Is Not Type Narrowing

`satisfies` does not narrow a variable during control flow.

Example:

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value); // value is string
  }
}
```

This is narrowing.

But:

```ts
const user = {
  name: "Anurag",
  age: 25,
} satisfies User;
```

This is not narrowing.

It is:

```text
compile-time validation + inference preservation
```

---

# ⚠️ `satisfies` Does Not Convert Values

```ts
type User = {
  age: number;
};

const user = {
  age: "25",
} satisfies User;
```

TypeScript gives an error.

It does not convert:

```ts
"25" → 25
```

It only checks compatibility.

---

# ⚠️ `satisfies` Does Not Create a Runtime Validator

This is also important.

```ts
const user = {
  name: "Anurag",
  age: 25,
} satisfies User;
```

This does not validate external data at runtime.

If data comes from:

* API
* localStorage
* user input
* database

you still need runtime validation.

---

# 📌 `as` vs `satisfies`

## ❌ `as`

```ts
const user = {
  name: "Anurag",
  age: "25",
} as unknown as User;
```

This can silence TypeScript even if the value is wrong.

---

## ✅ `satisfies`

```ts
const user = {
  name: "Anurag",
  age: "25",
} satisfies User;
```

This gives an error because `age` should be `number`.

---

# 🧠 Mental Difference

```text
as
    ↓
"Trust me, treat this as that type"

satisfies
    ↓
"Please check if this really matches that type"
```

---

# 📌 `satisfies` with `as const`

This is one of the best combinations.

```ts
type ButtonConfig = {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
};

const button = {
  variant: "primary",
  size: "md",
} as const satisfies ButtonConfig;
```

Here:

* `satisfies ButtonConfig` checks correctness
* `as const` preserves exact literal values

So:

```ts
button.variant
```

is:

```ts
"primary"
```

not:

```ts
"primary" | "secondary"
```

---

# 📌 When to Use `satisfies`

Use `satisfies` when you want:

* object shape validation
* config object validation
* preserving literal values
* preserving exact object keys
* safer alternatives to `as`
* better autocomplete
* better error checking

---

# ⚡ Final Summary

The `satisfies` operator checks whether a value matches a given type while preserving the value’s own inferred type.
