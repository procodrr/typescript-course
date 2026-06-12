# Top 50 Most Useful Type-Fest Utilities

## 🧱 Object Shape Utilities

### 1. `Except<T, K>`

Removes selected keys from an object type. `Except<T, K>` works like `Omit<T, K>` but it is stricter.  
It allows only the `keyof T` as the value of `K`.

```ts
import type { Except } from "type-fest";

type User = {
  id: number;
  name: string;
  email: string;
};

type PublicUser = Except<User, "email">;

/*
type PublicUser = {
  id: number;
  name: string;
}
*/
```

### 2. `Merge<A, B>`

Merges two object types, and the second type overrides matching keys from the first.

```ts
import type { Merge } from "type-fest";

type DefaultConfig = {
  theme: "light";
  debug: false;
};

type CustomConfig = {
  theme: "dark";
};

type FinalConfig = Merge<DefaultConfig, CustomConfig>;

/*
type FinalConfig = {
  theme: 'dark';
  debug: false;
}
*/
```

### 3. `OverrideProperties<T, U>`

Overrides existing properties only, so you cannot accidentally add new keys.

```ts
import type { OverrideProperties } from "type-fest";

type User = {
  id: string;
  name: string;
};

type UpdatedUser = OverrideProperties<
  User,
  {
    id: number;
  }
>;

/*
type UpdatedUser = {
  id: number;
  name: string;
}
*/
```

### 4. `Spread<A, B>`

Creates a type similar to JavaScript object spread.

```ts
import type { Spread } from "type-fest";

type A = {
  id: number;
};

type B = {
  name: string;
};

type Result = Spread<A, B>;

/*
type Result = {
  id: number;
  name: string;
}
*/
```

This looks same as the `Merge<A, B>` but it behaves differently when there is a common optional property.

```ts
import type { Merge, Spread } from "type-fest";

type Foo = {
  a: number;
  b?: string;
};

type Bar = {
  b?: number;
  c: boolean;
};

type Merged = Merge<Foo, Bar>;
/*
type Merged = {
  id: number;
  name?: boolean | undefined;
  age: number;
}
*/

type Spreaded = Spread<Foo, Bar>;
/*
type Spreaded = {
  id: number;
  name?: string | boolean | undefined;
  age: number;
}
*/
```

### 5. `Simplify<T>`

Flattens complex intersection types into a cleaner readable object type. It is similar to the `Expand<T>` or `Prettify<T>` utility we created.

```ts
import type { Simplify } from "type-fest";

type User = {
  id: number;
} & {
  name: string;
};

type CleanUser = Simplify<User>;

/*
type CleanUser = {
  id: number;
  name: string;
}
*/
```

### 6. `SetOptional<T, K>`

Makes selected keys optional.

```ts
import type { SetOptional } from "type-fest";

type User = {
  id: number;
  name: string;
  email: string;
};

type UserDraft = SetOptional<User, "email">;

/*
type UserDraft = {
  id: number;
  name: string;
  email?: string;
}
*/
```

### 7. `SetRequired<T, K>`

Makes selected keys required.

```ts
import type { SetRequired } from "type-fest";

type User = {
  id?: number;
  name?: string;
};

type UserWithId = SetRequired<User, "id">;

/*
type UserWithId = {
  id: number;
  name?: string;
}
*/
```

### 8. `SetReadonly<T, K>`

Makes selected keys readonly.

```ts
import type { SetReadonly } from "type-fest";

type User = {
  id: number;
  name: string;
};

type UserWithReadonlyId = SetReadonly<User, "id">;

/*
type UserWithReadonlyId = {
  readonly id: number;
  name: string;
}
*/
```

### 9. `SetFieldType<T, K, V>`

Changes the type of selected fields.

```ts
import type { SetFieldType } from "type-fest";

type User = {
  id: string;
  name: string;
};

type UserFromDatabase = SetFieldType<User, "id", number>;

/*
type UserFromDatabase = {
  id: number;
  name: string;
}
*/
```

## 🧊 Deep Object Utilities

### 10. `ReadonlyDeep<T>`

Makes all properties readonly deeply.

```ts
import type { ReadonlyDeep } from "type-fest";

type Config = {
  database: {
    host: string;
    port: number;
  };
};

type FrozenConfig = ReadonlyDeep<Config>;

/*
type FrozenConfig = {
  readonly database: {
    readonly host: string;
    readonly port: number;
  };
}
*/
```

### 11. `Writable<T>`

Removes `readonly` from the first level.

```ts
import type { Writable } from "type-fest";

type User = {
  readonly id: number;
  readonly name: string;
};

type EditableUser = Writable<User>;

/*
type EditableUser = {
  id: number;
  name: string;
}
*/
```

### 12. `WritableDeep<T>`

Removes `readonly` deeply.

```ts
import type { WritableDeep } from "type-fest";

type Config = {
  readonly database: {
    readonly host: string;
  };
};

type EditableConfig = WritableDeep<Config>;

/*
type EditableConfig = {
  database: {
    host: string;
  };
}
*/
```

### 13. `PartialDeep<T>`

Makes all properties optional deeply.

```ts
import type { PartialDeep } from "type-fest";

type Settings = {
  user: {
    name: string;
    theme: string;
  };
};

type SettingsUpdate = PartialDeep<Settings>;

/*
type SettingsUpdate = {
  user?: {
    name?: string;
    theme?: string;
  };
}
*/
```

### 14. `RequiredDeep<T>`

Makes all properties required deeply.

```ts
import type { RequiredDeep } from "type-fest";

type Settings = {
  user?: {
    name?: string;
    theme?: string;
  };
};

type CompleteSettings = RequiredDeep<Settings>;

/*
type CompleteSettings = {
  user: {
    name: string;
    theme: string;
  };
}
*/
```

### 15. `NonNullableDeep<T>`

Removes `null` and `undefined` deeply.

```ts
import type { NonNullableDeep } from "type-fest";

type ApiUser = {
  id: number | null;
  profile?: {
    name: string | null;
  };
};

type CleanUser = NonNullableDeep<ApiUser>;

/*
type CleanUser = {
  id: number;
  profile: {
    name: string;
  };
}
*/
```

### 16. `SetNonNullable<T, K>`

Makes selected keys non-nullable.

```ts
import type { SetNonNullable } from "type-fest";

type User = {
  id: number | null;
  name: string | null;
};

type UserWithId = SetNonNullable<User, "id">;

/*
type UserWithId = {
  id: number;
  name: string | null;
}
*/
```

## 🔑 Key and Path Utilities

### 17. `KeysOfUnion<T>`

Gets all keys from a union, not just common keys.

```ts
import type { KeysOfUnion } from "type-fest";

type User = { id: number; name: string } | { id: number; email: string };

type UserKeys = KeysOfUnion<User>;

/*
type UserKeys = 'id' | 'name' | 'email'
*/
```

### 18. `LiteralUnion<T, U>`

Allows known string suggestions while still accepting custom strings.

```ts
import type { LiteralUnion } from "type-fest";

type Color = LiteralUnion<"red" | "blue", string>;

const color1: Color = "red";
const color2: Color = "custom-green";

/*
Both are allowed.
Editor still suggests 'red' and 'blue'.
*/
```

### 19. `Paths<T>`

Creates a union of all possible object paths.

```ts
import type { Paths } from "type-fest";

type User = {
  profile: {
    name: string;
    age: number;
  };
};

type UserPaths = Paths<User>;

/*
type UserPaths =
  | 'profile'
  | 'profile.name'
  | 'profile.age'
*/
```

### 20. `Get<T, Path>`

Gets the type at a specific object path.

```ts
import type { Get } from "type-fest";

type User = {
  profile: {
    name: string;
    age: number;
  };
};

type UserName = Get<User, "profile.name">;

/*
type UserName = string
*/
```

### 21. `PickDeep<T, Path>`

Picks deeply nested properties.

```ts
import type { PickDeep } from "type-fest";

type User = {
  id: number;
  profile: {
    name: string;
    age: number;
  };
};

type UserNameOnly = PickDeep<User, "profile.name">;

/*
type UserNameOnly = {
  profile: {
    name: string;
  };
}
*/
```

### 22. `OmitDeep<T, Path>`

Omits deeply nested properties.

```ts
import type { OmitDeep } from "type-fest";

type User = {
  id: number;
  profile: {
    name: string;
    password: string;
  };
};

type SafeUser = OmitDeep<User, "profile.password">;

/*
type SafeUser = {
  id: number;
  profile: {
    name: string;
  };
}
*/
```

## 🧬 Union Utilities

### 23. `UnionToIntersection<T>`

Converts a union type into an intersection type.

```ts
import type { UnionToIntersection } from "type-fest";

type UserUnion = { id: number } | { name: string };

type UserIntersection = UnionToIntersection<UserUnion>;

/*
type UserIntersection = {
  id: number;
} & {
  name: string;
}
*/
```

### 24. `ValueOf<T>`

Gets a union of all object values.

```ts
import type { ValueOf } from "type-fest";

const status = {
  pending: "PENDING",
  success: "SUCCESS",
  failed: "FAILED",
} as const;

type Status = ValueOf<typeof status>;

/*
type Status = 'PENDING' | 'SUCCESS' | 'FAILED'
*/
```

### 25. `ConditionalKeys<T, Condition>`

Gets keys whose values match a condition.

```ts
import type { ConditionalKeys } from "type-fest";

type User = {
  id: number;
  name: string;
  email: string;
};

type StringKeys = ConditionalKeys<User, string>;

/*
type StringKeys = 'name' | 'email'
*/
```

### 26. `ConditionalPick<T, Condition>`

Picks properties whose values match a condition.

```ts
import type { ConditionalPick } from "type-fest";

type User = {
  id: number;
  name: string;
  email: string;
};

type StringFields = ConditionalPick<User, string>;

/*
type StringFields = {
  name: string;
  email: string;
}
*/
```

### 27. `ConditionalExcept<T, Condition>`

Removes properties whose values match a condition.

```ts
import type { ConditionalExcept } from "type-fest";

type User = {
  id: number;
  name: string;
  email: string;
};

type NonStringFields = ConditionalExcept<User, string>;

/*
type NonStringFields = {
  id: number;
}
*/
```

### 28. `SharedUnionFields<T>`

Keeps fields shared by all members of a union.

```ts
import type { SharedUnionFields } from "type-fest";

type Event = { type: "click"; x: number } | { type: "submit"; formId: string };

type CommonEventFields = SharedUnionFields<Event>;

/*
type CommonEventFields = {
  type: 'click' | 'submit';
}
*/
```

### 29. `Tagged<T, Tag>`

Creates a branded or nominal type.

```ts
import type { Tagged } from "type-fest";

type UserId = Tagged<string, "UserId">;

const userId = "abc123" as UserId;

/*
userId is still string at runtime,
but TypeScript treats it as UserId.
*/
```

### 30. `UnwrapTagged<T>`

Removes a `Tagged` brand and gives the original type.

```ts
import type { Tagged, UnwrapTagged } from "type-fest";

type UserId = Tagged<string, "UserId">;

type RawUserId = UnwrapTagged<UserId>;

/*
type RawUserId = string
*/
```

## 🧰 Function and Promise Utilities

### 31. `AsyncReturnType<T>`

Gets the resolved return type of an async function.

```ts
import type { AsyncReturnType } from "type-fest";

async function getUser() {
  return {
    id: 1,
    name: "Anurag",
  };
}

type User = AsyncReturnType<typeof getUser>;

/*
type User = {
  id: number;
  name: string;
}
*/
```

### 32. `SetReturnType<F, R>`

Changes the return type of a function.

```ts
import type { SetReturnType } from "type-fest";

type GetName = () => string;

type GetAge = SetReturnType<GetName, number>;

/*
type GetAge = () => number
*/
```

### 33. `SetParameterType<F, P>`

Changes selected parameter types of a function.

```ts
import type { SetParameterType } from "type-fest";

type Fn = (id: string, active: boolean) => void;

type UpdatedFn = SetParameterType<
  Fn,
  {
    0: number;
  }
>;

/*
type UpdatedFn = (id: number, active: boolean) => void
*/
```

### 34. `Promisable<T>`

Allows a value or a promise of that value.

```ts
import type { Promisable } from "type-fest";

type LoaderResult = Promisable<string>;

const a: LoaderResult = "data";
const b: LoaderResult = Promise.resolve("data");

/*
Both string and Promise<string> are allowed.
*/
```

### 35. `Asyncify<F>`

Converts a sync function type into an async function type.

```ts
import type { Asyncify } from "type-fest";

type GetName = () => string;

type AsyncGetName = Asyncify<GetName>;

/*
type AsyncGetName = () => Promise<string>
*/
```

## 🧵 String Utilities

### 36. `CamelCase<S>`

Converts a string literal type to camelCase.

```ts
import type { CamelCase } from "type-fest";

type Name = CamelCase<"user-name">;

/*
type Name = 'userName'
*/
```

### 37. `KebabCase<S>`

Converts a string literal type to kebab-case.

```ts
import type { KebabCase } from "type-fest";

type Name = KebabCase<"userName">;

/*
type Name = 'user-name'
*/
```

### 38. `SnakeCase<S>`

Converts a string literal type to snake_case.

```ts
import type { SnakeCase } from "type-fest";

type Name = SnakeCase<"userName">;

/*
type Name = 'user_name'
*/
```

### 39. `ScreamingSnakeCase<S>`

Converts a string literal type to SCREAMING_SNAKE_CASE.

```ts
import type { ScreamingSnakeCase } from "type-fest";

type Name = ScreamingSnakeCase<"userName">;

/*
type Name = 'USER_NAME'
*/
```

### 40. `DelimiterCase<S, D>`

Converts a string literal type using a custom delimiter.

```ts
import type { DelimiterCase } from "type-fest";

type Name = DelimiterCase<"userName", ".">;

/*
type Name = 'user.name'
*/
```

## 🧩 Object Key Casing Utilities

### 41. `CamelCasedProperties<T>`

Converts object keys to camelCase.

```ts
import type { CamelCasedProperties } from "type-fest";

type ApiUser = {
  "user-id": number;
  "user-name": string;
};

type User = CamelCasedProperties<ApiUser>;

/*
type User = {
  userId: number;
  userName: string;
}
*/
```

### 42. `CamelCasedPropertiesDeep<T>`

Converts object keys to camelCase deeply.

```ts
import type { CamelCasedPropertiesDeep } from "type-fest";

type ApiUser = {
  "user-id": number;
  profile: {
    "display-name": string;
  };
};

type User = CamelCasedPropertiesDeep<ApiUser>;

/*
type User = {
  userId: number;
  profile: {
    displayName: string;
  };
}
*/
```

### 43. `KebabCasedProperties<T>`

Converts object keys to kebab-case.

```ts
import type { KebabCasedProperties } from "type-fest";

type User = {
  userId: number;
  userName: string;
};

type ApiUser = KebabCasedProperties<User>;

/*
type ApiUser = {
  'user-id': number;
  'user-name': string;
}
*/
```

### 44. `SnakeCasedProperties<T>`

Converts object keys to snake_case.

```ts
import type { SnakeCasedProperties } from "type-fest";

type User = {
  userId: number;
  userName: string;
};

type DbUser = SnakeCasedProperties<User>;

/*
type DbUser = {
  user_id: number;
  user_name: string;
}
*/
```

### 45. `ScreamingSnakeCasedProperties<T>`

Converts object keys to SCREAMING_SNAKE_CASE.

```ts
import type { ScreamingSnakeCasedProperties } from "type-fest";

type Env = {
  databaseUrl: string;
  apiKey: string;
};

type EnvVariables = ScreamingSnakeCasedProperties<Env>;

/*
type EnvVariables = {
  DATABASE_URL: string;
  API_KEY: string;
}
*/
```

## ✅ Strict and Safer Types

### 46. `Jsonify<T>`

Converts a type into something safely JSON-serializable.

```ts
import type { Jsonify } from "type-fest";

type User = {
  id: number;
  createdAt: Date;
};

type JsonUser = Jsonify<User>;

/*
type JsonUser = {
  id: number;
  createdAt: string;
}
*/
```

### 47. `JsonValue`

Represents any valid JSON value.

```ts
import type { JsonValue } from "type-fest";

const data: JsonValue = {
  name: "Anurag",
  age: 25,
  skills: ["JS", "TS"],
};

/*
Allowed because it is JSON-safe.
*/
```

### 48. `UnknownRecord`

Represents an object with unknown values.

```ts
import type { UnknownRecord } from "type-fest";

function printObject(value: UnknownRecord) {
  console.log(value);
}

printObject({ name: "Anurag" });

/*
Allowed because {name: 'Anurag'} is an object.
*/
```

### 49. `EmptyObject`

Represents an object with no known keys.

```ts
import type { EmptyObject } from "type-fest";

const config: EmptyObject = {};

/*
Only an empty object is allowed.
*/
```

### 50. `PackageJson`

Gives a ready-made type for `package.json`.

```ts
import type { PackageJson } from "type-fest";

const packageJson: PackageJson = {
  name: "my-app",
  version: "1.0.0",
  type: "module",
};

/*
Typed like a real package.json file.
*/
```
