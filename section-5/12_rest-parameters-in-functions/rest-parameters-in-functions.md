In TypeScript, **rest parameters** are typed by writing an array type after `...`.

```ts
function sum(...numbers: number[]) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(10, 20, 30); // ✅
sum(10, "20"); // ❌ Error
```

Here:

```ts
...numbers: number[]
```

means:

> This function can receive any number of arguments, and every argument must be a `number`.

---

## Basic Examples

### String Rest Parameters

```ts
function joinWords(...words: string[]) {
  return words.join(" ");
}

joinWords("Hello", "TypeScript"); // ✅
joinWords("Hello", 100); // ❌
```

---

### Boolean Rest Parameters

```ts
function checkAll(...values: boolean[]) {
  return values.every(Boolean);
}

checkAll(true, true, false); // ✅
checkAll(true, "yes"); // ❌
```

---

## Rest Parameter After Normal Parameters

Rest parameters must always come at the end.

```ts
function greet(message: string, ...names: string[]) {
  return `${message}, ${names.join(", ")}`;
}

greet("Hello", "Anurag", "Singh");
```

Here:

```ts
message: string;
```

is a normal parameter.

```ts
...names: string[]
```

collects all remaining arguments into an array.

---

## Wrong Example

```ts
function test(...values: string[], age: number) {
  // ❌ Error
}
```

Rest parameter must be the last parameter.

Correct:

```ts
function test(age: number, ...values: string[]) {
  // ✅
}
```

---

## Rest Parameters with Tuple Types

You can also type rest parameters using tuples.

```ts
function createUser(...args: [string, number, boolean]) {
  const [name, age, isAdmin] = args;

  return {
    name,
    age,
    isAdmin,
  };
}

createUser("Anurag", 27, true); // ✅
createUser("Anurag", true, 27); // ❌
```

This means the function must receive exactly:

```ts
(string, number, boolean);
```

in that order.

---

## Named Tuple Elements

For better readability, we can give names inside the tuple type:

```ts
function createUser(...args: [name: string, age: number, isAdmin: boolean]) {
  const [name, age, isAdmin] = args;

  return {
    name,
    age,
    isAdmin,
  };
}
```

These names are only for readability. They do not create variables automatically outside the function.

---

## Rest Parameters with Union Types

```ts
function printValues(...values: (string | number)[]) {
  values.forEach((value) => console.log(value));
}

printValues("Anurag", 100, "TypeScript"); // ✅
printValues(true); // ❌
```

---

## Rest Parameters in Function Types

You can also type rest parameters in function type definitions.

```ts
type Logger = (...messages: string[]) => void;

const log: Logger = (...messages) => {
  console.log(messages.join(" "));
};

log("Hello", "TypeScript");
```

---

## With Specific First Parameter

```ts
type EventHandler = (eventName: string, ...payload: unknown[]) => void;

const handleEvent: EventHandler = (eventName, ...payload) => {
  console.log(eventName);
  console.log(payload);
};

handleEvent("click", 10, true, { x: 20 });
```

---

## Important Point

A rest parameter is always an array inside the function.

```ts
function demo(...values: number[]) {
  console.log(values);
}

demo(1, 2, 3);
```

Output:

```ts
[1, 2, 3];
```

So this:

```ts
demo(1, 2, 3);
```

becomes:

```ts
values = [1, 2, 3];
```

inside the function.

---

## Final Syntax

```ts
function functionName(...parameterName: Type[]) {
  // code
}
```

Example:

```ts
function add(...nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}
```
