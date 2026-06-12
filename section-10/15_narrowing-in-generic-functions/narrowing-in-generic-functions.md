# 🔍 Narrowing Generic Functions

When working with generic functions, type narrowing works a little differently from normal union types.

Consider this function:

```ts
function print<T>(value: T) {
  if (typeof value === "string") {
    value.toUpperCase();
  }
}
```

Inside the block, TypeScript sees:

```ts
typeof value === "string";
```

and narrows the type of `value`.

Conceptually, TypeScript computes:

```ts
T & string;
```

for `value`.

So inside the block, `value` behaves like a string and all string methods become available.

---

# 🧠 Why Does TypeScript Use Intersection?

Let's look at a concrete example.

Suppose:

```ts
function print<T>(value: T) {
  if (typeof value === "string") {
    value.toUpperCase();
  }
}
```

and we call:

```ts
print<string | number>("hello");
```

Then:

```ts
T = string | number;
```

Inside the `if` block TypeScript computes:

```ts
T & string;
```

which becomes:

```ts
(string | number) & string;
```

Using intersection rules:

```ts
(string & string) | (number & string);
```

which simplifies to:

```ts
string | never;
```

and finally:

```ts
string;
```

So TypeScript knows that calling:

```ts
value.toUpperCase();
```

is safe.

---

# 🔥 Array Narrowing in Generic Functions

The same thing happens with arrays.

```ts
function process<T>(value: T) {
  if (Array.isArray(value)) {
    value.push("hello");
  }
}
```

Inside the block:

```ts
value;
```

becomes:

```ts
T & any[]
```

Since TypeScript knows the value is now an array, array methods become available:

```ts
value.push("hello");
value.pop();
value.length;
```

The narrowing again happens through intersection.

---

# 📦 Generic Constraints Become More Specific

Consider:

```ts
function print<T extends string | number>(value: T) {
  if (typeof value === "string") {
    value.toUpperCase();
  }
}
```

Inside the block:

```ts
value;
```

becomes:

```ts
T & string;
```

Now suppose:

```ts
T = string | number;
```

Then:

```ts
(string | number) & string;
```

simplifies to:

```ts
string;
```

So TypeScript can safely expose all string methods.

---

# 🎯 Narrowing with Custom Type Guards

The same principle applies when using custom type guards.

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function print<T>(value: T) {
  if (isString(value)) {
    value.toUpperCase();
  }
}
```

Inside the block:

```ts
value;
```

becomes:

```ts
T & string;
```

Again, the narrowing is performed through intersection.

---

# 🧠 Best Mental Model

For generic values, TypeScript usually narrows by intersecting the current type with the narrowing condition.

```text
typeof value === "string"
        ↓
value becomes
T & string
```

```text
Array.isArray(value)
        ↓
value becomes
T & any[]
```

```text
value instanceof User
        ↓
value becomes
T & User
```

```text
isString(value)
        ↓
value becomes
T & string
```
