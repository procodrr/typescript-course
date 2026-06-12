## ❗Non-Null Assertion Operator in TypeScript

The **non-null assertion operator** is written using `!`.

It tells TypeScript:

> “Trust me, this value is not `null` or `undefined` here.”

```ts
value!;
```

It only affects **TypeScript checking**.
It does **not** add any runtime safety.

---

## ✅ Basic Example

```ts
let username: string | undefined;

function setUsername() {
  username = "Anurag";
}

setUsername();

console.log(username.toUpperCase());
```

TypeScript gives an error:

```txt
'username' is possibly 'undefined'
```

Why?

Because TypeScript does not deeply analyze that `setUsername()` definitely assigns a value to `username`.

So we can write:

```ts
let username: string | undefined;

function setUsername() {
  username = "Anurag";
}

setUsername();

console.log(username!.toUpperCase());
```

Here:

```ts
username!;
```

means:

```txt
Trust me, username is not undefined here.
```

---

## ⚠️ Important

This is safe only when **you are 100% sure** the value exists.

```ts
let username: string | undefined;

console.log(username!.toUpperCase());
```

This will compile, but at runtime it can crash:

```txt
Cannot read properties of undefined
```

So `!` removes TypeScript’s warning, not the actual problem.