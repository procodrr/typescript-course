
# 🧩 Custom Utility Types Implementation

---

## 1. 🏗️ `Mutable<T>`

```ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

---

## 2. ❓ `PartialByKeys<T, K>`

```ts
type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```

---

## 3. ✅ `RequiredByKeys<T, K>`

```ts
type RequiredByKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
```

---

## 4. 🔒 `ReadonlyByKeys<T, K>`

```ts
type ReadonlyByKeys<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;
```

---

## 5. 🧹 `NonNullableProperties<T>`

```ts
type NonNullableProperties<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
```

---

## 6. 🔍 `KeysOfType<T, ValueType>`

```ts
type KeysOfType<T, ValueType> = {
  [K in keyof T]: T[K] extends ValueType ? K : never;
}[keyof T];
```

---

## 7. 📤 `PickByValue<T, ValueType>`

```ts
type PickByValue<T, ValueType> = Pick<T, KeysOfType<T, ValueType>>;
```

---

## 8. 🧱 `Prettify<T>`

```ts
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
```

---

## 9. 🧬 `DeepPartial<T>`

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
```

---

## 10. 🧊 `DeepReadonly<T>`

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```