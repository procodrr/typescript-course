# 🧰 Introduction to Utility Types in TypeScript

TypeScript gives us many built-in types.

Some are basic types like:

```ts
string;
number;
boolean;
null;
undefined;
symbol;
bigint;
```

These are **primitive types**.

But TypeScript also allows us to create special helper types that transform one type into another type.

These helper types are called **utility types**.

---

# 🧠 What Are Utility Types?

Utility types are reusable generic types that help us create new types from existing types.

Think of them as:

> Type-level helper functions.

There are mainly two ways we use utility types:

```txt
✅ Built-in Utility Types
✅ Custom Utility Types
```

**Built-in utility types** are already provided by TypeScript.

Examples:

```txt
Readonly
Partial
Pick
Omit
ReturnType
Uppercase
Lowercase
```

For example, if we have an object type, we can make all its properties read-only using `Readonly`.

```ts
type User = {
  name: string;
  age: number;
};

type ReadonlyUser = Readonly<User>;
```

Now all properties of `ReadonlyUser` become read-only.

**Custom utility types** are created by us when we need our own type transformation logic.

So in this section, we will first understand TypeScript’s built-in utility types, and then we will also learn how to build our own utility types.

---

# 🛠️ Why Do We Need Utility Types?

Utility types help us avoid writing repetitive type definitions manually.

They make our types:

```txt
✅ cleaner
✅ reusable
✅ easier to maintain
✅ more type-safe
```

Instead of creating similar types again and again, we can transform existing types.

---

# 🔄 Utility Types Transform Types

A normal function works on values.

```txt
value → function → new value
```

A utility type works on types.

```txt
type → utility type → new type
```

Example:

```ts
type ReadonlyUser = Readonly<User>;
```

Here:

```txt
User → Readonly → ReadonlyUser
```

---

# 🧱 How Are Utility Types Built?

Utility types are not magic.

They are built using TypeScript’s type-level features, such as:

```txt
🧩 Generics
🧩 keyof
🧩 Mapped Types
🧩 Conditional Types
🧩 infer
🧩 Indexed Access Types
🧩 Template Literal Types
```

Most utility types are built using TypeScript’s type-level features.

But a few special string utility types, such as `Uppercase`, `Lowercase`, `Capitalize`, and `Uncapitalize`, are implemented directly inside the TypeScript compiler.

> These are called intrinsic utility types.

---

# 📦 Types of Utility Types

There are different categories of utility types based on the kind of type transformation they perform:

### 🔀 Union Utility Types

* `Exclude<Union, ExcludedMembers>`
* `Extract<Type, Union>`
* `NonNullable<T>`

---

### 🏗️ Object Utility Types

* `Partial<T>`
* `Required<T>`
* `Readonly<T>`
* `Pick<T, Keys>`
* `Omit<T, Keys>`
* `Record<Keys, Type>`

---

### ⚙️ Function Utility Types

* `Parameters<T>`
* `ReturnType<T>`

---

### ⏳ Promise Utility Types

* `Awaited<T>`

---

### 🔤 String Manipulation Utility Types

* `Uppercase<StringType>`
* `Lowercase<StringType>`
* `Capitalize<StringType>`
* `Uncapitalize<StringType>`

---

### 🧠 Inference Control Utility Types

* `NoInfer<T>`

---

### 🏛️ Class and `this` Utility Types

* `ConstructorParameters<T>`
* `InstanceType<T>`
* `ThisParameterType<T>`
* `OmitThisParameter<T>`
* `ThisType<T>`

---

### 🧩 Custom Utility Types

Creating our own utility types using:

* Conditional Types
* Mapped Types
* `infer`
* Template Literal Types
* Indexed Access Types
* Recursive Types

Each category helps us solve a different kind of type transformation problem.

---

# 🎯 Main Idea

Utility types help us transform, reuse, and compose types.

Some utility types are already provided by TypeScript, and some utility types we can create ourselves.

In simple words:

> Utility types are reusable tools for type-level transformation.
