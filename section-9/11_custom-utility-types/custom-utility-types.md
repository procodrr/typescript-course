# 🧩 Custom Utility Types in TypeScript

Custom utility types are utility types created by us when TypeScript’s built-in utility types are not enough for our specific type transformation needs.

They help us create reusable type-level logic.

Think of them as:

> Our own helper functions, but for types.

---

# 🤔 Why Do We Create Custom Utility Types?

We create custom utility types when we want to:

```txt
✅ avoid repeating type logic
✅ transform existing types
✅ extract specific information from types
✅ make types reusable
✅ create project-specific type helpers
✅ improve type safety
```

Built-in utility types like `Partial`, `Pick`, `Omit`, `Exclude`, and `ReturnType` are useful.

But sometimes, we need custom behavior.

That is where custom utility types help.

---

# 📦 Common Custom Utility Types We Can Create

---

## 1. 🏗️ Make All Properties Mutable

### Utility Type Name

```ts
Mutable<T>
```

### Requirement

It should remove `readonly` from all properties of an object type.

### Parameters

```txt
T → object type
```

### Example Usage

```ts
type MutableUser = Mutable<ReadonlyUser>;
```

---

## 2. ❓ Make Specific Properties Optional

### Utility Type Name

```ts
PartialByKeys<T, K>
```

### Requirement

It should make only selected properties optional.

### Parameters

```txt
T → object type
K → keys that should become optional
```

### Example Usage

```ts
type UserWithOptionalEmail = PartialByKeys<User, "email">;
```

---

## 3. ✅ Make Specific Properties Required

### Utility Type Name

```ts
RequiredByKeys<T, K>
```

### Requirement

It should make only selected properties required.

### Parameters

```txt
T → object type
K → keys that should become required
```

### Example Usage

```ts
type UserWithRequiredEmail = RequiredByKeys<User, "email">;
```

---

## 4. 🔒 Make Specific Properties Readonly

### Utility Type Name

```ts
ReadonlyByKeys<T, K>
```

### Requirement

It should make only selected properties read-only.

### Parameters

```txt
T → object type
K → keys that should become read-only
```

### Example Usage

```ts
type UserWithReadonlyId = ReadonlyByKeys<User, "id">;
```

---

## 5. 🧹 Remove `null` and `undefined` from Object Properties

### Utility Type Name

```ts
NonNullableProperties<T>
```

### Requirement

It should remove `null` and `undefined` from all properties of an object type.

### Parameters

```txt
T → object type
```

### Example Usage

```ts
type CleanUser = NonNullableProperties<User>;
```

---

## 6. 🔍 Get Keys of a Specific Value Type

### Utility Type Name

```ts
KeysOfType<T, ValueType>
```

### Requirement

It should return only those keys whose values match a specific type.

### Parameters

```txt
T → object type
ValueType → value type to match
```

### Example Usage

```ts
type StringKeys = KeysOfType<User, string>;
```

---

## 7. 📤 Pick Properties by Value Type

### Utility Type Name

```ts
PickByValue<T, ValueType>
```

### Requirement

It should pick only those properties whose values match a specific type.

### Parameters

```txt
T → object type
ValueType → value type to match
```

### Example Usage

```ts
type StringProperties = PickByValue<User, string>;
```

---

## 8. 🧱 Flatten Object Type

### Utility Type Name

```ts
Prettify<T>
```

### Requirement

It should make complex intersection types easier to read in editor tooltips.

### Parameters

```txt
T → object type
```

### Example Usage

```ts
type CleanType = Prettify<User & Address>;
```

---

## 9. 🧬 Deep Partial

### Utility Type Name

```ts
DeepPartial<T>
```

### Requirement

It should make all properties optional deeply, including nested object properties.

### Parameters

```txt
T → object type
```

### Example Usage

```ts
type PartialConfig = DeepPartial<Config>;
```

---

## 10. 🧊 Deep Readonly

### Utility Type Name

```ts
DeepReadonly<T>
```

### Requirement

It should make all properties read-only deeply, including nested object properties.

### Parameters

```txt
T → object type
```

### Example Usage

```ts
type ReadonlyConfig = DeepReadonly<Config>;
```

---

# 🎯 Main Idea

Custom utility types help us create our own reusable type transformations.

In simple words:

> Custom utility types are reusable type-level tools created by us for our own project-specific type transformations.
