# 🧩 Tuple Pattern Matching with `infer` Keyword

Tuple pattern matching means:

> “Checking whether a tuple fits a certain shape and extracting parts of it using `infer`.”

It happens inside **conditional types**.

---

# ⚙️ Basic Syntax

```ts
type X = ["Anurag", 25] extends [infer A, infer B] ? A | B : never;
```

Here TypeScript asks:

> “Does this tuple look like a tuple with 2 items?”

If yes:

- first item → stored in `A`
- second item → stored in `B`

---

# 📦 Example 1: Extract First Element

```ts
type X = ["apple", "banana", "mango"] extends [infer F, ...unknown[]]
  ? F
  : never;
```

Result:

```ts
type X = "apple";
```

---

# 🧠 What Happened Internally?

TypeScript compares:

```ts
["apple", "banana", "mango"];
```

against:

```ts
[infer F, ...unknown[]]
```

Matching process:

```ts
F = "apple"
...unknown[] = ["banana", "mango"]
```

So:

```ts
F;
```

becomes:

```ts
"apple";
```

---

# 📦 Example 2: Extract Last Element

```ts
type X = [100, 200, 300] extends [...unknown[], infer L] ? L : never;
```

Result:

```ts
type X = 300;
```

---

# 🧠 Internal Matching

TypeScript compares:

```ts
[100, 200, 300];
```

against:

```ts
[...unknown[], infer L]
```

Matching:

```ts
...unknown[] = [100, 200]
L = 300
```

---

# 📦 Example 3: Extract Head and Tail

```ts
type X = ["HTML", "CSS", "JavaScript"] extends [infer Head, ...infer Tail]
  ? [Head, Tail]
  : never;
```

Result:

```ts
type X = ["HTML", ["CSS", "JavaScript"]];
```

---

# 🧠 Matching

TypeScript compares:

```ts
["HTML", "CSS", "JavaScript"];
```

against:

```ts
[infer Head, ...infer Tail]
```

Result:

```ts
Head = "HTML";
Tail = ["CSS", "JavaScript"];
```

---

# 📦 Example 4: Extract Middle Parts

```ts
type X = ["red", "green", "blue"] extends [infer A, infer B, infer C]
  ? B
  : never;
```

Result:

```ts
type X = "green";
```

---

# 📦 Example 5: Match Specific Tuple Shapes

```ts
type X = [true, false] extends [unknown, unknown] ? true : false;
```

Result:

```ts
type X = true;
```

---

# 🚀 Variadic Tuple Matching

The real power comes from:

```ts
...infer Something
```

This means:

> “Capture multiple tuple elements.”

---

# 📦 Example 6: Remove First Element

```ts
type X = ["Node.js", "Express", "MongoDB"] extends [unknown, ...infer Rest]
  ? Rest
  : never;
```

Result:

```ts
type X = ["Express", "MongoDB"];
```

---

# 📦 Example 7: Remove Last Element

```ts
type X = ["Monday", "Tuesday", "Wednesday"] extends [...infer Rest, unknown]
  ? Rest
  : never;
```

Result:

```ts
type X = ["Monday", "Tuesday"];
```

---

# 🧠 Why This Is Called Pattern Matching

Because the tuple structure acts like a pattern:

```ts
[infer A, ...infer B]
```

and TypeScript tries to fit the actual tuple into that structure.

Very similar to destructuring:

```js
const [head, ...tail] = arr;
```

But this happens completely at the **type level**.

---

# 🔥 Generic Tuple Pattern Matching

Now instead of writing a fixed tuple every time, we can make it dynamic using generics.

---

# 📦 Example: Extract First Element Using Generics

```ts
type First<T> = T extends [infer F, ...unknown[]] ? F : never;
```

Usage:

```ts
type A = First<[10, 20, 30]>;
```

Result:

```ts
type A = 10;
```

---

# 🧠 Internal Evaluation

TypeScript substitutes:

```ts
T = [10, 20, 30];
```

So internally it becomes:

```ts
[10, 20, 30] extends [infer F, ...unknown[]]
  ? F
  : never
```

Matching:

```ts
F = 10;
```

---

# 🧠 Most Important Thing to Remember

Tuple matching works because:

```ts
T extends SomeTuplePattern
```

tries to structurally compare the tuple with the pattern.

And wherever TypeScript sees:

```ts
infer Something
```

it captures that matched part into a temporary type variable.
