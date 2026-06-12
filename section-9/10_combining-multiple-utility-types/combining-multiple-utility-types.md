# 🧩 Combining Multiple Utility Types

In TypeScript, we can combine multiple utility types together to create more powerful and reusable types.

Instead of using only one utility type:

```txt id="6j4xjv"
Utility Type → New Type
```

we can chain multiple utility types:

```txt id="7k4m5e"
Utility Type → New Type → Another Utility Type → Final Type
```

This is very common in real-world TypeScript applications.

---

# 🎯 Why Do We Combine Utility Types?

Because sometimes a single utility type is not enough.

For example:

* We may want only selected properties
* AND make them readonly
* OR remove some properties
* AND make remaining properties optional
* OR extract a function return type and make it readonly

Combining utility types helps us build exactly the type we need.

---

# 1. 🔒 `Pick` + `Readonly`

Suppose we have:

```ts id="a8i0je"
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};
```

Now we want:

```txt id="k9e1d5"
✔ only id and name
✔ both should be readonly
```

We can combine `Pick` and `Readonly`:

```ts id="u5k4s0"
type ReadonlyPublicUser = Readonly<
  Pick<User, "id" | "name">
>;
```

Final type becomes:

```ts id="f7s2mq"
type ReadonlyPublicUser = {
  readonly id: number;
  readonly name: string;
};
```

---

# 2. ✂️ `Omit` + `Partial`

Suppose we want:

```txt id="k6s9x3"
✔ remove id
✔ make remaining properties optional
```

We can combine `Omit` and `Partial`:

```ts id="t2j4v1"
type PartialUserUpdate = Partial<
  Omit<User, "id">
>;
```

Final type becomes:

```ts id="n0r6mx"
type PartialUserUpdate = {
  name?: string;
  email?: string;
  password?: string;
};
```

---

# 3. 🧾 `Record` + `Readonly`

Suppose we want a readonly permissions object.

```ts id="j3f5tm"
type Role = "admin" | "user" | "guest";
```

We can combine `Record` and `Readonly`:

```ts id="q2l9px"
type Permissions = Readonly<
  Record<Role, boolean>
>;
```

Final type becomes:

```ts id="z1m4fh"
type Permissions = {
  readonly admin: boolean;
  readonly user: boolean;
  readonly guest: boolean;
};
```

---

# 4. 🔀 `Exclude` + `Record`

Suppose we have:

```ts id="n4r8cs"
type Role = "admin" | "user" | "guest";
```

Now we want:

```txt id="c3v1mz"
✔ remove guest
✔ create permissions object only for admin and user
```

We can combine `Exclude` and `Record`:

```ts id="r8x0jw"
type Permissions = Record<
  Exclude<Role, "guest">,
  boolean
>;
```

Final type becomes:

```ts id="m9q5sa"
type Permissions = {
  admin: boolean;
  user: boolean;
};
```

---

# 5. 🧠 `Extract` + `Record`

Suppose we want:

```txt id="k7t5qp"
✔ keep only admin and user
✔ create a settings object
```

```ts id="d1u8kv"
type Role = "admin" | "user" | "guest";
```

We can combine `Extract` and `Record`:

```ts id="x3f0jn"
type Settings = Record<
  Extract<Role, "admin" | "user">,
  string
>;
```

Final type becomes:

```ts id="w8p2sy"
type Settings = {
  admin: string;
  user: string;
};
```

---

# 6. ⚙️ `ReturnType` + `Readonly`

Suppose we have a function:

```ts id="v6m2rt"
function createUser() {
  return {
    id: 1,
    name: "Anurag",
  };
}
```

Now we want:

```txt id="j1p4ny"
✔ get the return type
✔ make returned object readonly
```

We can combine `ReturnType` and `Readonly`:

```ts id="h9k0cx"
type ReadonlyUser = Readonly<
  ReturnType<typeof createUser>
>;
```

Final type becomes:

```ts id="g4x8zm"
type ReadonlyUser = {
  readonly id: number;
  readonly name: string;
};
```

---

# 7. ⚙️ `Parameters` + `Partial`

Suppose we have:

```ts id="n7c1fj"
function createUser(user: {
  name: string;
  age: number;
}) {}
```

Now we want:

```txt id="b5q9ld"
✔ get function parameter type
✔ make all properties optional
```

We can combine `Parameters` and `Partial`:

```ts id="s0r4tx"
type PartialUser = Partial<
  Parameters<typeof createUser>[0]
>;
```

Final type becomes:

```ts id="u6k8ew"
type PartialUser = {
  name?: string;
  age?: number;
};
```

---

# 🧠 Main Idea

Utility types are composable.

That means:

```txt id="f3x9zc"
We can use the output of one utility type
as the input of another utility type.
```

Example:

```txt id="e2p6mh"
User
 ↓
Pick<User, ...>
 ↓
Readonly<...>
 ↓
Final Type
```

---

# 🚀 Real-World Importance

In real-world projects, developers frequently combine utility types to create:

* API request types
* Update payload types
* Form types
* Readonly configuration objects
* Database-safe object types
* Public-facing object types

This helps avoid rewriting object types manually again and again.
