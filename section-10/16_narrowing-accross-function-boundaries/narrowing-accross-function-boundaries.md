# Narrowing Across Function Boundaries 🧠

TypeScript narrowing works based on **control flow analysis**.

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ value is string
  }
}
```

Inside the `if` block, TypeScript narrows:

```ts
value: string | number;
```

to:

```ts
value: string;
```

But when we use this narrowed variable inside another function, TypeScript has to think about **function boundaries**, **closures**, and **whether the variable can change later**.

---

## 1. Function expression preserves narrowing ✅

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    const inner = function () {
      console.log(value.toUpperCase()); // ✅ value is string
    };

    inner();
  }
}
```

Here, the function expression is created inside the narrowed flow.

At this point:

```ts
value: string;
```

So TypeScript allows it.

---

## 2. Arrow function also preserves narrowing ✅

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    const inner = () => {
      console.log(value.toUpperCase()); // ✅ value is string
    };

    inner();
  }
}
```

Same reason.

The arrow function is created at a point where TypeScript already knows `value` is a string.

---

## 3. Function declaration loses narrowing ❌

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    function inner() {
      console.log(value.toUpperCase());
      // ❌ Error comes here
      // value is treated as string | number
    }

    inner();
  }
}
```

This is the confusing case.

Even though the function declaration is written inside the `if` block, TypeScript does **not** carry the outer narrowing into the function declaration body.

Reason:

> Function declarations are hoisted declarations, so TypeScript does not treat their body as an expression created at that exact narrowed point. Because of that, control flow analysis does not apply to the function declaration body in the same way. TypeScript checks it more conservatively, as a separate callable function that closes over the outer `value`.

So TypeScript sees that `inner` closes over outer `value`, whose original type is:

```ts
string | number;
```

That is why `toUpperCase()` gives an error.

This behavior is discussed in TypeScript [issue **#32300**][2], where the issue is marked **Working as Intended**. This [Stack Overflow][1] answer also explains that function declarations and function expressions have different implications for control flow analysis because function declarations are hoisted.

---

## 4. Real unsafe case: captured variable can change 🔁

This is where TypeScript’s caution makes complete sense:

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    function inner() {
      console.log(value.toUpperCase());
      // ❌ Error comes here
    }

    value = 100;

    inner();
  }
}
```

Runtime flow:

```ts
value = "hello"      // ✅ string
inner is created     // captures outer value
value = 100          // 🔁 same variable becomes number
inner()              // 💥 number.toUpperCase() crashes
```

Important point:

> The function does not capture a frozen copy of `value`. It captures the variable itself.

So later reassignment affects what the function sees.

---

## 5. Even arrow/function expression fails if reassignment happens ❌

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    const inner = () => {
      console.log(value.toUpperCase());
      // ❌ Error comes here
    };

    value = 100;

    inner();
  }
}
```

So the deeper rule is not only “function declaration vs arrow function.”

The deeper rule is:

> If a nested function captures an outer variable, and that variable can be reassigned before the function runs, TypeScript cannot safely keep the narrowed type.

---

## 6. `setTimeout` case ⏰

This works if there is no reassignment:

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    setTimeout(() => {
      console.log(value.toUpperCase()); // ✅ value is string
    }, 1000);
  }
}
```

But this gives an error:

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    setTimeout(() => {
      console.log(value.toUpperCase());
      // ❌ Error comes here
    }, 1000);

    value = 100;
  }
}
```

Flow:

```ts
value is string ✅
callback is scheduled ⏰
value becomes number 🔁
callback runs later 💥
```

---

## 7. Fix 1: Create a temporary `const` ✅

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    const text = value;

    function inner() {
      console.log(text.toUpperCase()); // ✅ text is string
    }

    value = 100;

    inner();
  }
}
```

Here, `text` is created after narrowing.

So TypeScript knows:

```ts
const text: string;
```

Even if `value` changes later, `text` stays string.

This is useful when a callback or nested function needs to remember the narrowed value safely.

---

## 8. Fix 2: Pass the narrowed value as an argument ✅

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    function inner(text: string) {
      console.log(text.toUpperCase()); // ✅ text is string
    }

    inner(value); // ✅ value is string here
  }
}
```

Now `inner` does not depend on the outer `value`.

It receives its own local parameter:

```ts
text: string;
```

So TypeScript does not worry about the outer variable changing later.

---

## 9. Important warning 🚨

Passing as an argument works only if you pass it while it is still narrowed.

Wrong:

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    function inner(text: string) {
      console.log(text.toUpperCase());
    }

    value = 100;

    inner(value); // ❌ Error comes here
  }
}
```

Correct:

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    function inner(text: string) {
      console.log(text.toUpperCase()); // ✅
    }

    inner(value); // ✅ pass while value is still string

    value = 100;
  }
}
```

---

## Final summary 🎯

> TypeScript narrowing works smoothly in the same control flow. But when a narrowed variable is used inside another function, TypeScript has to check whether that function body can safely use the narrowed type.
>
> Function expressions and arrow functions created inside the narrowed block usually preserve narrowing.
>
> Function declarations do not carry the narrowed type in the same way because they are hoisted declarations, so TypeScript does not apply the surrounding control flow analysis to their body in the same way.
>
> Also, if the captured variable is reassigned later, even arrow functions and function expressions lose narrowing.
>
> To fix this, either create a new `const` after narrowing, or pass the narrowed value as an argument.

[1]: https://stackoverflow.com/questions/77527536/different-type-narrowing-behaviors-between-regular-functions-and-function-expres "Different type narrowing behaviors between regular ..."
[2]: https://github.com/microsoft/TypeScript/issues/32300 "Inconsistent narrowing in arrow function · Issue #32300"
