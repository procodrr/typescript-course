# Popular TypeScript Utility Libraries

These libraries provide reusable utility types, advanced type-level programming helpers, deep object manipulation utilities, string utilities, and many other tools that make working with TypeScript easier and more powerful.

---

# 1. [Type-Fest](https://www.npmjs.com/package/type-fest)

One of the most popular modern TypeScript utility libraries.

It provides many practical and production-focused utility types like:

```ts id="kbyee1"
Merge
Except
ReadonlyDeep
PartialDeep
SetOptional
SetRequired
Paths
Get
Tagged
JsonValue
```

Type-Fest focuses on clean, modern, and practical TypeScript utilities that are useful in real-world applications.

Best for:

* Real-world TypeScript projects
* Deep object utilities
* String casing utilities
* Safer built-in replacements
* Modern TypeScript development

---

# 2. [ts-toolbelt](https://www.npmjs.com/package/ts-toolbelt)

A very large and advanced type-level programming library for TypeScript.

Utilities are organized into namespaces like:

```ts id="l3xyoc"
Object
Union
List
Function
String
Number
```

Example:

```ts id="zv4bdw"
Object.Merge
List.Head
Union.Intersect
```

It is much more advanced and feels closer to a full type-level programming toolkit.

Best for:

* Advanced type-level programming
* Complex utility creation
* Recursive type manipulation
* Deep TypeScript experimentation

---

# 3. [utility-types](https://www.npmjs.com/package/utility-types)

One of the older and widely used utility-type libraries.

It extends TypeScript’s built-in utility types with additional helpers like:

```ts id="lk7xv2"
DeepPartial
DeepReadonly
ValuesType
Mutable
Unionize
```

The library is lightweight and easy to understand.

Best for:

* Learning utility types
* Small utility helpers
* Simpler TypeScript projects

---

# 4. [ts-essentials](https://www.npmjs.com/package/ts-essentials)

A modern collection of essential TypeScript utility types.

Popular utilities include:

```ts id="4u2r5z"
DeepPartial
DeepReadonly
DeepRequired
Opaque
Primitive
```

The library focuses on practical utilities commonly needed in applications.

Best for:

* Everyday TypeScript usage
* Deep utility types
* Cleaner application types
* Safer object manipulation

---

# 5. [HotScript](https://www.npmjs.com/package/hotscript)

A functional programming inspired type-level programming library.

It allows creating type-level pipelines and transformations similar to functional JavaScript programming.

Example style:

```ts id="m42g8s"
Pipe<
  [String.Split<'-'>, List.Map<Uppercase>]
>
```

HotScript is highly advanced and mainly used for experimenting with TypeScript’s type system.

Best for:

* Functional type-level programming
* Advanced TypeScript experiments
* Learning type-level composition
* Complex compile-time transformations