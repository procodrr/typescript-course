# TypeScript-Only Types

## 1️⃣ Primitive-Like Types

Standalone special types that represent fundamental value categories in the type system.

### Top Types

Types that can **accept values of almost any type**.

* `any`
* `unknown`

### Bottom Type

Type that represents **no possible value**.

* `never`

### Special Function Type

Represents **absence of a meaningful return value**.

* `void`

---

## 2️⃣ Type Composition & Meta Types

Types used to **define structures, combine types, or compute new types from existing types**.

---

### A. Structural Types

Used to define the **shape of data**.

* `interface`
* `type alias`
* `tuple`
* `literal`
* `enum`

---

### B. Type Combination Operators

Used to **combine multiple types**.

* `union`
* `intersection`

---

### C. Generic Type System

Used to create **parameterized reusable types**.

* `generics`

---

### D. Type Query & Access Operators

Used to **extract or reference types**.

* `keyof`
* `typeof` (type context)
* `indexed access types`

---

### E. Type Transformation System

Used to **compute or transform new types from existing types**.

* `conditional types`
* `mapped types`
* `template literal types`
* `infer`
* `utility types`

---

# Final Hierarchy

```
TypeScript-Only Types

├─ Primitive-Like Types
│
│  ├─ Top Types
│  │  ├─ any
│  │  └─ unknown
│  │
│  ├─ Bottom Type
│  │  └─ never
│  │
│  └─ Special Function Type
│     └─ void
│
└─ Type Composition & Meta Types
   │
   ├─ Structural Types
   │  ├─ interface
   │  ├─ type alias
   │  ├─ tuple
   │  ├─ literal
   │  └─ enum
   │
   ├─ Type Combination
   │  ├─ union
   │  └─ intersection
   │
   ├─ Generic System
   │  └─ generics
   │
   ├─ Type Query
   │  ├─ keyof
   │  ├─ typeof
   │  └─ indexed access types
   │
   └─ Type Transformations
      ├─ conditional types
      ├─ mapped types
      ├─ template literal types
      ├─ infer
      └─ utility types
```