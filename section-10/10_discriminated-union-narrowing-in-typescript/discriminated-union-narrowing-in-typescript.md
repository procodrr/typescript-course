# 🔍 Discriminated Union Narrowing in TypeScript

Discriminated union narrowing is one of the most powerful and important narrowing techniques in TypeScript.

It allows TypeScript to narrow object union types using a shared literal property.

---

# 🧠 What is a Discriminated Union?

A discriminated union is a union of object types where every object contains a common property with different literal values.

That common property is called:

# ✨ Discriminant Property

or sometimes:

# ✨ Tag Property

---

# 📌 Simple Example

```ts
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  size: number;
};

type Shape = Circle | Square;
```

Here:

```ts
kind;
```

is the discriminant property.

Because every union member contains:

```ts
kind: some literal value;
```

---

# 📌 Basic Narrowing Example

```ts
function print(shape: Shape) {
  if (shape.kind === "circle") {
    console.log(shape); // shape is Circle
  } else {
    console.log(shape); // shape is Square
  }
}
```

TypeScript sees:

```ts
shape.kind === "circle";
```

and understands:

```text
If kind is "circle",
shape must be Circle.
```

So inside the block:

```ts
shape: Circle;
```

---

# 📌 Another Example

```ts
type Success = {
  status: "success";
  data: string;
};

type ErrorState = {
  status: "error";
  message: string;
};

type Result = Success | ErrorState;

function handle(result: Result) {
  if (result.status === "success") {
    console.log(result); // result is Success
  } else {
    console.log(result); // result is ErrorState
  }
}
```

---

# 📌 `switch` Works Extremely Well

Discriminated unions are commonly used with `switch`.

```ts
function print(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      console.log(shape); // shape is Circle
      break;

    case "square":
      console.log(shape); // shape is Square
      break;
  }
}
```

TypeScript narrows automatically inside each case.

---

# 🚦 How TypeScript Understands This

TypeScript analyzes:

```ts
shape.kind;
```

and tracks the possible literal values.

Example:

```ts
"circle";
"square";
```

If one possibility is selected:

```ts
shape.kind === "circle";
```

then all other impossible union members are removed.

This is why it is called:

# ✨ Discriminated Union Narrowing

---

# 📌 Why Literal Types Are Important

This works:

```ts
type Circle = {
  kind: "circle";
};
```

because `"circle"` is a literal type.

But this does NOT work properly:

```ts
type Circle = {
  kind: string;
};
```

because TypeScript loses the exact discriminant information.

So discriminated unions depend heavily on:

- literal types
- exact values

---

# 📌 Multiple Union Members

```ts
type Loading = {
  status: "loading";
};

type Success = {
  status: "success";
};

type ErrorState = {
  status: "error";
};

type State = Loading | Success | ErrorState;
```

```ts
function handle(state: State) {
  if (state.status === "loading") {
    console.log(state); // state is Loading
  }
}
```

TypeScript removes all impossible members automatically.

---

# ⚠️ The Discriminant Property Must Exist in All Members

This works properly:

```ts
type A = {
  type: "a";
};

type B = {
  type: "b";
};
```

because both contain:

```ts
type;
```

But this is weaker:

```ts
type A = {
  name: string;
};

type B = {
  age: number;
};
```

because there is no shared discriminant property.

---

# ⚠️ Discriminant Values Should Be Unique

This is good:

```ts
type: "success";
type: "error";
type: "loading";
```

because every value uniquely identifies a union member.

If multiple union members share the same value, narrowing becomes weaker.

---

# ⚠️ Usually Use String Literals

Most discriminated unions use:

```ts
"loading";
"success";
"error";
```

because they are:

- readable
- predictable
- easy to narrow

---

# 📌 Real-World Examples

Discriminated unions are extremely common in:

- API responses
- Redux actions
- React state management
- async states
- form validation
- event systems
- backend request handling

---

# 📌 Async State Example

```ts
type Loading = {
  status: "loading";
};

type Success = {
  status: "success";
  data: string;
};

type ErrorState = {
  status: "error";
  error: string;
};

type State = Loading | Success | ErrorState;
```

```ts
function render(state: State) {
  if (state.status === "success") {
    console.log(state); // state is Success
  }
}
```

This pattern is extremely common in real applications.

---

# ⚠️ Discriminated Unions Depend on Equality Narrowing

This is important.

Discriminated union narrowing works because TypeScript combines:

- literal types
- equality narrowing
- control flow analysis

So this:

```ts
shape.kind === "circle";
```

is internally powered by equality narrowing.

---

# 🧠 Best Mental Model

```text
Shared Literal Property
        ↓
Unique Literal Values
        ↓
TypeScript Identifies Union Member
        ↓
Impossible Members Removed
```

---

# 📌 Why Discriminated Unions Are So Powerful

Without discriminated unions:

❌ TypeScript struggles to identify object variants safely.

With discriminated unions:

✅ TypeScript can precisely narrow object shapes.

This gives:

- better autocomplete
- better safety
- safer property access
- exhaustive checking support

---

# ⚡ Final Summary

Discriminated union narrowing is a narrowing technique where TypeScript narrows object union types using a shared literal property called a discriminant property.

---

# ✨ Most Important Understanding

```text
Discriminated unions work because
each union member has a shared property
with a unique literal value.
```
